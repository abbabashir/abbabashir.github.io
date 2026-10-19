"use client";

import React from "react";
import { useMarketplace } from "@/lib/context";
import { PRODUCT_CATEGORIES } from "@/lib/data";
import { formatNaira } from "@/lib/imageCompressor";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const FilterBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    verifiedOnly,
    setVerifiedOnly,
    priceRange,
    setPriceRange,
    selectedMarket,
    setSelectedMarket,
    searchQuery,
    setSearchQuery,
  } = useMarketplace();

  const isFiltered =
    selectedCategory !== "all" ||
    selectedMarket !== "all" ||
    verifiedOnly ||
    priceRange[1] < 200000 ||
    searchQuery !== "";

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMarket("all");
    setVerifiedOnly(false);
    setPriceRange([0, 200000]);
    setSearchQuery("");
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle mb-6">
      {/* Category Pills Strip */}
      <div className="mb-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
          Product Categories
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#1A4D3A] text-[#FFD700] shadow-sm font-black"
                : "bg-[#FAF4E6] text-[#333333] hover:bg-gray-200 border border-brand-border/60"
            }`}
          >
            All Categories
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#1A4D3A] text-[#FFD700] shadow-sm font-black"
                  : "bg-[#FAF4E6] text-[#333333] hover:bg-gray-200 border border-brand-border/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Controls Row */}
      <div className="pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Verified Merchant Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer font-bold text-[#333333] select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#1A4D3A] focus:ring-[#1A4D3A] border-gray-300"
          />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1A4D3A]" />
            Verified Stalls Only
          </span>
        </label>

        {/* Max Price Slider */}
        <div className="flex items-center gap-3">
          <span className="text-gray-500 font-semibold">Max Price:</span>
          <input
            type="range"
            min={5000}
            max={200000}
            step={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-28 sm:w-36 accent-[#1A4D3A] cursor-pointer"
          />
          <span className="font-black text-[#CC5500] min-w-[75px]">
            {formatNaira(priceRange[1])}
          </span>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-[#CC5500] hover:text-[#b04800] font-black underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
