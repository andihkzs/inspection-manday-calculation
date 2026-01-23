/*
  # Add factory name to calculations table

  1. Changes
    - Add `factory_name` column to `calculations` table
      - Type: text (nullable)
      - Allows storing the factory name associated with each calculation
  
  2. Notes
    - Existing calculations will have NULL factory_name values
    - No default value is set; factory name is optional
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'factory_name'
  ) THEN
    ALTER TABLE calculations ADD COLUMN factory_name text;
  END IF;
END $$;