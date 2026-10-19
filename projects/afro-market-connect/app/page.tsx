"use client";

import React, { useMemo } from "react";
import { useMarketplace } from "@/lib/context";
import { HeroBanner } from "@/components/HeroBanner";
import { MarketHubSelector } from "@/components/MarketHubSelector";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Share2,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const {
    products,
    searchQuery,
    selectedMarket,
    selectedCategory,
    verifiedOnly,
    priceRange,
  } = useMarketplace();

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesVendor = prod.vendorName.toLowerCase().includes(q);
        const matchesHub = prod.marketHub.toLowerCase().includes(q);
        const matchesTag = prod.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesVendor && !matchesHub && !matchesTag) {
          return false;
        }
      }

      // Market filter
      if (selectedMarket !== "all" && prod.marketHub !== selectedMarket) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && prod.category !== selectedCategory) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !prod.isVerified) {
        return false;
      }

      // Price filter
      if (prod.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedMarket, selectedCategory, verifiedOnly, priceRange]);

  return (
    <div className="min-h-screen">
      {/* 1. Value Proposition Hero */}
      <HeroBanner />

      {/* 2. Interactive Market Hubs */}
      <MarketHubSelector />

      {/* 3. Main Marketplace Discovery Grid */}
      <section id="products" className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Independent Creators & Small Businesses</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {selectedMarket === "all" ? "Discover Verified WhatsApp & Social Sellers" : `${selectedMarket} Catalog`}
            </h2>
          </div>

          <div className="text-xs font-semibold text-gray-500">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> items from independent makers & micro-merchants
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-brand-border shadow-subtle max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-brand-tangerine flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No items match your criteria</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Try adjusting your price slider, clearing the search keyword, or selecting "Show All Creators & Sellers".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Why Independent Small Businesses & WhatsApp Shoppers Choose AfroMarket */}
      <section className="py-12 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#128C7E] uppercase tracking-wider">
              Empowering Small Sellers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Why WhatsApp Sellers & Everyday Shoppers Trust Us
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Breaking small businesses out of the 50-view contact list trap with verified storefronts and safe escrow trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#FDF6E3] border border-brand-border relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/15 text-brand-blue flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#1A4D3A]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Escrow Bridges the Trust Gap
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Strangers won't pay upfront to a WhatsApp account they don't know, and sellers can't afford "pay on delivery" rejection losses. Our escrow locks funds safely, giving both sides total peace of mind.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#FDF6E3] border border-brand-border relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Effortless WhatsApp Integration
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Keep selling where you are comfortable. In one tap, share your verified storefront link to your WhatsApp Status, Instagram bio, or community groups, and chat directly with buyers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#FDF6E3] border border-brand-border relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#CC5500]/15 text-[#CC5500] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Outreach Beyond Your Contact List
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Small home-kitchen cooks, thrift curators, and craft makers gain discoverability across whole cities, states, and the diaspora, transforming a small hobby into a thriving business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
