"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const createShuffledCards = () => {
  const images = [
    "/CultureFun/img/kesenian/wayang_kulit.jpg",
    "/CultureFun/img/makanan/rendang.jpg",
    "/CultureFun/img/pakaian/ulos.jpg",
    "/CultureFun/img/rumah/rumah_tongkonan.jpg",
    "/CultureFun/img/makanan/pempek.jpg",
    "/CultureFun/img/rumah/rumah_betang.jpg",
  ];

  const shuffled = [...images, ...images]
    .map((img, index) => ({
      id: index,
      image: img,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffled;
};

export default function CardGrid() {
  const flipSoundRef = useRef(null);
  const matchSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);
  const bgMusicRef = useRef(null);

  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    flipSoundRef.current = new Audio("/audio/flip.mp3");
    matchSoundRef.current = new Audio("/audio/match.mp3");
    winSoundRef.current = new Audio("/audio/win-match.mp3");
    loseSoundRef.current = new Audio("/audio/lose-match.mp3");
    bgMusicRef.current = new Audio("/audio/match-backsound.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    const startAudio = () => {
      bgMusicRef.current.play().catch(() => {});
      document.removeEventListener("click", startAudio);
    };
    document.addEventListener("click", startAudio);

    return () => bgMusicRef.current?.pause();
  }, []);

  useEffect(() => {
    const newCards = createShuffledCards();
    setCards(newCards);

    const timer = setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: false })));
      setShowPreview(false);
      setStartTime(Date.now());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPreview) {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: true })));
    }
  }, [showPreview]);

  const handleCardClick = (id) => {
    if (disabled || showPreview) return;
    const clicked = cards.find((c) => c.id === id);
    if (clicked.flipped || clicked.matched) return;

    flipSoundRef.current.currentTime = 0;
    flipSoundRef.current.play();

    if (!firstCard) {
      setFirstCard(clicked);
      setCards((prev) =>
        prev.map((card) => (card.id === id ? { ...card, flipped: true } : card))
      );
    } else if (!secondCard) {
      setSecondCard(clicked);
      setCards((prev) =>
        prev.map((card) => (card.id === id ? { ...card, flipped: true } : card))
      );
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.image === secondCard.image) {
        matchSoundRef.current.currentTime = 0;
        matchSoundRef.current.play();

        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.image === firstCard.image ? { ...card, matched: true } : card
            )
          );
          resetTurn();
        }, 600);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched) && startTime) {
      const elapsed = (Date.now() - startTime) / 1000;
      const finalTime = Number(elapsed.toFixed(1));
      setTimeTaken(finalTime);
      setIsSuccess(finalTime <= 60);
      setShowResult(true);

      bgMusicRef.current?.pause();
      (finalTime <= 60 ? winSoundRef : loseSoundRef).current.currentTime = 0;
      (finalTime <= 60 ? winSoundRef : loseSoundRef).current.play();
    }
  }, [cards, startTime]);

  useEffect(() => {
    if (!startTime || showPreview || showResult) return;

    const interval = setInterval(() => {
      const seconds = (Date.now() - startTime) / 1000;
      if (seconds > 60) {
        setTimeTaken(60.0);
        setIsSuccess(false);
        setShowResult(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, showPreview, showResult]);

  const handleRestart = () => window.location.reload();
  const handleClose = () => (window.location.href = "/games");

  return (
    <div className="z-50 translate-y-10 flex flex-col items-center justify-center rounded-3xl bg-biru px-7 py-7">
      <div className="grid grid-cols-4 gap-6 p-6 rounded-2xl">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer perspective"
            onClick={() => handleCardClick(card.id)}
          >
            <motion.div
              className="relative w-full h-full rounded-xl"
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 backface-hidden rounded-xl">
                <div className="w-full h-full bg-orange-600 rounded-xl flex items-center justify-center">
                  <Image
                    src="/CultureFun/img/icon-stick.svg"
                    alt="back"
                    width={80}
                    height={80}
                    className="opacity-90"
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 backface-hidden rounded-xl"
                style={{ transform: "rotateY(180deg)" }}
              >
                <Image
                  src={card.image}
                  alt="card"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-linear-to-br from-orange-100 to-orange-50 rounded-3xl shadow-2xl overflow-hidden max-w-sm w-full mx-6"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="bg-biru text-white py-9 px-10 text-center">
                <h2 className="text-5xl font-black tracking-wider">
                  {isSuccess ? "SELAMAT!" : "WAKTU HABIS!"}
                </h2>
              </div>

              <div className="p-8 text-center space-y-6">
                <div>
                  <p className="text-xl font-bold text-gray-800 mb-3">
                    Waktu kamu
                  </p>

                  <div className="inline-block bg-biru text-white px-8 py-4 rounded-3xl shadow-lg">
                    <span className="text-5xl font-black tracking-wider">
                      {Number(timeTaken).toFixed(1)}
                    </span>
                  </div>

                  {!isSuccess && (
                    <p className="text-base text-red-600 font-bold mt-5 leading-tight">
                      Waktu kamu melebihi 1 menit.
                      <br />
                      Ayo dicoba lagi!
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3.5 px-10 rounded-full transition transform hover:scale-105 shadow-xl"
                  >
                    Main Lagi
                  </button>
                  <button
                    onClick={handleClose}
                    className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold text-lg py-3.5 px-12 rounded-full transition transform hover:scale-105 shadow-xl"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
