"use client";

import React from "react";
import Link from "next/link";
import { ESCROW_ACCOUNTS } from "@/lib/data";
import {
  ShieldCheck,
  Building,
  CheckCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  HelpCircle,
  Clock,
  Banknote,
} from "lucide-react";

export default function EscrowExplainerPage() {
  return (
    <div className="min-h-screen py-12 bg-[#FDF6E3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero-Fraud Commerce Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            How AfroMarket Escrow Protects You
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            No institutional payment gateways required. No debit card exposure. Our manual admin-mediated escrow holds your bank transfer securely until you receive and verify your package.
          </p>
        </div>

        {/* 4-Step Visual Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-14">
          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Order & Escrow Reference
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add goods to cart. AfroMarket Connect generates a unique Order Reference ID (e.g. AFRO-2026-8941) and official custody bank account details.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-brand-blue font-semibold">
              Step 1: Order Generation
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-full bg-brand-tangerine text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Transfer & Upload Receipt
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transfer exact total via mobile app or USSD (*737#, *901#). Upload your receipt screenshot and bank session ID directly to the platform.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-brand-tangerine font-semibold">
              Step 2: Bank Proof Upload
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Admin Escrow Confirmation
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our Super Admin audits incoming funds on the bank statement. Once confirmed, funds are locked in custody and vendor receives packing clearance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-purple-700 font-semibold">
              Step 3: Merchant Dispatch
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                4
              </span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Inspect & Release Funds
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                You receive your order from courier or market desk. Once satisfied, click "Confirm Delivery" to release funds to the vendor. Zero scam risk!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-700 font-semibold">
              Step 4: Safe Completion
            </div>
          </div>
        </div>

        {/* Official Escrow Bank Accounts */}
        <div id="banks" className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card mb-14">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-brand-blue" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                Official AfroMarket Escrow Accounts
              </h2>
              <p className="text-xs text-gray-500">
                Only transfer funds to these verified corporate custody bank accounts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {ESCROW_ACCOUNTS.map((acc) => (
              <div
                key={acc.accountNumber}
                className="p-5 rounded-2xl bg-[#FDF6E3] border border-brand-border space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-sm text-gray-900">{acc.bankName}</h3>
                  <span className="text-[10px] uppercase font-bold bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded">
                    Custody A/C
                  </span>
                </div>
                <div className="font-mono text-xl font-black text-gray-900">
                  {acc.accountNumber}
                </div>
                <p className="text-xs text-gray-700 font-semibold">{acc.accountName}</p>
                <p className="text-[11px] text-gray-500 leading-snug pt-2 border-t border-brand-border/60">
                  {acc.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Policy */}
        <div id="disputes" className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                Dispute Resolution & Refund Guarantee
              </h2>
              <p className="text-xs text-gray-500">
                What happens if something goes wrong with your order?
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
            <p>
              Because your payment remains locked in our official custody bank account until you confirm delivery, vendors cannot disappear with your money.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 border">
                <h4 className="font-bold text-gray-900 mb-1">Wrong Item or Shortage</h4>
                <p className="text-gray-500 text-[11px]">
                  Take a quick photo and click "Report Issue" on your order tracker. We freeze the funds and arrange immediate exchange or partial refund.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border">
                <h4 className="font-bold text-gray-900 mb-1">Non-Delivery / Delay</h4>
                <p className="text-gray-500 text-[11px]">
                  If a merchant fails to dispatch within 48 hours, the Super Admin triggers an immediate 100% refund directly back to your bank account.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border">
                <h4 className="font-bold text-gray-900 mb-1">Authenticity Claims</h4>
                <p className="text-gray-500 text-[11px]">
                  Only verified market stalls are permitted. Merchants caught misrepresenting grades (e.g. synthetic sold as pure cotton) are expelled.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Start Shopping Verified Market Stalls</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
