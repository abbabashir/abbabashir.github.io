"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { formatNaira } from "@/lib/imageCompressor";
import { Search, ShieldCheck, ArrowRight, Package } from "lucide-react";

export default function TrackOrderPage() {
  const router = useRouter();
  const { orders } = useMarketplace();
  const [refInput, setRefInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;
    router.push(`/orders/${refInput.trim()}`);
  };

  return (
    <div className="min-h-screen py-12 bg-[#FDF6E3]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>AfroMarket Escrow Custody Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Track Order & Escrow Status
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Enter your unique Order Reference ID (e.g. AFRO-2026-8941) to monitor bank transfer verification and dispatch status.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 sm:p-6 border border-brand-border shadow-subtle mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter Order Reference (e.g. AFRO-2026-8941)"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="w-full text-sm pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Track Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Existing Active Demo Orders list */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-border shadow-subtle">
          <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-blue" />
            <span>Recent Orders in Escrow</span>
          </h3>

          <div className="divide-y divide-gray-100">
            {orders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => router.push(`/orders/${ord.id}`)}
                className="py-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-gray-900">
                      {ord.referenceId}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ord.status === "escrow_verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.status === "proof_submitted"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {ord.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ord.buyerName} • {ord.items.length} items • {formatNaira(ord.total)}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-brand-blue">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
