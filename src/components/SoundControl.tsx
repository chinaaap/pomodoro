import React from "react";
import { Volume2, CloudRain, Waves, Coffee } from "lucide-react";
import { SoundType } from "../types/timer";

interface SoundControlProps {
  volume: number;
  selectedSound: SoundType | null;
  onVolumeChange: (volume: number) => void;
  onSoundSelect: (sound: SoundType) => void;
}

export const SoundControl: React.FC<SoundControlProps> = ({
  volume,
  selectedSound,
  onVolumeChange,
  onSoundSelect,
}) => {
  const sounds: { type: SoundType; icon: React.ReactNode; label: string }[] = [
    { type: "rain", icon: <CloudRain size={20} />, label: "Rain" },
    { type: "waves", icon: <Waves size={20} />, label: "Waves" },
    { type: "cafe", icon: <Coffee size={20} />, label: "Cafe" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Volume2 size={30} className="text-gray-600" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex space-x-2">
        {sounds.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onSoundSelect(type)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedSound === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
