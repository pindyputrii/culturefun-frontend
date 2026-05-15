"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const geo = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={`${geo.className} relative bg-coklat text-white py-8 sm:py-12 px-6 sm:px-8 overflow-hidden`}
    >
      <Image
        src="/CultureFun/img/footer-bunga1-kiri.png"
        alt="Bunga Kiri"
        width={80}
        height={0}
        priority={true}
        quality={75}
        className="absolute bottom-0 left-0 w-16 sm:w-20 md:w-28 opacity-90"
      />
      <Image
        src="/CultureFun/img/footer-bunga-2-kanan.png"
        alt="Bunga Kanan"
        width={80}
        height={0}
        priority={true}
        quality={75}
        className="absolute bottom-0 right-0 w-16 sm:w-20 md:w-28 opacity-90"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Logo / Deskripsi */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold bg-linear-to-r from-white to-orange-100 bg-clip-text text-transparent">
            CultureFun
          </h3>
          <p className="leading-relaxed text-xs sm:text-sm md:text-base font-medium text-white/90 max-w-xs">
            Menjelajahi kekayaan budaya Nusantara melalui artikel, galeri, dan
            quiz interaktif.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-white">
            Navigasi
          </h5>
          <ul className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/jelajahi", label: "Budaya" },
              { href: "/quiz", label: "Quiz" },
              { href: "/games", label: "Games" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-white/80 hover:text-white transition-all duration-300 py-1 inline-flex items-center w-full transform hover:translate-x-2"
                >
                  <span className="flex items-center">
                    {item.label}
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100"
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
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kategori */}
        <div>
          <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-white">
            Kategori
          </h5>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
            {[
              { href: "/jelajahi/makanan", label: "Makanan Tradisional" },
              { href: "/jelajahi/kesenian", label: "Kesenian Nusantara" },
              { href: "/jelajahi/pakaian", label: "Pakaian Adat" },
              { href: "/jelajahi/rumah", label: "Rumah Adat" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-white/80 hover:text-white transition-all duration-300 py-1 inline-flex items-center w-full transform hover:translate-x-2"
                >
                  <span className="flex items-center">
                    {item.label}
                    <svg
                      className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100"
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
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ikuti Kami */}
        <div>
          <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-white">
            Ikuti Kami
          </h5>
          <div className="flex space-x-3 sm:space-x-4">
            {[
              {
                name: "Twitter",
                color: "hover:text-cyan-400",
                hoverEffect: "hover:shadow-cyan-500/50",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                name: "Instagram",
                color: "hover:text-pink-400",
                hoverEffect: "hover:shadow-pink-500/50",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className={`text-white/70 ${social.color} ${social.hoverEffect} transition-all duration-300 transform hover:scale-110 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:shadow-lg`}
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              Temukan budaya Indonesia dengan cara yang menyenangkan dan
              interaktif!
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 text-center text-xs sm:text-sm text-white/70">
        © {new Date().getFullYear()} CultureFun. Semua Hak Dilindungi - Kelompok
        1, Kelas A.
      </div>
    </footer>
  );
}
