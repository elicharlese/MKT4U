import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Plus, CalendarIcon, Clock, Users, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SchedulePage() {
  // Mock data for calendar
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentDay = 15

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
            <BreadcrumbLink href="/schedule" className="text-primary hover:text-primary/80">
              Schedule & Test
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Schedule & Test</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Plan and test your marketing campaigns</p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </section>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="ab-tests"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              A/B Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-6">
            <Card className="border border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary w-full"></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-accent mr-2" />
                    <div>
                      <CardTitle>Marketing Calendar</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Select defaultValue="march">
                      <SelectTrigger className="w-[180px] border-primary/20 focus-visible:ring-primary">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January 2025</SelectItem>
                        <SelectItem value="february">February 2025</SelectItem>
                        <SelectItem value="march">March 2025</SelectItem>
                        <SelectItem value="april">April 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/10">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the 1st */}
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square p-1">
                      <div className="h-full rounded-md"></div>
                    </div>
                  ))}

                  {/* Calendar days */}
                  {days.map((day) => (
                    <div key={day} className="aspect-square p-1">
                      <div
                        className={`h-full rounded-md border p-1 ${
                          day === currentDay ? "bg-primary/10 border-primary" : "border-muted hover:border-primary/20"
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="text-sm">{day}</span>
                          {day === 10 && <span className="text-xs text-primary">2</span>}
                          {day === 15 && <span className="text-xs text-secondary-foreground">1</span>}
                          {day === 22 && <span className="text-xs text-accent-foreground">3</span>}
                        </div>

                        {day === 10 && (
                          <div className="mt-1">
                            <div className="bg-primary/10 text-primary text-xs p-1 rounded truncate">
                              Email Campaign
                            </div>
                          </div>
                        )}

                        {day === 15 && (
                          <div className="mt-1">
                            <div className="bg-secondary/20 text-secondary-foreground text-xs p-1 rounded truncate">
                              Social Posts
                            </div>
                          </div>
                        )}

                        {day === 22 && (
                          <div className="mt-1">
                            <div className="bg-accent/10 text-accent-foreground text-xs p-1 rounded truncate">
                              Webinar
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary/20 rounded mr-2"></div>
                    <span className="text-sm">Email</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary/20 rounded mr-2"></div>
                    <span className="text-sm">Social</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-accent/10 rounded mr-2"></div>
                    <span className="text-sm">Events</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-primary w-full"></div>
                <CardHeader>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>Upcoming</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 text-primary p-2 rounded">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Email Newsletter</h4>
                        <p className="text-xs text-muted-foreground">March 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-secondary/20 text-secondary-foreground p-2 rounded">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Social Media Campaign</h4>
                        <p className="text-xs text-muted-foreground">March 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 text-accent-foreground p-2 rounded">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Product Webinar</h4>
                        <p className="text-xs text-muted-foreground">March 22, 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-secondary/20 overflow-hidden">
                <div className="h-1 bg-secondary w-full"></div>
                <CardHeader>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-secondary-foreground" />
                    <CardTitle>Recent Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-secondary/10 p-2 rounded">
                        <Clock className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Campaign Created</h4>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-secondary/10 p-2 rounded">
                        <Clock className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">A/B Test Completed</h4>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-secondary/10 p-2 rounded">
                        <Clock className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Content Uploaded</h4>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-accent/20 overflow-hidden">
                <div className="h-1 bg-accent w-full"></div>
                <CardHeader>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-accent-foreground" />
                    <CardTitle>Team Schedule</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 text-accent-foreground p-2 rounded">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Campaign Review</h4>
                        <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 text-accent-foreground p-2 rounded">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Content Planning</h4>
                        <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 text-accent-foreground p-2 rounded">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Strategy Meeting</h4>
                        <p className="text-xs text-muted-foreground">Friday, 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border border-secondary/20 rounded-md bg-gradient-to-br from-background to-secondary/5">
              <Sparkles className="h-10 w-10 text-accent mb-4" />
              <p className="text-muted-foreground mb-4">No active campaigns. Click "New Campaign" to get started.</p>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ab-tests" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border border-accent/20 rounded-md bg-gradient-to-br from-background to-accent/5">
              <Sparkles className="h-10 w-10 text-accent mb-4" />
              <p className="text-muted-foreground mb-4">
                No A/B tests configured. Create a campaign first to set up testing.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

