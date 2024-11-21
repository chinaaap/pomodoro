import React from "react";
import { Settings } from "../types/timer";
import { Clock, Bell, Save } from "lucide-react";

interface SettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const SettingsPanel: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [tempSettings, setTempSettings] = React.useState(settings);

  const handleChange = (key: keyof Settings, value: number | boolean) => {
    setTempSettings({ ...tempSettings, [key]: value });
  };

  const handleSave = () => {
    onSettingsChange(tempSettings);
  };

  // Update local state when settings prop changes
  React.useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center space-x-2 text-gray-700 mb-2">
          <Clock size={20} />
          <span>作業時間（分）</span>
        </label>
        <input
          type="number"
          min="1"
          max="60"
          value={Math.floor(tempSettings.workDuration / 60)}
          onChange={(e) =>
            handleChange(
              "workDuration",
              Math.max(1, parseInt(e.target.value)) * 60
            )
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2 text-gray-700 mb-2">
          <Bell size={20} />
          <span>休憩時間（分）</span>
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={Math.floor(tempSettings.breakDuration / 60)}
          onChange={(e) =>
            handleChange(
              "breakDuration",
              Math.max(1, parseInt(e.target.value)) * 60
            )
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="posturePause"
          checked={tempSettings.posturePause}
          onChange={(e) => handleChange("posturePause", e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="posturePause" className="text-gray-700">
          作業モード（Work Mode）終了時にストレッチを促してもらう
        </label>
      </div>

      <div className="flex items-center justify-start">
        <button
          onClick={handleSave}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save size={20} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};
