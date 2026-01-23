/**
 * types.ts - Type definitions for AQL calculations
 * Exports: AQL types, enums, and interfaces
 * Side effects: none
 */

export type InspectionLevel = 'I' | 'II' | 'S-3' | 'S-4';
export type AQLLevel = '2.5' | '4.0';
export type CodeLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R';

export interface AQLResult {
  poNumber: string;
  quantity: number;
  codeLetter: CodeLetter;
  sampleSize: number;
  acMajor: number;
  reMajor: number;
  acMinor: number;
  reMinor: number;
  functionalTestCodeLetter?: CodeLetter;
  functionalTestSampleSize?: number;
  functionalTestTimeMinutes?: number;
}

export interface CalculationInput {
  inspectionLevel: InspectionLevel;
  aqlMajor: AQLLevel;
  aqlMinor: AQLLevel;
  pos: Array<{
    poNumber: string;
    quantity: number;
    functionalTestLevel?: InspectionLevel;
    functionalTestTimePerUnit?: number;
  }>;
  preparationTimeMinutes: number;
  samplingTimeMinutes: number;
  inspectionTimePerUnitMinutes: number;
  packingCheckTimeMinutes: number;
  reportTimeMinutes: number;
  travelTimeMinutes: number;
  includeTravelTime: boolean;
  travelRoute?: string;
}

export interface CalculationResult {
  poResults: AQLResult[];
  totalSamples: number;
  totalManDays: number;
  totalHours: number;
  exceedsOneDay: boolean;
  includeTravelTime: boolean;
  travelRoute?: string;
  breakdown: {
    preparationHours: number;
    samplingHours: number;
    inspectionHours: number;
    functionalTestHours: number;
    packingCheckHours: number;
    reportHours: number;
    travelHours: number;
    subtotalWithoutTravel: number;
  };
}
