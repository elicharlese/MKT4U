import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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

          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
              Privacy Policy
            </h1>

            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm p-8 mb-8">
              <div className="prose prose-pink max-w-none">
                <p className="text-gray-600">Last Updated: March 15, 2025</p>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  MKT4U ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when you visit our website or use our
                  platform.
                </p>
                <p className="text-gray-600">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                  please do not access the site or use our services.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-600">
                  We may collect personal information that you voluntarily provide to us when you register for an
                  account, express interest in obtaining information about us or our products and services, or otherwise
                  contact us. The personal information we collect may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Billing information</li>
                  <li>Business information</li>
                  <li>Marketing preferences</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">2.2 Usage Data</h3>
                <p className="text-gray-600">
                  We automatically collect certain information when you visit, use, or navigate our platform. This
                  information does not reveal your specific identity but may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>Device and browser information</li>
                  <li>IP address</li>
                  <li>Usage patterns and preferences</li>
                  <li>Referring website</li>
                  <li>Pages visited</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600">
                  We use the information we collect for various business purposes, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>Providing, operating, and maintaining our platform</li>
                  <li>Improving, personalizing, and expanding our platform</li>
                  <li>Understanding and analyzing how you use our platform</li>
                  <li>Developing new products, services, features, and functionality</li>
                  <li>Communicating with you about our services</li>
                  <li>Processing your transactions</li>
                  <li>Preventing fraudulent activities</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Disclosure of Your Information</h2>
                <p className="text-gray-600">We may share your information in the following situations:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>
                    <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                    service providers, contractors, or agents who perform services for us.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> We may share or transfer your information in connection with,
                    or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                    portion of our business.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose
                    with your consent.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your information where we are legally required
                    to do so.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Your Privacy Rights</h2>
                <p className="text-gray-600">
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>The right to access your personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to correct inaccurate personal information</li>
                  <li>The right to opt-out of certain data processing activities</li>
                </ul>
                <p className="text-gray-600">To exercise these rights, please contact us at privacy@mkt4u.com.</p>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Data Security</h2>
                <p className="text-gray-600">
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, please also remember that we cannot
                  guarantee that the internet itself is 100% secure.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an
                  updated "Last Updated" date. We encourage you to review this Privacy Policy frequently to be informed
                  of how we are protecting your information.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-600 mt-2">
                  MKT4U
                  <br />
                  123 Marketing Street
                  <br />
                  San Francisco, CA 94103
                  <br />
                  privacy@mkt4u.com
                  <br />
                  +1 (555) 123-4567
                </p>
              </div>
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

