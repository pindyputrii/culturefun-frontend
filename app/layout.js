"use client";

import { usePathname } from "next/navigation";

import { Poppins, Inter } from "next/font/google";

import "./globals.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import "leaflet/dist/leaflet.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // HIDE NAVBAR FOOTER
  const hideLayout =
    pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <html lang="id">
      <body className={poppins.className}>
        {!hideLayout && <Navbar />}

        {children}

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
