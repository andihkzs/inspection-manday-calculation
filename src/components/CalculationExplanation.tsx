/**
 * CalculationExplanation.tsx - Shows step-by-step calculation breakdown
 * Exports: CalculationExplanation component
 * Side effects: none
 */

import { Info } from 'lucide-react';
import type { CalculationResult, InspectionLevel, AQLLevel } from '../lib/aql/types';

interface CalculationExplanationProps {
  result: CalculationResult;
  inspectionLevel: InspectionLevel;
  aqlMajor: AQLLevel;
  aqlMinor: AQLLevel;
}

export function CalculationExplanation({ result, inspectionLevel, aqlMajor, aqlMinor }: CalculationExplanationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">How It's Calculated</h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Step 1: Determine Code Letter</h3>
          <p className="text-gray-700 mb-2">
            Based on <span className="font-semibold">Inspection Level {inspectionLevel}</span>, each lot size maps to a code letter using ANSI/ASQ Z1.4 Table I.
          </p>
          <div className="space-y-1">
            {result.poResults.map((po, index) => (
              <p key={index} className="text-gray-600 text-xs">
                • {po.poNumber}: Qty {po.quantity.toLocaleString()} → Code <span className="font-mono font-bold text-blue-600">{po.codeLetter}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Step 2: Get Sample Size</h3>
          <p className="text-gray-700 mb-2">
            Each code letter corresponds to a specific sample size from ANSI/ASQ Z1.4 Table II-A.
          </p>
          <div className="space-y-1">
            {result.poResults.map((po, index) => (
              <p key={index} className="text-gray-600 text-xs">
                • {po.poNumber}: Code {po.codeLetter} → Sample size <span className="font-semibold">{po.sampleSize}</span> units
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Step 3: Get Acceptance/Rejection Criteria</h3>
          <p className="text-gray-700 mb-2">
            Using AQL levels (Major: <span className="font-semibold">{aqlMajor}</span>, Minor: <span className="font-semibold">{aqlMinor}</span>),
            determine Ac (Accept) and Re (Reject) numbers from Table II-A.
          </p>
          <div className="space-y-1">
            {result.poResults.map((po, index) => (
              <p key={index} className="text-gray-600 text-xs">
                • {po.poNumber}: Major (<span className="text-green-600 font-semibold">{po.acMajor}</span>/<span className="text-red-600 font-semibold">{po.reMajor}</span>),
                Minor (<span className="text-green-600 font-semibold">{po.acMinor}</span>/<span className="text-red-600 font-semibold">{po.reMinor}</span>)
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">Step 4: Calculate Time (Work Package Breakdown)</h3>
          <div className="space-y-2 text-gray-700 text-xs">
            <p>
              <span className="font-semibold">A. Preparation:</span>{' '}
              {(result.breakdown.preparationHours * 60).toFixed(0)} min = {result.breakdown.preparationHours.toFixed(2)} hours
            </p>
            <p>
              <span className="font-semibold">B. Sampling:</span>{' '}
              {result.poResults.length} POs × {(result.breakdown.samplingHours / result.poResults.length * 60).toFixed(0)} min/PO = {result.breakdown.samplingHours.toFixed(2)} hours
            </p>
            <p>
              <span className="font-semibold">C. Product Inspection:</span>{' '}
              {result.totalSamples} samples × {((result.breakdown.inspectionHours / result.totalSamples) * 60).toFixed(2)} min/sample = {result.breakdown.inspectionHours.toFixed(2)} hours
            </p>
            <p>
              <span className="font-semibold">D. Packing & Marking Check:</span>{' '}
              {(result.breakdown.packingCheckHours * 60).toFixed(0)} min = {result.breakdown.packingCheckHours.toFixed(2)} hours
            </p>
            <p>
              <span className="font-semibold">E. Report & Upload:</span>{' '}
              {(result.breakdown.reportHours * 60).toFixed(0)} min = {result.breakdown.reportHours.toFixed(2)} hours
            </p>
            <p className="pt-2 border-t border-blue-200 font-semibold">
              Subtotal (without travel): {result.breakdown.subtotalWithoutTravel.toFixed(2)} hours
            </p>
            <p>
              <span className="font-semibold">F. Travel Time:</span>{' '}
              {(result.breakdown.travelHours * 60).toFixed(0)} min = {result.breakdown.travelHours.toFixed(2)} hours
            </p>
            <p className="pt-2 border-t border-blue-300 font-bold text-blue-700">
              Total: {result.totalHours.toFixed(2)} hours ÷ 10 hrs/day = {result.totalManDays.toFixed(2)} man-days
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Note:</span> Ac (Acceptance Number) = Maximum defects allowed to pass.
            Re (Rejection Number) = Minimum defects to reject the lot.
          </p>
        </div>
      </div>
    </div>
  );
}
