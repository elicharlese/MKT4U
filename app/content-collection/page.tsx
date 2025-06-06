import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Plus, Search, Filter, Facebook, Instagram, Twitter, Linkedin, Youtube, Sparkles } from "lucide-react"

export default function ContentCollectionPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-primary hover:text-primary/80">
              <Home className="h-4 w-4 mr-2" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/content-collection" className="text-primary hover:text-primary/80">
              Content Collection
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Content Collection</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collect and organize your advertisement platform content
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        </section>

        <div className="flex items-center space-x-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8 border-primary/20 focus-visible:ring-primary"
            />
          </div>
          <Button variant="outline" size="icon" className="border-primary/20 text-primary hover:bg-primary/10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 p-1 bg-muted/50">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="facebook"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </TabsTrigger>
            <TabsTrigger
              value="instagram"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </TabsTrigger>
            <TabsTrigger
              value="twitter"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </TabsTrigger>
            <TabsTrigger
              value="linkedin"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger
              value="youtube"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card
                  key={item}
                  className="border border-primary/20 overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary w-full"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Facebook className="h-4 w-4 mr-2 text-primary" />
                        <CardTitle className="text-sm">Facebook Post</CardTitle>
                      </div>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Content preview"
                        className="rounded-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm line-clamp-2">
                      Discover how our latest solution can help streamline your workflow and boost productivity...
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>👍 24</span>
                        <span>💬 8</span>
                        <span>🔄 3</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but filtered by platform */}
          <TabsContent value="facebook" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border border-primary/20 rounded-md bg-gradient-to-br from-background to-secondary/5">
              <Sparkles className="h-10 w-10 text-accent mb-4" />
              <p className="text-muted-foreground mb-4">Connect your Facebook account to view content</p>
              <Button className="bg-primary hover:bg-primary/90">Connect Facebook</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

