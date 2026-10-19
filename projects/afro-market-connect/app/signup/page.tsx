"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMarketplace } from "@/lib/context";
import { signUpUser } from "@/lib/db";
import {
  ShieldCheck,
  Store,
  User,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Building,
  Phone,
  HelpCircle,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as "buyer" | "vendor") || "buyer";

  const { marketHubs, setCurrentRole, setCurrentUser } = useMarketplace();

  const [role, setRole] = useState<"buyer" | "vendor">(
    defaultRole === "vendor" ? "vendor" : "buyer"
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Vendor-specific fields
  const [selectedHub, setSelectedHub] = useState("Balogun Market");
  const [stallAddress, setStallAddress] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name or stall business name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number or WhatsApp contact.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Please accept the AfroMarket Escrow & Marketplace Terms.");
      return;
    }

    if (role === "vendor" && !stallAddress.trim()) {
      setErrorMessage("Please provide your workshop, home studio, or operating city/area.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUpUser({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        role,
        phone: phone.trim(),
        marketHub: role === "vendor" ? selectedHub : undefined,
        stallAddress: role === "vendor" ? stallAddress.trim() : undefined,
      });

      if (res.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
        return;
      }

      if (res.user) {
        setCurrentUser({
          id: res.user.id,
          email: res.user.email,
          fullName: res.user.full_name,
          role: res.user.role,
          phone: res.user.phone,
          marketHub: res.user.market_hub,
          stallAddress: res.user.stall_address,
        });
        setCurrentRole(role);

        setSuccessMessage(
          `Account successfully created! Welcome to AfroMarket, ${res.user.full_name}. Redirecting...`
        );

        setTimeout(() => {
          if (role === "vendor") {
            router.push("/dashboard/vendor");
          } else {
            router.push("/");
          }
        }, 900);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
          
          {/* Left Sidebar Feature Panel (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1A4D3A] via-[#143D2E] to-[#0D281E] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#CC5500]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#CC5500] to-[#FFD700] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#1A4D3A] rounded-[10px] flex items-center justify-center font-black text-amber-300 text-sm tracking-tighter">
                    AMC
                  </div>
                </div>
                <div>
                  <span className="font-black text-white text-base tracking-tight block">
                    Afro<span className="text-[#CC5500]">Market</span> Connect
                  </span>
                  <span className="text-[10px] text-amber-200/80 font-medium block">
                    Small Businesses & WhatsApp Commerce
                  </span>
                </div>
              </Link>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                {role === "vendor"
                  ? "Turn Your WhatsApp Status into a Nationwide Storefront"
                  : "Discover Africa's Best Independent Creators & Makers"}
              </h1>
              <p className="text-emerald-100/90 text-sm leading-relaxed mb-6">
                {role === "vendor"
                  ? "Break free from the 100-view contact list barrier. Reach thousands of eager shoppers with guaranteed escrow payments—no more pay-on-delivery fake orders."
                  : "Direct access to home artisans, thrift curators, spice blenders, and indie fashion designers with full escrow protection."}
              </p>

              {/* Badges / Guarantees */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Escrow-backed trust: 100% upfront buyer payment held safely</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center shrink-0 text-[#25D366]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>1-Click WhatsApp Status & Group Catalog Sharing</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>No tech skills needed — instant mobile web storefront</span>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-emerald-200/80 flex justify-between">
              <span>Zero monthly listing fees</span>
              <span>24/7 WhatsApp Merchant Support</span>
            </div>
          </div>

          {/* Right Signup Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            
            <div className="mb-5">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {role === "vendor" ? "Launch Your WhatsApp Business Store" : "Create Shopper Account"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#CC5500] hover:text-[#993D00] hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                    role === "buyer"
                      ? "border-[#1A4D3A] bg-[#1A4D3A]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      role === "buyer"
                        ? "bg-[#1A4D3A] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Shop Independent</div>
                    <div className="text-[11px] text-gray-500 leading-tight">
                      Support small makers safely
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                    role === "vendor"
                      ? "border-[#25D366] bg-emerald-50/50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      role === "vendor"
                        ? "bg-[#128C7E] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Sell My Brand / Crafts</div>
                    <div className="text-[11px] text-gray-500 leading-tight">
                      WhatsApp seller outreach
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {role === "vendor" ? "Your Brand or Small Business Name" : "Full Name"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={
                      role === "vendor"
                        ? "e.g. Adunni Artisan Spices or ThriftGems Vintage"
                        : "e.g. Chioma Okafor"
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#1A4D3A] focus:ring-2 focus:ring-[#1A4D3A]/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#1A4D3A] focus:ring-2 focus:ring-[#1A4D3A]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    WhatsApp Business Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 802 345 6789"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20 transition-all outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Orders and customer status inquiries will be sent here
                  </p>
                </div>
              </div>

              {/* Vendor Specific Inputs */}
              {role === "vendor" && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#128C7E]" />
                    <span>Small Business & Maker Profile</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Operating Location (Home Studio, Workshop, or City Area)
                    </label>
                    <input
                      type="text"
                      required
                      value={stallAddress}
                      onChange={(e) => setStallAddress(e.target.value)}
                      placeholder="e.g. Home Studio, Surulere, Lagos or Yaba Workshop"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 focus:border-[#128C7E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nearest Sourcing / Creator Community Hub (Optional)
                    </label>
                    <select
                      value={selectedHub}
                      onChange={(e) => setSelectedHub(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:border-[#128C7E] outline-none"
                    >
                      {marketHubs.map((hub) => (
                        <option key={hub.id} value={hub.name}>
                          {hub.name} ({hub.city}, {hub.country})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#1A4D3A] focus:ring-2 focus:ring-[#1A4D3A]/20 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#1A4D3A] focus:ring-2 focus:ring-[#1A4D3A]/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-1">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-[#128C7E] focus:ring-[#128C7E] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-xs text-gray-600 leading-snug cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/escrow" className="font-bold text-[#128C7E] hover:underline">
                    AfroMarket Escrow Protection Terms
                  </Link>{" "}
                  and Small Business Fair Trading Code.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#075E54] hover:brightness-105 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer pt-2.5"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {role === "vendor"
                        ? "Launch Your WhatsApp Business Storefront"
                        : "Create Independent Shopper Account"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                By registering, your account is protected under AfroMarket Trust & Escrow Custody.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
