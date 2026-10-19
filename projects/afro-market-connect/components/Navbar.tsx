"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarketplace } from "@/lib/context";
import {
  ShoppingBag,
  Search,
  MapPin,
  ShieldCheck,
  Store,
  Wifi,
  WifiOff,
  User,
  LogIn,
  LogOut,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentUser,
    logout,
    currentRole,
    setCurrentRole,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    selectedMarket,
    setSelectedMarket,
    marketHubs,
    lowBandwidthMode,
    setLowBandwidthMode,
  } = useMarketplace();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-border shadow-subtle">
      {/* Top Utility & Role Switcher Bar */}
      <div className="bg-[#1A4D3A] text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Security Guarantee Notice */}
          <div className="flex items-center gap-2 font-medium text-[#FFD700]">
            <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
            <span>💬 Empowering WhatsApp Sellers & Independent African Creators with Guaranteed Escrow</span>
          </div>

          {/* Quick Role Switcher for evaluation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#13382A] rounded-full p-0.5 border border-[#28634e]">
              <span className="text-[#E8EFEA]/80 px-2 font-semibold text-[11px] hidden sm:inline">Role:</span>
              <button
                onClick={() => setCurrentRole("buyer")}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  currentRole === "buyer"
                    ? "bg-[#CC5500] text-white shadow-sm font-bold"
                    : "text-gray-200 hover:text-white"
                }`}
                title="Switch to Shopper (Buyer) view"
              >
                Shopper
              </button>
              <button
                onClick={() => setCurrentRole("vendor")}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  currentRole === "vendor"
                    ? "bg-[#CC5500] text-white shadow-sm font-bold"
                    : "text-gray-200 hover:text-white"
                }`}
                title="Switch to Small Business Seller view"
              >
                Seller
              </button>
              <button
                onClick={() => setCurrentRole("admin")}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  currentRole === "admin"
                    ? "bg-[#FFD700] text-[#1A4D3A] font-black shadow-sm"
                    : "text-gray-200 hover:text-white"
                }`}
                title="Switch to Super Admin view"
              >
                Admin
              </button>
            </div>

            {/* Low-bandwidth toggle */}
            <button
              onClick={() => setLowBandwidthMode(!lowBandwidthMode)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border transition-colors ${
                lowBandwidthMode
                  ? "bg-[#13382A] border-[#FFD700] text-[#FFD700]"
                  : "bg-[#13382A] border-[#28634e] text-gray-200 hover:text-white"
              }`}
              title="Toggle Low Bandwidth Mode for slow 2G/3G connections"
            >
              {lowBandwidthMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{lowBandwidthMode ? "Low Data ON" : "Low Data OFF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#128C7E] to-[#0D6357] text-[#FFD700] flex items-center justify-center font-black text-xl shadow-md border-2 border-[#25D366] group-hover:scale-105 transition-transform">
              AM
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#333333] block leading-tight">
                Afro<span className="text-[#128C7E]">Market</span>{" "}
                <span className="text-[#CC5500] text-base font-black">Connect</span>
              </span>
              <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase block">
                WhatsApp Commerce & Makers
              </span>
            </div>
          </Link>

          {/* Search Bar & Market Hub Selector (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl bg-[#FDF6E3] border border-brand-border rounded-xl p-1.5 shadow-inner">
            {/* Market Hub Select */}
            <div className="flex items-center gap-1.5 px-3 border-r border-gray-300 text-xs font-semibold text-gray-700 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#128C7E]" />
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-gray-800 focus:ring-0 cursor-pointer outline-none"
                aria-label="Filter by Hub"
              >
                <option value="all">All Maker Hubs</option>
                {marketHubs.map((hub) => (
                  <option key={hub.id} value={hub.name}>
                    {hub.name} ({hub.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Live Autocomplete Search Input */}
            <div className="relative flex-1 flex items-center px-3">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search homemade spices, vintage thrift, beadwork, handmade skincare, footwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#333333] placeholder-gray-500 border-none outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 px-1 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* User & Role Shortcuts & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentRole === "vendor" ? (
              <Link
                href="/dashboard/vendor"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/15 text-[#128C7E] border border-[#25D366]/40 text-xs font-bold hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">My Storefront</span>
              </Link>
            ) : currentRole === "admin" ? (
              <Link
                href="/dashboard/admin"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold hover:bg-purple-700 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Admin Escrow Hub</span>
              </Link>
            ) : (
              <Link
                href="/signup?role=vendor"
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#128C7E] hover:text-[#CC5500] transition-colors px-2 py-1.5"
              >
                <Store className="w-4 h-4 text-[#CC5500]" />
                <span>Sell on WhatsApp & Web</span>
              </Link>
            )}

            {/* User Auth Profile or Sign In Link */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-[#FDF6E3] border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#1A4D3A] text-white flex items-center justify-center font-bold text-[10px]">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="hidden lg:block text-left leading-none">
                  <div className="font-bold text-gray-900 truncate max-w-[90px]">
                    {currentUser.fullName.split(" ")[0]}
                  </div>
                  <div className="text-[9px] text-[#CC5500] font-semibold capitalize mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="ml-1 text-gray-400 hover:text-red-600 transition-colors p-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:text-[#1A4D3A] hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-[#1A4D3A]" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1A4D3A] hover:bg-[#13382A] text-white font-bold text-sm transition-colors shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFD700]" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#CC5500] text-white text-[11px] font-black rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 lg:hidden flex items-center bg-[#FDF6E3] border border-brand-border rounded-xl p-1.5">
          <Search className="w-4 h-4 text-gray-400 ml-2 mr-1" />
          <input
            type="text"
            placeholder="Search Balogun laces, spices, gadgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#333333] placeholder-gray-500 border-none outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick Nav Links Strip */}
      <nav className="bg-[#FAF4E6] border-t border-brand-border/60 px-4 sm:px-6 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-gray-700 min-w-max gap-6">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className={`hover:text-[#1A4D3A] transition-colors ${
                pathname === "/" ? "text-[#1A4D3A] font-black" : ""
              }`}
            >
              Marketplace Home
            </Link>
            <Link
              href="/#markets"
              className="hover:text-[#1A4D3A] transition-colors"
            >
              Commercial Hubs (Lagos, Abuja, Aba, Onitsha)
            </Link>
            <Link
              href="/vendor/balogun-royal-textiles"
              className="hover:text-[#1A4D3A] transition-colors"
            >
              Featured Stall (Balogun Textiles)
            </Link>
            <Link
              href="/escrow"
              className="hover:text-[#1A4D3A] transition-colors text-[#1A4D3A] flex items-center gap-1 font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A4D3A]" />
              How Escrow Works
            </Link>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <Link
              href="/orders/track"
              className="hover:text-[#1A4D3A] transition-colors font-medium"
            >
              Track Order / Escrow Status
            </Link>
            <Link
              href="/dashboard/admin"
              className="hover:text-[#CC5500] transition-colors font-bold text-[#1A4D3A]"
            >
              Super Admin Console
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
