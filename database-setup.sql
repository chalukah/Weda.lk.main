-- Supabase Database Setup for Weda.lk Provider Applications
-- Run this in your Supabase SQL Editor

-- Table: provider_applications
-- Stores all provider application submissions
CREATE TABLE IF NOT EXISTS provider_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    description TEXT NOT NULL,
    phone TEXT,
    services TEXT[] NOT NULL, -- Array of service categories
    service_areas TEXT[] NOT NULL, -- Array of districts
    experience TEXT NOT NULL,
    certifications TEXT DEFAULT '',
    languages TEXT[] NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: service_providers  
-- Stores active service provider profiles (approved applications)
CREATE TABLE IF NOT EXISTS service_providers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    business_name TEXT NOT NULL,
    description TEXT NOT NULL,
    services TEXT[] NOT NULL,
    service_areas TEXT[] NOT NULL,
    experience TEXT NOT NULL,
    certifications TEXT DEFAULT '',
    languages TEXT[] NOT NULL,
    phone TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    completed_jobs INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: users (public schema)
-- Stores user profile information
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT DEFAULT '',
    password_hash TEXT DEFAULT '',
    role TEXT DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'PROVIDER', 'ADMIN')),
    verification_status TEXT DEFAULT 'UNVERIFIED' CHECK (verification_status IN ('UNVERIFIED', 'VERIFIED')),
    needs_role_selection BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: user_profiles
-- Additional user profile information
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    first_name TEXT DEFAULT '',
    last_name TEXT DEFAULT '',
    avatar_url TEXT,
    bio TEXT DEFAULT '',
    location TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_provider_applications_user_email ON provider_applications(user_email);
CREATE INDEX IF NOT EXISTS idx_provider_applications_status ON provider_applications(status);
CREATE INDEX IF NOT EXISTS idx_service_providers_user_id ON service_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_service_providers_is_active ON service_providers(is_active);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Enable Row Level Security (RLS)
ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- provider_applications policies
CREATE POLICY "Users can view their own applications" ON provider_applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications" ON provider_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- service_providers policies  
CREATE POLICY "Anyone can view active providers" ON service_providers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Providers can view their own profile" ON service_providers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Providers can update their own profile" ON service_providers
    FOR UPDATE USING (auth.uid() = user_id);

-- users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- user_profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_provider_applications_updated_at
    BEFORE UPDATE ON provider_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at
    BEFORE UPDATE ON service_providers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();