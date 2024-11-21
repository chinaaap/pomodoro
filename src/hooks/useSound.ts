import { useEffect, useRef } from "react";
import { SoundType } from "../types/timer";

const SOUND_URLS = {
  rain: "/sounds/rain.mp3",
  waves: "/sounds/waves.mp3",
  cafe: "/sounds/cafe.mp3",
};

export const useSound = (selectedSound: SoundType | null, volume: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedSound) {
      if (!audioRef.current) {
        audioRef.current = new Audio(SOUND_URLS[selectedSound]);
        audioRef.current.loop = true;
      }
      audioRef.current.src = SOUND_URLS[selectedSound];
      audioRef.current.volume = volume;
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedSound, volume]);

  return audioRef;
};
