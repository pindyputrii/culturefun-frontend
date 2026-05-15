"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Poppins, Inter } from "next/font/google";
import { MapPinIcon } from "@heroicons/react/24/solid";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

export default function MakananPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [makananList, setMakananList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`${API_URL}/api/makanan`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal ambil data makanan");
        }

        const result = await res.json();
        setMakananList(result.data || []);
      } catch (err) {
        console.error("Error fetching makanan:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const filteredMakanan = makananList.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main
      className={`min-h-screen bg-white pt-24 pb-16 px-6 md:px-12 lg:px-24 ${poppins.className}`}
    >
      <div className="text-center mb-12">
        <h1
          className={`font-bold text-biru mb-4 leading-tight ${inter.className}`}
        >
          <span className="block text-5xl md:text-7xl">MAKANAN</span>
          <span className="block text-4xl md:text-5xl">TRADISIONAL</span>
        </h1>

        <p className="text-biru text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Jelajahi kekayaan kuliner Nusantara — dari rendang yang mendunia
          sampai pempek yang bikin kangen!
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama makanan... (contoh: Rendang, Gudeg, Pempek)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-36 text-lg rounded-full border-2 border-orange focus:outline-none focus:border-biru transition-colors"
          />

          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-biru text-orange font-bold text-sm px-7 py-3 rounded-full shadow-md hover:bg-orange hover:text-biru transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="col-span-full text-center text-gray-600 text-lg">
            Memuat makanan lezat...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-red-600 text-xl font-bold">
            Gagal memuat data dari backend. Coba refresh atau cek koneksi!
          </p>
        ) : filteredMakanan.length > 0 ? (
          filteredMakanan.map((item) => (
            <Link
              href={`/jelajahi/makanan/${item._id}`}
              key={item._id}
              className="group block"
            >
              <div className="bg-orange rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="h-48 relative">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>

                  <p className="flex items-center gap-2 text-sm font-medium opacity-90 mb-2">
                    <MapPinIcon className="w-4 h-4" />
                    {item.province || "Indonesia"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Makanan tidak ditemukan
          </p>
        )}
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <Link
          href="/jelajahi"
          className="inline-flex items-center gap-2 bg-biru text-orange px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:bg-orange hover:text-biru hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Jelajah
        </Link>
      </div>
    </main>
  );
}
