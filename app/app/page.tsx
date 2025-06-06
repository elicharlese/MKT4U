import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  BarChart3,
  Target,
  FileText,
  Sparkles,
  Share,
  Download,
  Users,
  Heart,
  TrendingUp,
  TrendingDown,
  UserPlus,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Welcome to Your Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your AI-powered marketing platform for attracting the right clients
          </p>
          <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-primary/20 overflow-hidden group">
            <div className="h-2 bg-primary w-full"></div>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-primary">Law of Attraction</CardTitle>
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>
                Discover which clients you're currently attracting and align with your ideal client profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our specialized algorithm analyzes your marketing materials and provides insights on your current client
                attraction patterns.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/app/law-of-attraction" className="w-full">
                <Button className="w-full group-hover:translate-y-[-2px] transition-transform">
                  Start Campaign <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border border-secondary/30 overflow-hidden group">
            <div className="h-2 bg-secondary w-full"></div>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-secondary-foreground">Content Collection</CardTitle>
                <FileText className="h-5 w-5 text-secondary-foreground" />
              </div>
              <CardDescription>Collect and organize your advertisement platform content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Centralize your marketing materials from various platforms for easy management and analysis.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/app/content-collection" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-secondary/50 text-secondary-foreground hover:bg-secondary/10 group-hover:translate-y-[-2px] transition-transform"
                >
                  Manage Content <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border border-accent/30 overflow-hidden group">
            <div className="h-2 bg-accent w-full"></div>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-accent-foreground">Schedule & Test</CardTitle>
                <Calendar className="h-5 w-5 text-accent-foreground" />
              </div>
              <CardDescription>Plan and test your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Schedule campaigns and run A/B tests to optimize your marketing strategy.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/app/schedule" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-accent/50 text-accent-foreground hover:bg-accent/10 group-hover:translate-y-[-2px] transition-transform"
                >
                  View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border border-accent/30 overflow-hidden group">
            <div className="h-2 bg-accent w-full"></div>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-accent-foreground">Social Accounts</CardTitle>
                <Share className="h-5 w-5 text-accent-foreground" />
              </div>
              <CardDescription>Connect and manage your social media advertisement accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Link your social media platforms to create and manage ad campaigns directly from MKT4U.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/app/social-accounts" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-accent/50 text-accent-foreground hover:bg-accent/10 group-hover:translate-y-[-2px] transition-transform"
                >
                  Manage Accounts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>

        <section className="pt-8">
          <Card className="border border-primary/10 bg-gradient-to-br from-background to-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Marketing Analytics</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[150px] h-8 text-xs">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <CardDescription>Comprehensive overview of your marketing performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="border border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reach</p>
                        <h3 className="text-2xl font-bold">0</h3>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">0%</span>
                      <span className="text-muted-foreground ml-1">vs previous period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement Rate</p>
                        <h3 className="text-2xl font-bold">0%</h3>
                      </div>
                      <div className="bg-secondary/10 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-secondary-foreground" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <TrendingDown className="h-3.5 w-3.5 text-red-500 mr-1" />
                      <span className="text-red-500 font-medium">0%</span>
                      <span className="text-muted-foreground ml-1">vs previous period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <h3 className="text-2xl font-bold">0%</h3>
                      </div>
                      <div className="bg-accent/10 p-2 rounded-full">
                        <Target className="h-5 w-5 text-accent-foreground" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">0%</span>
                      <span className="text-muted-foreground ml-1">vs previous period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Client Acquisition</p>
                        <h3 className="text-2xl font-bold">0</h3>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">0%</span>
                      <span className="text-muted-foreground ml-1">vs previous period</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Campaign Performance</CardTitle>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="All campaigns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All campaigns</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px] flex items-center justify-center border rounded-md bg-background/80">
                        <div className="flex flex-col items-center text-center p-4">
                          <BarChart3 className="h-10 w-10 text-primary/40 mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Campaign performance data will appear here once you start your first campaign
                          </p>
                          <Link href="/app/campaigns" className="mt-4">
                            <Button variant="secondary" size="sm" className="bg-secondary/80 hover:bg-secondary">
                              Create Campaign
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="border border-secondary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Audience Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Ideal Client Match</span>
                            <span className="font-medium">0%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent w-0"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Engagement Quality</span>
                            <span className="font-medium">0%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent w-0"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Content Relevance</span>
                            <span className="font-medium">0%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent w-0"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Client Retention</span>
                            <span className="font-medium">0%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent w-0"></div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link href="/app/law-of-attraction">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-secondary/20 text-secondary-foreground hover:bg-secondary/10"
                            >
                              Run Attraction Analysis
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-accent/20 mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top Performing Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <FileText className="h-10 w-10 text-accent/40 mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Content performance data will appear here once you add content
                        </p>
                        <Link href="/app/content-collection" className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-accent/20 text-accent-foreground hover:bg-accent/10"
                          >
                            Add Content
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

