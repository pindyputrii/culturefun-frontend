"use client";

import { useEffect, useRef } from "react";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    let timeoutId;

    const playAudio = () => {
      if (audioElement) {
        audioElement.volume = 0.7;
        audioElement
          .play()
          .then(() => {
            console.log("Lagu Indonesia Pusaka diputar");
          })
          .catch((error) => {
            console.log("Autoplay dicegah:", error);
          });
      }
    };

    const timer = setTimeout(playAudio, 1000);
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleInteraction);
    };
    document.addEventListener("click", handleInteraction);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleInteraction);

      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);

  return (
    <audio ref={audioRef} src="/audio/indonesia-pusaka.mp3" preload="auto" />
  );
}
