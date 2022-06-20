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
}

const settings = ref<Settings>({
  enterDuration: 30,
  exitDuration: 30,
  easingEnter: "ease",
  easingLeave: "ease",
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

const CssEnter = computed(() => {
  return `all ${settings.value.enterDuration / 100}s ${
    settings.value.easingEnter
  }`;
});

const CssExit = computed(() => {
  return `all ${settings.value.exitDuration / 100}s ${
    settings.value.easingLeave
  }`;
});

const route = useRoute();

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

const description = computed(() => {
  return route.meta.description as string;
});

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
  <transition name="opacity">
    <ExampleText v-if="show" />
  </transition>
</template>

<style scoped lang="scss">
.opacity-enter-from {
  opacity: 0;
}
.opacity-enter-to {
  opacity: 1;
}
.opacity-enter-active {
  transition: v-bind(CssEnter);
}
.opacity-leave-from {
  opacity: 1;
}
.opacity-leave-to {
  opacity: 0;
}
.opacity-leave-active {
  transition: v-bind(CssExit);
}
</style>
