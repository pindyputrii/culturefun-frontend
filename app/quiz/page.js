"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useSyncExternalStore, useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const emptySubscribe = () => () => {};

export default function QuizHome() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const lastScore = useSyncExternalStore(
    emptySubscribe,
    () => sessionStorage.getItem("culturefun_last_score"),
    () => null,
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/scores`,
        );
        const result = await res.json();
        setLeaderboard(result.data);
      } catch (err) {
        console.error("Gagal mengambil leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleStartQuiz = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      alert("Isi nama dulu ya sebelum mulai quiz 😊");
      return;
    }

    sessionStorage.setItem("culturefun_player_name", trimmedName);
    router.push("/quiz/culture-quiz");
  };

  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-linear-to-br from-white via-blue-50 to-orange-50 overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-24 md:pb-32`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="absolute bottom-32 left-20 w-6 h-6 bg-orange-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-8rem)] px-4 sm:px-6 md:px-8 lg:px-12 z-10">
        <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 space-y-4 sm:space-y-6 order-2 md:order-1 mt-6 sm:mt-8 md:mt-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-biru leading-tight text-center md:text-left">
            Culture
            <span className="block text-biru">Quiz</span>
          </h2>

          <p className="text-lg sm:text-xl text-biru font-medium max-w-md text-center md:text-left leading-relaxed">
            Yuk cari tahu seberapa dalam pengetahuan kamu tentang budaya-budaya
            di Indonesia
          </p>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <input
              type="text"
              placeholder="Masukkan nama kamu dulu..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full rounded-full border-2 border-blue-200 bg-white/90 px-6 py-4 text-biru text-base sm:text-lg shadow-lg outline-none focus:border-biru transition"
            />
          </div>

          <button
            onClick={handleStartQuiz}
            className="
              group relative bg-biru hover:bg-[#1E3A8A]
              text-white font-bold text-lg sm:text-xl md:text-2xl 
              px-10 sm:px-12 md:px-16 lg:px-20 py-3 sm:py-4 md:py-5 rounded-full 
              cursor-pointer transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-2xl
              active:scale-95
              w-full max-w-xs sm:max-w-sm md:w-auto
              overflow-hidden shadow-lg
            "
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">🚀</span>
              MULAI QUIZ
            </span>
          </button>

          <button
            onClick={() => setShowLeaderboard(true)}
            className="
              bg-white/90 border-2 border-blue-100 hover:border-biru
              text-biru font-bold px-6 py-3 rounded-full shadow-lg
              transition hover:scale-105 active:scale-95
            "
          >
            🏆 Lihat Leaderboard
          </button>

          <div className="flex items-center gap-2 text-sm text-biru opacity-80 text-center md:text-left">
            <span className="text-biru">
              ⚡ Quiz interaktif dengan pertanyaan random setiap kali dimainkan
            </span>
          </div>

          {lastScore !== null && (
            <div className="bg-white/80 border border-blue-100 rounded-2xl px-4 py-3 shadow-md mb-6 md:mb-10">
              <p className="text-biru font-medium">
                Skor terakhir kamu:{" "}
                <span className="font-bold">{lastScore}/10</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center md:w-1/2 order-1 md:order-2 mb-10 sm:mb-14 md:mb-0 mt-6 sm:mt-10 md:mt-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-4 border-blue-200 rounded-3xl transform rotate-6 scale-105 opacity-60 group-hover:rotate-3 group-hover:scale-110 transition-all duration-500"></div>

            <div className="relative bg-linear-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 transform group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/CultureFun/img/icon-quiz.svg"
                alt="icon quiz"
                width={600}
                height={600}
                priority
                className="opacity-90 w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-6">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-blue-50 text-biru font-black hover:bg-blue-100 transition cursor-pointer"
            >
              ×
            </button>

            <h3 className="text-biru font-black text-2xl mb-2 text-center">
              🏆 Leaderboard
            </h3>

            <p className="text-center text-sm text-biru/70 mb-5">
              Top 10 pemain terbaik
            </p>

            {leaderboard.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-auto pr-1">
                {leaderboard.slice(0, 10).map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center justify-between bg-blue-50 rounded-2xl px-4 py-3 border border-blue-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-biru text-white flex items-center justify-center font-black">
                        {index + 1}
                      </span>

                      <span className="font-bold text-biru">{item.name}</span>
                    </div>

                    <span className="font-black text-orange">
                      {item.score}/{item.total}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-biru font-medium py-8">
                Belum ada score yang masuk.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-blue-500/10 to-transparent"></div>
    </div>
  );
}
