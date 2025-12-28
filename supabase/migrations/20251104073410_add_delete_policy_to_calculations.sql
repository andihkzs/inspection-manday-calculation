/*
  # Add DELETE policy to calculations table

  1. Changes
    - Add DELETE policy to allow public deletion of calculations
    - This enables the delete functionality in the History Modal

  2. Security
    - Allows public users to delete any calculation record
    - Maintains existing SELECT and INSERT policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'calculations' 
    AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
      ON calculations
      FOR DELETE
      TO public
      USING (true);
  END IF;
END $$;
