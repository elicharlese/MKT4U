import { performance } from 'perf_hooks'

/**
 * Performance testing utilities for backend functions
 */

export class PerformanceTimer {
  private startTime: number = 0
  private endTime: number = 0

  start(): void {
    this.startTime = performance.now()
  }

  stop(): number {
    this.endTime = performance.now()
    return this.endTime - this.startTime
  }

  getElapsedTime(): number {
    return this.endTime - this.startTime
  }
}

export async function measureAsyncFunction<T>(
  fn: () => Promise<T>,
  iterations: number = 1
): Promise<{ result: T; averageTime: number; times: number[] }> {
  const times: number[] = []
  let result: T

  for (let i = 0; i < iterations; i++) {
    const timer = new PerformanceTimer()
    timer.start()
    
    if (i === 0) {
      result = await fn()
    } else {
      await fn()
    }
    
    times.push(timer.stop())
  }

  const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length

  return {
    result: result!,
    averageTime,
    times,
  }
}

export function measureSyncFunction<T>(
  fn: () => T,
  iterations: number = 1
): { result: T; averageTime: number; times: number[] } {
  const times: number[] = []
  let result: T

  for (let i = 0; i < iterations; i++) {
    const timer = new PerformanceTimer()
    timer.start()
    
    if (i === 0) {
      result = fn()
    } else {
      fn()
    }
    
    times.push(timer.stop())
  }

  const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length

  return {
    result: result!,
    averageTime,
    times,
  }
}

export async function loadTest(
  fn: () => Promise<any>,
  options: {
    concurrency: number
    iterations: number
    timeout?: number
  }
): Promise<{
  successCount: number
  errorCount: number
  averageTime: number
  errors: Error[]
}> {
  const { concurrency, iterations, timeout = 30000 } = options
  const results: Array<{ success: boolean; time: number; error?: Error }> = []

  const batches = Math.ceil(iterations / concurrency)
  
  for (let batch = 0; batch < batches; batch++) {
    const batchPromises: Promise<{ success: boolean; time: number; error?: Error }>[] = []
    const batchSize = Math.min(concurrency, iterations - batch * concurrency)

    for (let i = 0; i < batchSize; i++) {
      const promise = (async () => {
        const timer = new PerformanceTimer()
        timer.start()
        
        try {
          await Promise.race([
            fn(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ])
          
          return { success: true, time: timer.stop() }
        } catch (error) {
          return { 
            success: false, 
            time: timer.stop(), 
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      })()

      batchPromises.push(promise)
    }

    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)
  }

  const successCount = results.filter(r => r.success).length
  const errorCount = results.filter(r => !r.success).length
  const averageTime = results.reduce((sum, r) => sum + r.time, 0) / results.length
  const errors = results.filter(r => r.error).map(r => r.error!)

  return {
    successCount,
    errorCount,
    averageTime,
    errors,
  }
}

export class MemoryProfiler {
  private initialMemory: NodeJS.MemoryUsage
  private measurements: Array<{ timestamp: number; memory: NodeJS.MemoryUsage }> = []

  constructor() {
    this.initialMemory = process.memoryUsage()
  }

  measure(): void {
    this.measurements.push({
      timestamp: Date.now(),
      memory: process.memoryUsage(),
    })
  }

  getReport(): {
    initialMemory: NodeJS.MemoryUsage
    finalMemory: NodeJS.MemoryUsage
    peakMemory: NodeJS.MemoryUsage
    memoryLeak: boolean
  } {
    const finalMemory = process.memoryUsage()
    
    let peakMemory = this.initialMemory
    for (const measurement of this.measurements) {
      if (measurement.memory.heapUsed > peakMemory.heapUsed) {
        peakMemory = measurement.memory
      }
    }

    // Simple memory leak detection - if final memory is significantly higher than initial
    const memoryLeak = (finalMemory.heapUsed - this.initialMemory.heapUsed) > (10 * 1024 * 1024) // 10MB threshold

    return {
      initialMemory: this.initialMemory,
      finalMemory,
      peakMemory,
      memoryLeak,
    }
  }
}

// Test utilities for common performance scenarios
export const PerformanceTestHelpers = {
  async testDatabaseQuery(queryFn: () => Promise<any>, iterations: number = 100) {
    return await measureAsyncFunction(queryFn, iterations)
  },

  async testApiEndpoint(
    endpoint: string,
    options: RequestInit = {},
    iterations: number = 50
  ) {
    const testFn = async () => {
      const response = await fetch(endpoint, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return response.json()
    }

    return await measureAsyncFunction(testFn, iterations)
  },

  testValidation(validateFn: () => any, iterations: number = 1000) {
    return measureSyncFunction(validateFn, iterations)
  },

  async stressTestEndpoint(
    endpoint: string,
    options: RequestInit = {},
    concurrency: number = 10,
    iterations: number = 100
  ) {
    const testFn = async () => {
      const response = await fetch(endpoint, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return response.json()
    }

    return await loadTest(testFn, { concurrency, iterations })
  },
}
