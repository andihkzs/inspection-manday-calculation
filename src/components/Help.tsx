/**
 * Help.tsx - Help page component
 * Exports: Help component
 * Side effects: none
 */

import { ArrowLeft, Calculator, Clock, FileText, History, Save, Trash2, Download, Image, Zap } from 'lucide-react';

interface HelpProps {
  onBack: () => void;
}

export function Help({ onBack }: HelpProps) {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Guide</h1>
          <p className="text-sm text-gray-500 mb-8">Quick guide to using the Inspection Time Calculator</p>

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
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Login Credentials:</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li><strong>User:</strong> cei2024 (calculator and history access)</li>
                </ul>
              </div>
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
                  <h3 className="font-medium text-gray-700 mb-2">2. Purchase Orders</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Add Single PO:</strong> Click "+ Add PO" button or use keyboard shortcut (Ctrl+P or ⌘+P)</li>
                    <li><strong>Add Multiple POs:</strong> Click "+ Add Multiple" to add several POs at once (up to 50)</li>
                    <li>Enter PO number and quantity for each order</li>
                    <li>Remove unwanted POs with the trash icon (minimum 1 PO required)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">3. Functional Testing (Optional)</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Each PO can have optional functional testing configured</li>
                    <li><strong>Inspection Level:</strong> Choose Level I, II, S-3 (Reduced), or S-4 (Tightened)</li>
                    <li><strong>Test Time per Unit:</strong> Enter the time in minutes to perform functional tests on each unit</li>
                    <li>Leave test time at 0 if no functional testing is required</li>
                    <li>Functional test time is calculated separately and added to the total inspection time</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Time Breakdown</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3 text-gray-600">
                  <li><strong>A. Preparation Time:</strong> Setup and preparation before inspection (default: 30 min)</li>
                  <li><strong>B. Sampling Time per PO:</strong> Time to select samples for each PO (default: 10 min per PO)</li>
                  <li><strong>C. Inspection Time per Unit:</strong> Time to inspect each sample unit (default: 2.5 min per sample)</li>
                  <li><strong>D. Packing & Marking Check:</strong> Final packing verification (default: 30 min)</li>
                  <li><strong>E. Report & Upload:</strong> Report preparation and upload (default: 45 min)</li>
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
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Exporting Results</h2>
              </div>
              <p className="text-gray-600 mb-3">
                After calculating, you can export your results in multiple formats:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Download className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Export to PDF:</strong> Click the "PDF" button to download a professional PDF report with all calculation details, perfect for sharing with clients or archiving.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Image className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Export to JPG:</strong> Click the "JPG" button to download a high-quality image of your results, ideal for quick sharing via email or messaging.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> If the total exceeds 10 hours, the system will show a warning that pre-approval is required.
                    You'll have two charging options: Option 1 (charge 2 man-days) or Option 2 (charge actual time).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <History className="w-6 h-6 text-indigo-600" />
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
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Productivity Tips</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3 text-gray-600">
                  <li>
                    <strong>Keyboard Shortcut:</strong> Press Ctrl+P (or ⌘+P on Mac) to quickly add a new PO without clicking
                  </li>
                  <li>
                    <strong>Batch Adding:</strong> Use the "Add Multiple" button when you need to add many POs at once - you can add up to 50 POs in a single action
                  </li>
                  <li>
                    <strong>Quick Export:</strong> After calculation, use the PDF button for formal reports or JPG button for quick sharing
                  </li>
                  <li>
                    <strong>Functional Testing:</strong> Only configure functional tests for POs that require it - leave the time at 0 for standard inspections
                  </li>
                </ul>
              </div>
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
                  <p>
                    <strong>Functional Test Samples:</strong> Additional samples required for functional testing (if configured), calculated based on the functional test inspection level
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
          </div>
        </div>
      </div>
    </div>
  );
}
