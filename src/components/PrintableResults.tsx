/**
 * PrintableResults.tsx - Formatted results for printing/export
 * Exports: PrintableResults component
 * Side effects: none
 */

import type { CalculationResult } from '../lib/aql/types';
import { VERSION } from '../lib/version';

interface PrintableResultsProps {
  result: CalculationResult;
}

export function PrintableResults({ result }: PrintableResultsProps) {
  return (
    <div
      id="printable-results"
      className="bg-white p-8 text-gray-900"
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div className="space-y-6">
        <div className="text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">AQL Calculation Report</h1>
          <p className="text-gray-600 mt-2">Mega Step (HK) Ltd</p>
          <p className="text-sm text-gray-500 mt-1">
            Generated: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 uppercase text-sm">Key Results</h3>
            <div className="border border-gray-300 rounded p-3">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Hours:</span>
                <span className="font-bold text-lg">{result.totalHours.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Man-Days:</span>
                <span className="font-bold text-lg text-blue-600">{result.totalManDays.toFixed(2)}</span>
              </div>
              {result.exceedsOneDay && (
                <div className="mt-3 pt-3 border-t border-gray-200 bg-amber-50 p-2 rounded">
                  <p className="text-xs font-semibold text-amber-800">
                    ⚠ Exceeds 10 hours - Requires pre-approval
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 uppercase text-sm">Sampling Summary</h3>
            <div className="border border-gray-300 rounded p-3">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total POs:</span>
                <span className="font-bold">{result.poResults.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Samples:</span>
                <span className="font-bold">{result.totalSamples}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-800 uppercase text-sm">Purchase Orders & Sampling Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-2 py-1 text-left">PO #</th>
                  <th className="border border-gray-300 px-2 py-1 text-right">Qty</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Code</th>
                  <th className="border border-gray-300 px-2 py-1 text-right">Sample</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Ac/Re (Maj)</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Ac/Re (Min)</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Func Test</th>
                </tr>
              </thead>
              <tbody>
                {result.poResults.map((po, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 px-2 py-1">{po.poNumber}</td>
                    <td className="border border-gray-300 px-2 py-1 text-right">{po.quantity.toLocaleString()}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center font-bold text-blue-600">
                      {po.codeLetter}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right font-semibold">{po.sampleSize}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center text-xs">
                      <span className="text-green-700 font-bold">{po.acMajor}</span> /
                      <span className="text-red-700 font-bold"> {po.reMajor}</span>
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center text-xs">
                      <span className="text-green-700 font-bold">{po.acMinor}</span> /
                      <span className="text-red-700 font-bold"> {po.reMinor}</span>
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center text-xs">
                      {po.functionalTestSampleSize ? (
                        <div>
                          <div className="font-bold text-purple-600">{po.functionalTestCodeLetter}</div>
                          <div>{po.functionalTestSampleSize}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-1">
                    TOTAL
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-right">{result.totalSamples}</td>
                  <td colSpan={3} className="border border-gray-300 px-2 py-1"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-800 uppercase text-sm">Time Breakdown (Hours)</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="border border-gray-300 rounded p-2">
              <div className="flex justify-between mb-1">
                <span>A. Preparation:</span>
                <span className="font-semibold">{result.breakdown.preparationHours.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>B. Sampling:</span>
                <span className="font-semibold">{result.breakdown.samplingHours.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>C. Inspection:</span>
                <span className="font-semibold">{result.breakdown.inspectionHours.toFixed(2)}</span>
              </div>
              {result.breakdown.functionalTestHours > 0 && (
                <div className="flex justify-between mb-1">
                  <span>C1. Functional Test:</span>
                  <span className="font-semibold text-purple-600">{result.breakdown.functionalTestHours.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="border border-gray-300 rounded p-2">
              <div className="flex justify-between mb-1">
                <span>D. Packing & Check:</span>
                <span className="font-semibold">{result.breakdown.packingCheckHours.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>E. Report & Upload:</span>
                <span className="font-semibold">{result.breakdown.reportHours.toFixed(2)}</span>
              </div>
              {result.includeTravelTime && (
                <div className="flex justify-between mb-1">
                  <span>F. Travel Time:</span>
                  <span className="font-semibold">{result.breakdown.travelHours.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-300 font-bold mt-1">
                <span>TOTAL:</span>
                <span>{result.totalHours.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 border-t border-gray-300 text-xs text-gray-500">
          <div>Report Version {VERSION}</div>
          <div>© Mega Step (HK) Ltd</div>
        </div>
      </div>
    </div>
  );
}
