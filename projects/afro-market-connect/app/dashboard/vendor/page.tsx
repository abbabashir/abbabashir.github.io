"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { PRODUCT_CATEGORIES, MARKET_HUBS } from "@/lib/data";
import { formatNaira, compressImage, formatFileSize } from "@/lib/imageCompressor";
import { ProductCategory } from "@/lib/types";
import {
  Store,
  PackagePlus,
  Share2,
  Copy,
  Check,
  Upload,
  TrendingUp,
  MessageCircle,
  Truck,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function VendorDashboardPage() {
  const {
    products,
    addProduct,
    orders,
    updateOrderStatus,
    marketHubs,
    vendors,
    currentRole,
    setCurrentRole,
    lowBandwidthMode,
  } = useMarketplace();

  // Current vendor (defaulting to Balogun Royal Textiles for interactive demo)
  const currentVendor = vendors[0];
  const vendorProducts = products.filter(
    (p) => p.vendorId === currentVendor.id || p.vendorName === currentVendor.name
  );
  const vendorOrders = orders.filter((o) =>
    o.items.some((i) => i.product.vendorId === currentVendor.id || i.product.vendorName === currentVendor.name)
  );

  // Tabs
  const [activeTab, setActiveTab] = useState<"catalog" | "add_product" | "whatsapp_bridge" | "orders">("catalog");

  // New Product Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Fashion & Textiles");
  const [unit, setUnit] = useState("per 5 yards bundle");
  const [stock, setStock] = useState("20");
  const [marketHub, setMarketHub] = useState("Balogun Market");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedStats, setCompressedStats] = useState<{ orig: number; comp: number } | null>(null);
  const [productAddedSuccess, setProductAddedSuccess] = useState(false);

  // WhatsApp Bridge state
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    vendorProducts.slice(0, 3).map((p) => p.id)
  );
  const [copiedBridgeText, setCopiedBridgeText] = useState(false);

  // Image Upload Compression Handler
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const res = await compressImage(file, 800, 800, 0.72);
      setProductImage(res.dataUrl);
      setCompressedStats({ orig: res.originalSize, comp: res.compressedSize });
    } catch (err) {
      console.error(err);
      alert("Image compression failed. Please try a different photo.");
    } finally {
      setIsCompressing(false);
    }
  };

  // Add Product Submit
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      alert("Please fill in title and price.");
      return;
    }

    addProduct({
      title,
      description: description || "Fresh stock from verified market stall.",
      price: Number(price),
      category,
      unit,
      stock: Number(stock) || 10,
      image:
        productImage ||
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      vendorId: currentVendor.id,
      vendorName: currentVendor.name,
      marketHub,
      state: currentVendor.state,
      isVerified: true,
      tags: [category, marketHub, "New Arrival"],
    });

    setProductAddedSuccess(true);
    setTimeout(() => {
      setProductAddedSuccess(false);
      setActiveTab("catalog");
      setTitle("");
      setPrice("");
      setDescription("");
      setProductImage(null);
    }, 1500);
  };

  // Generate WhatsApp-to-App Structured Message
  const generateWhatsAppMessage = () => {
    const selectedProds = vendorProducts.filter((p) => selectedProductIds.includes(p.id));
    const lines = [
      `🌟 *${currentVendor.name.toUpperCase()}* 🌟`,
      `📍 Studio / Workshop: ${currentVendor.stallAddress}`,
      `✨ Craft Specialty: ${currentVendor.businessType || "Artisan Small Batch"}`,
      `🛍️ *ORDER DIRECT WITH 100% ESCROW PROTECTION*`,
      ``,
    ];

    selectedProds.forEach((p, idx) => {
      lines.push(`${idx + 1}. *${p.title}*`);
      lines.push(`   💰 Price: *${formatNaira(p.price)}* (${p.unit})`);
      lines.push(`   📦 In Stock: ${p.stock} units`);
      lines.push(`   🔗 Buy Safely: https://afromarket.connect/vendor/${currentVendor.slug}#${p.id}`);
      lines.push(``);
    });

    lines.push(`🔒 *BUY WITH ZERO FEAR (ESCROW PROTECTED)*`);
    lines.push(`No fake "pay on delivery" rejection or scam risk! Your payment is held safely until you receive & verify.`);
    lines.push(``);
    lines.push(`📲 Full Storefront: https://afromarket.connect/vendor/${currentVendor.slug}`);

    return lines.join("\n");
  };

  const copyWhatsAppBroadcast = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedBridgeText(true);
    setTimeout(() => setCopiedBridgeText(false), 2000);
  };

  const toggleProductSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-8 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Vendor Profile & Header Banner */}
        <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-subtle mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative border-2 border-emerald-500 shadow-sm">
                <Image
                  src={currentVendor.avatarImage}
                  alt={currentVendor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                    {currentVendor.name}
                  </h1>
                  <span className="bg-emerald-100 text-[#128C7E] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                    Small Business & WhatsApp Seller
                  </span>
                </div>
                <p className="text-xs text-brand-blue font-semibold mt-0.5">
                  📍 {currentVendor.stallAddress} • <span className="text-emerald-700 font-bold">{currentVendor.businessType || "Handmade Artisan"}</span>
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Member since {currentVendor.memberSince} • {currentVendor.totalSales} escrow orders fulfilled safely
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/vendor/${currentVendor.slug}`}
                className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </Link>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out my verified artisan store on AfroMarket Connect: https://afromarket.connect/vendor/${currentVendor.slug} (100% Escrow Protected!)`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Post to WhatsApp Status</span>
              </a>

              <button
                onClick={() => setActiveTab("whatsapp_bridge")}
                className="px-3.5 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Broadcast Generator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-border pb-3 mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "catalog"
                ? "bg-brand-blue text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-brand-border"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>My Stall Inventory ({vendorProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add_product")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "add_product"
                ? "bg-brand-blue text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-brand-border"
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Add New Product (Low-Data Uploader)</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp_bridge")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "whatsapp_bridge"
                ? "bg-brand-blue text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-brand-border"
            }`}
          >
            <Share2 className="w-4 h-4 text-brand-tangerine" />
            <span>WhatsApp-to-App Broadcast Bridge</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "bg-brand-blue text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-brand-border"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Incoming Escrow Orders ({vendorOrders.length})</span>
          </button>
        </div>

        {/* TAB 1: CATALOG INVENTORY */}
        {activeTab === "catalog" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Stall Inventory in {currentVendor.marketHub}
              </h2>
              <button
                onClick={() => setActiveTab("add_product")}
                className="px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark flex items-center gap-1"
              >
                <PackagePlus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendorProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-4 border border-brand-border shadow-subtle flex gap-3"
                >
                  <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative border">
                    {!lowBandwidthMode ? (
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                        [Photo]
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">
                        {prod.category}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-black text-brand-blue mt-0.5">
                        {formatNaira(prod.price)}{" "}
                        <span className="text-[10px] font-normal text-gray-500">
                          /{prod.unit}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100">
                      <span className="text-emerald-700 font-semibold">
                        Stock: {prod.stock} units
                      </span>
                      <span className="text-gray-400">★ {prod.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ADD NEW PRODUCT (WITH CANVAS IMAGE COMPRESSION) */}
        {activeTab === "add_product" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-brand-border shadow-subtle">
            <div className="flex items-center gap-2 mb-2">
              <PackagePlus className="w-5 h-5 text-brand-blue" />
              <h2 className="text-base font-bold text-gray-900">
                Add Product to Your Stall Catalog
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Our low-bandwidth engine compresses camera photos under 80KB in your browser before upload, saving your cellular data.
            </p>

            {productAddedSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Product successfully added to your public stall catalog!</span>
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4">
              {/* Product Photo with Client-Side Compression */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product Photo (Automatic Low-Data Compression) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-brand-blue transition-colors bg-gray-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    id="vendor-product-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="vendor-product-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-1"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-xs font-bold text-brand-blue">
                      {isCompressing ? "Compressing image on device..." : "Select Photo from Phone / Computer"}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Reduces multi-megabyte photos to instant low-data size
                    </span>
                  </label>

                  {compressedStats && (
                    <div className="mt-2 text-[10px] text-emerald-700 font-semibold bg-emerald-50 py-1 px-2.5 rounded-md inline-block">
                      Original: {formatFileSize(compressedStats.orig)} ➔ Compressed:{" "}
                      {formatFileSize(compressedStats.comp)} (Saved{" "}
                      {((1 - compressedStats.comp / compressedStats.orig) * 100).toFixed(0)}%)
                    </div>
                  )}
                </div>

                {productImage && (
                  <div className="mt-3 relative w-28 h-28 rounded-xl overflow-hidden border border-gray-300 mx-auto shadow-sm">
                    <Image src={productImage} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Austrian Swiss Voile Lace (Purple Floral Cut)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                />
              </div>

              {/* Category & Market Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                  >
                    {PRODUCT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Market Hub
                  </label>
                  <select
                    value={marketHub}
                    onChange={(e) => setMarketHub(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                  >
                    {MARKET_HUBS.map((h) => (
                      <option key={h.id} value={h.name}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Unit & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Price in Naira (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="35000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Sales Unit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. per 5 yards, per piece"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Available Stock *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Description / Quality Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe material grade, color fastness, origin, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-blue outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs shadow-md transition-all"
              >
                Publish to AfroMarket Catalog
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: WHATSAPP-TO-APP BRIDGE TOOL */}
        {activeTab === "whatsapp_bridge" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Product Picker */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-brand-border shadow-subtle">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">
                  Select Products for WhatsApp Broadcast
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Choose the items you want to feature. We will generate a structured broadcast message with verified pricing and your store link to paste into your WhatsApp groups and status!
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {vendorProducts.map((prod) => {
                  const isChecked = selectedProductIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => toggleProductSelect(prod.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-50/50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{prod.title}</h4>
                          <span className="text-[11px] font-semibold text-brand-blue">
                            {formatNaira(prod.price)} / {prod.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Formatted WhatsApp Message Preview */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                    Generated WhatsApp Message
                  </span>
                  <button
                    onClick={copyWhatsAppBroadcast}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    {copiedBridgeText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBridgeText ? "Copied to Clipboard!" : "Copy for WhatsApp"}</span>
                  </button>
                </div>

                <div className="bg-[#E7F5E8] p-4 rounded-xl border border-emerald-200 font-mono text-xs whitespace-pre-wrap text-emerald-950 leading-relaxed max-h-96 overflow-y-auto">
                  {generateWhatsAppMessage()}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span>Direct WhatsApp-to-App link includes Escrow Buyer Protection</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>Share directly on WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INCOMING ORDERS & FULFILLMENT */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-subtle">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Escrow-Backed Orders for {currentVendor.name}
            </h3>

            {vendorOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                No orders placed yet for this stall.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {vendorOrders.map((ord) => (
                  <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                      <p className="text-xs text-gray-600 mt-1">
                        Buyer: {ord.buyerName} ({ord.buyerPhone}) • {ord.deliveryAddress}
                      </p>
                      <p className="text-[11px] text-brand-blue font-bold mt-0.5">
                        Items: {ord.items.map((i) => `${i.product.title} (x${i.quantity})`).join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-gray-900">
                        {formatNaira(ord.total)}
                      </span>

                      {ord.status === "escrow_verified" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              ord.id,
                              "dispatched",
                              "Merchant packed items and handed to dispatch rider.",
                              "vendor"
                            )
                          }
                          className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold"
                        >
                          Dispatch Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
