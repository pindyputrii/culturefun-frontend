"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/jelajahi", label: "Budaya" },
    { href: "/quiz", label: "Quiz" },
    { href: "/games", label: "Games" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`${
          poppins.className
        } fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center cursor-pointer">
              <div
                className="relative"
                style={{ width: "140px", height: "40px" }}
              >
                <Image
                  src="/CultureFun/img/logo.svg"
                  alt="CultureFun"
                  fill
                  className="object-contain object-left"
                  priority
                  style={{
                    transform: "scale(3.2)",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-semibold text-biru hover:text-orange transition-colors relative group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center cursor-pointer group relative"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center relative">
                <span
                  className={`absolute w-6 h-0.5 bg-biru rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 top-1/2 -translate-y-1/2"
                      : "top-1 -translate-y-1/2"
                  } group-hover:bg-orange`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-biru rounded-full transition-all duration-300 top-1/2 -translate-y-1/2 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  } group-hover:bg-orange`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-biru rounded-full transition-all duration-300 ${
                    isOpen
                      ? "-rotate-45 top-1/2 -translate-y-1/2"
                      : "bottom-1 translate-y-1/2"
                  } group-hover:bg-orange`}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-transparent group-hover:bg-gray-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute inset-0 bg-linear-to-br from-black/40 via-purple-900/20 to-orange-900/10 backdrop-blur-lg transition-opacity duration-700 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-linear-to-b from-white/95 to-gray-50/95 backdrop-blur-2xl shadow-2xl transform transition-all duration-700 ease-out ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-8 border-b border-gray-200/50">
            <Link
              href="/"
              className="flex items-center cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative"
                style={{ width: "120px", height: "35px" }}
              >
                <Image
                  src="/CultureFun/img/logo.svg"
                  alt="CultureFun"
                  fill
                  className="object-contain object-left"
                  priority
                  style={{
                    transform: "scale(3.2)",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange transition-all duration-300 group cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col pt-8 px-6 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group cursor-pointer"
              >
                <div className="flex items-center py-4 px-4 rounded-xl transition-all duration-500 hover:bg-white hover:shadow-lg hover:scale-105 border border-transparent hover:border-orange-200">
                  <div className="w-2 h-8 bg-linear-to-b from-orange to-orange-400 rounded-full mr-4 transform group-hover:scale-y-125 transition-transform duration-300"></div>
                  <span className="text-xl font-bold text-biru group-hover:text-orange transition-all duration-300 group-hover:translate-x-2 cursor-pointer">
                    {item.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 ml-auto transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-2 bg-linear-to-r from-orange via-orange-400 to-orange animate-pulse"></div>
            <div className="h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-50"></div>
          </div>
          <div className="absolute top-1/4 -left-4 w-8 h-8 bg-orange-400/20 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 -left-2 w-6 h-6 bg-coklat/30 rounded-full blur-sm"></div>
        </div>
      </div>
    </>
  );
}
