/**
 * PrivacyPolicy.tsx - Privacy Policy page component
 * Exports: PrivacyPolicy component
 * Side effects: none
 */

import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: November 1, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                Mega Step (HK) Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Inspection Time Calculator application (the "Service"). This policy is governed by the laws of Hong Kong Special Administrative Region.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-600 mb-4">
                We collect information that you voluntarily provide when using the Service, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Calculation data (inspection levels, AQL values, purchase order information, time estimates)</li>
                <li>Authentication credentials (passwords for access control)</li>
                <li>Saved calculation history</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-700 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">
                When you access the Service, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>Usage data (features accessed, calculation timestamps)</li>
                <li>Session information stored locally in your browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Provide, operate, and maintain the Service</li>
                <li>Save and retrieve your calculation history</li>
                <li>Authenticate users and control access</li>
                <li>Improve and optimize the Service</li>
                <li>Communicate with you about the Service</li>
                <li>Comply with legal obligations under Hong Kong law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption and security practices.
              </p>
              <p className="text-gray-600 mb-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your calculation data for as long as necessary to provide the Service and comply with our legal obligations under Hong Kong law. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights Under Hong Kong Law</h2>
              <p className="text-gray-600 mb-4">
                Under the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to the processing of your personal data</li>
                <li>Request transfer of your data to another service</li>
              </ul>
              <p className="text-gray-600 mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use browser session storage to maintain your login state and user preferences. This information is stored locally on your device and is not transmitted to our servers except as necessary to provide the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                We use Supabase as our database and backend service provider. Supabase may collect and process data in accordance with their own privacy policies. We recommend reviewing Supabase's privacy policy for more information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights under Hong Kong law, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">Mega Step (HK) Ltd.</p>
                <p className="text-gray-600">Hong Kong Special Administrative Region</p>
                <p className="text-gray-600 mt-2">
                  Email: <a href="mailto:privacy@megastep.hk" className="text-blue-600 hover:underline">privacy@megastep.hk</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                This Privacy Policy is governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
