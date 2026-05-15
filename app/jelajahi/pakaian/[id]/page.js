import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) return [];

    const res = await fetch(`${API_URL}/api/all/data`);
    const result = await res.json();

    return result.data.map((item) => ({
      id: item._id.toString(), // PERBAIKAN KRITIS 1: Wajib diubah menjadi teks (String)
    }));
  } catch (err) {
    console.error("Gagal mengambil data Pakaian:", err);
    return [];
  }
}

export default async function PakaianDetail({ params }) {
  const { id } = await params;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/detail/${id}`, {
    cache: 'force-cache' // PERBAIKAN TAMBAHAN: Optimalisasi build statis
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-gray-600">
        Pakaian adat tidak ditemukan
      </div>
    );
  }

  const result = await res.json();

  const pakaian = result.data;

  if (!result.success || !pakaian) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">
        {result.message || "Pakaian adat tidak ditemukan"}
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 py-24 px-6 ${poppins.className}`}
    >
      <div className="max-w-6xl mx-auto bg-orange rounded-3xl shadow-2xl px-10 md:px-14 py-16 md:py-20 flex flex-col md:flex-row items-center md:items-start gap-10 mt-20 mb-5">
        {/* LEFT */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-biru space-y-8">
          <div className="flex items-center">
            <Image
              src="/CultureFun/img/icon-pakaian.svg"
              alt="Ikon Pakaian Adat"
              width={80}
              height={80}
              className="mr-4"
              unoptimized={true} // PERBAIKAN KRITIS 2: Wajib untuk export statis
            />

            <div className="w-2 h-16 bg-biru rounded-full mr-4"></div>

            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              Pakaian
              <br />
              Adat
            </h3>
          </div>

          <div className="relative w-72 h-56 md:w-80 md:h-60 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={pakaian.image || "/CultureFun/img/placeholder.jpg"}
              alt={pakaian.title}
              fill
              className="object-cover"
              priority
              unoptimized={true} // PERBAIKAN KRITIS 2: Wajib untuk export statis
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 text-biru flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 wrap-break-words">
              {pakaian.title}
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-3xl">
              {pakaian.description || "Deskripsi belum tersedia."}
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/jelajahi/pakaian"
              className="inline-flex items-center gap-2 bg-biru text-orange font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#061a38] hover:shadow-xl transition-all duration-300"
            >
              KEMBALI
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}