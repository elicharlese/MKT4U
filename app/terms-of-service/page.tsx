import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm p-8 mb-8">
              <div className="prose prose-pink max-w-none">
                <p className="text-gray-600">Last Updated: March 15, 2025</p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600">
                  These Terms of Service constitute a legally binding agreement made between you and MKT4U ("we," "us," or "our"), concerning your access to and use of the MKT4U website and platform.
                </p>
                <p className="text-gray-600">
                  You agree that by accessing the Site or Platform, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site or Platform and you must discontinue use immediately.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Intellectual Property Rights</h2>
                <p className="text-gray-600">
                  Unless otherwise indicated, the Site and Platform are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site or Platform (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                </p>
                <p className="text-gray-600">
                  The Content and Marks are provided on the Site and Platform "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site or Platform and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. User Representations</h2>
                <p className="text-gray-600">
                  By using the Site or Platform, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>All registration information you submit will be true, accurate, current, and complete.</li>
                  <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                  <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                  <li>You are not a minor in the jurisdiction in which you reside.</li>
                  <li>You will not access the Site or Platform through automated or non-human means, whether through a bot, script, or otherwise.</li>
                  <li>You will not use the Site or Platform for any illegal or unauthorized purpose.</li>
                  <li>Your use of the Site or Platform will not violate any applicable law or regulation.</li>
                </ul>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. User Registration</h2>
                <p className="text-gray-600">
                  You may be required to register with the Site or Platform. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Fees and Payment</h2>
                <p className="text-gray-600">
                  We accept the following forms of payment:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>Credit Card</li>
                  <li>PayPal</li>
                </ul>
                <p className="text-gray-600">
                  You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site or Platform. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                </p>
                <p className="text-gray-600">
                  We bill you through an online billing account for purchases made via the Site or Platform. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.
                </p>
                <p className="text-gray-600">
                  You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Cancellation</h2>
                <p className="text-gray-600">
                  All purchases are non-refundable. You can cancel your subscription at any time by logging into your account or contacting us. Your cancellation will take effect at the end of the current paid term.
                </p>
                <p className="text-gray-600">
                  If you are unsatisfied with our services, please email us at support@mkt4u.com.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Prohibited Activities</h2>
                <p className="text-gray-600">
                  You may not access or use the Site or Platform for any purpose other than that for which we make the Site or Platform available. The Site or Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>
                <p className="text-gray-600">
                  As a user of the Site or Platform, you agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>Systematically retrieve data or other content from the Site or Platform to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                  <li>Make any unauthorized use of the Site or Platform, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                  <li>Use the Site or Platform to advertise or offer to sell goods and services.</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features of the Site or Platform.</li>
                  <li>Engage in unauthorized framing of or linking to the Site or Platform.</li>
                  <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                  <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                  <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                  <li>Interfere with, disrupt, or create an undue burden on the Site or Platform or the networks or services connected to the Site or Platform.</li>
                  <li>Attempt to impersonate another user or person or use the username of another user.</li>
                  <li>Use any information obtained from the Site or Platform in order to harass, abuse, or harm another person.</li>
                  <li>Use the Site or Platform as part of any effort to compete with us or otherwise use the Site or Platform and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                  <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site or Platform.</li>
                  <li>Attempt to bypass any measures of the Site or Platform designed to prevent or restrict access to the Site or Platform, or any portion of the Site or Platform.</li>
                  <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site or Platform to you.</li>
                  <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                  <li>Copy or adapt the Site or Platform's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                  <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Site or Platform or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site or Platform.</li>
                  <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").
                  <li>Interfere with, disrupt, or create an undue burden on the Site or Platform or the networks or services connected to the Site or Platform.</li>
                  <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site or Platform to you.</li>
                  <li>Attempt to bypass any measures of the Site or Platform designed to prevent or restrict access to the Site or Platform, or any portion of the Site or Platform.</li>
                </ul>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. User Generated Contributions</h2>
                <p className="text-gray-600">
                  The Site or Platform may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site or Platform, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                </p>
                <p className="text-gray-600">
                  Contributions may be viewable by other users of the Site or Platform and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 my-4">
                  <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
                  <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site or Platform, and other users of the Site or Platform to use your Contributions in any manner contemplated by the Site or Platform and these Terms of Service.</li>
                  <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site or Platform and these Terms of Service.</li>
                  <li>Your Contributions are not false, inaccurate, or misleading.</li>
                  <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                  <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
                  <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                  <li>Your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.</li>
                  <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                  <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                  <li>Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.</li>
                  <li>Your Contributions do not violate any federal or state law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
                  <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                  <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Service, or any applicable law or regulation.</li>
                </ul>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600">
                  In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site or Platform, even if we have been advised of the possibility of such damages.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">10. Indemnification</h2>
                <p className="text-gray-600">
                  You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Site or Platform; (3) breach of these Terms of Service; (4) any breach of your representations and warranties set forth in these Terms of Service; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site or Platform with whom you connected via the Site or Platform.
                </p>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">11. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-600 mt-2">
                  MKT4U<br />
                  123 Marketing Street<br />
                  San Francisco, CA 94103<br />
                  legal@mkt4u.com<br />
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

