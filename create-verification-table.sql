-- Create verification_documents table with all features
-- Run this in Supabase SQL Editor or via psql

BEGIN;

-- 1. Create the verification_documents table
CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('NATIONAL_ID', 'POLICE_CLEARANCE', 'BUSINESS_REGISTRATION', 'PROFESSIONAL_CERTIFICATE', 'INSURANCE', 'TAX_REGISTRATION', 'PASSPORT')),
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES auth.users(id),
    expiry_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verification_documents_provider_id ON verification_documents(provider_id);
CREATE INDEX IF NOT EXISTS idx_verification_documents_status ON verification_documents(status);
CREATE INDEX IF NOT EXISTS idx_verification_documents_document_type ON verification_documents(document_type);

-- 3. Enable Row Level Security
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Providers can view their own documents" ON verification_documents;
DROP POLICY IF EXISTS "Providers can insert their own documents" ON verification_documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
DROP POLICY IF EXISTS "Admins can update all documents" ON verification_documents;

-- 5. Create RLS policies
-- Providers can view their own documents
CREATE POLICY "Providers can view their own documents" ON verification_documents
    FOR SELECT USING (auth.uid() = provider_id);

-- Providers can insert their own documents
CREATE POLICY "Providers can insert their own documents" ON verification_documents
    FOR INSERT WITH CHECK (auth.uid() = provider_id);

-- Admins can view all documents
CREATE POLICY "Admins can view all documents" ON verification_documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'ADMIN'
        )
    );

-- Admins can update all documents
CREATE POLICY "Admins can update all documents" ON verification_documents
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'ADMIN'
        )
    );

-- 6. Create function for updating updated_at (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_verification_documents_updated_at ON verification_documents;

-- 8. Create trigger for automatic updated_at updates
CREATE TRIGGER update_verification_documents_updated_at
    BEFORE UPDATE ON verification_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMIT;

-- Verification queries to check if everything was created successfully
\echo 'Checking table structure...'
\d verification_documents

\echo 'Checking indexes...'
\di verification_documents*

\echo 'Checking policies...'
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'verification_documents';