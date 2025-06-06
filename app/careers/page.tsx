import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"

export default function CareersPage() {
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
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us revolutionize marketing with AI and empower businesses to attract their ideal clients
            </p>
          </div>

          {/* Why Join Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-pink-100 bg-white/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-amber-100/10 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Join MKT4U?</h2>
              <p className="text-gray-600 mb-6">
                At MKT4U, we're building the future of marketing with AI. We're a team of passionate individuals who
                believe in the power of technology to transform how businesses connect with their ideal clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-full mr-3">
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Innovative Work</h3>
                    <p className="text-gray-600">
                      Work on cutting-edge AI marketing solutions that make a real difference
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Growth Opportunities</h3>
                    <p className="text-gray-600">
                      Develop your skills and advance your career in a supportive environment
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Inclusive Culture</h3>
                    <p className="text-gray-600">Join a diverse team that values different perspectives and ideas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-full mr-3">
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Competitive Benefits</h3>
                    <p className="text-gray-600">Enjoy comprehensive health coverage, flexible work, and more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Senior Frontend Developer</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    Remote (US)
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Full-time
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  We're looking for an experienced frontend developer to help build beautiful, intuitive interfaces for
                  our AI marketing platform.
                </p>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none">
                  Apply Now
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">AI/ML Engineer</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Full-time
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Join our AI team to develop and improve our machine learning models for marketing analysis and
                  recommendations.
                </p>
                <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                  Apply Now
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Marketing Specialist</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    New York, NY
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Full-time
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Help us spread the word about MKT4U and develop marketing strategies that showcase our platform's
                  capabilities.
                </p>
                <Button variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-50">
                  Apply Now
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Customer Success Manager</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    Remote (Global)
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Full-time
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Ensure our clients get the most out of MKT4U by providing exceptional support and strategic guidance.
                </p>
                <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-pink-600">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Application</h3>
                <p className="text-gray-600 text-sm">
                  Submit your resume and answer a few questions about your experience and interests.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Initial Interview</h3>
                <p className="text-gray-600 text-sm">
                  Chat with our recruiting team to discuss your background and learn more about MKT4U.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Technical Assessment</h3>
                <p className="text-gray-600 text-sm">
                  Complete a skills assessment relevant to the role you're applying for.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-pink-600">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Final Interviews</h3>
                <p className="text-gray-600 text-sm">Meet with team members and leadership to ensure a mutual fit.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Don't See the Right Fit?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
              mind for future opportunities.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none rounded-full px-8">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

