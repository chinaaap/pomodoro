import React from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  mode: "work" | "break";
  onToggle: () => void;
  onReset: () => void;
  onSwitch: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  isActive,
  mode,
  onToggle,
  onReset,
  onSwitch,
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-6xl font-bold text-gray-800">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="text-xl font-medium text-gray-600 capitalize">
        {mode} Mode
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onToggle}
          className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          aria-label={isActive ? "Pause timer" : "Start timer"}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onReset}
          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={onSwitch}
          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Switch mode"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
};
