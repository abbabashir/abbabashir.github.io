"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMarketplace } from "@/lib/context";
import { formatNaira } from "@/lib/imageCompressor";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    lowBandwidthMode,
  } = useMarketplace();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#FAF4E6] border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1A4D3A]" />
              <h2 className="text-lg font-black text-[#333333]">Your Market Cart</h2>
              <span className="text-xs bg-[#CC5500] text-white px-2 py-0.5 rounded-full font-bold">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Escrow Banner in Cart */}
          <div className="bg-[#1A4D3A] text-white px-4 py-2.5 flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
            <span>
              <strong className="text-[#FFD700]">AfroMarket Escrow Guarantee:</strong> Payment is held in official custody until you inspect your items.
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF4E6] text-gray-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#CC5500]/60" />
                </div>
                <h3 className="text-base font-bold text-[#333333]">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Browse authentic stalls from Balogun, Wuse, Ariaria, and Computer Village.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#1A4D3A] text-white text-xs font-bold hover:bg-[#13382A] transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-3">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 relative">
                    {!lowBandwidthMode ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 font-bold bg-amber-50">
                        [Photo]
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#333333] line-clamp-2 leading-snug">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-[#1A4D3A] font-bold mt-0.5">
                      {item.product.vendorName} • <span className="text-gray-500 font-normal">{item.product.marketHub}</span>
                    </p>
                    <p className="text-xs font-black text-[#CC5500] mt-1">
                      {formatNaira(item.unitPrice)}
                      <span className="text-[10px] text-gray-500 font-normal ml-1">
                        /{item.product.unit}
                      </span>
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FAF4E6] border-t border-brand-border">
              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatNaira(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery / Hub Pickup</span>
                  <span className="text-[#1A4D3A] font-bold">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between text-sm font-black text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#CC5500] text-base">{formatNaira(cartTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1A4D3A] hover:bg-[#13382A] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Proceed to Escrow Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#FFD700]" />
              </Link>

              <p className="text-[10px] text-center text-gray-500 mt-2 font-medium">
                No immediate card debit required • Bank transfer escrow verification
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
