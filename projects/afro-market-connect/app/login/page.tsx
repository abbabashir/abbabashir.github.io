"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMarketplace } from "@/lib/context";
import { signInUser } from "@/lib/db";
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
  ShoppingBag,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const { setCurrentRole, setCurrentUser } = useMarketplace();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signInUser({ email: email.trim(), password });

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
        setCurrentRole(res.user.role);

        setSuccessMessage(`Welcome back, ${res.user.full_name}! Redirecting...`);

        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (res.user?.role === "admin") {
            router.push("/dashboard/admin");
          } else if (res.user?.role === "vendor") {
            router.push("/dashboard/vendor");
          } else {
            router.push("/");
          }
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred during login.");
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role: "buyer" | "vendor" | "admin") => {
    setIsLoading(true);
    setErrorMessage("");

    let demoEmail = "chioma.okafor@gmail.com";
    let demoName = "Chioma Okafor (Buyer)";

    if (role === "vendor") {
      demoEmail = "mama.bimpe@balogunmarket.ng";
      demoName = "Alhaja Bimpe (Balogun Vendor)";
    } else if (role === "admin") {
      demoEmail = "admin@afromarket.africa";
      demoName = "Super Admin Auditor";
    }

    setEmail(demoEmail);
    setPassword("password123");

    setCurrentRole(role);
    setCurrentUser({
      id: `demo-${role}`,
      email: demoEmail,
      fullName: demoName,
      role: role,
      marketHub: role === "vendor" ? "Balogun Market" : undefined,
      stallAddress: role === "vendor" ? "Stall B-14, Line 3, Balogun Market" : undefined,
    });

    setSuccessMessage(`Demo Signed in as ${demoName}! Redirecting...`);

    setTimeout(() => {
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        router.push(redirectUrl || "/");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
          
          {/* Left Hero / Brand Showcase (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1A4D3A] via-[#143D2E] to-[#0D281E] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#CC5500]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Logo Badge */}
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
                    Direct Stalls • Escrow Protected
                  </span>
                </div>
              </Link>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                Access Verified African Wholesale & Retail Stalls
              </h1>
              <p className="text-emerald-100/90 text-sm leading-relaxed mb-6">
                Trade safely with authentic merchants from Balogun, Ariaria, Computer Village, Kejetia, and Wuse Market with guaranteed bank escrow locks.
              </p>

              {/* Feature Points */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#FFD700]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>100% Escrow Protection on every transaction</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
                    <Store className="w-4 h-4" />
                  </div>
                  <span>Verified physical stall addresses & phone vetting</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Nationwide & Diaspora direct dispatch</span>
                </div>
              </div>
            </div>

            {/* Bottom trust badge */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/80 font-medium">
              <span>NDIC Insured Custody</span>
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

          {/* Right Form Area (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                New to AfroMarket?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#CC5500] hover:text-[#993D00] hover:underline"
                >
                  Create your account here
                </Link>
              </p>
            </div>

            {/* Quick Demo One-Click Sign In */}
            <div className="mb-6 p-3.5 bg-[#FDF6E3] border border-amber-200 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#CC5500]" />
                  Instant Demo Login (One-Click)
                </span>
                <span className="text-[10px] font-semibold text-gray-500">Test roles</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("buyer")}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 hover:border-[#1A4D3A] rounded-xl text-xs font-bold text-gray-700 hover:text-[#1A4D3A] transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Buyer</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("vendor")}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 hover:border-[#CC5500] rounded-xl text-xs font-bold text-gray-700 hover:text-[#CC5500] transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <Store className="w-3.5 h-3.5 text-[#CC5500]" />
                  <span>Merchant</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("admin")}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 hover:border-purple-600 rounded-xl text-xs font-bold text-gray-700 hover:text-purple-600 transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Error & Success Alerts */}
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
            <form onSubmit={handleLogin} className="space-y-4">
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
                    placeholder="e.g. chioma.okafor@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#1A4D3A] focus:ring-2 focus:ring-[#1A4D3A]/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions have been dispatched to your email address.");
                    }}
                    className="text-xs font-semibold text-[#CC5500] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
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

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-[#1A4D3A] focus:ring-[#1A4D3A] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs font-semibold text-gray-600 cursor-pointer"
                >
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#1A4D3A] to-[#12382A] hover:from-[#143D2E] hover:to-[#0D281E] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to AfroMarket</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Are you a physical market merchant?{" "}
                <Link
                  href="/signup?role=vendor"
                  className="font-bold text-[#1A4D3A] hover:text-[#CC5500] hover:underline"
                >
                  Register your stall for free
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
