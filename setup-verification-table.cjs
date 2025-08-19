#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const setupTable = async () => {
  console.log('🔧 Setting up verification_documents table in Supabase...');
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('✅ Connected to Supabase');

    // Test if table already exists by trying to select from it
    const { data: testData, error: testError } = await supabase
      .from('verification_documents')
      .select('*')
      .limit(1);

    if (testError && (testError.message.includes('does not exist') || testError.message.includes('schema cache'))) {
      console.log('📋 Table does not exist, needs manual creation');
      console.log('\n🔧 Please run this SQL in your Supabase Dashboard > SQL Editor:');
      console.log('\n' + '='.repeat(60));
      
      const sql = `
-- Create verification_documents table
CREATE TABLE verification_documents (
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

-- Create indexes
CREATE INDEX idx_verification_documents_provider_id ON verification_documents(provider_id);
CREATE INDEX idx_verification_documents_status ON verification_documents(status);
CREATE INDEX idx_verification_documents_document_type ON verification_documents(document_type);

-- Enable RLS
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Providers can view their own documents" ON verification_documents
    FOR SELECT USING (auth.uid() = provider_id);

CREATE POLICY "Providers can insert their own documents" ON verification_documents
    FOR INSERT WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Service role full access" ON verification_documents
    USING (true) WITH CHECK (true);

-- Create update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_verification_documents_updated_at
    BEFORE UPDATE ON verification_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
      `.trim();
      
      console.log(sql);
      console.log('\n' + '='.repeat(60));
      console.log('\nAfter running the SQL, the table will be ready for document storage! ✅');
      
    } else if (testError) {
      console.error('❌ Error checking table:', testError.message);
    } else {
      console.log('✅ verification_documents table already exists!');
      
      // Test inserting and retrieving a sample document
      const testDoc = {
        provider_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID
        document_type: 'NATIONAL_ID',
        file_url: 'https://test.com/test.jpg',
        status: 'PENDING'
      };

      console.log('\n🧪 Testing table functionality...');
      
      // Try to insert (this might fail due to foreign key, which is expected)
      const { error: insertError } = await supabase
        .from('verification_documents')
        .insert([testDoc]);

      if (insertError) {
        if (insertError.message.includes('foreign key')) {
          console.log('✅ Table structure is correct (foreign key constraint working)');
        } else {
          console.log('⚠️ Insert test failed:', insertError.message);
        }
      } else {
        console.log('✅ Test document inserted successfully');
        
        // Clean up test document
        await supabase
          .from('verification_documents')
          .delete()
          .eq('provider_id', testDoc.provider_id);
        console.log('✅ Test document cleaned up');
      }
      
      console.log('\n🎉 Table is ready for use!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupTable();