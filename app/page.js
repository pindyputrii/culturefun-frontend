"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const IndonesiaMap = dynamic(() => import("./components/IndonesiaMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[--color-putih] text-[--color-biru] font-sans">
      <div className="h-20"></div>

      <section
        className="relative w-full my-10 overflow-hidden rounded-[36px] shadow-xl bg-cover bg-center"
        style={{ backgroundImage: "url('/CultureFun/img/bg-candi.png')" }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px]"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
          <div className="md:w-1/2 flex justify-start">
            <Image
              src="/CultureFun/img/tari-topeng.png"
              alt="Tari Topeng"
              width={600}
              height={350}
              className="rounded-3xl -translate-x-18 object-cover"
            />
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 md:ml-10 text-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-white">
              CultureFun – Menjelajahi <br />
              Kekayaan Budaya Nusantara
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-white">
              Dari ujung Sabang hingga Merauke, setiap budaya punya cerita.
              Website ini menjadi jembatan digital agar generasi muda bisa
              mengenal, merasakan, dan mencintai kembali warisan Nusantara
              dengan cara yang seru dan interaktif.
            </p>
            <Link
              href="#fitur"
              className="bg-orange hover:bg-biru text-biru hover:text-orange font-bold text-xl px-20 py-3 rounded-full text-center inline-block transition-all duration-300 shadow-md scroll-smooth"
            >
              JELAJAHI
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 - KENAPA CULTUREFUN ================= */}
      <section
        className="relative w-full my-10 overflow-hidden rounded-[36px] shadow-xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/CultureFun/img/bunga-kenapa.svg')",
        }}
      >
        <div
          className="relative py-16 text-center overflow-visible"
          style={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div className="relative z-10">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-4 text-biru"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Kenapa CultureFun?
            </motion.h3>

            <motion.p
              className="text-center text-biru max-w-3xl mx-auto mb-16 leading-relaxed text-base md:text-xl font-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Budaya adalah identitas bangsa. <br />
              CultureFun hadir sebagai portal budaya Nusantara.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8 md:gap-16 max-w-5xl mx-auto items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.h4
                  className="font-bold text-lg text-biru mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Modern
                </motion.h4>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Image
                    src="/CultureFun/img/icon-modern.png"
                    alt="Modern"
                    width={80}
                    height={80}
                    className="drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: 0.2,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.h4
                  className="font-bold text-lg text-biru mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  Interaktif
                </motion.h4>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/CultureFun/img/icon-interaktif.png"
                    alt="Interaktif"
                    width={80}
                    height={80}
                    className="drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: 0.4,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.h4
                  className="font-bold text-lg text-biru mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  Untuk Semua Orang
                </motion.h4>
                <motion.div
                  className="relative w-[100px] h-20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src="/CultureFun/img/icon-orang.png"
                      alt="Person"
                      width={60}
                      height={60}
                      className="absolute left-0 top-2"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src="/CultureFun/img/icon-orang.png"
                      alt="Person"
                      width={60}
                      height={60}
                      className="absolute right-0 top-2"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.6,
                      type: "spring",
                      stiffness: 120,
                    }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src="/CultureFun/img/icon-orang.png"
                      alt="Person"
                      width={70}
                      height={70}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-center text-biru max-w-3xl mx-auto mt-16 leading-relaxed text-base md:text-xl font-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Mulai dari makanan, pakaian adat, tarian, hingga rumah adat
              <br />
              semua bisa diakses dalam satu platform.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="relative bg-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-12 justify-center -mt-20">
            <div className="relative flex justify-center items-center group">
              <Link href="/quiz" className="absolute inset-0 z-30"></Link>

              <div className="bg-biru text-white p-6 pt-8 rounded-2xl shadow-2xl transition-all duration-500 ease-out w-48 h-64 flex flex-col justify-start items-center relative z-10 cursor-pointer group-hover:scale-105 group-hover:-translate-y-3 group-hover:shadow-[0_10px_25px_rgba(8,36,76,0.4)] group-hover:bg-[#0d2f5c]">
                <h4 className="text-xl text-center leading-tight">QUIZ</h4>
              </div>

              <Image
                src="/CultureFun/img/icon-quiz.svg"
                alt="Quiz Icon"
                width={180}
                height={180}
                className="absolute left-1/2 -translate-x-[80%] translate-y-[25%] drop-shadow-xl z-20 transition-transform duration-500 ease-out group-hover:scale-125 cursor-pointer"
              />
            </div>

            <div className="relative flex justify-center items-center group">
              <Link href="/jelajahi" className="absolute inset-0 z-30"></Link>

              <div className="bg-biru text-white p-6 pt-8 rounded-2xl shadow-2xl transition-all duration-500 ease-out w-48 h-64 flex flex-col justify-start items-center relative z-10 cursor-pointer group-hover:scale-105 group-hover:-translate-y-3 group-hover:shadow-[0_10px_25px_rgba(8,36,76,0.4)] group-hover:bg-[#0d2f5c]">
                <h4 className="text-xl text-center leading-tight">
                  JELAJAHI
                  <br />
                  BUDAYA
                </h4>
              </div>

              <Image
                src="/CultureFun/img/icon-jelajah.png"
                alt="Jelajah Icon"
                width={200}
                height={200}
                className="absolute right-1/2 translate-x-[52.7%] translate-y-[40%] drop-shadow-xl z-20 transition-transform duration-500 ease-out group-hover:scale-125 cursor-pointer"
              />
            </div>

            <div className="relative flex justify-center items-center group">
              <Link href="/games" className="absolute inset-0 z-30"></Link>

              <div className="bg-biru text-white p-6 pt-8 rounded-2xl shadow-2xl transition-all duration-500 ease-out w-48 h-64 flex flex-col justify-start items-center relative z-10 cursor-pointer group-hover:scale-105 group-hover:-translate-y-3 group-hover:shadow-[0_10px_25px_rgba(8,36,76,0.4)] group-hover:bg-[#0d2f5c]">
                <h4 className="text-xl text-center leading-tight">
                  MINI GAMES
                </h4>
              </div>

              <Image
                src="/CultureFun/img/icon-games.svg"
                alt="Games Icon"
                width={180}
                height={180}
                className="absolute right-1/2 translate-x-[85%] translate-y-[40%] drop-shadow-xl z-20 transition-transform duration-500 ease-out group-hover:scale-125 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white pt-0 pb-6 -mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-biru mb-3">
              Jelajahi Berdasarkan Provinsi
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Klik provinsi untuk melihat budaya dari daerah tersebut
            </p>
          </div>

          <IndonesiaMap />
        </div>
      </section>

      <section
        className="relative bg-white h-[260px] md:h-[340px] -mt-15 overflow-hidden"
        style={{
          backgroundImage: "url('/CultureFun/img/bunga-bawah.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
        }}
      ></section>
    </main>
  );
}
