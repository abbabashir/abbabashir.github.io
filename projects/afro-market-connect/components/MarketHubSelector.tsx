"use client";

import React from "react";
import Image from "next/image";
import { useMarketplace } from "@/lib/context";
import { Sparkles, MessageCircle } from "lucide-react";

export const MarketHubSelector: React.FC = () => {
  const { marketHubs, selectedMarket, setSelectedMarket, lowBandwidthMode } = useMarketplace();

  return (
    <section id="markets" className="py-8 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#128C7E] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Independent Maker Communities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
              Explore by Small Business Hub
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Home chefs, boutique curators, and WhatsApp merchants organized by craft community
            </p>
          </div>
          <button
            onClick={() => setSelectedMarket("all")}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all ${
              selectedMarket === "all"
                ? "bg-[#128C7E] text-white border-[#128C7E] shadow-sm font-black"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Show All Creators & Sellers
          </button>
        </div>

        {/* Hub Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {marketHubs.map((hub) => {
            const isSelected = selectedMarket === hub.name;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedMarket(isSelected ? "all" : hub.name)}
                className={`text-left rounded-2xl overflow-hidden border-2 transition-all group relative flex flex-col h-full bg-[#FAF4E6] ${
                  isSelected
                    ? "border-[#128C7E] shadow-md ring-2 ring-[#25D366] bg-white"
                    : "border-brand-border hover:border-gray-400 hover:shadow-subtle"
                }`}
              >
                {/* Hub Thumbnail */}
                <div className="relative h-24 w-full bg-gray-200 overflow-hidden">
                  {!lowBandwidthMode ? (
                    <Image
                      src={hub.image}
                      alt={hub.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 bg-amber-100/50">
                      {hub.name}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-white">
                    <span className="text-[10px] font-bold text-[#FFD700] block leading-tight truncate">
                      📍 {hub.city}
                    </span>
                    <span className="text-xs font-black leading-tight block truncate">
                      {hub.name}
                    </span>
                  </div>
                </div>

                {/* Hub Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <span className="text-[10px] text-gray-600 line-clamp-2 leading-tight">
                    {hub.description}
                  </span>

                  <div className="mt-2 pt-1.5 border-t border-brand-border/60 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#CC5500] truncate">
                      {hub.highlightCategory}
                    </span>
                    <span className="text-emerald-700 font-semibold shrink-0 text-[9px] flex items-center gap-0.5">
                      <MessageCircle className="w-2.5 h-2.5" />
                      Active
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
