import { defineStore } from "pinia";

export interface Settings {
  duration?: number;
  enterDuration?: number;
  opacityClosed?: number;
  opacityOpened?: number;
  enterDelay?: number;
  moveDuration?: number;
  moveDelay?: number;
  easingMove?: string;
  delay?: number;
  xAxis?: number;
  yAxis?: number;
  exitDuration?: number;
  easingEnter?: string;
  easingLeave?: string;
}
export interface State {
  settings: Settings | null;
}

export const useAppStore = defineStore("main", {
  state(): State {
    return {
      settings: {},
    };
  },
  getters: {},
  actions: {
    updateSettings(settings: Settings) {
      this.settings = settings;
    },
  },
});
