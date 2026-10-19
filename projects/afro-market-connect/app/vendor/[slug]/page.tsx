"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { ProductCard } from "@/components/ProductCard";
import {
  Store,
  MapPin,
  CheckCircle2,
  Star,
  MessageCircle,
  Share2,
  ShieldCheck,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Instagram,
  HeartHandshake,
} from "lucide-react";

export default function VendorStorefrontPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { vendors, products, lowBandwidthMode } = useMarketplace();

  // Match vendor by slug or id
  const vendor =
    vendors.find((v) => v.slug === slug || v.id === slug) || vendors[0];

  const vendorProducts = products.filter(
    (p) => p.vendorId === vendor.id || p.vendorName === vendor.name
  );

  const [copiedStoreLink, setCopiedStoreLink] = useState(false);

  const handleCopyStoreLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedStoreLink(true);
      setTimeout(() => setCopiedStoreLink(false), 2000);
    }
  };

  const handleShareToWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        `Check out ${vendor.name} on AfroMarket Connect! Shop their verified products with safe Escrow Protection: ${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const whatsappInquiry = encodeURIComponent(
    `Hello ${vendor.name}! I am browsing your verified storefront on AfroMarket Connect. I'd like to ask about product availability.`
  );

  return (
    <div className="min-h-screen py-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#128C7E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Independent Makers</span>
          </Link>
        </div>

        {/* Vendor Hero Banner */}
        <div className="bg-white rounded-3xl overflow-hidden border border-brand-border shadow-card mb-8">
          {/* Cover Photo */}
          <div className="relative h-44 sm:h-64 w-full bg-gray-200">
            {!lowBandwidthMode ? (
              <Image
                src={vendor.bannerImage}
                alt={vendor.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-amber-100/50 text-gray-500 text-xs font-bold">
                {vendor.name} Cover
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShareToWhatsApp}
                className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share to WhatsApp</span>
              </button>

              <button
                onClick={handleCopyStoreLink}
                className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold text-gray-800 hover:bg-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                {copiedStoreLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStoreLink ? "Link Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Vendor Profile Row */}
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              {/* Avatar & Title */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white p-1 shadow-lg shrink-0 relative border-2 border-[#25D366]">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={vendor.avatarImage}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                      {vendor.name}
                    </h1>
                    {vendor.verified && (
                      <span className="bg-[#25D366]/15 text-[#128C7E] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#25D366]/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Verified WhatsApp Seller</span>
                      </span>
                    )}
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {vendor.businessType || "Independent Maker"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#128C7E] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{vendor.stallAddress} ({vendor.marketHub})</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{vendor.rating.toFixed(1)}</span>
                      <span className="text-gray-400">({vendor.reviewsCount} reviews)</span>
                    </div>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{vendor.totalSales} Escrow Orders Fulfilled</span>
                    <span>•</span>
                    <span>Selling Since {vendor.memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Chat on WhatsApp Button */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Maker Story & Escrow Assurance */}
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-3">
                <div>
                  <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1 flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#128C7E]" />
                    <span>Maker Story & Craft</span>
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {vendor.story || vendor.bio}
                  </p>
                </div>

                {vendor.instagram && (
                  <div className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                    <Instagram className="w-3.5 h-3.5 text-[#CC5500]" />
                    <span>Social Media: <strong className="text-gray-800">{vendor.instagram}</strong></span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#128C7E] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  <span>AfroMarket Escrow Guaranteed</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Support this small business safely. Funds remain locked in neutral bank custody until you receive and verify your package.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Storefront Catalog Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                Store Catalog ({vendorProducts.length} items)
              </h2>
              <p className="text-xs text-gray-500">
                Direct maker prices with escrow buyer protection
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              Prices in Nigerian Naira (₦)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {vendorProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
