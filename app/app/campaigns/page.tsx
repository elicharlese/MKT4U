import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Calendar, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Marketing Campaigns</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create, manage, and analyze your marketing campaigns
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mr-2">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
            <Link href="/app/campaigns/flow">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                <Sparkles className="h-4 w-4 mr-2" />
                Campaign Flow Editor
              </Button>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-primary/20 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1 bg-primary w-full"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Spring Email Series</CardTitle>
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <CardDescription>Email marketing campaign for spring collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Scheduled:</span>
                  <span>Mar 15 - Apr 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Performance:</span>
                  <span className="font-medium text-primary">32% open rate</span>
                </div>
                <div className="pt-4">
                  <Link href="/app/campaigns/details">
                    <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-secondary/20 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1 bg-secondary w-full"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Social Media Blitz</CardTitle>
                <div className="bg-secondary/10 text-secondary-foreground p-2 rounded-full">
                  <Target className="h-5 w-5" />
                </div>
              </div>
              <CardDescription>Coordinated posts across all social platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-amber-600">Draft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Scheduled:</span>
                  <span>Not scheduled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platforms:</span>
                  <span>Instagram, Facebook, Twitter</span>
                </div>
                <div className="pt-4">
                  <Link href="/app/campaigns/details">
                    <Button
                      variant="outline"
                      className="w-full border-secondary/20 text-secondary-foreground hover:bg-secondary/10"
                    >
                      Edit Campaign
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-accent/20 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1 bg-accent w-full"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Launch</CardTitle>
                <div className="bg-accent/10 text-accent-foreground p-2 rounded-full">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <CardDescription>Multi-channel campaign for new product line</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-blue-600">Planning</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target Date:</span>
                  <span>June 1, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget:</span>
                  <span>$25,000</span>
                </div>
                <div className="pt-4">
                  <Link href="/app/campaigns/details">
                    <Button
                      variant="outline"
                      className="w-full border-accent/20 text-accent-foreground hover:bg-accent/10"
                    >
                      Continue Planning
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-primary/20 overflow-hidden mt-6">
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary w-full"></div>
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Campaign Performance Overview</CardTitle>
            </div>
            <CardDescription>Summary of all your marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-background/80">
              <div className="flex flex-col items-center text-center p-4">
                <BarChart3 className="h-10 w-10 text-primary/40 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Campaign analytics will appear here once you have active campaigns
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

