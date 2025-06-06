import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-pink-100/50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              MKT4U
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Testimonials
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors">
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
        <div className="container px-4 md:px-6 py-12 md:py-20">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-pink-500 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
              About MKT4U
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're on a mission to help businesses attract their ideal clients through elegant, AI-powered marketing
              solutions
            </p>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                MKT4U was founded in 2023 by a team of marketing professionals who saw a gap in the market for
                intuitive, AI-powered marketing tools that could help businesses identify and attract their ideal
                clients.
              </p>
              <p className="text-gray-600 mb-4">
                We noticed that many businesses were struggling to understand why their marketing efforts weren't
                yielding the results they wanted. The problem wasn't necessarily their products or services, but rather
                that they were attracting the wrong clients.
              </p>
              <p className="text-gray-600">
                That's when we developed our Law of Attraction tool, which uses AI to analyze marketing materials and
                determine which clients a business is currently attracting. From there, we expanded our platform to
                include content management, campaign scheduling, and analytics tools, all designed with a focus on
                elegance and ease of use.
              </p>
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-pink-100 bg-white/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-amber-100/10 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Empathy</h3>
                <p className="text-gray-600">
                  We put ourselves in our clients' shoes to understand their unique challenges and goals.
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from our product design to our customer service.
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We embrace new technologies and ideas to continuously improve our platform and services.
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600">
                  We believe in building a supportive community of businesses helping each other succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-amber-100/10 relative">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Johnson</h3>
                  <p className="text-pink-600 mb-3">CEO & Co-Founder</p>
                  <p className="text-gray-600 mb-4">
                    With over 15 years of experience in digital marketing, Sarah leads our vision and strategy.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-amber-100/10 relative">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">David Chen</h3>
                  <p className="text-purple-600 mb-3">CTO & Co-Founder</p>
                  <p className="text-gray-600 mb-4">
                    David brings his expertise in AI and machine learning to develop our innovative platform.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-amber-100/30 via-pink-100/20 to-purple-100/10 relative">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Emily Rodriguez</h3>
                  <p className="text-amber-600 mb-3">Head of Customer Success</p>
                  <p className="text-gray-600 mb-4">
                    Emily ensures our clients have everything they need to succeed with MKT4U.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Us on Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Ready to transform your marketing strategy and attract your ideal clients? Sign up for MKT4U today and
              start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none rounded-full px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-full px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
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
                  <Link href="/#features" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-pink-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 MKT4U. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

