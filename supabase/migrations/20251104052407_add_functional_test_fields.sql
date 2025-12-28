/*
  # Add functional test fields to calculations table

  1. Changes
    - Add `functional_test_details` (jsonb) - Stores per-PO functional test configuration
      - Structure: { "poNumber": { "level": "II", "timePerUnit": 2.5, "sampleSize": 80, "totalTime": 200 } }
    - Add `functional_test_hours` (numeric) - Total hours spent on functional testing across all POs
    
  2. Notes
    - Uses JSONB for flexible per-PO storage since each PO can have different products
    - Allows different inspection levels for functional tests (e.g., visual at Level II, functional at Reduced)
    - functional_test_hours is calculated field included in total time breakdown
    - Optional fields - NULL or empty JSONB means no functional testing performed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'functional_test_details'
  ) THEN
    ALTER TABLE calculations ADD COLUMN functional_test_details jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calculations' AND column_name = 'functional_test_hours'
  ) THEN
    ALTER TABLE calculations ADD COLUMN functional_test_hours numeric DEFAULT 0;
  END IF;
END $$;
