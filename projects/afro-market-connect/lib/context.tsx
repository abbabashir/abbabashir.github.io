"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CartItem,
  EscrowAccount,
  MarketHub,
  Order,
  OrderStatus,
  PaymentProof,
  Product,
  ProductCategory,
  UserRole,
  Vendor,
  AuthUser,
} from "./types";
import {
  ESCROW_ACCOUNTS,
  INITIAL_ORDERS,
  MARKET_HUBS,
  PRODUCTS,
  VENDORS,
} from "./data";
import {
  fetchProductsFromDB,
  fetchVendorsFromDB,
  fetchMarketHubsFromDB,
  fetchOrdersFromDB,
  createOrderInDB,
  updateOrderStatusInDB,
  submitPaymentProofInDB,
  saveProductToDB,
  signOutUser,
} from "./db";

interface MarketplaceContextType {
  // Auth & Roles
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Products & Vendors
  products: Product[];
  vendors: Vendor[];
  marketHubs: MarketHub[];
  addProduct: (product: Omit<Product, "id" | "rating" | "reviewsCount">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedMarket: string;
  setSelectedMarket: (market: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;

  // Low bandwidth mode
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (enabled: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders & Escrow
  orders: Order[];
  createOrder: (data: {
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    deliveryAddress: string;
    deliveryMethod: "delivery" | "market_pickup";
    marketPickupPoint?: string;
    orderNotes?: string;
    escrowAccount?: EscrowAccount;
  }) => Order;
  submitPaymentProof: (orderId: string, proof: PaymentProof) => void;
  verifyEscrow: (orderId: string, note?: string) => void;
  rejectEscrow: (orderId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note: string, actor: "buyer" | "vendor" | "admin" | "system") => void;
  getOrderById: (idOrRef: string) => Order | undefined;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "afromarket_products_v1",
  ORDERS: "afromarket_orders_v1",
  CART: "afromarket_cart_v1",
  ROLE: "afromarket_role_v1",
  LOW_DATA: "afromarket_low_data_v1",
  USER: "afromarket_user_v1",
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("buyer");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [marketHubs, setMarketHubs] = useState<MarketHub[]>(MARKET_HUBS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const logout = async () => {
    await signOutUser();
    setCurrentUser(null);
    setCurrentRole("buyer");
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.setItem(STORAGE_KEYS.ROLE, "buyer");
    } catch {}
  };

  // Load from Supabase and sync with localStorage on client mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (savedRole && (savedRole === "buyer" || savedRole === "vendor" || savedRole === "admin")) {
        setCurrentRole(savedRole as UserRole);
      }

      const savedLowData = localStorage.getItem(STORAGE_KEYS.LOW_DATA);
      if (savedLowData) setLowBandwidthMode(JSON.parse(savedLowData));
    } catch {
      // ignore SSR or parse errors
    }

    // Live data fetch from Supabase
    Promise.all([
      fetchProductsFromDB(),
      fetchVendorsFromDB(),
      fetchMarketHubsFromDB(),
      fetchOrdersFromDB(),
    ])
      .then(([dbProducts, dbVendors, dbHubs, dbOrders]) => {
        if (dbProducts && dbProducts.length > 0) setProducts(dbProducts);
        if (dbVendors && dbVendors.length > 0) setVendors(dbVendors);
        if (dbHubs && dbHubs.length > 0) setMarketHubs(dbHubs);
        if (dbOrders && dbOrders.length > 0) setOrders(dbOrders);
      })
      .catch((err) => {
        console.warn("Supabase fetch notice:", err);
      });
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
    } catch {}
  }, [currentRole]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOW_DATA, JSON.stringify(lowBandwidthMode));
    } catch {}
  }, [lowBandwidthMode]);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, unitPrice: product.price }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Products
  const addProduct = (newProd: Omit<Product, "id" | "rating" | "reviewsCount">) => {
    const id = `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => [product, ...prev]);
    saveProductToDB(product).catch(() => {});
    return product;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod));
      const target = updated.find((p) => p.id === id);
      if (target) saveProductToDB(target).catch(() => {});
      return updated;
    });
  };

  // Orders & Escrow
  const createOrder = ({
    buyerName,
    buyerPhone,
    buyerEmail,
    deliveryAddress,
    deliveryMethod,
    marketPickupPoint,
    orderNotes,
    escrowAccount = ESCROW_ACCOUNTS[0],
  }: {
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    deliveryAddress: string;
    deliveryMethod: "delivery" | "market_pickup";
    marketPickupPoint?: string;
    orderNotes?: string;
    escrowAccount?: EscrowAccount;
  }): Order => {
    const subtotal = cartTotal;
    const deliveryFee = deliveryMethod === "delivery" ? 3500 : 0;
    const total = subtotal + deliveryFee;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `AFRO-2026-${randomSuffix}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      referenceId,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      deliveryMethod,
      buyerName,
      buyerPhone,
      buyerEmail,
      deliveryAddress,
      marketPickupPoint,
      orderNotes,
      status: "pending_payment",
      escrowAccount,
      statusHistory: [
        {
          status: "pending_payment",
          timestamp: now,
          note: `Order created. Official Escrow Account generated (${escrowAccount.bankName} - ${escrowAccount.accountNumber}).`,
          actor: "system",
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    createOrderInDB(newOrder).catch(() => {});
    return newOrder;
  };

  const submitPaymentProof = (orderId: string, proof: PaymentProof) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.referenceId === orderId) {
          const newHistory = [
            ...order.statusHistory,
            {
              status: "proof_submitted" as OrderStatus,
              timestamp: now,
              note: `Buyer uploaded transfer proof (${proof.senderBank} / Ref: ${proof.transactionReference}). Awaiting Super Admin escrow confirmation.`,
              actor: "buyer" as const,
            },
          ];
          submitPaymentProofInDB(order.id, proof, newHistory).catch(() => {});
          return {
            ...order,
            status: "proof_submitted",
            paymentProof: proof,
            updatedAt: now,
            statusHistory: newHistory,
          };
        }
        return order;
      })
    );
  };

  const verifyEscrow = (orderId: string, note: string = "Payment transfer verified in Escrow Custody Account.") => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.referenceId === orderId) {
          const newHistory = [
            ...order.statusHistory,
            {
              status: "escrow_verified" as OrderStatus,
              timestamp: now,
              note: `Super Admin confirmed escrow deposit: ${note}. Merchant notified to dispatch order.`,
              actor: "admin" as const,
            },
          ];
          updateOrderStatusInDB(order.id, "escrow_verified", newHistory).catch(() => {});
          return {
            ...order,
            status: "escrow_verified",
            updatedAt: now,
            paymentProof: order.paymentProof
              ? { ...order.paymentProof, adminVerificationNote: note }
              : undefined,
            statusHistory: newHistory,
          };
        }
        return order;
      })
    );
  };

  const rejectEscrow = (orderId: string, reason: string) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.referenceId === orderId) {
          const newHistory = [
            ...order.statusHistory,
            {
              status: "pending_payment" as OrderStatus,
              timestamp: now,
              note: `Payment proof rejected by Admin: ${reason}. Please resubmit valid bank transfer proof.`,
              actor: "admin" as const,
            },
          ];
          updateOrderStatusInDB(order.id, "pending_payment", newHistory).catch(() => {});
          return {
            ...order,
            status: "pending_payment",
            updatedAt: now,
            paymentProof: undefined,
            statusHistory: newHistory,
          };
        }
        return order;
      })
    );
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note: string,
    actor: "buyer" | "vendor" | "admin" | "system"
  ) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.referenceId === orderId) {
          const newHistory = [
            ...order.statusHistory,
            {
              status,
              timestamp: now,
              note,
              actor,
            },
          ];
          updateOrderStatusInDB(order.id, status, newHistory).catch(() => {});
          return {
            ...order,
            status,
            updatedAt: now,
            statusHistory: newHistory,
          };
        }
        return order;
      })
    );
  };

  const getOrderById = (idOrRef: string) => {
    return orders.find(
      (o) => o.id === idOrRef || o.referenceId.toLowerCase() === idOrRef.toLowerCase()
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        currentRole,
        setCurrentRole,
        products,
        vendors,
        marketHubs,
        addProduct,
        updateProduct,
        searchQuery,
        setSearchQuery,
        selectedMarket,
        setSelectedMarket,
        selectedCategory,
        setSelectedCategory,
        verifiedOnly,
        setVerifiedOnly,
        priceRange,
        setPriceRange,
        lowBandwidthMode,
        setLowBandwidthMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        createOrder,
        submitPaymentProof,
        verifyEscrow,
        rejectEscrow,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};
