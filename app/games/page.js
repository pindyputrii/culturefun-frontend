"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function GameHome() {
  const router = useRouter();

  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-linear-to-br from-white via-blue-50 to-orange-50 overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:24px_24px"></div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-8 pt-20 md:pt-0 z-10">
        <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 relative mb-8 md:mb-0">
          <Image
            src="/CultureFun/img/icon-games.svg"
            alt="icon stick"
            width={800}
            height={800}
            priority
            className="hidden md:block absolute top-1/2 -translate-x-96 opacity-50"
          />
          <Image
            src="/CultureFun/img/icon-games.svg"
            alt="icon stick"
            width={800}
            height={800}
            priority
            className="md:hidden absolute top-1/2 left-1/2 -translate-x-100 -translate-y-30 opacity-50 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px]"
          />

          <h1 className="text-biru text-6xl md:text-8xl lg:text-9xl font-bold leading-none z-10 text-center md:text-left">
            MINI
            <br /> GAMES
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            <div className="bg-biru text-white rounded-3xl shadow-2xl px-6 md:px-10 py-16 md:py-32 text-center md:text-right mt-8 md:mt-28 w-full max-w-sm md:max-w-none relative overflow-hidden">
              {/* Shine effect on card */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <h2 className="text-3xl md:text-5xl font-extrabold md:translate-y-9 relative z-10">
                Culture
                <br />
                Match
              </h2>
              <p className="mt-1 text-lg md:text-2xl md:translate-y-9 relative z-10">
                Cocokkan pasangan gambar <br />
                budaya Nusantara
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/games/culture-match")}
            className="
              group relative bg-biru hover:bg-[#1E3A8A]
              text-white font-bold text-lg md:text-2xl 
              px-12 md:px-20 py-3 md:py-5 rounded-full 
              cursor-pointer
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-2xl
              active:scale-95
              w-full max-w-xs md:max-w-none
              overflow-hidden
              mt-6
            "
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover:bg-blue-500/30 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">🎮</span>
              MULAI GAMES
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
