<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import CustomButton from "../ui/CustomButton.vue";
import CustomRadio from "../ui/CustomRadio.vue";
import ControlPanel from "../ui/ControlPanel.vue";
import CustomDescription from "../ui/CustomDescription.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import CustomSlider from "../ui/CustomSlider.vue";
import { timingFunctions } from "../../animationsList/animationsList";
import { useAppStore } from "../../store/AppStore";

interface Settings {
  enterDuration: number;
  exitDuration: number;
  delay: number;
  easingEnter: string;
  easingLeave: string;
}

const settings = ref<Settings>({
  enterDuration: 30,
  exitDuration: 30,
  delay: 30,
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

const enterTransition = computed(() => {
  let transition = `all ${settings.value.enterDuration / 100}s ${
    settings.value.easingEnter
  }`;
  if (settings.value.delay) {
    transition = transition + ` ${settings.value.delay / 100}s`;
  }
  return transition;
});

const leaveTransition = computed(() => {
  let transition = `all ${settings.value.exitDuration / 100}s ${
    settings.value.easingLeave
  }`;
  return transition;
});

const route = useRoute();

const show = ref(true);
const toggleAnimation = () => {
  show.value = !show.value;
};
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
      v-model="settings.delay"
      :value="settings.delay"
      :max="100"
      name="delay"
      :default="settings.delay"
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
  <transition name="text">
    <div v-if="show"><h1>Lorem</h1></div>
    <div v-else><h1>Ipsum</h1></div>
  </transition>
</template>

<style scoped lang="scss">
.text-enter-from {
  opacity: 0;
}
.text-enter-to {
  opacity: 1;
}
.text-enter-active {
  transition: v-bind(enterTransition);
  position: absolute;
}
.text-leave-from {
  opacity: 1;
}
.text-leave-to {
  opacity: 0;
}
.text-leave-active {
  transition: v-bind(leaveTransition);
  position: absolute;
}
</style>
