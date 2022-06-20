<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import CustomButton from "../ui/CustomButton.vue";
import CustomRadio from "../ui/CustomRadio.vue";
import ControlPanel from "../ui/ControlPanel.vue";
import CustomDescription from "../ui/CustomDescription.vue";
import ExampleText from "../testExamples/exampleText.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import CustomSlider from "../ui/CustomSlider.vue";
import { timingFunctions } from "../../animationsList/animationsList";
import { useAppStore } from "../../store/AppStore";

interface Settings {
  enterDuration: number;
  exitDuration: number;
  easingEnter: string;
  easingLeave: string;
  xAxis: number;
  yAxis: number;
}

const settings = ref<Settings>({
  enterDuration: 30,
  exitDuration: 30,
  easingEnter: "ease",
  easingLeave: "ease",
  xAxis: 10,
  yAxis: 0,
});

const appStore = useAppStore();
onBeforeMount(() => {
  appStore.updateSettings(settings.value);
});
watch(
  () => settings.value,
  () => {
    appStore.updateSettings(settings.value);
  }
);

const transitionEnter = computed(() => {
  return `all ${settings.value.enterDuration / 100}s ${
    settings.value.easingEnter
  }`;
});
const transitionExit = computed(() => {
  return `all ${settings.value.exitDuration / 100}s ${
    settings.value.easingLeave
  }`;
});
const translate = computed(() => {
  return `translateX(${settings.value.xAxis}px) translateY(${settings.value.yAxis}px)`;
});

const route = useRoute();
const description = computed(() => {
  return route.meta.description as string;
});

const updateTimingFunction = (value: string, intent: "in" | "out") => {
  switch (intent) {
    case "in":
      settings.value.easingEnter = value;
      break;
    case "out":
      settings.value.easingLeave = value;
      break;
  }
};

const show = ref(true);
const toggleAnimation = () => {
  show.value = !show.value;
};
</script>

<template>
  <ControlPanel>
    <CustomButton @click="toggleAnimation">play</CustomButton>
  </ControlPanel>
  <teleport to="#Settings">
    <CustomDescription :text="description" />
    <CustomSlider
      v-model="settings.enterDuration"
      :value="settings.enterDuration"
      :max="100"
      name="enter duration"
      :default="settings.enterDuration"
      :min="0"
    />
    <CustomSlider
      v-model="settings.exitDuration"
      :value="settings.exitDuration"
      :max="100"
      name="exit duration"
      :default="settings.exitDuration"
      :min="0"
    />
    <CustomSlider
      v-model="settings.xAxis"
      :value="settings.xAxis"
      :max="50"
      name="X axis length"
      :default="settings.xAxis"
      :min="-50"
    />
    <CustomSlider
      v-model="settings.yAxis"
      :value="settings.yAxis"
      :max="50"
      name="Y axis length"
      :default="settings.yAxis"
      :min="-50"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function In"
      @update="updateTimingFunction($event, 'in')"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function out"
      @update="updateTimingFunction($event, 'out')"
    />
  </teleport>
  <transition name="move">
    <ExampleText v-if="show" />
  </transition>
</template>

<style scoped lang="scss">
.move-enter-from {
  transform: v-bind(translate);
  opacity: 0;
}
.move-enter-to {
  transform: translateX(0) translateY(0);
}
.move-enter-active {
  transition: v-bind(transitionEnter);
}
.move-leave-from {
  transform: translateX(0) translateY(0);
}
.move-leave-to {
  transform: v-bind(translate);
  opacity: 0;
}
.move-leave-active {
  transition: v-bind(transitionExit);
}
</style>
