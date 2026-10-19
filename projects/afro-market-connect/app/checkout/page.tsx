"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { ESCROW_ACCOUNTS } from "@/lib/data";
import { formatNaira, compressImage, formatFileSize } from "@/lib/imageCompressor";
import {
  ShieldCheck,
  Building,
  Copy,
  Check,
  Upload,
  ArrowRight,
  AlertCircle,
  Truck,
  Store,
  ChevronLeft,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, createOrder, submitPaymentProof, lowBandwidthMode } = useMarketplace();

  // Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "market_pickup">("delivery");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [marketPickupPoint, setMarketPickupPoint] = useState("Balogun Market Central Hub, Gate 2");
  const [orderNotes, setOrderNotes] = useState("");
  const [selectedEscrowBank, setSelectedEscrowBank] = useState(ESCROW_ACCOUNTS[0]);

  // Created Order state after Step 1
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [createdOrderRef, setCreatedOrderRef] = useState<string | null>(null);

  // Payment Proof State
  const [senderBank, setSenderBank] = useState("GTBank");
  const [senderAccountName, setSenderAccountName] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedStats, setCompressedStats] = useState<{ orig: number; comp: number } | null>(null);

  // Copy helpers
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const deliveryFee = deliveryMethod === "delivery" ? 3500 : 0;
  const grandTotal = cartTotal + deliveryFee;

  // Handle Step 1: Create Order
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || (deliveryMethod === "delivery" && !deliveryAddress)) {
      alert("Please fill in all required delivery contact details.");
      return;
    }

    const order = createOrder({
      buyerName,
      buyerPhone,
      buyerEmail: buyerEmail || `${buyerPhone.replace(/\s+/g, "")}@afromarket.ng`,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : "Market Stall Pickup",
      deliveryMethod,
      marketPickupPoint: deliveryMethod === "market_pickup" ? marketPickupPoint : undefined,
      orderNotes,
      escrowAccount: selectedEscrowBank,
    });

    setCreatedOrderId(order.id);
    setCreatedOrderRef(order.referenceId);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Receipt Upload with Client-Side Image Compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const result = await compressImage(file, 900, 900, 0.75);
      setProofPreview(result.dataUrl);
      setCompressedStats({ orig: result.originalSize, comp: result.compressedSize });
    } catch (err) {
      console.error(err);
      alert("Error processing receipt image. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  // Handle Step 2: Submit Payment Proof
  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdOrderId) return;
    if (!senderAccountName || !transactionRef) {
      alert("Please enter the sender account name and transaction reference.");
      return;
    }

    submitPaymentProof(createdOrderId, {
      receiptUrl:
        proofPreview ||
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      senderBank,
      senderAccountName,
      transactionReference: transactionRef,
      transferTimestamp: new Date().toLocaleString(),
      uploadedAt: new Date().toISOString(),
    });

    router.push(`/orders/${createdOrderId}`);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-[#CC5500] flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#333333]">Your cart is currently empty</h2>
        <p className="text-xs text-gray-600 mt-2">
          Add items from our verified Balogun or Wuse market stalls to proceed with Escrow Checkout.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A4D3A] text-white font-bold text-sm shadow-sm hover:bg-[#13382A] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Marketplace</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#FDF6E3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header & Escrow Shield */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A4D3A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#1A4D3A]" />
              <span>Admin-Mediated Escrow Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#333333] tracking-tight">
              {step === 1 ? "Secure Escrow Checkout" : "Transfer to Admin Escrow Custody"}
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span
              className={`px-3.5 py-1 rounded-full ${
                step === 1
                  ? "bg-[#1A4D3A] text-white font-black"
                  : "bg-emerald-100 text-[#1A4D3A]"
              }`}
            >
              1. Delivery & Order
            </span>
            <span className="text-gray-400">➔</span>
            <span
              className={`px-3.5 py-1 rounded-full ${
                step === 2
                  ? "bg-[#CC5500] text-white font-black"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2. Bank Proof & Escrow
            </span>
          </div>
        </div>

        {/* STEP 1: DELIVERY DETAILS & ORDER CONFIRMATION */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Delivery Details Form */}
            <form onSubmit={handleProceedToPayment} className="lg:col-span-7 space-y-6">
              {/* Delivery Method Selector */}
              <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle">
                <h3 className="text-sm font-bold text-[#333333] mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1A4D3A]" />
                  <span>Choose Delivery Method</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      deliveryMethod === "delivery"
                        ? "border-[#1A4D3A] bg-[#E8EFEA]/50 ring-2 ring-[#1A4D3A]/20"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#333333]">Doorstep Courier</span>
                      <Truck className="w-4 h-4 text-[#1A4D3A]" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Direct to home or office address</p>
                    <span className="text-xs font-black text-[#CC5500] mt-2">₦3,500</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("market_pickup")}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      deliveryMethod === "market_pickup"
                        ? "border-[#1A4D3A] bg-[#E8EFEA]/50 ring-2 ring-[#1A4D3A]/20"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#333333]">Market Hub Pickup</span>
                      <Store className="w-4 h-4 text-[#CC5500]" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Pick up at market dispatch desk</p>
                    <span className="text-xs font-black text-[#1A4D3A] mt-2">FREE</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle space-y-4">
                <h3 className="text-sm font-bold text-[#333333]">
                  Buyer & Delivery Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amina Bello / Chukwudi Okafor"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] focus:ring-1 focus:ring-[#1A4D3A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] focus:ring-1 focus:ring-[#1A4D3A] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address (For receipt & tracking updates)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.ng"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] focus:ring-1 focus:ring-[#1A4D3A] outline-none"
                  />
                </div>

                {deliveryMethod === "delivery" ? (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Delivery Address (Street, Area, City, State) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos State"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] focus:ring-1 focus:ring-[#1A4D3A] outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Market Hub Collection Point
                    </label>
                    <select
                      value={marketPickupPoint}
                      onChange={(e) => setMarketPickupPoint(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] outline-none"
                    >
                      <option value="Balogun Market Central Hub, Gate 2, Lagos Island">
                        Balogun Market Central Hub (Gate 2, Martins St, Lagos Island)
                      </option>
                      <option value="Wuse Market Logistics Desk, Main Gate, Abuja">
                        Wuse Market Logistics Desk (Main Gate, Abuja)
                      </option>
                      <option value="Computer Village Otigba Security Station, Ikeja">
                        Computer Village Otigba Station (Ikeja, Lagos)
                      </option>
                      <option value="Ariaria Market Park, Aba">
                        Ariaria International Dispatch Park (Aba)
                      </option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Order Notes / Special Stall Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please ensure fabric cut is exact 5 yards"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] outline-none"
                  />
                </div>
              </div>

              {/* Escrow Bank Selector */}
              <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle">
                <h3 className="text-sm font-bold text-[#333333] mb-2">
                  Select Official AfroMarket Escrow Bank
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  You will transfer to this official custody account in Step 2.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ESCROW_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.accountNumber}
                      type="button"
                      onClick={() => setSelectedEscrowBank(acc)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedEscrowBank.accountNumber === acc.accountNumber
                          ? "border-[#1A4D3A] bg-[#E8EFEA]/60 ring-2 ring-[#1A4D3A]"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#1A4D3A]" />
                        <span className="text-xs font-bold text-[#333333]">{acc.bankName}</span>
                      </div>
                      <p className="text-[11px] font-mono font-bold text-[#1A4D3A] mt-1">
                        A/C: {acc.accountNumber}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{acc.accountName}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-[#1A4D3A] hover:bg-[#13382A] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Generate Order Reference & Escrow Instructions</span>
                <ArrowRight className="w-4 h-4 text-[#FFD700]" />
              </button>
            </form>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-brand-border shadow-subtle">
                <h3 className="text-sm font-bold text-[#333333] pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>Order Items</span>
                  <span className="text-xs text-gray-500">({cart.length})</span>
                </h3>

                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto my-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center gap-3">
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
                        <h4 className="text-xs font-bold text-[#333333] truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[10px] text-gray-500">
                          {item.quantity} × {formatNaira(item.unitPrice)}
                        </p>
                      </div>
                      <span className="text-xs font-black text-[#CC5500]">
                        {formatNaira(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatNaira(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery / Pickup</span>
                    <span>{deliveryFee === 0 ? "FREE" : formatNaira(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                    <span>Total Amount Due</span>
                    <span className="text-[#CC5500] text-base">{formatNaira(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Escrow Security Guarantee Box */}
              <div className="bg-[#1A4D3A] rounded-2xl p-4 text-white text-xs space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-black text-[#FFD700]">
                  <ShieldCheck className="w-5 h-5 text-[#FFD700] shrink-0" />
                  <span>Your Money is 100% Safe with AfroMarket</span>
                </div>
                <p className="text-[11px] text-gray-200 leading-relaxed">
                  No automated card billing or recurring debits. Your bank transfer goes directly into our official Escrow Custody account and is only released after you inspect and accept your delivery.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ESCROW PAYMENT INSTRUCTIONS & PROOF UPLOAD */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Escrow Bank Account Details */}
            <div className="lg:col-span-6 space-y-6">
              {/* Order Reference Box */}
              <div className="bg-[#FAF4E6] rounded-2xl p-5 border-2 border-[#CC5500]/50 shadow-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CC5500]">
                    Your Unique Order Reference ID
                  </span>
                  <button
                    onClick={() => copyToClipboard(createdOrderRef || "", "ref")}
                    className="flex items-center gap-1 text-xs font-bold text-[#1A4D3A] hover:underline"
                  >
                    {copiedField === "ref" ? (
                      <Check className="w-3.5 h-3.5 text-[#1A4D3A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedField === "ref" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-2xl font-black font-mono text-[#1A4D3A] mt-1">
                  {createdOrderRef}
                </p>
                <p className="text-[11px] text-gray-700 mt-1">
                  ⚠️ <strong>IMPORTANT:</strong> Quote this reference number in your transfer remarks/narration.
                </p>
              </div>

              {/* Escrow Bank Account Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#1A4D3A] shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#FFD700] text-[#1A4D3A] text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  Official Escrow Custody Account
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] border border-[#1A4D3A]/20 text-[#1A4D3A] flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#333333]">
                      {selectedEscrowBank.bankName}
                    </h3>
                    <p className="text-xs text-gray-500">AfroMarket Connect Escrow Trust</p>
                  </div>
                </div>

                <div className="space-y-3 bg-[#FDF6E3] p-4 rounded-xl border border-brand-border/80">
                  {/* Account Number */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Account Number
                      </span>
                      <span className="text-xl font-black font-mono text-[#1A4D3A]">
                        {selectedEscrowBank.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(selectedEscrowBank.accountNumber, "acc")
                      }
                      className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1 shadow-xs"
                    >
                      {copiedField === "acc" ? (
                        <Check className="w-3.5 h-3.5 text-[#1A4D3A]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedField === "acc" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Account Name */}
                  <div className="pt-2 border-t border-gray-200/80">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">
                      Account Name
                    </span>
                    <span className="text-xs font-bold text-[#333333]">
                      {selectedEscrowBank.accountName}
                    </span>
                  </div>

                  {/* Exact Amount */}
                  <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Exact Amount to Transfer
                      </span>
                      <span className="text-xl font-black text-[#CC5500]">
                        {formatNaira(grandTotal)}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(grandTotal.toString(), "amount")}
                      className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1 shadow-xs"
                    >
                      {copiedField === "amount" ? (
                        <Check className="w-3.5 h-3.5 text-[#1A4D3A]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedField === "amount" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* USSD Code Shortcut */}
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                  <div className="font-bold text-gray-800 mb-1">
                    USSD Quick Transfer:
                  </div>
                  <code className="text-[#1A4D3A] font-mono font-bold block">
                    {selectedEscrowBank.ussdCode.replace("AMOUNT", grandTotal.toString())}
                  </code>
                </div>
              </div>
            </div>

            {/* Right: Payment Proof Upload Form */}
            <form onSubmit={handleSubmitProof} className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-subtle space-y-4">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#CC5500]" />
                  <h3 className="text-base font-bold text-[#333333]">
                    Upload Bank Transfer Proof
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  After completing your bank transfer or USSD payment, upload the debit alert or receipt screenshot for Super Admin escrow confirmation.
                </p>

                {/* Sender Bank */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Bank (Sender Bank) *
                  </label>
                  <select
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] outline-none"
                  >
                    <option value="GTBank">GTBank Plc</option>
                    <option value="Zenith Bank">Zenith Bank Plc</option>
                    <option value="Access Bank">Access Bank Plc</option>
                    <option value="First Bank">First Bank of Nigeria</option>
                    <option value="UBA">United Bank for Africa (UBA)</option>
                    <option value="Kuda Bank">Kuda Microfinance Bank</option>
                    <option value="OPay">OPay</option>
                    <option value="Palmpay">Palmpay</option>
                    <option value="Fidelity Bank">Fidelity Bank</option>
                    <option value="Stanbic IBTC">Stanbic IBTC Bank</option>
                  </select>
                </div>

                {/* Sender Account Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Sender Account Name (As displayed on your bank app) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AMINA BELLO"
                    value={senderAccountName}
                    onChange={(e) => setSenderAccountName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] outline-none"
                  />
                </div>

                {/* Transaction Reference Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Bank Transaction Reference / Session ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 00001326091108304910298319"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-[#1A4D3A] outline-none font-mono"
                  />
                </div>

                {/* Receipt Screenshot Upload with Canvas Compression */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Receipt Screenshot / Debit Alert Proof
                  </label>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#1A4D3A] transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      id="receipt-upload"
                      className="hidden"
                    />
                    <label
                      htmlFor="receipt-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-1"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-xs font-bold text-[#1A4D3A]">
                        {isCompressing ? "Optimizing image..." : "Choose Receipt Photo"}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        Automatic client-side compression for low data usage (&lt;80KB)
                      </span>
                    </label>

                    {compressedStats && (
                      <div className="mt-2 text-[10px] text-[#1A4D3A] font-bold bg-[#E8EFEA] py-1 px-2 rounded-md inline-block">
                        Compressed from {formatFileSize(compressedStats.orig)} ➔{" "}
                        {formatFileSize(compressedStats.comp)} (Saved {(
                          (1 - compressedStats.comp / compressedStats.orig) *
                          100
                        ).toFixed(0)}
                        %)
                      </div>
                    )}
                  </div>

                  {proofPreview && (
                    <div className="mt-3 relative w-32 h-40 rounded-lg overflow-hidden border border-gray-300 shadow-sm mx-auto">
                      <Image
                        src={proofPreview}
                        alt="Receipt preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-4 rounded-xl bg-[#CC5500] hover:bg-[#b04800] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
                  <span>Submit Payment Proof for Admin Verification</span>
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-2">
                  Once submitted, our Super Admin verifies incoming transfer in Escrow Custody within 10-15 minutes and instructs the vendor to pack and dispatch your order.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
