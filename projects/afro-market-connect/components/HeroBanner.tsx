"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import {
  ShieldCheck,
  Store,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

export const HeroBanner: React.FC = () => {
  const { setCurrentRole } = useMarketplace();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E6] to-[#FDF6E3] py-8 sm:py-14 border-b border-brand-border">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#CC5500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 text-left space-y-4">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#128C7E] text-xs font-black shadow-xs">
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>For WhatsApp Sellers & Independent Makers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#262626] tracking-tight leading-[1.12]">
              Grow Beyond Your <span className="text-[#128C7E]">WhatsApp Status</span>. Reach Customers Worldwide.
            </h1>

            <p className="text-sm sm:text-base text-gray-700 max-w-xl leading-relaxed">
              Tired of being limited to 50–200 views on your WhatsApp status and family groups? 
              AfroMarket gives small batch creators, home-kitchen spice makers, thrift curators, and independent artisans a{" "}
              <strong className="text-gray-900">verified storefront</strong> with{" "}
              <span className="text-[#CC5500] font-black">Escrow Protection</span> so new customers buy without fear.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="px-6 py-3.5 rounded-xl bg-[#1A4D3A] hover:bg-[#13382A] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Discover Small Businesses</span>
                <ArrowRight className="w-4 h-4 text-[#FFD700]" />
              </a>

              <Link
                href="/signup?role=vendor"
                onClick={() => setCurrentRole("vendor")}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#128C7E] border-2 border-[#25D366]/60 font-bold text-sm shadow-sm flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>List Your WhatsApp Store Free</span>
              </Link>
            </div>

            {/* Value Props Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-brand-border/60 text-xs">
              <div className="flex items-center gap-2 text-gray-800">
                <Users className="w-4 h-4 text-[#128C7E] shrink-0" />
                <span className="font-semibold">Expand Past Contact Lists</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <ShieldCheck className="w-4 h-4 text-[#1A4D3A] shrink-0" />
                <span className="font-semibold">Zero "Pay-on-Delivery" Scam</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Share2 className="w-4 h-4 text-[#CC5500] shrink-0" />
                <span className="font-semibold">1-Click WhatsApp Sharing</span>
              </div>
            </div>
          </div>

          {/* Social Commerce Escrow Protocol Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-elevated border-2 border-[#128C7E]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#25D366] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>WhatsApp Escrow Trust</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#128C7E] font-bold">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-gray-900 leading-tight">
                    How We Help WhatsApp Sellers Close Deals
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Buyers pay with trust. Small businesses ship with certainty.
                  </p>
                </div>
              </div>

              {/* 3 Step Flow */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FDF6E3] border border-brand-border/60">
                  <span className="w-5 h-5 rounded-full bg-[#128C7E] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Share Your Storefront Link</span>
                    <span className="text-gray-600 text-[11px]">Drop your verified catalog on your WhatsApp status, broadcast lists, and Instagram bio.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <span className="w-5 h-5 rounded-full bg-[#CC5500] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Customer Locks Payment in Escrow</span>
                    <span className="text-gray-600 text-[11px]">Strangers who don't know you personally pay securely. Funds are held in neutral bank custody.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="w-5 h-5 rounded-full bg-[#1A4D3A] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Dispatch on WhatsApp & Get Paid</span>
                    <span className="text-gray-600 text-[11px]">Send tracking or waybill screenshot on WhatsApp. Once buyer receives item, payout is released immediately.</span>
                  </div>
                </div>
              </div>

              {/* Small Seller Quote */}
              <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  alt="Adunni Spices"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#25D366]"
                />
                <div className="text-[11px] leading-tight">
                  <p className="text-gray-800 font-semibold italic">
                    "My WhatsApp status views were 120. Now I get orders from Abuja, Port Harcourt, and diaspora!"
                  </p>
                  <p className="text-gray-500 text-[10px] mt-0.5">
                    — <strong>Adunni</strong>, Home-Kitchen Spice Maker
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
