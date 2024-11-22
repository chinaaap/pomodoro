import React, { useState } from "react";
import { Timer } from "./components/Timer";
import { SoundControl } from "./components/SoundControl";
import { SettingsPanel } from "./components/Settings";
import { StretchPopup } from "./components/StretchPopup";
import { useTimer } from "./hooks/useTimer";
import { Settings, SoundType } from "./types/timer";
import { Settings as SettingsIcon } from "lucide-react";
import { Stats } from "./components/Stats";

function App() {
  const {
    mode,
    timeLeft,
    isActive,
    settings,
    stats,
    toggleTimer,
    resetTimer,
    switchMode,
    setSettings,
    updateTimerFromSettings,
  } = useTimer();

  const [showSettings, setShowSettings] = useState(false);
  const [showStretchPopup, setShowStretchPopup] = useState(false);

  const handleSoundSelect = (sound: SoundType) => {
    setSettings({
      ...settings,
      selectedSound: settings.selectedSound === sound ? null : sound,
    });
  };

  const handleVolumeChange = (volume: number) => {
    setSettings({ ...settings, volume });
  };

  const handleSettingsSave = (newSettings: Settings) => {
    setSettings(newSettings);
    updateTimerFromSettings();
    alert("設定を保存しました");
    setShowSettings(false);
  };

  React.useEffect(() => {
    if (
      timeLeft === 0 &&
      mode === "work" &&
      !isActive &&
      settings.posturePause
    ) {
      setShowStretchPopup(true);
    }
  }, [timeLeft, mode, isActive, settings.posturePause]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Pomodoro Timer</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SettingsIcon size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Timer
              timeLeft={timeLeft}
              isActive={isActive}
              mode={mode}
              onToggle={toggleTimer}
              onReset={resetTimer}
              onSwitch={switchMode}
            />
          </div>

          {showSettings ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Settings
              </h2>
              <SettingsPanel
                settings={settings}
                onSettingsChange={handleSettingsSave}
              />
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  BGM
                </h2>
                <SoundControl
                  volume={settings.volume}
                  selectedSound={settings.selectedSound}
                  onVolumeChange={handleVolumeChange}
                  onSoundSelect={handleSoundSelect}
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <Stats stats={stats} />
              </div>
            </>
          )}
        </div>
      </div>

      {showStretchPopup && (
        <StretchPopup onClose={() => setShowStretchPopup(false)} />
      )}
    </div>
  );
}

export default App;
