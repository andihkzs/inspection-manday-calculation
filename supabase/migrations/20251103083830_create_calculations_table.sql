/*
  # Create calculations table for history

  1. New Tables
    - `calculations`
      - `id` (uuid, primary key) - Unique identifier for each calculation
      - `created_at` (timestamptz) - When the calculation was created
      - `inspection_level` (text) - The inspection level used (I, II, S-3, S-4)
      - `aql_major` (text) - Major AQL level (2.5 or 4.0)
      - `aql_minor` (text) - Minor AQL level (2.5 or 4.0)
      - `sampling_time_minutes` (numeric) - Time for sampling per PO
      - `inspection_time_per_unit_minutes` (numeric) - Time to inspect each unit
      - `pos` (jsonb) - Array of purchase orders with quantities
      - `results` (jsonb) - Calculated results including samples and man-days
      - `total_samples` (integer) - Total samples across all POs
      - `total_man_days` (numeric) - Total estimated man-days
  
  2. Security
    - Enable RLS on `calculations` table
    - Add policy for anyone to read (since using single password)
    - Add policy for anyone to insert calculations
*/

CREATE TABLE IF NOT EXISTS calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  inspection_level text NOT NULL,
  aql_major text NOT NULL,
  aql_minor text NOT NULL,
  sampling_time_minutes numeric NOT NULL,
  inspection_time_per_unit_minutes numeric NOT NULL,
  pos jsonb NOT NULL,
  results jsonb NOT NULL,
  total_samples integer NOT NULL,
  total_man_days numeric NOT NULL
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON calculations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON calculations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);
