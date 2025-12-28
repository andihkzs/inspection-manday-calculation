/**
 * Sidebar.tsx - Sidebar overlay for Help, Privacy, and Terms content
 * Exports: Sidebar component
 * Side effects: none
 */

import { X, Calculator, Clock, FileText, History, Save, Trash2 } from 'lucide-react';
import { VERSION } from '../lib/version';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  content: 'help' | 'privacy' | 'terms';
}

export function Sidebar({ isOpen, onClose, content }: SidebarProps) {
  if (!isOpen) return null;

  const renderHelpContent = () => (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Getting Started</h2>
        </div>
        <p className="text-gray-600 mb-4">
          The Mega Step Inspection Time Calculator helps you estimate the time required for quality control inspections based on AQL (Acceptable Quality Limit) standards.
        </p>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Basic Inputs</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">1. Inspection Parameters</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Inspection Level:</strong> Choose I, II, S-3, or S-4 (Level II is standard)</li>
              <li><strong>AQL Major:</strong> Acceptable quality limit for major defects (2.5 or 4.0)</li>
              <li><strong>AQL Minor:</strong> Acceptable quality limit for minor defects (2.5 or 4.0)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">2. Purchase Orders (POs)</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Adding Multiple POs:</strong> Click the "+ Add PO" button to add as many purchase orders as needed for your inspection. Each PO is calculated separately and results are combined.</li>
              <li><strong>PO Details:</strong> For each PO, enter the PO number (for reference) and the quantity of items in that order.</li>
              <li><strong>Why Multiple POs?</strong> When inspecting multiple purchase orders in one visit, add each PO separately. The calculator will determine the sample size for each PO based on its quantity and sum up the total inspection time.</li>
              <li><strong>Removing POs:</strong> Click the trash icon next to any PO to remove it from the calculation.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">3. Functional Testing</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>When to Use:</strong> Enable functional testing when products require operational testing (e.g., electronics, appliances, mechanical devices).</li>
              <li><strong>Functional Test Level:</strong> Select the inspection level (I, II, S-3, or S-4) for functional testing. This determines how many samples need functional testing.</li>
              <li><strong>Time Per Unit:</strong> Enter the time in minutes required to functionally test each unit (e.g., 5 minutes to test an electronic device, 10 minutes for complex equipment).</li>
              <li><strong>How It Works:</strong> The calculator determines the functional test sample size based on the level you select, then multiplies by the time per unit to calculate total functional testing time.</li>
              <li><strong>Example:</strong> If you have 1000 units, Level II functional testing might require 80 samples. At 5 minutes per unit, that's 400 minutes (6.7 hours) of functional testing time added to your inspection.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Time Breakdown</h2>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-3 text-gray-600">
            <li><strong>A. Preparation Time:</strong> Setup and preparation before inspection (default: 30 min)</li>
            <li><strong>B. Sampling Time:</strong> Time per PO to select samples (default: 10 min per PO)</li>
            <li><strong>C. Inspection Time:</strong> Time per unit to inspect (default: 2.5 min per sample)</li>
            <li><strong>D. Packing Check:</strong> Final packing verification (default: 30 min)</li>
            <li><strong>E. Report Time:</strong> Report preparation and upload (default: 45 min)</li>
            <li><strong>F. Travel Time:</strong> Optional - Check the box to include travel time in total calculation (default: 180 min)</li>
          </ul>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Travel time is unchecked by default. For local inspections, leave it unchecked.
            For long-distance travel, check the box to include it in the total calculation.
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Save className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Saving Calculations</h2>
        </div>
        <p className="text-gray-600 mb-3">
          After calculating, click the "Save Calculation" button to store your results for future reference.
        </p>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> If the total exceeds 10 hours, the system will show a warning that pre-approval is required.
            You'll have two charging options: Option 1 (charge 2 man-days) or Option 2 (charge actual time).
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-slate-100 p-2 rounded-lg">
            <History className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Calculation History</h2>
        </div>
        <p className="text-gray-600 mb-3">
          Click the "History" button to view your saved calculations. From the history modal:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Click any calculation to load it back into the calculator</li>
          <li>View details including inspection level, AQL values, POs, and total man-days</li>
          <li><strong>Admin Only:</strong> Delete individual calculations or clear all history</li>
        </ul>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2 rounded-lg">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Admin Features</h2>
        </div>
        <p className="text-gray-600 mb-3">
          Admin users (password: ms2024) have additional permissions:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li><strong>Delete Single Calculation:</strong> Click the trash icon on any history item</li>
          <li><strong>Delete All Calculations:</strong> Use the "Delete All" button in the history modal header</li>
          <li>All deletions require confirmation to prevent accidental data loss</li>
        </ul>
      </section>

      <section>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Understanding Results</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Code Letter:</strong> Determined by lot size and inspection level (from AQL tables)
            </p>
            <p>
              <strong>Sample Size:</strong> Number of units to inspect from each PO
            </p>
            <p>
              <strong>Ac (Accept):</strong> Maximum number of defects allowed to accept the lot
            </p>
            <p>
              <strong>Re (Reject):</strong> Number of defects that triggers lot rejection
            </p>
            <p>
              <strong>Man-Days:</strong> Total time divided by 10 hours (1 working day = 10 hours)
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-3">
            If you have questions or need assistance:
          </p>
          <div className="text-gray-700">
            <p className="font-medium">Contact Mega Step (HK) Ltd.</p>
            <p className="text-sm text-gray-600 mt-1">Hong Kong Special Administrative Region</p>
          </div>
        </div>
      </section>

      <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
        Version {VERSION}
      </div>
    </div>
  );

  const renderPrivacyContent = () => (
    <div className="prose prose-gray max-w-none">
      <section className="mb-8">
        <p className="text-sm text-gray-500 mb-4">Last Updated: November 1, 2025</p>
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
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>Provide, maintain, and improve the Service</li>
          <li>Store and retrieve your calculation history</li>
          <li>Authenticate users and manage access permissions</li>
          <li>Analyze usage patterns to enhance user experience</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Data Storage and Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction. Your calculation data is stored securely using industry-standard encryption and security practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
        <p className="text-gray-600 mb-4">
          We retain your calculation history until you or an administrator deletes it. Authentication data is maintained for the duration of your session.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>Access your stored calculation data</li>
          <li>Request deletion of your calculations (or have an administrator delete them)</li>
          <li>Discontinue use of the Service at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
        <p className="text-gray-600 mb-4">
          If you have questions about this Privacy Policy, please contact:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 font-medium">Mega Step (HK) Ltd.</p>
          <p className="text-gray-600 text-sm">Hong Kong Special Administrative Region</p>
        </div>
      </section>
    </div>
  );

  const renderTermsContent = () => (
    <div className="prose prose-gray max-w-none">
      <section className="mb-8">
        <p className="text-sm text-gray-500 mb-4">Last Updated: November 1, 2025</p>
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
          <li>Time estimation for inspection processes</li>
          <li>Calculation history storage and retrieval</li>
          <li>Administrative features for authorized users</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
        <p className="text-gray-600 mb-4">
          When using the Service, you agree to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>Provide accurate and complete information</li>
          <li>Maintain the confidentiality of your access credentials</li>
          <li>Use the Service only for lawful purposes</li>
          <li>Not attempt to circumvent security measures</li>
          <li>Not interfere with the proper functioning of the Service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Intellectual Property</h2>
        <p className="text-gray-600 mb-4">
          All content, features, and functionality of the Service are owned by Mega Step (HK) Ltd. and are protected by international copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          The Service is provided "as is" without warranties of any kind. Mega Step (HK) Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
        </p>
        <p className="text-gray-600 mb-4">
          While we strive for accuracy, calculation results are estimates and should be verified for critical applications.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Modifications to Service</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice. We may also update these Terms from time to time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Governing Law</h2>
        <p className="text-gray-600 mb-4">
          These Terms are governed by and construed in accordance with the laws of Hong Kong Special Administrative Region.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
        <p className="text-gray-600 mb-4">
          For questions about these Terms, please contact:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 font-medium">Mega Step (HK) Ltd.</p>
          <p className="text-gray-600 text-sm">Hong Kong Special Administrative Region</p>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (content) {
      case 'help':
        return renderHelpContent();
      case 'privacy':
        return renderPrivacyContent();
      case 'terms':
        return renderTermsContent();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            {content === 'help' && 'Help Guide'}
            {content === 'privacy' && 'Privacy Policy'}
            {content === 'terms' && 'Terms of Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
