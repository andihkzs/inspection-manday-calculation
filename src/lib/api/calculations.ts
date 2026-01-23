/**
 * calculations.ts - API functions for saving and loading calculations
 * Exports: saveCalculation, loadCalculations
 * Side effects: performs database operations via Supabase
 */

import { supabase } from '../supabase';
import type { CalculationInput, CalculationResult } from '../aql/types';

export interface SavedCalculation {
  id: string;
  created_at: string;
  custom_name?: string;
  factory_name?: string;
  inspection_level: string;
  aql_major: string;
  aql_minor: string;
  preparation_time_minutes: number;
  sampling_time_minutes: number;
  inspection_time_per_unit_minutes: number;
  packing_check_time_minutes: number;
  report_time_minutes: number;
  travel_time_minutes: number;
  include_travel_time: boolean;
  travel_route?: string;
  pos: Array<{ poNumber: string; quantity: number }>;
  results: CalculationResult;
  total_samples: number;
  total_man_days: number;
}

export async function saveCalculation(
  input: CalculationInput,
  result: CalculationResult,
  customName?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('calculations').insert({
      custom_name: customName || null,
      factory_name: input.factoryName || null,
      inspection_level: input.inspectionLevel,
      aql_major: input.aqlMajor,
      aql_minor: input.aqlMinor,
      preparation_time_minutes: input.preparationTimeMinutes,
      sampling_time_minutes: input.samplingTimeMinutes,
      inspection_time_per_unit_minutes: input.inspectionTimePerUnitMinutes,
      packing_check_time_minutes: input.packingCheckTimeMinutes,
      report_time_minutes: input.reportTimeMinutes,
      travel_time_minutes: input.travelTimeMinutes,
      include_travel_time: input.includeTravelTime,
      travel_route: input.travelRoute || null,
      pos: input.pos,
      results: result,
      total_samples: result.totalSamples,
      total_man_days: result.totalManDays,
    });

    if (error) {
      console.error('Error saving calculation:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error saving calculation:', err);
    return { success: false, error: 'Failed to save calculation' };
  }
}

export async function loadCalculations(
  limit: number = 10
): Promise<{ data: SavedCalculation[] | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error loading calculations:', error);
      return { data: null, error: error.message };
    }

    return { data };
  } catch (err) {
    console.error('Unexpected error loading calculations:', err);
    return { data: null, error: 'Failed to load calculations' };
  }
}

export async function deleteCalculation(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('calculations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting calculation:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting calculation:', err);
    return { success: false, error: 'Failed to delete calculation' };
  }
}

export async function deleteAllCalculations(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('calculations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (error) {
      console.error('Error deleting all calculations:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting all calculations:', err);
    return { success: false, error: 'Failed to delete all calculations' };
  }
}
