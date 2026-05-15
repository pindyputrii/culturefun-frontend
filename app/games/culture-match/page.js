import Image from "next/image";
import CardGrid from "@/app/components/cardgrid";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function HomePage() {
  return (
    <main
      className={`${poppins.className} relative flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-white to-orange-500 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-20 flex justify-center items-center pointer-events-none">
        <div className="w-[600px] h-[200px] bg-orange-300 rounded-[60px] blur-2xl" />
      </div>

      <Image
        src="/CultureFun/img/icon-stick.svg"
        width={700}
        height={600}
        alt="background stick"
        className="absolute -translate-x-[600px] translate-y-56 pointer-events-none"
      />
      <CardGrid />
      <Link
        href={"/games"}
        className="px-24 translate-y-14 py-3 bg-biru text-white items-center font-bold rounded-4xl text-2xl"
      >
        Tutup
      </Link>
    </main>
  );
}
