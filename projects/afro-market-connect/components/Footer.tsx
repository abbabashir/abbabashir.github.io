"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#13382A] text-gray-300 pt-12 pb-8 border-t border-[#1A4D3A] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Col 1: About & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#1A4D3A] text-[#FFD700] flex items-center justify-center font-black text-base border border-[#FFD700]/40">
                AM
              </div>
              <span className="text-base font-black text-white tracking-tight">
                Afro<span className="text-[#FFD700]">Market</span>{" "}
                <span className="text-[#CC5500]">Connect</span>
              </span>
            </div>

            <p className="text-gray-300/80 text-xs leading-relaxed max-w-sm">
              Empowering independent small businesses, thrift curators, home artisans, and WhatsApp status merchants to reach customers nationwide with guaranteed escrow safety and zero unpaid deliveries.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#0e271d] border border-[#28634e] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div className="text-[11px] text-gray-300">
                <span className="font-bold text-[#FFD700] block">Official Escrow Trust Accounts:</span>
                Access Bank (1489023419) • Zenith Bank (1019847291)
              </div>
            </div>
          </div>

          {/* Col 2: Major Markets */}
          <div>
            <h4 className="text-[#FFD700] font-black text-xs uppercase tracking-wider mb-3">
              Maker Communities
            </h4>
            <ul className="space-y-2 text-gray-300/80">
              <li>
                <Link href="/#explore" className="hover:text-[#FFD700] transition-colors">
                  Home Artisan Kitchens & Spices
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-[#FFD700] transition-colors">
                  Lagos Thrift & Vintage Curators
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-[#FFD700] transition-colors">
                  Natural Botanicals & Skincare
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-[#FFD700] transition-colors">
                  Handmade Beadwork & Fashion
                </Link>
              </li>
              <li>
                <Link href="/#markets" className="text-gray-400 hover:text-white transition-colors text-[11px]">
                  View Sourcing Hubs (Balogun, Aba) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Escrow & Workflows */}
          <div>
            <h4 className="text-[#FFD700] font-black text-xs uppercase tracking-wider mb-3">
              Escrow Protection
            </h4>
            <ul className="space-y-2 text-gray-300/80">
              <li>
                <Link href="/escrow" className="hover:text-[#FFD700] transition-colors">
                  How Escrow Works
                </Link>
              </li>
              <li>
                <Link href="/orders/track" className="hover:text-[#FFD700] transition-colors">
                  Track Order & Payment Proof
                </Link>
              </li>
              <li>
                <Link href="/escrow#disputes" className="hover:text-[#FFD700] transition-colors">
                  Dispute Resolution Policy
                </Link>
              </li>
              <li>
                <Link href="/escrow#banks" className="hover:text-[#FFD700] transition-colors">
                  Verified Escrow Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Admin */}
          <div>
            <h4 className="text-[#FFD700] font-black text-xs uppercase tracking-wider mb-3">
              WhatsApp Merchants
            </h4>
            <ul className="space-y-2 text-gray-300/80">
              <li>
                <Link href="/dashboard/vendor" className="text-[#25D366] hover:text-[#FFD700] transition-colors font-bold">
                  Merchant WhatsApp Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vendor/adunni-artisan-spices" className="hover:text-[#FFD700] transition-colors">
                  Live Artisan Storefront
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="text-amber-400 hover:text-white transition-colors font-bold">
                  Admin Escrow Verification
                </Link>
              </li>
              <li>
                <span className="inline-block mt-2 px-2.5 py-1 rounded bg-[#0e271d] text-[#25D366] text-[10px] font-mono border border-[#25D366]/30">
                  WhatsApp Commerce Ready
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1A4D3A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>
            © {new Date().getFullYear()} AfroMarket Connect. Built for independent creators, thrift curators, and WhatsApp status merchants.
          </p>
          <div className="flex items-center gap-4">
            <span>Optimized for low-bandwidth mobile devices</span>
            <span>•</span>
            <span>Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
