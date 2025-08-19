#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const createTables = async () => {
  console.log('🔧 Creating verification_documents table in Supabase...');
  
  // Parse the DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Extract connection info from DATABASE_URL
  const url = new URL(databaseUrl);
  const client = new Client({
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: url.port || 5432,
    database: url.pathname.slice(1), // Remove leading slash
    ssl: true,
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase database');

    // Create verification_documents table
    const createTableQuery = `
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

      COMMIT;
    `;

    await client.query(createTableQuery);
    console.log('✅ verification_documents table created successfully');

    // Create RLS policies
    const createPoliciesQuery = `
      -- Drop existing policies if they exist
      DROP POLICY IF EXISTS "Providers can view their own documents" ON verification_documents;
      DROP POLICY IF EXISTS "Providers can insert their own documents" ON verification_documents;
      DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
      DROP POLICY IF EXISTS "Admins can update all documents" ON verification_documents;

      -- Providers can view their own documents
      CREATE POLICY "Providers can view their own documents" ON verification_documents
          FOR SELECT USING (auth.uid() = provider_id);

      -- Providers can insert their own documents
      CREATE POLICY "Providers can insert their own documents" ON verification_documents
          FOR INSERT WITH CHECK (auth.uid() = provider_id);

      -- Service role can do everything (for API operations)
      CREATE POLICY "Service role full access" ON verification_documents
          USING (true) WITH CHECK (true);
    `;

    await client.query(createPoliciesQuery);
    console.log('✅ RLS policies created successfully');

    // Create update function and trigger
    const createTriggerQuery = `
      -- Create function for updating updated_at
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      -- Drop existing trigger if it exists
      DROP TRIGGER IF EXISTS update_verification_documents_updated_at ON verification_documents;

      -- Create trigger
      CREATE TRIGGER update_verification_documents_updated_at
          BEFORE UPDATE ON verification_documents
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    `;

    await client.query(createTriggerQuery);
    console.log('✅ Update trigger created successfully');

    // Verify table creation
    const verifyQuery = `
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'verification_documents' 
      ORDER BY ordinal_position;
    `;

    const result = await client.query(verifyQuery);
    console.log('\n📋 Table structure:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? '(NOT NULL)' : ''}`);
    });

    console.log('\n🎉 Database setup complete! verification_documents table is ready for use.');

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

createTables();