import React from "react";
import { TimerStats } from "../types/timer";
import { Target, Zap, AlertCircle } from "lucide-react";

interface StatsProps {
  stats: TimerStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="p-0 rounded-lg shadow-sm flex flex-col">
      {/* <div className="bg-white p-4 rounded-lg shadow-sm flex flex-row justify-around items-center align-middle"> */}
      <div className="">
        {/* <Target size={20} /> */}
        <h2 className="text-xl font-semibold text-gray-800">
          Sessions：
          <span className="text-2xl text-indigo-700 font-bold text-center">
            {stats.dailySessions}
          </span>
        </h2>
      </div>
      {/* <p className="text-5xl font-bold text-center">{stats.dailySessions}</p> */}
      {/* </div> */}

      {/* <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-green-600 mb-2">
          <Zap size={20} />
          <span className="font-medium">Focus Score</span>
        </div>
        <p className="text-2xl font-bold">{stats.focusScore}%</p>
      </div> */}

      {/* <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-red-600 mb-2">
          <AlertCircle size={20} />
          <span className="text-xl">作業中断数</span>
        </div>
        <p className="text-2xl font-bold text-center">{stats.interruptions}</p>
      </div> */}
    </div>
  );
};
