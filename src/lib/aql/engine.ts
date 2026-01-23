/**
 * engine.ts - AQL calculation engine with ANSI/ASQ Z1.4 compliance
 * Exports: getCodeLetter, getSampleSize, getAcceptanceCriteria, calculateAQL
 * Side effects: none
 */

import type { InspectionLevel, CodeLetter, AQLLevel, AQLResult, CalculationInput, CalculationResult } from './types';
import { LOT_SIZE_TO_CODE, CODE_TO_SAMPLE_SIZE, AQL_ACCEPTANCE_CRITERIA } from './tables';

export function getCodeLetter(lotSize: number, inspectionLevel: InspectionLevel): CodeLetter {
  const table = LOT_SIZE_TO_CODE[inspectionLevel];
  const entry = table.find(row => lotSize <= row.maxLotSize);
  return entry ? entry.code : 'Q';
}

export function getSampleSize(codeLetter: CodeLetter): number {
  return CODE_TO_SAMPLE_SIZE[codeLetter];
}

export function getAcceptanceCriteria(codeLetter: CodeLetter, aqlLevel: AQLLevel) {
  return AQL_ACCEPTANCE_CRITERIA[codeLetter][aqlLevel];
}

export function calculateAQL(input: CalculationInput): CalculationResult {
  const poResults: AQLResult[] = input.pos.map(po => {
    const codeLetter = getCodeLetter(po.quantity, input.inspectionLevel);
    const sampleSize = getSampleSize(codeLetter);
    const majorCriteria = getAcceptanceCriteria(codeLetter, input.aqlMajor);
    const minorCriteria = getAcceptanceCriteria(codeLetter, input.aqlMinor);

    let functionalTestCodeLetter: CodeLetter | undefined;
    let functionalTestSampleSize: number | undefined;
    let functionalTestTimeMinutes: number | undefined;

    if (po.functionalTestLevel && po.functionalTestTimePerUnit && po.functionalTestTimePerUnit > 0) {
      functionalTestCodeLetter = getCodeLetter(po.quantity, po.functionalTestLevel);
      functionalTestSampleSize = getSampleSize(functionalTestCodeLetter);
      functionalTestTimeMinutes = functionalTestSampleSize * po.functionalTestTimePerUnit;
    }

    return {
      poNumber: po.poNumber,
      quantity: po.quantity,
      codeLetter,
      sampleSize,
      acMajor: majorCriteria.ac,
      reMajor: majorCriteria.re,
      acMinor: minorCriteria.ac,
      reMinor: minorCriteria.re,
      functionalTestCodeLetter,
      functionalTestSampleSize,
      functionalTestTimeMinutes,
    };
  });

  const totalSamples = poResults.reduce((sum, result) => sum + result.sampleSize, 0);

  const functionalTestHours = poResults.reduce((sum, result) => {
    return sum + ((result.functionalTestTimeMinutes || 0) / 60);
  }, 0);

  const preparationHours = input.preparationTimeMinutes / 60;
  const samplingHours = (input.samplingTimeMinutes * input.pos.length) / 60;
  const inspectionHours = (totalSamples * input.inspectionTimePerUnitMinutes) / 60;
  const packingCheckHours = input.packingCheckTimeMinutes / 60;
  const reportHours = input.reportTimeMinutes / 60;
  const travelHours = input.travelTimeMinutes / 60;

  const subtotalWithoutTravel = preparationHours + samplingHours + inspectionHours + functionalTestHours + packingCheckHours + reportHours;
  const totalHours = input.includeTravelTime ? subtotalWithoutTravel + travelHours : subtotalWithoutTravel;
  const totalManDays = totalHours / 10;
  const exceedsOneDay = totalHours > 10;

  return {
    poResults,
    totalSamples,
    totalManDays,
    totalHours,
    exceedsOneDay,
    includeTravelTime: input.includeTravelTime,
    travelRoute: input.travelRoute,
    breakdown: {
      preparationHours,
      samplingHours,
      inspectionHours,
      functionalTestHours,
      packingCheckHours,
      reportHours,
      travelHours,
      subtotalWithoutTravel,
    },
  };
}
