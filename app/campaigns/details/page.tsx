import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Calendar, BarChart3, Users, Edit, Download, Sparkles, Plus } from "lucide-react"
import Link from "next/link"

export default function CampaignDetailsPage() {
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
            <BreadcrumbLink href="/campaigns" className="text-primary hover:text-primary/80">
              Campaigns
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/campaigns/details" className="text-primary hover:text-primary/80">
              Spring Email Series
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight gradient-heading">Spring Email Series</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent-foreground hover:bg-accent/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/campaigns/flow">
                <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/10">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Flow Editor
                </Button>
              </Link>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Edit className="h-4 w-4 mr-2" />
                Edit Campaign
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">Email marketing campaign for spring collection</p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-primary/20 overflow-hidden">
            <div className="h-1 bg-primary w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <CardTitle className="text-base">Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span>Mar 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">End Date:</span>
                  <span>Apr 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-secondary/20 overflow-hidden">
            <div className="h-1 bg-secondary w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-secondary-foreground mr-2" />
                <CardTitle className="text-base">Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Open Rate:</span>
                  <span className="font-medium text-primary">32%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Click Rate:</span>
                  <span className="font-medium text-primary">12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conversions:</span>
                  <span className="font-medium text-primary">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-accent/20 overflow-hidden">
            <div className="h-1 bg-accent w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-accent-foreground mr-2" />
                <CardTitle className="text-base">Audience</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Recipients:</span>
                  <span>5,280</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Segments:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Engagement:</span>
                  <span className="font-medium text-green-600">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary w-full"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <CardTitle className="text-base">Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Emails Sent:</span>
                  <span>3 of 5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Send:</span>
                  <span>Mar 29, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 p-1 bg-muted/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="border border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Campaign Overview</CardTitle>
                </div>
                <CardDescription>Summary of your Spring Email Series campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-primary">Campaign Description</h3>
                  <p className="text-muted-foreground">
                    This email series promotes our spring collection to existing customers and leads. The campaign
                    consists of 5 emails sent over a 30-day period, highlighting different aspects of the collection
                    with special promotions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary-foreground">Campaign Goals</h3>
                  <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                    <li>Increase sales of spring collection items by 25%</li>
                    <li>Drive traffic to the new spring collection landing page</li>
                    <li>Re-engage customers who haven't purchased in the last 6 months</li>
                    <li>Collect feedback on the new collection designs</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-accent-foreground">Email Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 border border-primary/10 rounded-lg bg-primary/5">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email 1: Collection Announcement</h4>
                        <p className="text-xs text-muted-foreground">Sent: March 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border border-primary/10 rounded-lg bg-primary/5">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email 2: Featured Products</h4>
                        <p className="text-xs text-muted-foreground">Sent: March 22, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border border-primary/10 rounded-lg bg-primary/5">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email 3: Customer Testimonials</h4>
                        <p className="text-xs text-muted-foreground">Scheduled: March 29, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card className="border border-secondary/20 overflow-hidden">
              <div className="h-1 bg-secondary w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Campaign Content</CardTitle>
                </div>
                <CardDescription>Email content and assets for your campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-secondary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-secondary-foreground">
                          Email 1: Collection Announcement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                          <img src="/placeholder.svg?height=200&width=400" alt="Email preview" className="rounded-md" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Subject: Spring Has Sprung! Introducing Our New Collection
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-secondary-foreground hover:text-secondary-foreground/80 hover:bg-secondary/10"
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-secondary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-secondary-foreground">
                          Email 2: Featured Products
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center overflow-hidden">
                          <img src="/placeholder.svg?height=200&width=400" alt="Email preview" className="rounded-md" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            Subject: Our Top 5 Spring Picks You'll Love
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-secondary-foreground hover:text-secondary-foreground/80 hover:bg-secondary/10"
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="border border-accent/20 overflow-hidden">
              <div className="h-1 bg-accent w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Campaign Analytics</CardTitle>
                </div>
                <CardDescription>Performance metrics and insights for your campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md bg-background/80">
                  <div className="flex flex-col items-center text-center p-4">
                    <BarChart3 className="h-10 w-10 text-accent/40 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Detailed analytics will appear here as your campaign progresses
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-accent/30 text-accent-foreground hover:bg-accent/10"
                    >
                      View Sample Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="border border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Campaign Settings</CardTitle>
                </div>
                <CardDescription>Configure your campaign settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-primary">General Settings</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Campaign Name</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Timeline</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sender Information</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-primary">Advanced Settings</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Tracking & Analytics</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">A/B Testing</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Configure
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Automation Rules</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      Delete Campaign
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

