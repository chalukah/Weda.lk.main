# Verification Documents Table Setup Guide

## Setup Instructions

The `verification_documents` table has been pre-configured in your `database-setup.sql` file. Follow these steps to set it up in Supabase:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `kxkkquyymbqgwkbxralz`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Execute the Setup SQL**

   Copy and paste the following SQL into the editor and click "Run":

   ```sql
   -- Create verification_documents table with all features
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

   -- Create indexes for better performance
   CREATE INDEX IF NOT EXISTS idx_verification_documents_provider_id ON verification_documents(provider_id);
   CREATE INDEX IF NOT EXISTS idx_verification_documents_status ON verification_documents(status);
   CREATE INDEX IF NOT EXISTS idx_verification_documents_document_type ON verification_documents(document_type);

   -- Enable Row Level Security
   ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

   -- Create or replace the update function (if not exists)
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = NOW();
       RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   -- Create trigger for automatic updated_at updates
   DROP TRIGGER IF EXISTS update_verification_documents_updated_at ON verification_documents;
   CREATE TRIGGER update_verification_documents_updated_at
       BEFORE UPDATE ON verification_documents
       FOR EACH ROW
       EXECUTE FUNCTION update_updated_at_column();

   -- Drop existing policies to avoid conflicts
   DROP POLICY IF EXISTS "Providers can view their own documents" ON verification_documents;
   DROP POLICY IF EXISTS "Providers can insert their own documents" ON verification_documents;
   DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
   DROP POLICY IF EXISTS "Admins can update all documents" ON verification_documents;

   -- Create RLS policies
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
   ```

### Option 2: Using Existing Database Setup File

Alternatively, you can run your complete `database-setup.sql` file which already includes the verification_documents table:

1. Open Supabase Dashboard → SQL Editor
2. Copy the contents of `database-setup.sql`
3. Paste and run the entire script

## Table Schema Details

### Fields

- **id**: UUID primary key (auto-generated)
- **provider_id**: References auth.users(id), cascades on delete
- **document_type**: Enum with values:
  - `NATIONAL_ID`
  - `POLICE_CLEARANCE`
  - `BUSINESS_REGISTRATION`
  - `PROFESSIONAL_CERTIFICATE`
  - `INSURANCE`
  - `TAX_REGISTRATION`
  - `PASSPORT`
- **file_url**: URL to the uploaded document (required)
- **status**: Enum with values:
  - `PENDING` (default)
  - `VERIFIED`
  - `REJECTED`
- **reviewed_at**: Timestamp when document was reviewed
- **reviewed_by**: UUID of admin who reviewed the document
- **expiry_date**: Optional expiry date for the document
- **created_at**: Auto-generated timestamp
- **updated_at**: Auto-updated timestamp

### Indexes Created

- `idx_verification_documents_provider_id` - For queries by provider
- `idx_verification_documents_status` - For queries by status
- `idx_verification_documents_document_type` - For queries by document type

### Security (Row Level Security)

- **Providers**: Can view and insert only their own documents
- **Admins**: Can view and update all documents
- **Public**: No access (secure by default)

## Usage Examples

### TypeScript/JavaScript Usage

```typescript
// Insert a new document (as provider)
const { data, error } = await supabase.from('verification_documents').insert({
  provider_id: user.id,
  document_type: 'NATIONAL_ID',
  file_url: 'https://example.com/document.jpg',
})

// Get provider's documents
const { data, error } = await supabase
  .from('verification_documents')
  .select('*')
  .eq('provider_id', user.id)

// Update document status (as admin)
const { data, error } = await supabase
  .from('verification_documents')
  .update({
    status: 'VERIFIED',
    reviewed_at: new Date().toISOString(),
    reviewed_by: admin.id,
  })
  .eq('id', documentId)
```

## Verification

After running the setup, you can verify it worked by running:

```bash
node verify-db.js
```

This will check if the table exists and is properly configured.

## Environment Variables Used

The setup uses these environment variables from your `.env.local`:

- `SUPABASE_URL`: https://kxkkquyymbqgwkbxralz.supabase.co
- `SUPABASE_SERVICE_ROLE_KEY`: (your service role key)

## Troubleshooting

If you encounter issues:

1. Ensure all prerequisite tables (`users`, `auth.users`) exist
2. Check that RLS is properly enabled
3. Verify the user has proper role (`ADMIN`) for admin operations
4. Check browser network tab for detailed error messages

## Next Steps

After setting up the table, you can:

1. Integrate document upload functionality in your provider application
2. Create admin interface for document review
3. Add email notifications for status changes
4. Implement automatic expiry date checking
