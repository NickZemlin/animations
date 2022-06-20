<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import CustomButton from "../ui/CustomButton.vue";
import ControlPanel from "../ui/ControlPanel.vue";
import CustomSlider from "../ui/CustomSlider.vue";
import CustomRadio from "../ui/CustomRadio.vue";
import CustomDescription from "../ui/CustomDescription.vue";
import { timingFunctions } from "../../animationsList/animationsList";
import LongListExample from "../testExamples/longListExample.vue";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useAppStore } from "../../store/AppStore";

interface Settings {
  duration: number;
  easingEnter?: string;
  easingLeave?: string;
  opacityClosed: number;
  opacityOpened: number;
  appear?: boolean;
}

const route = useRoute();

const settings = ref<Settings>({
  duration: 250,
  easingEnter: "ease-in-out",
  easingLeave: "ease-in-out",
  opacityClosed: 0,
  opacityOpened: 100,
  appear: false,
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

const closed = "0px";

interface initialStyle {
  height: string;
  width: string;
  position: string;
  visibility: string;
  overflow: string;
  paddingTop: string;
  paddingBottom: string;
  borderTopWidth: string;
  borderBottomWidth: string;
  marginTop: string;
  marginBottom: string;
}

function getElementStyle(element: HTMLElement) {
  return {
    height: element.style.height,
    width: element.style.width,
    position: element.style.position,
    visibility: element.style.visibility,
    overflow: element.style.overflow,
    paddingTop: element.style.paddingTop,
    paddingBottom: element.style.paddingBottom,
    borderTopWidth: element.style.borderTopWidth,
    borderBottomWidth: element.style.borderBottomWidth,
    marginTop: element.style.marginTop,
    marginBottom: element.style.marginBottom,
  };
}

function prepareElement(element: HTMLElement, initialStyle: initialStyle) {
  const { width } = getComputedStyle(element);
  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "";
  let { height } = getComputedStyle(element);
  element.style.width = initialStyle.width;
  element.style.position = initialStyle.position;
  element.style.visibility = initialStyle.visibility;
  element.style.height = closed;
  element.style.overflow = "hidden";
  return initialStyle.height && initialStyle.height != closed
    ? initialStyle.height
    : height;
}

function animateTransition(
  element: HTMLElement,
  initialStyle: initialStyle,
  done: () => void,
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions
) {
  const animation = element.animate(keyframes, options);
  element.style.height = initialStyle.height;
  animation.onfinish = () => {
    element.style.overflow = initialStyle.overflow;
    done();
  };
}

function getEnterKeyframes(height: string, initialStyle: initialStyle) {
  return [
    {
      height: closed,
      opacity: settings.value.opacityClosed / 100,
      paddingTop: closed,
      paddingBottom: closed,
      borderTopWidth: closed,
      borderBottomWidth: closed,
      marginTop: closed,
      marginBottom: closed,
    },
    {
      height,
      opacity: settings.value.opacityOpened / 100,
      paddingTop: initialStyle.paddingTop,
      paddingBottom: initialStyle.paddingBottom,
      borderTopWidth: initialStyle.borderTopWidth,
      borderBottomWidth: initialStyle.borderBottomWidth,
      marginTop: initialStyle.marginTop,
      marginBottom: initialStyle.marginBottom,
    },
  ];
}

function enterTransition(element: Element, done: () => void) {
  const HTMLElement = element as HTMLElement;
  const initialStyle = getElementStyle(HTMLElement);
  const height = prepareElement(HTMLElement, initialStyle);
  const keyframes = getEnterKeyframes(height, initialStyle);
  const options = {
    duration: settings.value.duration,
    easing: settings.value.easingEnter,
  };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}

function leaveTransition(element: Element, done: () => void) {
  const HTMLElement = element as HTMLElement;
  const initialStyle = getElementStyle(HTMLElement);
  const { height } = getComputedStyle(HTMLElement);
  HTMLElement.style.height = height;
  HTMLElement.style.overflow = "hidden";
  const keyframes = getEnterKeyframes(height, initialStyle).reverse();
  const options = {
    duration: settings.value.duration,
    easing: settings.value.easingLeave,
  };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}

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
      v-model="settings.duration"
      :value="settings.duration"
      :max="1000"
      name="duration"
      :default="settings.duration"
      :min="100"
    />
    <CustomSlider
      v-model="settings.opacityOpened"
      :value="settings.opacityOpened"
      :max="100"
      name="Opacity Opened"
      :default="settings.opacityOpened"
      :min="0"
    />
    <CustomSlider
      v-model="settings.opacityClosed"
      :value="settings.opacityClosed"
      :max="100"
      name="Opacity Closed"
      :default="settings.opacityClosed"
      :min="0"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function In"
      @update="updateTimingFunction($event, 'in')"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function Out"
      @update="updateTimingFunction($event, 'out')"
    />
  </teleport>
  <Transition
    :css="false"
    @enter="enterTransition"
    @leave="leaveTransition"
    :appear="settings.appear"
  >
    <div v-if="show" style="padding: 5px">
      <LongListExample />
    </div>
  </Transition>
</template>

<style scoped lang="scss"></style>
