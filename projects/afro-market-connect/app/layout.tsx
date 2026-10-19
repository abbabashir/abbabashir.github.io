import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MarketplaceProvider } from "@/lib/context";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AfroMarket Connect – Pan-African Micro-Commerce Web Platform & Vendor Marketplace",
  description:
    "Production-ready digital marketplace connecting informal vendors across Balogun Market, Wuse Market, and Computer Village with secure admin-mediated escrow payments.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A4D3A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FDF6E3] text-[#333333]">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
