/*
  # Add custom_name field to calculations table

  1. Changes
    - Add `custom_name` column to `calculations` table
      - Type: text
      - Optional field for user-defined calculation names
      - Default: null
  
  2. Notes
    - Existing records will have null custom_name
    - Users can optionally name their calculations for easier identification
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'custom_name'
  ) THEN
    ALTER TABLE calculations ADD COLUMN custom_name text;
  END IF;
END $$;
