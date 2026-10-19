export type MarketHub = {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  description: string;
  image: string;
  stallCount: number;
  highlightCategory: string;
};

export type Vendor = {
  id: string;
  name: string;
  slug: string;
  phone: string;
  whatsapp: string;
  marketHub: string;
  stallAddress: string;
  state: string;
  city: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  bannerImage: string;
  avatarImage: string;
  bio: string;
  memberSince: string;
  totalSales: number;
  badge?: string;
  businessType?: "Independent Maker" | "Home-Based Business" | "WhatsApp Boutique" | "Artisan Studio" | "Market Stall";
  instagram?: string;
  story?: string;
};

export type ProductCategory = 
  | "Fashion & Textiles"
  | "Spices & Foodstuffs"
  | "Beauty & Natural Oils"
  | "Electronics & Solar"
  | "Leather & Footwear"
  | "Crafts & Beads"
  | "Wholesale & Bulk Lots";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // in NGN
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  images?: string[];
  stock: number;
  unit: string;
  vendorId: string;
  vendorName: string;
  marketHub: string;
  state: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  featured?: boolean;
  tags: string[];
  businessType?: string;
  isSmallBatch?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type EscrowAccount = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  sortCode: string;
  ussdCode: string;
  instructions: string;
};

export type OrderStatus =
  | "pending_payment"
  | "proof_submitted"
  | "escrow_verified"
  | "dispatched"
  | "delivered"
  | "completed"
  | "disputed";

export type PaymentProof = {
  receiptUrl: string;
  senderBank: string;
  senderAccountName: string;
  transactionReference: string;
  transferTimestamp: string;
  uploadedAt: string;
  adminVerificationNote?: string;
};

export type Order = {
  id: string;
  referenceId: string; // e.g. AFRO-2026-9281
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: "delivery" | "market_pickup";
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  deliveryAddress: string;
  marketPickupPoint?: string;
  orderNotes?: string;
  status: OrderStatus;
  paymentProof?: PaymentProof;
  escrowAccount: EscrowAccount;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
    actor: "buyer" | "admin" | "vendor" | "system";
  }[];
  createdAt: string;
  updatedAt: string;
};

export type UserRole = "buyer" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  marketHub?: string;
  stallAddress?: string;
};
