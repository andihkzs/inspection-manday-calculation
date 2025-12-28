/*
  # Add include_travel_time flag to calculations table

  1. Changes
    - Add `include_travel_time` (boolean) - Flag to indicate if travel time is included in total calculation
    
  2. Notes
    - Default is false for backward compatibility (local travel, no travel time added)
    - When true, travel time is added to the total hours calculation
    - This allows inspectors to optionally include travel time for long-distance inspections
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'include_travel_time'
  ) THEN
    ALTER TABLE calculations ADD COLUMN include_travel_time boolean DEFAULT false;
  END IF;
END $$;
