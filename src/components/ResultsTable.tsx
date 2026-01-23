/**
 * ResultsTable.tsx - Displays AQL calculation results in table format
 * Exports: ResultsTable component
 * Side effects: none
 */

import type { CalculationResult } from '../lib/aql/types';

interface ResultsTableProps {
  result: CalculationResult;
}

export function ResultsTable({ result }: ResultsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">PO Number</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Quantity</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Code</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Sample</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Ac/Re (Major)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Ac/Re (Minor)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Func Test</th>
            </tr>
          </thead>
          <tbody>
            {result.poResults.map((po, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-gray-800">{po.poNumber}</td>
                <td className="py-3 px-2 text-right text-gray-800">{po.quantity.toLocaleString()}</td>
                <td className="py-3 px-2 text-center font-mono font-bold text-blue-600">{po.codeLetter}</td>
                <td className="py-3 px-2 text-right font-semibold text-gray-800">{po.sampleSize}</td>
                <td className="py-3 px-2 text-center text-gray-800">
                  <span className="text-green-600 font-semibold">{po.acMajor}</span>
                  {' / '}
                  <span className="text-red-600 font-semibold">{po.reMajor}</span>
                </td>
                <td className="py-3 px-2 text-center text-gray-800">
                  <span className="text-green-600 font-semibold">{po.acMinor}</span>
                  {' / '}
                  <span className="text-red-600 font-semibold">{po.reMinor}</span>
                </td>
                <td className="py-3 px-2 text-center text-gray-800">
                  {po.functionalTestSampleSize ? (
                    <div className="text-xs">
                      <div className="font-mono font-semibold text-purple-600">{po.functionalTestCodeLetter}</div>
                      <div className="text-gray-600">{po.functionalTestSampleSize} samples</div>
                      <div className="text-gray-500">{(po.functionalTestTimeMinutes || 0).toFixed(1)} min</div>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr className="border-t-2 border-gray-300">
              <td colSpan={3} className="py-3 px-2 font-bold text-gray-800">Total</td>
              <td className="py-3 px-2 text-right font-bold text-gray-800">{result.totalSamples}</td>
              <td colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Time Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">A. Preparation:</span>
              <span className="font-semibold text-gray-800">{result.breakdown.preparationHours.toFixed(2)} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">B. Sampling ({result.poResults.length} POs):</span>
              <span className="font-semibold text-gray-800">{result.breakdown.samplingHours.toFixed(2)} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">C. Inspection ({result.totalSamples} samples):</span>
              <span className="font-semibold text-gray-800">{result.breakdown.inspectionHours.toFixed(2)} hrs</span>
            </div>
            {result.breakdown.functionalTestHours > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">C1. Functional Testing:</span>
                <span className="font-semibold text-purple-600">{result.breakdown.functionalTestHours.toFixed(2)} hrs</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">D. Packing & Marking Check:</span>
              <span className="font-semibold text-gray-800">{result.breakdown.packingCheckHours.toFixed(2)} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">E. Report & Upload:</span>
              <span className="font-semibold text-gray-800">{result.breakdown.reportHours.toFixed(2)} hrs</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span className="text-gray-700 font-semibold">Subtotal (without travel):</span>
              <span className="font-bold text-gray-800">{result.breakdown.subtotalWithoutTravel.toFixed(2)} hrs</span>
            </div>
            {result.includeTravelTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  F. Travel Time:{' '}
                  {result.travelRoute && <span className="text-blue-600">({result.travelRoute})</span>}
                </span>
                <span className="font-semibold text-gray-800">{result.breakdown.travelHours.toFixed(2)} hrs</span>
              </div>
            )}
            {!result.includeTravelTime && (
              <div className="flex justify-between">
                <span className="text-gray-400 italic">F. Travel Time (not included):</span>
                <span className="font-semibold text-gray-400">{result.breakdown.travelHours.toFixed(2)} hrs</span>
              </div>
            )}
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${result.exceedsOneDay ? 'bg-amber-50 border-amber-300' : 'bg-blue-50 border-blue-200'}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-gray-800">{result.totalHours.toFixed(2)} hrs</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Man-Days</p>
              <p className={`text-2xl font-bold ${result.exceedsOneDay ? 'text-amber-600' : 'text-blue-600'}`}>
                {result.totalManDays.toFixed(2)} days
              </p>
            </div>
          </div>
          {result.exceedsOneDay && (
            <div className="mt-3 pt-3 border-t border-amber-200">
              <p className="text-sm text-amber-800 font-semibold">
                ⚠ Exceeds 10 hours - Requires pre-approval
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Consider: Option 1 - Charge 2 man-days | Option 2 - Charge actual ({result.totalManDays.toFixed(2)} days)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
