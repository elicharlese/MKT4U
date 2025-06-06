import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  Target,
  FileText,
  Calendar,
  BarChart3,
  Sparkles,
  Users,
  Heart,
  Star,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-pink-100/30 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-100/20 blur-[100px]"></div>
        <div className="absolute top-[40%] right-[30%] w-[25vw] h-[25vw] rounded-full bg-amber-100/15 blur-[80px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-pink-100/50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              MKT4U
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-pink-600 hover:bg-pink-50">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-2">
                  Marketing Made Beautiful
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  Attract Your Ideal Clients with Elegance
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-[600px] leading-relaxed">
                  MKT4U helps you identify which clients you're attracting, optimize your marketing strategy, and grow
                  your business with the power of AI and intuitive design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none rounded-full px-8"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/app">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-pink-200 text-pink-700 hover:bg-pink-50 rounded-full px-8"
                    >
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-pink-100 bg-white/50 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-amber-100/10 opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 text-center px-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                        AI-Powered Marketing
                      </h3>
                      <p className="text-gray-600 max-w-[300px] mx-auto leading-relaxed">
                        Visualize your marketing strategy and optimize for your ideal clients with our beautiful,
                        intuitive platform
                      </p>
                      <div className="pt-4 flex justify-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-pink-300"></span>
                        <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-200"></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-pink-100 border border-pink-200"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-purple-100 border border-purple-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/70">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-pink-200 mr-4"></div>
                <span className="text-pink-600 font-medium">Our Features</span>
                <div className="h-px w-12 bg-pink-200 ml-4"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Beautiful Tools for Your Marketing Success
              </h2>
              <p className="text-gray-600 md:text-lg max-w-[700px] mx-auto">
                Everything you need to understand, optimize, and execute your marketing strategy with elegance
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                  <Target className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Law of Attraction</h3>
                <p className="text-gray-600">
                  Discover which clients you're currently attracting and align with your ideal client profile.
                </p>
              </div>
              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Content Collection</h3>
                <p className="text-gray-600">
                  Centralize and organize your marketing materials from various platforms for easy management.
                </p>
              </div>
              <div className="bg-white border border-amber-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Schedule & Test</h3>
                <p className="text-gray-600">
                  Plan campaigns and run A/B tests to optimize your marketing strategy and timing.
                </p>
              </div>
              <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Campaign Analytics</h3>
                <p className="text-gray-600">
                  Track performance metrics and gain insights to improve your marketing campaigns.
                </p>
              </div>
              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">AI Recommendations</h3>
                <p className="text-gray-600">
                  Get personalized recommendations to improve your marketing strategy based on AI analysis.
                </p>
              </div>
              <div className="bg-white border border-amber-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Audience Segmentation</h3>
                <p className="text-gray-600">
                  Segment your audience for targeted marketing campaigns that resonate with specific groups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-pink-200 mr-4"></div>
                <span className="text-pink-600 font-medium">Our Process</span>
                <div className="h-px w-12 bg-pink-200 ml-4"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                How MKT4U Works
              </h2>
              <p className="text-gray-600 md:text-lg max-w-[700px] mx-auto">
                A simple, elegant process to transform your marketing strategy
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3 relative">
              {/* Connection lines */}
              <div className="absolute top-24 left-1/2 w-2/3 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 hidden md:block"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 flex items-center justify-center mb-6 shadow-md">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Analyze Your Current Strategy</h3>
                <p className="text-gray-600 max-w-[300px]">
                  Upload your marketing materials and complete a brief questionnaire about your current approach.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center mb-6 shadow-md">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Review AI-Generated Insights</h3>
                <p className="text-gray-600 max-w-[300px]">
                  Our AI analyzes your inputs to determine which clients you're currently attracting and provides
                  recommendations.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 flex items-center justify-center mb-6 shadow-md">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Implement & Optimize</h3>
                <p className="text-gray-600 max-w-[300px]">
                  Use our tools to implement the recommendations, schedule campaigns, and continuously optimize your
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white/70">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-pink-200 mr-4"></div>
                <span className="text-pink-600 font-medium">Testimonials</span>
                <div className="h-px w-12 bg-pink-200 ml-4"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 md:text-lg max-w-[700px] mx-auto">
                Hear from businesses that have transformed their marketing with MKT4U
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-sm relative">
                <div className="absolute -top-4 -right-4">
                  <Heart className="h-8 w-8 text-pink-200 fill-pink-100" />
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-200 to-pink-100 flex items-center justify-center mr-4 text-pink-600 font-bold text-lg">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Jane Doe</h4>
                    <p className="text-sm text-gray-500">Marketing Director, TechCorp</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "MKT4U helped us identify that we were attracting the wrong audience with our messaging. After
                  implementing their recommendations, our conversion rate increased by 45%."
                </p>
              </div>

              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm relative">
                <div className="absolute -top-4 -right-4">
                  <Heart className="h-8 w-8 text-purple-200 fill-purple-100" />
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-200 to-purple-100 flex items-center justify-center mr-4 text-purple-600 font-bold text-lg">
                    MS
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Michael Smith</h4>
                    <p className="text-sm text-gray-500">CEO, GrowthBiz</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "The campaign scheduling and A/B testing features saved us countless hours and helped us optimize our
                  marketing spend. We're now attracting higher-quality leads."
                </p>
              </div>

              <div className="bg-white border border-amber-100 rounded-3xl p-8 shadow-sm relative">
                <div className="absolute -top-4 -right-4">
                  <Heart className="h-8 w-8 text-amber-200 fill-amber-100" />
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 flex items-center justify-center mr-4 text-amber-600 font-bold text-lg">
                    AL
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Amanda Lee</h4>
                    <p className="text-sm text-gray-500">Founder, StyleBoutique</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "As a small business owner, I was struggling to understand why my marketing wasn't working. MKT4U gave
                  me clear insights and actionable steps that transformed my business."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-pink-200 mr-4"></div>
                <span className="text-pink-600 font-medium">Pricing</span>
                <div className="h-px w-12 bg-pink-200 ml-4"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-600 md:text-lg max-w-[700px] mx-auto">
                Choose the plan that's right for your business
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Starter</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">
                    $49<span className="text-gray-500 text-sm font-normal">/month</span>
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Law of Attraction Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Basic Content Collection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Campaign Scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">1 User</span>
                  </li>
                </ul>
                <Link href="/signup?plan=starter">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-pink-200 text-pink-600 hover:bg-pink-50"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-white border-2 border-pink-400 rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow relative -mt-4 md:-mt-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Professional</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">
                    $99<span className="text-gray-500 text-sm font-normal">/month</span>
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Advanced Law of Attraction Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Full Content Collection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">Campaign Scheduling & A/B Testing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">AI-Powered Recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-gray-600">5 Users</span>
                  </li>
                </ul>
                <Link href="/signup?plan=professional">
                  <Button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Enterprise</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">
                    $249<span className="text-gray-500 text-sm font-normal">/month</span>
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-600">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-600">Custom Integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-600">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-600">Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-600">Unlimited Users</span>
                  </li>
                </ul>
                <Link href="/signup?plan=enterprise">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-[800px] mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Ready to Transform Your Marketing Strategy?
              </h2>
              <p className="text-gray-600 md:text-lg">
                Join thousands of businesses that are attracting their ideal clients with MKT4U
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none rounded-full px-8"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/app">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-pink-200 text-pink-700 hover:bg-pink-50 rounded-full px-8"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  MKT4U
                </span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                Your AI-powered marketing platform for attracting the right clients with elegance and precision
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-pink-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 MKT4U. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

