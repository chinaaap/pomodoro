import { useState, useEffect, useCallback } from "react";
import { TimerMode, TimerStats, Settings } from "../types/timer";
import { useLocalStorage } from "./useLocalStorage";
import { useSound } from "./useSound";

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  volume: 0.5,
  selectedSound: null,
  posturePause: true,
};

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useLocalStorage<Settings>(
    "pomodoro-settings",
    DEFAULT_SETTINGS
  );
  const [stats, setStats] = useLocalStorage<TimerStats>("pomodoro-stats", {
    dailySessions: 0,
    focusScore: 100,
    interruptions: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const audioRef = useSound(settings.selectedSound, settings.volume);

  const resetTimer = useCallback(() => {
    setTimeLeft(
      mode === "work" ? settings.workDuration : settings.breakDuration
    );
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [mode, settings, audioRef]);

  const updateTimerFromSettings = useCallback(() => {
    if (!isActive) {
      setTimeLeft(
        mode === "work" ? settings.workDuration : settings.breakDuration
      );
    }
  }, [mode, settings, isActive]);

  // const toggleTimer = () => {
  //   if (timeLeft === 0) {
  //     // Only reset if timer has finished
  //     resetTimer();
  //     setIsActive(true);
  //   } else {
  //     // Just toggle the active state without resetting
  //     setIsActive(!isActive);
  //   }

  //   // Handle audio
  //   if (!isActive && settings.selectedSound && audioRef.current) {
  //     audioRef.current.play();
  //   } else if (isActive && audioRef.current) {
  //     audioRef.current.pause();
  //   }
  // };

  const switchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setTimeLeft(
      newMode === "work" ? settings.workDuration : settings.breakDuration
    );
    setIsActive(false);

    // Stop sound when switching modes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const updateStats = (type: "session" | "interruption") => {
    const today = new Date().toISOString().split("T")[0];

    setStats((prev) => {
      // Reset stats if it's a new day
      if (prev.date !== today) {
        return {
          dailySessions: type === "session" ? 1 : 0,
          focusScore: 100,
          interruptions: type === "interruption" ? 1 : 0,
          date: today,
        };
      }

      const newStats = {
        ...prev,
        date: today,
        dailySessions:
          type === "session" ? prev.dailySessions + 1 : prev.dailySessions,
        interruptions:
          type === "interruption" ? prev.interruptions + 1 : prev.interruptions,
      };

      // Update focus score based on interruptions
      newStats.focusScore = Math.max(0, 100 - newStats.interruptions * 5);

      return newStats;
    });
  };

  // useEffect(() => {
  //   let interval: number | undefined;

  //   if (isActive && timeLeft > 0) {
  //     interval = window.setInterval(() => {
  //       setTimeLeft((time) => time - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0 && isActive) {
  //     // Stop background sound when timer ends
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current.currentTime = 0;
  //     }

  //     if (mode === "work") {
  //       updateStats("session");
  //       new Audio("/sounds/notification.mp3").play();
  //     }
  //     setIsActive(false);
  //     setSettings((prev) => ({ ...prev, selectedSound: null }));
  //   }

  //   return () => clearInterval(interval);
  // }, [isActive, timeLeft, mode, audioRef, setSettings]);

  // // Update timer when settings change
  // useEffect(() => {
  //   if (!isActive) {
  //     updateTimerFromSettings();
  //   }
  // }, [settings, isActive, updateTimerFromSettings]);

  // タイマーのメインロジック
  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimerComplete();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]); // 依存配列を必要最小限に

  // タイマー完了時の処理を別関数として切り出し
  const handleTimerComplete = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (mode === "work") {
      updateStats("session");
    }
    new Audio("/sounds/notification.mp3").play();
    setIsActive(false);
    setSettings((prev) => ({ ...prev, selectedSound: null }));
  }, [mode, setSettings]);

  // 設定変更時のタイマー更新
  useEffect(() => {
    // タイマーが停止中のみ更新
    if (!isActive) {
      const newDuration =
        mode === "work" ? settings.workDuration : settings.breakDuration;
      // 現在の値と異なる場合のみ更新
      if (timeLeft !== newDuration) {
        setTimeLeft(newDuration);
      }
    }
  }, [settings, mode]); // isActiveは依存配列から除外

  // タイマーの開始/停止を切り替える関数
  const toggleTimer = useCallback(() => {
    if (timeLeft === 0) {
      const newDuration =
        mode === "work" ? settings.workDuration : settings.breakDuration;
      setTimeLeft(newDuration);
      setIsActive(true);
    } else {
      // オーディオの制御
      if (audioRef.current) {
        if (!isActive) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      setIsActive(!isActive);
    }
  }, [timeLeft, mode, settings, isActive]);

  return {
    mode,
    timeLeft,
    isActive,
    settings,
    stats,
    toggleTimer,
    resetTimer,
    switchMode,
    setSettings,
    updateStats,
    updateTimerFromSettings,
  };
};
