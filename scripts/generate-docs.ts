#!/usr/bin/env node

/**
 * API Documentation Generator
 * Automatically generates OpenAPI documentation from route files
 */

import fs from 'fs/promises'
import path from 'path'

interface RouteInfo {
  path: string
  method: string
  description?: string
  parameters?: any[]
  responses?: Record<string, any>
  security?: string[]
}

interface OpenAPISpec {
  openapi: string
  info: {
    title: string
    version: string
    description: string
  }
  servers: Array<{ url: string; description: string }>
  paths: Record<string, any>
  components: {
    schemas: Record<string, any>
    securitySchemes: Record<string, any>
  }
}

class APIDocGenerator {
  private routes: RouteInfo[] = []
  private spec: OpenAPISpec

  constructor() {
    this.spec = {
      openapi: '3.0.0',
      info: {
        title: 'MKT4U API',
        version: '1.0.0',
        description: 'AI-powered marketing platform API'
      },
      servers: [
        { url: 'http://localhost:3000/api', description: 'Development server' },
        { url: 'https://your-app.vercel.app/api', description: 'Production server' }
      ],
      paths: {},
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              email: { type: 'string', format: 'email' },
              name: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          Campaign: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              user_id: { type: 'string', format: 'uuid' },
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string', enum: ['draft', 'active', 'paused', 'completed'] },
              budget: { type: 'number', minimum: 0 },
              start_date: { type: 'string', format: 'date-time' },
              end_date: { type: 'string', format: 'date-time' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          Error: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
              statusCode: { type: 'number' },
              timestamp: { type: 'string', format: 'date-time' }
            }
          }
        },
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  }

  async scanRoutes(apiDir: string): Promise<void> {
    const scanDirectory = async (dir: string, basePath: string = ''): Promise<void> => {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        
        if (entry.isDirectory()) {
          const newBasePath = path.join(basePath, entry.name)
          await scanDirectory(fullPath, newBasePath)
        } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
          await this.parseRouteFile(fullPath, basePath)
        }
      }
    }

    await scanDirectory(apiDir)
  }

  private async parseRouteFile(filePath: string, routePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Extract HTTP methods (GET, POST, PUT, DELETE, etc.)
      const methodRegex = /export\s+(?:async\s+)?function\s+(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)/g
      let match

      while ((match = methodRegex.exec(content)) !== null) {
        const method = match[1].toLowerCase()
        const apiPath = this.convertToOpenAPIPath(routePath)

        // Extract JSDoc comments for documentation
        const docComment = this.extractDocComment(content, match.index)
        
        const route: RouteInfo = {
          path: apiPath,
          method,
          description: docComment?.description || `${method.toUpperCase()} ${apiPath}`,
          parameters: docComment?.parameters || [],
          responses: docComment?.responses || this.getDefaultResponses(),
          security: docComment?.security || ['BearerAuth']
        }

        this.routes.push(route)
      }
    } catch (error) {
      console.warn(`Failed to parse route file ${filePath}:`, error)
    }
  }

  private convertToOpenAPIPath(routePath: string): string {
    // Convert Next.js dynamic routes to OpenAPI format
    // e.g., [id] -> {id}, [...slug] -> {slug}
    return routePath
      .replace(/\[\.\.\.(\w+)\]/g, '{$1}')
      .replace(/\[(\w+)\]/g, '{$1}')
      .replace(/\\/g, '/')
      .replace(/^/, '/')
  }

  private extractDocComment(content: string, functionIndex: number): any {
    // Look backwards from function declaration to find JSDoc comment
    const beforeFunction = content.substring(0, functionIndex)
    const docMatch = beforeFunction.match(/\/\*\*([\s\S]*?)\*\/\s*$/m)
    
    if (!docMatch) return null

    const docContent = docMatch[1]
    const lines = docContent.split('\n').map(line => line.replace(/^\s*\*\s?/, ''))

    let description = ''
    const parameters: any[] = []
    const responses: Record<string, any> = {}
    const security: string[] = []

    for (const line of lines) {
      if (line.startsWith('@description')) {
        description = line.replace('@description', '').trim()
      } else if (line.startsWith('@param')) {
        // Parse parameter info
        const paramMatch = line.match(/@param\s+{(\w+)}\s+(\w+)\s+(.*)/)
        if (paramMatch) {
          parameters.push({
            name: paramMatch[2],
            in: 'query',
            schema: { type: paramMatch[1] },
            description: paramMatch[3]
          })
        }
      } else if (line.startsWith('@returns')) {
        responses['200'] = {
          description: line.replace('@returns', '').trim(),
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        }
      } else if (line.startsWith('@security')) {
        security.push(line.replace('@security', '').trim())
      } else if (!line.startsWith('@')) {
        description += line + ' '
      }
    }

    return {
      description: description.trim(),
      parameters: parameters.length > 0 ? parameters : undefined,
      responses: Object.keys(responses).length > 0 ? responses : undefined,
      security: security.length > 0 ? security : undefined
    }
  }

  private getDefaultResponses(): Record<string, any> {
    return {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      '400': {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      '401': {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    }
  }

  private buildOpenAPISpec(): void {
    // Group routes by path
    const pathGroups: Record<string, Record<string, any>> = {}

    for (const route of this.routes) {
      if (!pathGroups[route.path]) {
        pathGroups[route.path] = {}
      }

      pathGroups[route.path][route.method] = {
        summary: route.description,
        description: route.description,
        parameters: route.parameters,
        responses: route.responses,
        security: route.security ? [{ [route.security[0]]: [] }] : []
      }
    }

    this.spec.paths = pathGroups
  }

  async generate(outputPath: string): Promise<void> {
    this.buildOpenAPISpec()
    await fs.writeFile(outputPath, JSON.stringify(this.spec, null, 2))
    console.log(`✅ API documentation generated: ${outputPath}`)
  }

  async generateHTML(outputPath: string): Promise<void> {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>MKT4U API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin:0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        spec: ${JSON.stringify(this.spec)},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>
    `

    await fs.writeFile(outputPath, html)
    console.log(`✅ API documentation HTML generated: ${outputPath}`)
  }
}

// CLI usage
async function main() {
  const generator = new APIDocGenerator()
  
  const apiDir = path.join(process.cwd(), 'app', 'api')
  const docsDir = path.join(process.cwd(), 'docs')
  
  // Ensure docs directory exists
  await fs.mkdir(docsDir, { recursive: true })
  
  await generator.scanRoutes(apiDir)
  await generator.generate(path.join(docsDir, 'api-spec.json'))
  await generator.generateHTML(path.join(docsDir, 'api-docs.html'))
  
  console.log('📖 API documentation generation complete!')
  console.log(`Open ${path.join(docsDir, 'api-docs.html')} in your browser to view the documentation.`)
}

if (require.main === module) {
  main().catch(console.error)
}

export { APIDocGenerator }
