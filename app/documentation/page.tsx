import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, FileText, Book, Code, Lightbulb, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DocumentationPage() {
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

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Everything you need to know about using MKT4U to attract your ideal clients
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pl-10 border-pink-100 focus-visible:ring-pink-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Getting Started */}
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Book className="h-6 w-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Getting Started</h2>
              <p className="text-gray-600 mb-4">
                Learn the basics of MKT4U and how to set up your account for success.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Creating Your Account
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Dashboard Overview
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Setting Up Your Profile
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                View All
              </Button>
            </div>

            {/* Law of Attraction */}
            <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Law of Attraction</h2>
              <p className="text-gray-600 mb-4">
                Discover how to use our Law of Attraction tool to identify your ideal clients.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600 hover:text-purple-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Creating Your First Campaign
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-purple-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Understanding Your Results
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-purple-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Implementing Recommendations
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                View All
              </Button>
            </div>

            {/* API Reference */}
            <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">API Reference</h2>
              <p className="text-gray-600 mb-4">Technical documentation for developers integrating with MKT4U.</p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600 hover:text-amber-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Authentication
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-amber-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Endpoints
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-amber-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Webhooks
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-50">
                View All
              </Button>
            </div>

            {/* Content Collection */}
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Content Collection</h2>
              <p className="text-gray-600 mb-4">Learn how to organize and manage your marketing content effectively.</p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Uploading Content
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Organizing Collections
                  </Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Link href="#" className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Content Analytics
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                View All
              </Button>
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

