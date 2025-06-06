import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AttractionForm } from "./attraction-form"
import { Home, Sparkles } from "lucide-react"

export default function LawOfAttractionPage() {
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
              Law of Attraction Campaign
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Law of Attraction Campaign</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover which clients you're attracting and align with your ideal client profile
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
        </section>

        <Card className="border border-primary/20 bg-gradient-to-br from-background to-secondary/5">
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>How It Works</CardTitle>
            </div>
            <CardDescription>
              Our specialized algorithm analyzes your marketing approach to determine which clients you're currently
              attracting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 border border-primary/20 rounded-lg bg-background hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full mb-4 border border-primary/30">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-primary">Complete the Form</h3>
                <p className="text-sm text-muted-foreground">
                  Provide information about your current marketing materials and approach
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-secondary/20 rounded-lg bg-background hover:shadow-md transition-shadow">
                <div className="bg-secondary/20 p-3 rounded-full mb-4 border border-secondary/30">
                  <span className="text-xl font-bold text-secondary-foreground">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-secondary-foreground">Review Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your inputs to determine which clients you're currently attracting
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-accent/20 rounded-lg bg-background hover:shadow-md transition-shadow">
                <div className="bg-accent/10 p-3 rounded-full mb-4 border border-accent/30">
                  <span className="text-xl font-bold text-accent-foreground">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-accent-foreground">Align Your Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Work with a marketing professional to align your approach with your ideal client profile
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
            <TabsTrigger
              value="form"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Form
            </TabsTrigger>
            <TabsTrigger
              value="results"
              disabled
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Results
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              disabled
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="mt-6">
            <AttractionForm />
          </TabsContent>
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Based on your inputs, here's our analysis of the clients you're currently attracting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Results will appear here after form submission</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Strategies to better align your marketing with your ideal client profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Recommendations will appear here after consultation</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

