/*
  # Add travel route to calculations table

  1. Changes
    - Add `travel_route` column to store the travel route information
    - This field will store text like "Shenzhen → Factory A"
    - Optional field (nullable) for backward compatibility
  
  2. Notes
    - Existing records will have NULL for travel_route
    - New calculations can include this information in exports
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'travel_route'
  ) THEN
    ALTER TABLE calculations ADD COLUMN travel_route text;
  END IF;
END $$;
