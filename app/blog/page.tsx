import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react"

export default function BlogPage() {
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

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
              MKT4U Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and strategies to help you attract your ideal clients and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-amber-100/10 relative">
                <img
                  src="/placeholder.svg?height=300&width=600"
                  alt="Blog post thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    March 15, 2025
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    Jane Smith
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">5 Ways to Identify Your Ideal Client Profile</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Understanding who your ideal client is forms the foundation of effective marketing. In this post, we
                  explore five strategies to help you identify and attract your perfect clients.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      <Tag className="h-3 w-3 mr-1" />
                      Marketing
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 p-0">
                    Read More <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-amber-100/10 relative">
                <img
                  src="/placeholder.svg?height=300&width=600"
                  alt="Blog post thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    March 10, 2025
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    Michael Johnson
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">The Power of AI in Modern Marketing Strategies</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Artificial Intelligence is revolutionizing how businesses approach marketing. Discover how AI can help
                  you create more personalized and effective marketing campaigns.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Tag className="h-3 w-3 mr-1" />
                      Technology
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-amber-100/30 via-pink-100/20 to-purple-100/10 relative">
                <img
                  src="/placeholder.svg?height=300&width=600"
                  alt="Blog post thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    March 5, 2025
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    Sarah Williams
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Creating Content That Resonates With Your Audience
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Content is king, but only if it connects with your audience. Learn how to create content that speaks
                  directly to your ideal clients and drives engagement.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Tag className="h-3 w-3 mr-1" />
                      Content
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none rounded-full px-8">
              Load More Articles
            </Button>
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

