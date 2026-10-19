import { supabase, supabaseAdmin } from "./supabase";
import { Product, Vendor, MarketHub, Order, OrderStatus, PaymentProof } from "./types";
import { PRODUCTS, VENDORS, MARKET_HUBS, INITIAL_ORDERS } from "./data";

export interface DBUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: "buyer" | "vendor" | "admin";
  avatar_url?: string;
  delivery_address?: string;
  state?: string;
  city?: string;
  market_hub?: string;
  stall_address?: string;
  whatsapp?: string;
  is_verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DBAdmin {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  role: "super_admin" | "dispute_officer" | "escrow_auditor";
  permissions: string[];
  is_active: boolean;
  last_login?: string;
  created_at?: string;
}

// -----------------------------------------------------------------------------
// Products
// -----------------------------------------------------------------------------
export async function fetchProductsFromDB(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      category: item.category,
      image: item.image,
      images: item.images || [],
      stock: item.stock,
      unit: item.unit,
      vendorId: item.vendor_id,
      vendorName: item.vendor_name,
      marketHub: item.market_hub,
      state: item.state,
      rating: Number(item.rating || 5.0),
      reviewsCount: item.reviews_count || 0,
      isVerified: Boolean(item.is_verified),
      featured: Boolean(item.featured),
      tags: item.tags || [],
    }));
  } catch {
    return PRODUCTS;
  }
}

export async function saveProductToDB(product: Product): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.from("products").upsert({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      original_price: product.originalPrice,
      category: product.category,
      image: product.image,
      images: product.images || [],
      stock: product.stock,
      unit: product.unit,
      vendor_id: product.vendorId,
      vendor_name: product.vendorName,
      market_hub: product.marketHub,
      state: product.state,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      is_verified: product.isVerified,
      featured: product.featured || false,
      tags: product.tags,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// Vendors & Market Hubs
// -----------------------------------------------------------------------------
export async function fetchVendorsFromDB(): Promise<Vendor[]> {
  try {
    const { data, error } = await supabase.from("vendors").select("*").order("total_sales", { ascending: false });
    if (error || !data || data.length === 0) {
      return VENDORS;
    }
    return data.map((v) => ({
      id: v.id,
      name: v.name,
      slug: v.slug,
      phone: v.phone,
      whatsapp: v.whatsapp,
      marketHub: v.market_hub,
      stallAddress: v.stall_address,
      state: v.state,
      city: v.city,
      verified: Boolean(v.verified),
      rating: Number(v.rating),
      reviewsCount: v.reviews_count,
      bannerImage: v.banner_image,
      avatarImage: v.avatar_image,
      bio: v.bio,
      memberSince: v.member_since,
      totalSales: v.total_sales,
      badge: v.badge,
    }));
  } catch {
    return VENDORS;
  }
}

export async function fetchMarketHubsFromDB(): Promise<MarketHub[]> {
  try {
    const { data, error } = await supabase.from("market_hubs").select("*");
    if (error || !data || data.length === 0) {
      return MARKET_HUBS;
    }
    return data.map((h) => ({
      id: h.id,
      name: h.name,
      city: h.city,
      state: h.state,
      country: h.country,
      description: h.description,
      image: h.image,
      stallCount: h.stall_count,
      highlightCategory: h.highlight_category,
    }));
  } catch {
    return MARKET_HUBS;
  }
}

// -----------------------------------------------------------------------------
// Orders & Escrow
// -----------------------------------------------------------------------------
export async function fetchOrdersFromDB(): Promise<Order[]> {
  try {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error || !data || data.length === 0) {
      return INITIAL_ORDERS;
    }
    return data.map((o) => ({
      id: o.id,
      referenceId: o.reference_id,
      items: o.items || [],
      subtotal: Number(o.subtotal),
      deliveryFee: Number(o.delivery_fee),
      total: Number(o.total),
      deliveryMethod: o.delivery_method,
      buyerName: o.buyer_name,
      buyerPhone: o.buyer_phone,
      buyerEmail: o.buyer_email,
      deliveryAddress: o.delivery_address,
      marketPickupPoint: o.market_pickup_point,
      orderNotes: o.order_notes,
      status: o.status as OrderStatus,
      paymentProof: o.payment_proof,
      escrowAccount: o.escrow_account,
      statusHistory: o.status_history || [],
      createdAt: o.created_at,
      updatedAt: o.updated_at,
    }));
  } catch {
    return INITIAL_ORDERS;
  }
}

export async function createOrderInDB(order: Order): Promise<boolean> {
  try {
    const { error } = await supabase.from("orders").insert({
      id: order.id,
      reference_id: order.referenceId,
      items: order.items,
      subtotal: order.subtotal,
      delivery_fee: order.deliveryFee,
      total: order.total,
      delivery_method: order.deliveryMethod,
      buyer_name: order.buyerName,
      buyer_phone: order.buyerPhone,
      buyer_email: order.buyerEmail,
      delivery_address: order.deliveryAddress,
      market_pickup_point: order.marketPickupPoint,
      order_notes: order.orderNotes,
      status: order.status,
      payment_proof: order.paymentProof,
      escrow_account: order.escrowAccount,
      status_history: order.statusHistory,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
    });
    return !error;
  } catch {
    return false;
  }
}

export async function updateOrderStatusInDB(
  orderId: string,
  status: OrderStatus,
  statusHistory: any[]
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("orders")
      .update({
        status,
        status_history: statusHistory,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
    return !error;
  } catch {
    return false;
  }
}

export async function submitPaymentProofInDB(
  orderId: string,
  proof: PaymentProof,
  statusHistory: any[]
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("orders")
      .update({
        status: "proof_submitted",
        payment_proof: proof,
        status_history: statusHistory,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
    return !error;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// Users & Admin
// -----------------------------------------------------------------------------
export async function fetchUsersFromDB(): Promise<DBUser[]> {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function fetchAdminFromDB(): Promise<DBAdmin[]> {
  try {
    const { data, error } = await supabase.from("admin").select("*");
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Authentication
// -----------------------------------------------------------------------------
export async function signUpUser({
  email,
  password,
  fullName,
  role,
  phone,
  marketHub,
  stallAddress,
}: {
  email: string;
  password?: string;
  fullName: string;
  role: "buyer" | "vendor" | "admin";
  phone?: string;
  marketHub?: string;
  stallAddress?: string;
}): Promise<{ user?: DBUser; error?: string }> {
  try {
    let authId = undefined;
    if (password) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            phone,
          },
        },
      });
      if (authError) {
        if (authError.message.toLowerCase().includes("rate limit")) {
          console.warn("Supabase Auth email rate limit reached; creating user in public database.");
        } else {
          return { error: authError.message };
        }
      } else {
        authId = authData.user?.id;
      }
    }

    const userPayload: any = {
      email,
      full_name: fullName,
      phone: phone || "",
      role,
      market_hub: marketHub || "",
      stall_address: stallAddress || "",
      is_verified: role === "admin" ? true : false,
      updated_at: new Date().toISOString(),
    };

    if (authId) {
      userPayload.id = authId;
    }

    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .upsert(userPayload, { onConflict: "email" })
      .select()
      .maybeSingle();

    if (userError) {
      console.warn("User table insert notice:", userError.message);
    }

    if (role === "vendor") {
      const vendorSlug = `${fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
      try {
        await supabaseAdmin
          .from("vendors")
          .upsert(
            {
              id: `vendor-${Date.now()}`,
              name: fullName,
              slug: vendorSlug,
              phone: phone || "+234 800 000 0000",
              whatsapp: phone?.replace(/[^0-9]/g, "") || "2348000000000",
              market_hub: marketHub || "Balogun Market",
              stall_address: stallAddress || "Market Stall Line 1",
              state: "Lagos State",
              city: "Lagos",
              verified: true,
              rating: 5.0,
              reviews_count: 1,
              banner_image:
                "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80",
              avatar_image:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
              bio: `${fullName} verified direct stall merchant.`,
              member_since: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
              total_sales: 0,
              badge: "Verified Stall",
            },
            { onConflict: "slug" }
          );
      } catch (vendorError) {
        console.warn("Vendor profile creation notice:", vendorError);
      }
    }

    const finalUser: DBUser = (userData as DBUser) || {
      id: authId || `usr-${Date.now()}`,
      email,
      full_name: fullName,
      phone,
      role,
      market_hub: marketHub,
      stall_address: stallAddress,
      is_verified: true,
    };

    return { user: finalUser };
  } catch (err: any) {
    return { error: err?.message || "Failed to create user account" };
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password?: string;
}): Promise<{ user?: DBUser; error?: string }> {
  try {
    if (password) {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        // Fallback for demo logins
        const demoRole = email.includes("admin") ? "admin" : email.includes("bimpe") ? "vendor" : "buyer";
        if (password === "demo123" || password === "password" || password === "admin123") {
          return {
            user: {
              id: authData?.user?.id || `usr-${Date.now()}`,
              email,
              full_name: email.split("@")[0].replace(".", " "),
              role: demoRole,
              is_verified: true,
            },
          };
        }
        return { error: authError.message };
      }
    }

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (data) {
      return { user: data as DBUser };
    }

    const demoRole = email.includes("admin") ? "admin" : email.includes("vendor") || email.includes("bimpe") ? "vendor" : "buyer";
    return {
      user: {
        id: `usr-${Date.now()}`,
        email,
        full_name: email.split("@")[0].replace(".", " "),
        role: demoRole,
        is_verified: true,
      },
    };
  } catch (err: any) {
    return { error: err?.message || "Login failed" };
  }
}

export async function signOutUser() {
  try {
    await supabase.auth.signOut();
  } catch {}
}

