-- ==============================================================================
-- AFRO MARKET CONNECT - SUPABASE DATABASE SCHEMA & SEED DATA
-- Project: ncansykgsvjlyimfxquq
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. USERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'vendor', 'admin')),
    avatar_url TEXT,
    delivery_address TEXT,
    state TEXT,
    city TEXT,
    market_hub TEXT,
    stall_address TEXT,
    whatsapp TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ------------------------------------------------------------------------------
-- 2. ADMIN TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'dispute_officer', 'escrow_auditor')),
    permissions TEXT[] NOT NULL DEFAULT ARRAY['verify_escrow', 'resolve_disputes', 'manage_vendors', 'system_audit'],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for admin lookups
CREATE INDEX IF NOT EXISTS idx_admin_email ON public.admin(email);
CREATE INDEX IF NOT EXISTS idx_admin_user_id ON public.admin(user_id);

-- ------------------------------------------------------------------------------
-- 3. MARKET HUBS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.market_hubs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    stall_count INTEGER NOT NULL DEFAULT 0,
    highlight_category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. VENDORS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vendors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    market_hub TEXT NOT NULL,
    stall_address TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    banner_image TEXT NOT NULL,
    avatar_image TEXT NOT NULL,
    bio TEXT NOT NULL,
    member_since TEXT NOT NULL,
    total_sales INTEGER NOT NULL DEFAULT 0,
    badge TEXT,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendors_slug ON public.vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_market ON public.vendors(market_hub);

-- ------------------------------------------------------------------------------
-- 5. PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    original_price NUMERIC(12, 2),
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    stock INTEGER NOT NULL DEFAULT 10,
    unit TEXT NOT NULL,
    vendor_id TEXT NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
    vendor_name TEXT NOT NULL,
    market_hub TEXT NOT NULL,
    state TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_vendor ON public.products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_market ON public.products(market_hub);

-- ------------------------------------------------------------------------------
-- 6. ORDERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    reference_id TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
    delivery_fee NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    delivery_method TEXT NOT NULL DEFAULT 'delivery',
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    buyer_email TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    market_pickup_point TEXT,
    order_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending_payment',
    payment_proof JSONB,
    escrow_account JSONB NOT NULL,
    status_history JSONB NOT NULL DEFAULT '[]'::JSONB,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_ref ON public.orders(reference_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(buyer_email);

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to market catalogs, vendors, products, and hubs
CREATE POLICY "Public can view market hubs" ON public.market_hubs FOR SELECT USING (true);
CREATE POLICY "Public can view vendors" ON public.vendors FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

-- Allow public and service role full order interactions
CREATE POLICY "Public can view orders by reference" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update orders" ON public.orders FOR UPDATE USING (true);

-- Allow public view & management of users & admin
CREATE POLICY "Public can view users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public can insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Public can view admins" ON public.admin FOR SELECT USING (true);
CREATE POLICY "Public can insert admins" ON public.admin FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update admins" ON public.admin FOR UPDATE USING (true);

-- ------------------------------------------------------------------------------
-- 8. INITIAL SEED DATA
-- ------------------------------------------------------------------------------

-- Seed Users
INSERT INTO public.users (id, email, full_name, phone, role, delivery_address, state, city, is_verified)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'admin@afromarket.africa', 'AfroMarket Lead Auditor', '+234 803 000 0001', 'admin', 'AfroMarket HQ, Victoria Island', 'Lagos State', 'Lagos', TRUE),
    ('22222222-2222-2222-2222-222222222222', 'mama.bimpe@balogunmarket.ng', 'Alhaja Bimpe Adeleke', '+234 802 345 6789', 'vendor', 'Stall B-14, Line 3, Balogun Market', 'Lagos State', 'Lagos Island', TRUE),
    ('33333333-3333-3333-3333-333333333333', 'chioma.okafor@gmail.com', 'Chioma Okafor', '+234 812 987 6543', 'buyer', '14 Adeola Odeku St, Victoria Island', 'Lagos State', 'Lagos', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Seed Admin
INSERT INTO public.admin (id, user_id, name, email, role, permissions, is_active)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'AfroMarket Chief Compliance & Escrow Officer',
    'admin@afromarket.africa',
    'super_admin',
    ARRAY['verify_escrow', 'resolve_disputes', 'manage_vendors', 'system_audit', 'release_payouts'],
    TRUE
)
ON CONFLICT (email) DO NOTHING;

-- Seed Market Hubs
INSERT INTO public.market_hubs (id, name, city, state, country, description, image, stall_count, highlight_category)
VALUES 
    ('balogun-market', 'Balogun Market', 'Lagos Island', 'Lagos State', 'Nigeria', 'The epicenter of West African textiles, wholesale Swiss laces, Ankara, shoes, and ready-to-wear fashion.', 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80', 4800, 'Fashion & Textiles'),
    ('wuse-market', 'Wuse Market', 'Zone 5, Abuja', 'FCT Abuja', 'Nigeria', 'Abujas premier commercial hub for premium farm spices, smoked catfish, shea butter, and grains.', 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80', 2200, 'Spices & Foodstuffs'),
    ('computer-village', 'Computer Village', 'Ikeja', 'Lagos State', 'Nigeria', 'Largest ICT hardware and electronics trading cluster in Sub-Saharan Africa. Solar, phones, laptops.', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80', 3500, 'Electronics & Solar'),
    ('ariaria-market', 'Ariaria International Market', 'Aba', 'Abia State', 'Nigeria', 'The Japan of Africa - renowned for handcrafted bespoke leather shoes, bags, and indigenous tailoring.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', 6000, 'Leather & Footwear'),
    ('kejetia-market', 'Kejetia Market', 'Kumasi', 'Ashanti Region', 'Ghana', 'Largest open-air single market structure in West Africa. Kente cloth, Ashanti gold jewelry, brass & crafts.', 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80', 8000, 'Crafts & Beads'),
    ('kariakoo-market', 'Kariakoo Market', 'Dar es Salaam', 'Ilala District', 'Tanzania', 'East Africas bustling cross-border trading center for spices, raw cashews, coffee, and Maasai beadwork.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4100, 'Wholesale & Bulk Lots')
ON CONFLICT (id) DO NOTHING;

-- Seed Vendors
INSERT INTO public.vendors (id, name, slug, phone, whatsapp, market_hub, stall_address, state, city, verified, rating, reviews_count, banner_image, avatar_image, bio, member_since, total_sales, badge)
VALUES 
    ('vendor-balogun-1', 'Mama Bimpe Luxury Fabrics', 'mama-bimpe-fabrics', '+234 802 345 6789', '2348023456789', 'Balogun Market', 'Stall B-14, Line 3, Balogun Market', 'Lagos State', 'Lagos Island', TRUE, 4.95, 142, 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'Direct importer of Swiss Voile Laces, authentic Vlisco Hollandais Ankara, and George wrappers.', 'March 2021', 1240, 'Gold Merchant'),
    ('vendor-wuse-1', 'Hajiya Amina Spice & Agro Depot', 'hajiya-amina-spices', '+234 803 765 4321', '2348037654321', 'Wuse Market', 'Shop 42, Foodstuffs Section, Wuse Market', 'FCT Abuja', 'Abuja', TRUE, 4.88, 98, 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'Authentic Northern Nigerian farm produce: unrefined cold-pressed shea butter, pure kilishi, and aromatic suya pepper.', 'November 2020', 890, 'Top Rated'),
    ('vendor-ariaria-1', 'Eze & Sons Bespoke Leatherworks', 'eze-sons-leather', '+234 805 112 2334', '2348051122334', 'Ariaria International Market', 'Line 7, Shoe Plaza, Ariaria Market', 'Abia State', 'Aba', TRUE, 4.92, 215, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'Master craftsmen of 100% genuine Italian calf leather corporate shoes, traditional half-shoes, and handcrafted belts.', 'August 2019', 2410, 'Certified Artisan'),
    ('vendor-cv-1', 'Gadget Hub & Solar Tech Africa', 'gadget-hub-solar', '+234 818 990 0112', '2348189900112', 'Computer Village', 'Otigba Street, Plaza 4, Computer Village', 'Lagos State', 'Ikeja', TRUE, 4.79, 164, 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 'Direct wholesale supplier of portable solar generators, LiFePO4 battery banks, and factory unlocked smartphones.', 'January 2022', 1570, 'Tech Verified')
ON CONFLICT (id) DO NOTHING;

-- Seed Products
INSERT INTO public.products (id, title, description, price, original_price, category, image, stock, unit, vendor_id, vendor_name, market_hub, state, rating, reviews_count, is_verified, featured, tags)
VALUES 
    ('prod-1', 'Premium Swiss Voile Lace (5 Yards)', 'Heavy embroidered hand-cut Swiss lace fabric with crystalline sequin accents. Perfect for high-society Owambe and bridal wear.', 48500.00, 58000.00, 'Fashion & Textiles', 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80', 14, 'per 5 yards', 'vendor-balogun-1', 'Mama Bimpe Luxury Fabrics', 'Balogun Market', 'Lagos State', 4.9, 38, TRUE, TRUE, ARRAY['Lace', 'Swiss Voile', 'Owambe', 'Wholesale']),
    ('prod-2', 'Authentic Vlisco Hollandais Wax Print', 'Original 6-yard Dutch Hollandais African wax block print. Guaranteed 100% colorfast cotton, distinct crisp wax aroma.', 29500.00, 35000.00, 'Fashion & Textiles', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 25, 'per 6 yards', 'vendor-balogun-1', 'Mama Bimpe Luxury Fabrics', 'Balogun Market', 'Lagos State', 4.95, 62, TRUE, TRUE, ARRAY['Ankara', 'Vlisco', 'Hollandais', 'Cotton']),
    ('prod-3', 'Grade-A Raw Organic Northern Shea Butter (2kg)', 'Unrefined, cold-pressed golden shea butter harvested directly from Niger and Kwara trees. Naturally rich in Vitamins A, E & F.', 7500.00, 9500.00, 'Beauty & Natural Oils', 'https://images.unsplash.com/photo-1608248597359-467610a71994?auto=format&fit=crop&w=800&q=80', 80, 'per 2kg bucket', 'vendor-wuse-1', 'Hajiya Amina Spice & Agro Depot', 'Wuse Market', 'FCT Abuja', 4.88, 45, TRUE, TRUE, ARRAY['Shea Butter', 'Organic', 'Skincare', 'Northern Produce']),
    ('prod-4', 'Original Handmade Italian Calfskin Loafers', '100% genuine full-grain leather, hand-lasted and Goodyear-welted by Master Artisans in Aba shoe cluster. Cushioned orthopedic insole.', 32000.00, 42000.00, 'Leather & Footwear', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80', 18, 'per pair', 'vendor-ariaria-1', 'Eze & Sons Bespoke Leatherworks', 'Ariaria International Market', 'Abia State', 4.92, 89, TRUE, TRUE, ARRAY['Leather Shoes', 'Loafers', 'Aba Made', 'Calfskin']),
    ('prod-5', '500W Portable Lithium Solar Generator', 'Compact plug-and-play solar power station with AC 220V inverter, pure sine wave, 2x USB-C fast charge, and LED emergency lamp.', 165000.00, 195000.00, 'Electronics & Solar', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80', 8, 'per unit', 'vendor-cv-1', 'Gadget Hub & Solar Tech Africa', 'Computer Village', 'Lagos State', 4.85, 31, TRUE, TRUE, ARRAY['Solar', 'Generator', 'Power Bank', 'Inverter'])
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Escrow Orders
INSERT INTO public.orders (id, reference_id, items, subtotal, delivery_fee, total, delivery_method, buyer_name, buyer_phone, buyer_email, delivery_address, status, escrow_account, status_history)
VALUES (
    'order-seed-1',
    'AFRO-2026-8821',
    '[{"product": {"id": "prod-1", "title": "Premium Swiss Voile Lace (5 Yards)", "price": 48500, "vendorName": "Mama Bimpe Luxury Fabrics"}, "quantity": 1, "unitPrice": 48500}]'::JSONB,
    48500.00,
    3500.00,
    52000.00,
    'delivery',
    'Chioma Okafor',
    '+234 812 987 6543',
    'chioma.okafor@gmail.com',
    '14 Adeola Odeku St, Victoria Island, Lagos',
    'escrow_verified',
    '{"bankName": "Access Bank Plc", "accountNumber": "1489023419", "accountName": "AfroMarket Connect Escrow Services Ltd"}'::JSONB,
    '[{"status": "pending_payment", "timestamp": "2026-09-28T09:15:00Z", "note": "Order placed with Escrow Lock", "actor": "buyer"}, {"status": "escrow_verified", "timestamp": "2026-09-28T10:45:00Z", "note": "Bank transfer verified. NGN 52,000 locked in trust.", "actor": "admin"}]'::JSONB
)
ON CONFLICT (reference_id) DO NOTHING;
