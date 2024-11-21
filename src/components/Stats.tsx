import React from "react";
import { TimerStats } from "../types/timer";
import { Target, Zap, AlertCircle } from "lucide-react";

interface StatsProps {
  stats: TimerStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-600 mb-2">
          <Target size={20} />
          <span className="font-medium">Sessions</span>
        </div>
        <p className="text-2xl font-bold">{stats.dailySessions}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-green-600 mb-2">
          <Zap size={20} />
          <span className="font-medium">Focus Score</span>
        </div>
        <p className="text-2xl font-bold">{stats.focusScore}%</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-red-600 mb-2">
          <AlertCircle size={20} />
          <span className="font-medium">Interruptions</span>
        </div>
        <p className="text-2xl font-bold">{stats.interruptions}</p>
      </div>
    </div>
  );
};
