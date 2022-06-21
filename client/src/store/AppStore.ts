import { defineStore } from "pinia";

const settingsType = {
  duration: "time",
  enterDuration: "time",
  enterDelay: "time",
  moveDuration: "time",
  moveDelay: "time",
  delay: "time",
  exitDuration: "time",
  opacityClosed: "value",
  opacityOpened: "value",
  xAxis: "valuePx",
  yAxis: "valuePx",
  easingEnter: "timingFunction",
  easingLeave: "timingFunction",
};

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
    getFormatedSettings() {
      let result: Array<{ header: string; setting: string }> = [];
      let settings = this.settings;
      if (settings !== null) {
        for (let item = 0; item < Object.keys(settings).length; item++) {
          let valueType = Object.keys(settings)[item];
          let value =
            settings[Object.keys(settings)[item] as keyof typeof settings];
          let type =
            settingsType[
              Object.keys(settings)[item] as keyof typeof settingsType
            ];
          switch (type) {
            case "time":
              value = Number(value) / 100 + "s";
              break;
            case "valuePx":
              value = Number(value) + "px";
              break;
          }
          result.push({
            header: Object.keys(settings)[item] + ":",
            setting: value!.toString(),
          });
        }
      }
      return result;
    },
  },
});
