export type TimerMode = "work" | "break";
export type SoundType = "rain" | "waves" | "cafe";

export interface TimerStats {
  dailySessions: number;
  focusScore: number;
  interruptions: number;
  date: string;
}

export interface Settings {
  workDuration: number;
  breakDuration: number;
  volume: number;
  selectedSound: SoundType | null;
  posturePause: boolean;
}
