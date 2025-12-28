/**
 * tables.ts - ANSI/ASQ Z1.4 AQL lookup tables
 * Exports: lot size to code letter mappings, sample size tables, acceptance criteria
 * Side effects: none
 */

import type { InspectionLevel, CodeLetter, AQLLevel } from './types';

export const LOT_SIZE_TO_CODE: Record<InspectionLevel, Array<{ maxLotSize: number; code: CodeLetter }>> = {
  'I': [
    { maxLotSize: 8, code: 'A' },
    { maxLotSize: 15, code: 'A' },
    { maxLotSize: 25, code: 'B' },
    { maxLotSize: 50, code: 'C' },
    { maxLotSize: 90, code: 'C' },
    { maxLotSize: 150, code: 'D' },
    { maxLotSize: 280, code: 'E' },
    { maxLotSize: 500, code: 'F' },
    { maxLotSize: 1200, code: 'G' },
    { maxLotSize: 3200, code: 'H' },
    { maxLotSize: 10000, code: 'J' },
    { maxLotSize: 35000, code: 'K' },
    { maxLotSize: 150000, code: 'L' },
    { maxLotSize: 500000, code: 'M' },
    { maxLotSize: Infinity, code: 'N' },
  ],
  'II': [
    { maxLotSize: 8, code: 'A' },
    { maxLotSize: 15, code: 'B' },
    { maxLotSize: 25, code: 'C' },
    { maxLotSize: 50, code: 'D' },
    { maxLotSize: 90, code: 'E' },
    { maxLotSize: 150, code: 'F' },
    { maxLotSize: 280, code: 'G' },
    { maxLotSize: 500, code: 'H' },
    { maxLotSize: 1200, code: 'J' },
    { maxLotSize: 3200, code: 'K' },
    { maxLotSize: 10000, code: 'L' },
    { maxLotSize: 35000, code: 'M' },
    { maxLotSize: 150000, code: 'N' },
    { maxLotSize: 500000, code: 'P' },
    { maxLotSize: Infinity, code: 'Q' },
  ],
  'S-3': [
    { maxLotSize: 8, code: 'A' },
    { maxLotSize: 15, code: 'A' },
    { maxLotSize: 25, code: 'A' },
    { maxLotSize: 50, code: 'A' },
    { maxLotSize: 90, code: 'B' },
    { maxLotSize: 150, code: 'B' },
    { maxLotSize: 280, code: 'C' },
    { maxLotSize: 500, code: 'C' },
    { maxLotSize: 1200, code: 'D' },
    { maxLotSize: 3200, code: 'E' },
    { maxLotSize: 10000, code: 'E' },
    { maxLotSize: 35000, code: 'F' },
    { maxLotSize: 150000, code: 'G' },
    { maxLotSize: 500000, code: 'H' },
    { maxLotSize: Infinity, code: 'J' },
  ],
  'S-4': [
    { maxLotSize: 8, code: 'A' },
    { maxLotSize: 15, code: 'A' },
    { maxLotSize: 25, code: 'A' },
    { maxLotSize: 50, code: 'B' },
    { maxLotSize: 90, code: 'B' },
    { maxLotSize: 150, code: 'C' },
    { maxLotSize: 280, code: 'D' },
    { maxLotSize: 500, code: 'E' },
    { maxLotSize: 1200, code: 'F' },
    { maxLotSize: 3200, code: 'G' },
    { maxLotSize: 10000, code: 'H' },
    { maxLotSize: 35000, code: 'J' },
    { maxLotSize: 150000, code: 'K' },
    { maxLotSize: 500000, code: 'L' },
    { maxLotSize: Infinity, code: 'M' },
  ],
};

export const CODE_TO_SAMPLE_SIZE: Record<CodeLetter, number> = {
  'A': 2,
  'B': 3,
  'C': 5,
  'D': 8,
  'E': 13,
  'F': 20,
  'G': 32,
  'H': 50,
  'J': 80,
  'K': 125,
  'L': 200,
  'M': 315,
  'N': 500,
  'P': 800,
  'Q': 1250,
  'R': 2000,
};

interface AcceptanceNumbers {
  ac: number;
  re: number;
}

export const AQL_ACCEPTANCE_CRITERIA: Record<CodeLetter, Record<AQLLevel, AcceptanceNumbers>> = {
  'A': {
    '2.5': { ac: 0, re: 1 },
    '4.0': { ac: 0, re: 1 },
  },
  'B': {
    '2.5': { ac: 0, re: 1 },
    '4.0': { ac: 0, re: 1 },
  },
  'C': {
    '2.5': { ac: 0, re: 1 },
    '4.0': { ac: 0, re: 1 },
  },
  'D': {
    '2.5': { ac: 0, re: 1 },
    '4.0': { ac: 1, re: 2 },
  },
  'E': {
    '2.5': { ac: 0, re: 1 },
    '4.0': { ac: 1, re: 2 },
  },
  'F': {
    '2.5': { ac: 1, re: 2 },
    '4.0': { ac: 2, re: 3 },
  },
  'G': {
    '2.5': { ac: 1, re: 2 },
    '4.0': { ac: 3, re: 4 },
  },
  'H': {
    '2.5': { ac: 2, re: 3 },
    '4.0': { ac: 5, re: 6 },
  },
  'J': {
    '2.5': { ac: 3, re: 4 },
    '4.0': { ac: 7, re: 8 },
  },
  'K': {
    '2.5': { ac: 5, re: 6 },
    '4.0': { ac: 10, re: 11 },
  },
  'L': {
    '2.5': { ac: 7, re: 8 },
    '4.0': { ac: 14, re: 15 },
  },
  'M': {
    '2.5': { ac: 10, re: 11 },
    '4.0': { ac: 21, re: 22 },
  },
  'N': {
    '2.5': { ac: 14, re: 15 },
    '4.0': { ac: 21, re: 22 },
  },
  'P': {
    '2.5': { ac: 21, re: 22 },
    '4.0': { ac: 21, re: 22 },
  },
  'Q': {
    '2.5': { ac: 21, re: 22 },
    '4.0': { ac: 21, re: 22 },
  },
  'R': {
    '2.5': { ac: 21, re: 22 },
    '4.0': { ac: 21, re: 22 },
  },
};
