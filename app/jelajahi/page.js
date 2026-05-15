import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "../components/AudioPlayer";

export default function Jelajahi() {
  return (
    <section
      className="min-h-screen bg-cover bg-center px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-28 font-[Poppins] pt-20 sm:pt-24 md:pt-25 overflow-x-hidden"
      style={{
        backgroundImage: "url('/CultureFun/img/bg-jelajah-budaya.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start mt-6 sm:mt-8 md:mt-16">
        <div className="flex justify-center lg:justify-start items-start w-full">
          <div className="bg-[#EFEFEF] rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-lg w-full lg:-translate-x-8 xl:-translate-x-14">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-coklat mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              JELAJAH <br /> NUSANTARA
            </h1>
            <p className="text-biru text-sm sm:text-base md:text-lg leading-relaxed">
              Pilih kategori yang ingin kamu jelajahi dan temukan betapa beragam
              dan indahnya budaya Nusantara.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
          {[
            {
              title: "Makanan Tradisional",
              desc: "Cerita Kuliner Nusantara",
              img: "/CultureFun/img/highlight-makanan.png",
              icon: "/CultureFun/img/icon-makanan.svg",
              position: "lg:translate-y-4 xl:translate-y-6",
              href: "/jelajahi/makanan",
            },
            {
              title: "Rumah Adat",
              desc: "Simbol Arsitektur Tradisional Nusantara",
              img: "/CultureFun/img/highlight-rumah.png",
              icon: "/CultureFun/img/icon-rumah.svg",
              position: "lg:-translate-y-4 xl:-translate-y-6",
              href: "/jelajahi/rumah",
            },
            {
              title: "Pakaian Adat",
              desc: "Kekayaan Kain dan Busana Khas Daerah",
              img: "/CultureFun/img/highlight-pakaian.png",
              icon: "/CultureFun/img/icon-pakaian.svg",
              position: "lg:translate-y-4 xl:translate-y-6",
              href: "/jelajahi/pakaian",
            },
            {
              title: "Kesenian",
              desc: "Musik, Tari, dan Seni Tradisi Lokal",
              img: "/CultureFun/img/highlight-kesenian.png",
              icon: "/CultureFun/img/icon-music.svg",
              position: "lg:-translate-y-4 xl:-translate-y-6",
              href: "/jelajahi/kesenian",
            },
          ].map((item, index) => (
            <Link href={item.href} key={index} className="block">
              <div
                className={`relative bg-orange rounded-3xl p-4 sm:p-5 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${item.position} flex flex-col`}
              >
                <div className="rounded-2xl overflow-hidden mb-4 h-32 sm:h-32 md:h-36">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 flex-1">
                  <div className="text-right pr-2">
                    <h4
                      className="text-sm sm:text-sm md:text-base font-bold leading-tight"
                      style={{ color: "#08244c" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs sm:text-xs md:text-sm leading-tight mt-1"
                      style={{ color: "#08244c" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="w-1 h-14 rounded-full"
                    style={{ backgroundColor: "#08244c" }}
                  ></div>
                  <div className="shrink-0">
                    <Image
                      src={item.icon}
                      alt={`Icon ${item.title}`}
                      width={28}
                      height={28}
                      className="drop-shadow"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <Link
          href="/"
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
          Kembali ke Beranda
        </Link>
      </div>

      <AudioPlayer />
    </section>
  );
}
