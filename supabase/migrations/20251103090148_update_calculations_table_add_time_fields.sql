/*
  # Update calculations table with detailed time breakdown fields

  1. Changes
    - Add `preparation_time_minutes` (numeric) - Time for preparation and factory briefing
    - Add `packing_check_time_minutes` (numeric) - Time for packing and marking check
    - Add `report_time_minutes` (numeric) - Time for report writing and upload
    - Add `travel_time_minutes` (numeric) - Round-trip travel time to factory
    
  2. Notes
    - Existing `sampling_time_minutes` and `inspection_time_per_unit_minutes` remain unchanged
    - All new fields are optional for backward compatibility with existing records
    - These fields enable detailed work package breakdown for CEI inspections
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'preparation_time_minutes'
  ) THEN
    ALTER TABLE calculations ADD COLUMN preparation_time_minutes numeric DEFAULT 30;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'packing_check_time_minutes'
  ) THEN
    ALTER TABLE calculations ADD COLUMN packing_check_time_minutes numeric DEFAULT 30;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'report_time_minutes'
  ) THEN
    ALTER TABLE calculations ADD COLUMN report_time_minutes numeric DEFAULT 45;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'travel_time_minutes'
  ) THEN
    ALTER TABLE calculations ADD COLUMN travel_time_minutes numeric DEFAULT 180;
  END IF;
END $$;
