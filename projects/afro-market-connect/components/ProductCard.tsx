"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useMarketplace } from "@/lib/context";
import { formatNaira } from "@/lib/imageCompressor";
import {
  ShoppingBag,
  CheckCircle,
  MapPin,
  Star,
  MessageCircle,
  ShieldCheck,
  Check,
  Share2,
  Sparkles,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, vendors, lowBandwidthMode } = useMarketplace();
  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const vendor = vendors.find(
    (v) => v.id === product.vendorId || v.name === product.vendorName
  );
  const vendorWhatsapp = vendor?.whatsapp || "2348032491102";

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${product.vendorName}! I found your product on AfroMarket Connect: "${product.title}" (${formatNaira(
      product.price
    )} / ${product.unit}). Is this currently available? I'll be securing our order via AfroMarket Escrow.`
  );

  const handleShareToWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareText = encodeURIComponent(
      `Check out "${product.title}" from independent maker ${product.vendorName} on AfroMarket Connect (${formatNaira(
        product.price
      )}): http://localhost:3000/vendor/${vendor?.slug || product.vendorId}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border hover:border-[#128C7E]/60 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Product Image Area */}
        <div className="relative h-48 sm:h-52 w-full bg-[#FAF4E6] overflow-hidden">
          {!lowBandwidthMode ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-amber-50">
              <span className="text-xs font-bold text-gray-800">{product.title}</span>
              <span className="text-[10px] text-gray-400 mt-1">[Low Bandwidth Mode - Image Hidden]</span>
            </div>
          )}

          {/* Maker / Small Business Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <div className="bg-[#128C7E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-300/40">
              <MessageCircle className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
              <span>{product.businessType || "Independent Seller"}</span>
            </div>
            {product.isSmallBatch && (
              <div className="bg-amber-100 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-md self-start shadow-xs border border-amber-300">
                ✨ Small Batch
              </div>
            )}
          </div>

          {/* Quick Share to WhatsApp Status Button */}
          <button
            onClick={handleShareToWhatsApp}
            title="Share to WhatsApp Status or Chat"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-[#25D366] text-gray-700 hover:text-white flex items-center justify-center shadow-md transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Maker Cluster / Location Tag */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-[#FFD700]" />
            <span className="truncate max-w-[150px]">{product.marketHub}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Vendor Link & Rating */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <Link
              href={`/vendor/${vendor?.slug || product.vendorId}`}
              className="font-bold text-[#128C7E] hover:underline truncate max-w-[170px] flex items-center gap-1"
            >
              <span>{product.vendorName}</span>
              <CheckCircle className="w-3 h-3 text-[#25D366] shrink-0" />
            </Link>
            <div className="flex items-center gap-1 text-[#FFD700] font-black shrink-0">
              <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
              <span className="text-gray-800">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#128C7E] transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-1 mt-1">
            {product.description}
          </p>

          {/* Price & Unit */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-[#CC5500]">
              {formatNaira(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatNaira(product.originalPrice)}
              </span>
            )}
            <span className="text-[10px] text-gray-500 font-medium">
              /{product.unit}
            </span>
          </div>

          {/* Stock & WhatsApp status line */}
          <div className="mt-1.5 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-[#25D366]" : "bg-red-500"}`} />
              <span className="text-gray-600 font-medium">
                {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
              </span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <MessageCircle className="w-2.5 h-2.5 text-[#25D366]" />
              WhatsApp Verified
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-4 gap-2">
          {/* Add to Escrow Cart Button (3 cols) */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`col-span-3 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              isAdded
                ? "bg-[#1A4D3A] text-[#FFD700]"
                : "bg-[#1A4D3A] hover:bg-[#13382A] text-white active:scale-95"
            } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Escrow Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Order with Escrow</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Chat Button (1 col) */}
          <a
            href={`https://wa.me/${vendorWhatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 flex items-center justify-center transition-all group/wa"
            title="Chat & confirm order directly on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/wa:text-white transition-colors" />
          </a>
        </div>

        {/* Escrow mini badge */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-600 bg-[#FDF6E3] py-1 rounded-md border border-brand-border/60">
          <ShieldCheck className="w-3 h-3 text-[#1A4D3A]" />
          <span>Protected: Payment released after delivery inspection</span>
        </div>
      </div>
    </div>
  );
};
