"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function CultureQuiz() {
  const router = useRouter();

  const bgMusicRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const winEpicRef = useRef(null);
  const greatRef = useRef(null);
  const loseRef = useRef(null);
  const timeUpSoundRef = useRef(null);
  const hasSavedResultRef = useRef(false);

  const [allQuestions, setAllQuestions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scoreHistory, setScoreHistory] = useState([]);

  const playerName = useMemo(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("culturefun_player_name") || "";
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !playerName) {
      router.push("/quiz");
    }
  }, [playerName, router]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/scores`,
        );

        const result = await res.json();
        setScoreHistory(result.data);
      } catch (err) {
        console.error("Gagal mengambil leaderboard:", err);
      }
    };

    if (showResult) {
      fetchScores();
    }
  }, [showResult]);

  useEffect(() => {
    bgMusicRef.current = new Audio("/audio/quiz-backsound.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    correctSoundRef.current = new Audio("/audio/correct.mp3");
    correctSoundRef.current.volume = 0.7;

    wrongSoundRef.current = new Audio("/audio/wrong.mp3");
    wrongSoundRef.current.volume = 0.6;

    winEpicRef.current = new Audio("/audio/win-epic.mp3");
    greatRef.current = new Audio("/audio/great.mp3");
    loseRef.current = new Audio("/audio/lose-sad.mp3");
    timeUpSoundRef.current = new Audio("/audio/lose-sad.mp3");

    const startAudio = () => {
      bgMusicRef.current?.play().catch(() => {});
      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("keydown", startAudio);

    return () => {
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${API_URL}/api/quiz/all`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil soal quiz");
        }

        const data = await res.json();
        setAllQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil soal:", err);
        setLoading(false);
      }
    };

    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (loading || showResult || shuffledQuestions.length === 0) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed >= 60) {
        timeUpSoundRef.current.currentTime = 0;
        timeUpSoundRef.current.play();

        bgMusicRef.current?.pause();
        loseRef.current.currentTime = 0;
        loseRef.current.play();

        setScore(0);
        setShowResult(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [loading, showResult, shuffledQuestions.length]);

  useEffect(() => {
    if (allQuestions.length === 0 || shuffledQuestions.length > 0) return;

    const selectAndShuffle = () => {
      let available = allQuestions.filter(
        (q) => !usedQuestionIds.includes(q._id),
      );

      if (available.length < 10) {
        available = allQuestions;
        setUsedQuestionIds([]);
      }

      const selected = [...available]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      const questionsWithShuffled = selected.map((q) => {
        const options = [...q.options];
        const correctAnswer = q.answer;

        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }

        return { ...q, options, correctAnswer };
      });

      setShuffledQuestions(questionsWithShuffled);
      setUsedQuestionIds((prev) => [
        ...prev,
        ...questionsWithShuffled.map((q) => q._id),
      ]);
    };

    selectAndShuffle();
  }, [allQuestions, usedQuestionIds, shuffledQuestions.length]);

  useEffect(() => {
    if (!showResult) return;

    bgMusicRef.current?.pause();

    let activeSound;
    if (score >= 8) activeSound = winEpicRef.current;
    else if (score >= 6) activeSound = greatRef.current;
    else activeSound = loseRef.current;

    activeSound.currentTime = 0;
    activeSound.play();

    const stopTimer = setTimeout(() => {
      activeSound.pause();
      activeSound.currentTime = 0;
    }, 5000);

    return () => clearTimeout(stopTimer);
  }, [showResult, score]);

  // SIMPAN SCORE KE MONGODB
  useEffect(() => {
    const saveScore = async () => {
      if (
        typeof window === "undefined" ||
        !showResult ||
        !playerName ||
        hasSavedResultRef.current
      ) {
        return;
      }

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playerName,
            score,
            total: 10,
          }),
        });

        hasSavedResultRef.current = true;
      } catch (err) {
        console.error("Gagal menyimpan score:", err);
      }
    };

    saveScore();
  }, [showResult, score, playerName]);

  const handleAnswer = (selectedOption) => {
    const question = shuffledQuestions[currentQuestion];
    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play();
      setScore((prev) => prev + 1);
    } else {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play();
    }

    const next = currentQuestion + 1;

    if (next < shuffledQuestions.length) {
      setTimeout(() => setCurrentQuestion(next), 700);
    } else {
      setTimeout(() => setShowResult(true), 900);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShuffledQuestions([]);
    setUsedQuestionIds([]);
    hasSavedResultRef.current = false;

    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(() => {});
    }
  };

  const question = shuffledQuestions[currentQuestion];

  if (!playerName) return null;

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-linear-to-b from-orange-400 to-orange-200 ${poppins.className}`}
      >
        <p className="text-2xl font-bold text-white animate-pulse">
          Memuat soal budaya...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-linear-to-b from-orange-400 to-orange-200 overflow-hidden`}
    >
      <Image
        src="/CultureFun/img/icon-quiz.svg"
        alt="icon quiz"
        width={450}
        height={400}
        priority
        className="absolute z-0 pointer-events-none translate-y-65 -translate-x-28 left-0 opacity-55"
      />

      <Image
        src="/CultureFun/img/icon-quiz-white.png"
        alt="icon quiz"
        width={300}
        height={250}
        priority
        className="absolute z-0 pointer-events-none translate-y-20 -translate-x-4 right-0 opacity-55"
      />

      {!showResult ? (
        <main className="relative z-10 flex flex-col items-center pt-28 px-6 pb-20 w-full max-w-5xl mx-auto">
          <div className="mb-6 bg-white/90 rounded-full px-5 py-2 shadow text-biru font-semibold">
            Pemain: {playerName}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl px-10 py-20 mb-16 w-full text-center border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A1F44] leading-relaxed">
              {question?.question || "Memuat pertanyaan..."}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {question?.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="bg-white hover:bg-orange-100 rounded-2xl shadow-lg px-6 py-6 transition text-lg font-medium border border-gray-200 text-[#0A1F44] cursor-pointer active:scale-95 transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>

          <p className="mt-14 text-sm text-gray-700 font-medium">
            Pertanyaan {currentQuestion + 1} dari {shuffledQuestions.length}
          </p>
        </main>
      ) : (
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 w-full max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-auto p-8 md:p-10 text-center my-10">
            <div className="relative z-10">
              <p className="text-biru font-semibold mb-2">
                Pemain: {playerName}
              </p>

              <div className="w-28 h-28 mx-auto mb-6 bg-biru text-white rounded-full flex flex-col items-center justify-center text-4xl font-black shadow-xl">
                {score}
                <span className="text-sm font-bold">Dari 10 soal</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-biru mb-4">
                {score >= 8
                  ? "Luar Biasa!"
                  : score >= 5
                    ? "Bagus Sekali!"
                    : "Semangat Lagi Ya!"}
              </h2>

              <p className="text-lg text-gray-700 mb-8 md:mb-10">
                Kamu berhasil menjawab benar <strong>{score}</strong> dari 10
                pertanyaan
              </p>

              {scoreHistory.length > 0 && (
                <div className="mb-8 text-left bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <h3 className="font-bold text-biru mb-3">Leaderboard</h3>

                  <div className="space-y-2 max-h-40 overflow-auto">
                    {scoreHistory.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="flex items-center justify-between bg-white rounded-xl px-4 py-2 text-sm"
                      >
                        <span className="font-medium text-biru">
                          {index + 1}. {item.name}
                        </span>

                        <span className="text-gray-600">
                          {item.score}/{item.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-biru hover:bg-orange text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg transition transform hover:scale-105 cursor-pointer active:scale-95"
                >
                  Ulangi Quiz
                </button>

                <button
                  onClick={() => router.push("/quiz")}
                  className="bg-white border-4 border-biru text-biru hover:bg-orange-50 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg transition transform hover:scale-105 cursor-pointer active:scale-95"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
