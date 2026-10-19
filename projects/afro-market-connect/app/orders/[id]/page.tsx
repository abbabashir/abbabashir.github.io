"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { formatNaira } from "@/lib/imageCompressor";
import { OrderStatus } from "@/lib/types";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  AlertTriangle,
  Building,
  ArrowLeft,
  Share2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const { getOrderById, updateOrderStatus, currentRole, setCurrentRole, lowBandwidthMode } = useMarketplace();

  const order = getOrderById(orderId);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-xs text-gray-600 mt-2">
          We could not find an order matching reference "{orderId}".
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    );
  }

  // Status progression mapping
  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    {
      key: "pending_payment",
      label: "Order Created",
      desc: "Escrow account assigned",
    },
    {
      key: "proof_submitted",
      label: "Proof Submitted",
      desc: "Receipt in admin verification queue",
    },
    {
      key: "escrow_verified",
      label: "Escrow Confirmed",
      desc: "Funds secured in custody. Merchant packing.",
    },
    {
      key: "dispatched",
      label: "Dispatched",
      desc: "In transit with courier / at market desk",
    },
    {
      key: "completed",
      label: "Completed",
      desc: "Goods inspected & funds released",
    },
  ];

  const getStepState = (stepKey: OrderStatus) => {
    const orderHierarchy: OrderStatus[] = [
      "pending_payment",
      "proof_submitted",
      "escrow_verified",
      "dispatched",
      "delivered",
      "completed",
    ];

    const currentIdx = orderHierarchy.indexOf(order.status);
    const stepIdx = orderHierarchy.indexOf(stepKey);

    if (order.status === "disputed") return "disputed";
    if (stepIdx < currentIdx) return "completed";
    if (stepIdx === currentIdx) return "active";
    return "upcoming";
  };

  // Buyer Action: Confirm Delivery & Release Escrow Funds to Merchant
  const handleConfirmDelivery = () => {
    if (window.confirm("Confirm that you have received and inspected all items in good condition? This will release the escrow funds to the vendor.")) {
      updateOrderStatus(
        order.id,
        "completed",
        "Buyer confirmed delivery of items in good condition. Escrow funds released to vendor.",
        "buyer"
      );
    }
  };

  // Buyer Action: Raise Dispute
  const handleRaiseDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeReason) return;
    updateOrderStatus(
      order.id,
      "disputed",
      `Dispute raised by buyer: ${disputeReason}. Escrow funds frozen pending Admin investigation.`,
      "buyer"
    );
    setShowDisputeModal(false);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#FDF6E3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>

          {/* Quick jump to Admin for testing verification */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentRole("admin");
                router.push("/dashboard/admin");
              }}
              className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold hover:bg-purple-200 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Verify in Admin Hub</span>
            </button>
          </div>
        </div>

        {/* Status Card Header */}
        <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-subtle mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Order Tracking & Escrow Custody
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 font-mono mt-0.5">
                {order.referenceId}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500 font-medium">Total Escrow Value</span>
              <div className="text-2xl font-black text-brand-blue">
                {formatNaira(order.total)}
              </div>
            </div>
          </div>

          {/* Order Progress Stepper */}
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">
              Escrow Protection Timeline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((s, idx) => {
                const state = getStepState(s.key);
                return (
                  <div
                    key={s.key}
                    className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      state === "completed"
                        ? "bg-emerald-50/70 border-emerald-300 text-emerald-900"
                        : state === "active"
                        ? "bg-blue-50 border-brand-blue ring-2 ring-brand-blue/20 text-blue-900"
                        : "bg-gray-50/70 border-gray-200 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                      {state === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : state === "active" ? (
                        <Clock className="w-4 h-4 text-brand-blue animate-spin" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{s.label}</h4>
                      <p className="text-[10px] mt-1 line-clamp-2">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Escrow Funds Notification Banner */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF4E6] border border-brand-border flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-gray-900 block">
                {order.status === "escrow_verified"
                  ? "Escrow Funds Secured in Bank Custody"
                  : order.status === "proof_submitted"
                  ? "Awaiting Admin Bank Clearance"
                  : order.status === "dispatched"
                  ? "Merchant Dispatched – Awaiting Buyer Receipt"
                  : order.status === "completed"
                  ? "Order Successfully Completed"
                  : "Pending Payment Verification"}
              </span>
              <p className="text-gray-600 text-[11px] mt-0.5">
                {order.status === "escrow_verified"
                  ? "Super Admin verified your bank transfer in the official custody account. The vendor has been instructed to pack and dispatch your order."
                  : order.status === "proof_submitted"
                  ? "Your bank transfer receipt is currently in the Super Admin verification queue. Verification typically completes within 10-15 minutes."
                  : order.status === "dispatched"
                  ? "Your items are on the way! Once received and inspected, click 'Confirm & Release Escrow' below to finalize payment to the vendor."
                  : order.status === "completed"
                  ? "Payment released to merchant. Thank you for using AfroMarket Connect Escrow!"
                  : "Please transfer the exact order amount to the official Escrow Bank Account to activate dispatch."}
              </p>
            </div>
          </div>

          {/* Buyer Action Buttons (If Dispatched or Verified) */}
          {order.status === "dispatched" && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleConfirmDelivery}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Confirm Delivery & Release Escrow to Vendor</span>
              </button>

              <button
                onClick={() => setShowDisputeModal(true)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report Issue / Freeze Escrow</span>
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Items & Delivery Details */}
          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Order Items ({order.items.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative border">
                    {!lowBandwidthMode ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-500">
                        [Img]
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-brand-blue font-semibold">
                      {item.product.vendorName} ({item.product.marketHub})
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {item.quantity} × {formatNaira(item.unitPrice)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    {formatNaira(item.quantity * item.unitPrice)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatNaira(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? "FREE" : formatNaira(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-1 border-t">
                <span>Total Escrow Amount</span>
                <span className="text-brand-blue">{formatNaira(order.total)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="pt-3 border-t border-gray-100 text-xs space-y-1">
              <h4 className="font-bold text-gray-900">Recipient & Address</h4>
              <p className="text-gray-700 font-semibold">{order.buyerName} • {order.buyerPhone}</p>
              <p className="text-gray-600">{order.deliveryAddress}</p>
            </div>
          </div>

          {/* Column 2: Escrow Custody & Payment Proof Details */}
          <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Escrow & Payment Proof Record
            </h3>

            {/* Assigned Escrow Account */}
            <div className="p-3 bg-[#FAF4E6] rounded-xl border border-brand-border text-xs">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-1">
                <Building className="w-4 h-4 text-brand-blue" />
                <span>{order.escrowAccount.bankName}</span>
              </div>
              <p className="font-mono text-gray-800">
                A/C No: <strong>{order.escrowAccount.accountNumber}</strong>
              </p>
              <p className="text-[11px] text-gray-600 truncate">
                {order.escrowAccount.accountName}
              </p>
            </div>

            {/* Payment Proof Details */}
            {order.paymentProof ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sender Bank:</span>
                    <strong className="text-gray-900">{order.paymentProof.senderBank}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sender Name:</span>
                    <strong className="text-gray-900">{order.paymentProof.senderAccountName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank Ref:</span>
                    <strong className="text-brand-blue font-mono">{order.paymentProof.transactionReference}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="text-gray-700">{order.paymentProof.transferTimestamp}</span>
                  </div>
                </div>

                {/* Uploaded Receipt Preview */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-1">
                    Uploaded Receipt Screenshot:
                  </span>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-gray-300 shadow-inner bg-gray-100">
                    <Image
                      src={order.paymentProof.receiptUrl}
                      alt="Payment Receipt"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <p className="font-bold">No bank transfer proof uploaded yet.</p>
                <p className="text-[11px] mt-1">
                  Please complete the bank transfer of {formatNaira(order.total)} to our Escrow Custody Account and submit the proof.
                </p>
              </div>
            )}

            {/* Status History Log */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-900 mb-2">Audit Log</h4>
              <div className="space-y-2 text-[11px] max-h-36 overflow-y-auto">
                {order.statusHistory.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-brand-blue font-bold shrink-0">•</span>
                    <div>
                      <span className="text-gray-900 font-semibold">{h.note}</span>
                      <span className="text-gray-400 block text-[10px]">
                        {new Date(h.timestamp).toLocaleTimeString()} ({h.actor})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dispute Modal */}
        {showDisputeModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-border">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold text-gray-900">Report Issue / Freeze Escrow</h3>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                If the vendor sent the wrong item, incomplete yards, or defective merchandise, submit details below. The funds remain locked in AfroMarket Escrow until the Super Admin arbitrates.
              </p>

              <form onSubmit={handleRaiseDispute} className="space-y-3">
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the issue in detail (e.g. Lace received was 3 yards instead of 5 yards ordered)..."
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDisputeModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Freeze Escrow & Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
