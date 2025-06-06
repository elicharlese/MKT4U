import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Home, Download, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
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
            <BreadcrumbLink href="/law-of-attraction" className="text-primary hover:text-primary/80">
              Law of Attraction
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/law-of-attraction/results" className="text-primary hover:text-primary/80">
              Results
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight gradient-heading">Analysis Results</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent-foreground hover:bg-accent/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Based on your inputs, here's our analysis of the clients you're currently attracting
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
        </section>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Client Profile
            </TabsTrigger>
            <TabsTrigger
              value="alignment"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Marketing Alignment
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="border border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Current Client Profile</CardTitle>
                </div>
                <CardDescription>
                  Based on your marketing materials and approach, these are the clients you're currently attracting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-4 border border-primary/10 rounded-lg bg-primary/5">
                    <h3 className="text-lg font-medium text-primary">Demographics</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>35-50 year old professionals</li>
                      <li>Urban and suburban locations</li>
                      <li>Middle to upper-middle income</li>
                      <li>College educated</li>
                    </ul>
                  </div>

                  <div className="space-y-4 p-4 border border-secondary/10 rounded-lg bg-secondary/5">
                    <h3 className="text-lg font-medium text-secondary-foreground">Psychographics</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Value-conscious but willing to pay for quality</li>
                      <li>Research-oriented decision makers</li>
                      <li>Pragmatic approach to solutions</li>
                      <li>Moderate risk tolerance</li>
                    </ul>
                  </div>

                  <div className="space-y-4 p-4 border border-accent/10 rounded-lg bg-accent/5">
                    <h3 className="text-lg font-medium text-accent-foreground">Behaviors</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Comparison shoppers</li>
                      <li>Rely on peer recommendations</li>
                      <li>Engage with content before purchasing</li>
                      <li>Prefer self-service information gathering</li>
                    </ul>
                  </div>

                  <div className="space-y-4 p-4 border border-primary/10 rounded-lg bg-primary/5">
                    <h3 className="text-lg font-medium text-primary">Needs</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Clear ROI demonstration</li>
                      <li>Efficient solutions to specific problems</li>
                      <li>Professional but accessible communication</li>
                      <li>Reliability and consistency</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 p-6 rounded-lg mt-6 border border-accent/20">
                  <h3 className="text-lg font-medium mb-2 text-accent-foreground">Is this your ideal client?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a consultation with our marketing professionals to discuss whether these clients align with
                    your business goals and how to adjust your strategy if needed.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alignment" className="mt-6">
            <Card className="border border-secondary/20 overflow-hidden">
              <div className="h-1 bg-secondary w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Marketing Alignment Analysis</CardTitle>
                </div>
                <CardDescription>
                  How well your current marketing approach aligns with your target audience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary">Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Professional tone matches current client expectations</li>
                        <li>Content strategy effectively educates target audience</li>
                        <li>Channel selection appropriate for target demographics</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border border-secondary/20 bg-secondary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-secondary-foreground">Gaps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Emotional connection with audience could be strengthened</li>
                        <li>Value proposition not clearly differentiated from competitors</li>
                        <li>Limited engagement with clients post-purchase</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border border-accent/20 bg-accent/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-accent-foreground">Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Develop more personalized content for specific segments</li>
                        <li>Incorporate more social proof and case studies</li>
                        <li>Expand into video content to demonstrate solutions in action</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-6 border border-secondary/20 rounded-lg bg-secondary/5">
                  <h3 className="text-lg font-medium mb-4 text-secondary-foreground">Alignment Score</h3>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary via-accent to-secondary h-4 rounded-full w-[65%]"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Needs Improvement</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card className="border border-accent/20 overflow-hidden">
              <div className="h-1 bg-accent w-full"></div>
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Strategic Recommendations</CardTitle>
                </div>
                <CardDescription>
                  Actionable steps to better align your marketing with your ideal client profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <h3 className="text-lg font-medium mb-3 text-primary">Short-Term Actions</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Refine messaging to emphasize unique value proposition</li>
                      <li>Incorporate more client testimonials and case studies</li>
                      <li>Develop targeted content for specific industry pain points</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-secondary/20 rounded-lg bg-secondary/5">
                    <h3 className="text-lg font-medium mb-3 text-secondary-foreground">Long-Term Strategy</h3>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Develop comprehensive client journey mapping</li>
                      <li>Create segmented marketing campaigns for different client profiles</li>
                      <li>Implement advanced analytics to track engagement and conversion</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-accent/20 rounded-lg bg-accent/5">
                    <h3 className="text-lg font-medium mb-3 text-accent-foreground">
                      Channel-Specific Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-primary">Social Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Focus on LinkedIn for B2B connections and thought leadership</p>
                        </CardContent>
                      </Card>

                      <Card className="border border-secondary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-secondary-foreground">Email Marketing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Implement segmentation and personalization based on client behavior</p>
                        </CardContent>
                      </Card>

                      <Card className="border border-accent/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-accent-foreground">Content Marketing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Create more in-depth guides addressing specific client challenges</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" className="border-accent/30 text-accent-foreground hover:bg-accent/10">
                    Download Full Report
                  </Button>
                  <Link href="/schedule">
                    <Button className="bg-primary hover:bg-primary/90">Schedule Implementation Call</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

