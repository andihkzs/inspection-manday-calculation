/**
 * TermsOfService.tsx - Terms of Service page component
 * Exports: TermsOfService component
 * Side effects: none
 */

import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16 sm:pt-20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Calculator
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: November 1, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using the Mega Step Inspection Time Calculator (the "Service") provided by Mega Step (HK) Ltd. ("Company", "we", "our", or "us"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
              <p className="text-gray-600 mb-4">
                These Terms constitute a legally binding agreement between you and Mega Step (HK) Ltd., a company registered in Hong Kong Special Administrative Region.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                The Service provides inspection time calculation tools for quality control and inspection activities, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>AQL (Acceptable Quality Limit) calculation functionality</li>
                <li>Man-day estimation based on inspection parameters</li>
                <li>Calculation history storage and retrieval</li>
                <li>Time breakdown analysis for inspection activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Accounts and Access</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-3">3.1 Account Security</h3>
              <p className="text-gray-600 mb-4">
                You are responsible for maintaining the confidentiality of your access credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="text-lg font-medium text-gray-700 mb-3">3.2 User Roles</h3>
              <p className="text-gray-600 mb-4">
                The Service provides different access levels (admin and regular users) with varying permissions. You agree to use the Service only within the scope of your assigned role and permissions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Use the Service in any way that violates any applicable law or regulation in Hong Kong or any other jurisdiction</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                <li>Use the Service to transmit any malicious code, viruses, or harmful data</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use the Service for any commercial purpose without our express written consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-600 mb-4">
                The Service and its entire contents, features, and functionality (including but not limited to all information, software, code, text, displays, graphics, and design) are owned by Mega Step (HK) Ltd. and are protected by Hong Kong and international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-600 mb-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any part of the Service without our prior written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Data and Calculations</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-3">6.1 Accuracy of Calculations</h3>
              <p className="text-gray-600 mb-4">
                While we strive to provide accurate calculation results based on industry-standard AQL tables and formulas, the Service is provided for estimation purposes only. You are responsible for verifying all calculations and results before making business decisions based on them.
              </p>

              <h3 className="text-lg font-medium text-gray-700 mb-3">6.2 Your Data</h3>
              <p className="text-gray-600 mb-4">
                You retain all rights to the data you input into the Service. By using the Service, you grant us a license to use, store, and process your data solely for the purpose of providing the Service to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY HONG KONG LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Warranties of merchantability and fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted, timely, secure, or error-free</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of calculations or results</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY HONG KONG LAW, IN NO EVENT SHALL MEGA STEP (HK) LTD., ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>
              <p className="text-gray-600 mb-4">
                Our total liability to you for all claims arising from or relating to the Service shall not exceed the amount you paid to us, if any, in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify, defend, and hold harmless Mega Step (HK) Ltd. and its directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Modifications to Service and Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or discontinue the Service at any time without notice. We may also modify these Terms at any time by posting the revised Terms on the Service. Your continued use of the Service after such modifications constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600 mb-4">
                Any dispute arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of Hong Kong.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">13. Severability</h2>
              <p className="text-gray-600 mb-4">
                If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">14. Entire Agreement</h2>
              <p className="text-gray-600 mb-4">
                These Terms constitute the entire agreement between you and Mega Step (HK) Ltd. regarding the use of the Service and supersede all prior agreements and understandings, whether written or oral.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">Mega Step (HK) Ltd.</p>
                <p className="text-gray-600">Hong Kong Special Administrative Region</p>
                <p className="text-gray-600 mt-2">
                  Email: <a href="mailto:legal@megastep.hk" className="text-blue-600 hover:underline">legal@megastep.hk</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
