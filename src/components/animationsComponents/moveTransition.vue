<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "../ui/CustomButton.vue";
import CustomRadio from "../ui/CustomRadio.vue";
import ControlPanel from "../ui/ControlPanel.vue";
import CustomDescription from "../ui/CustomDescription.vue";
import ExampleText from "../testExamples/exampleText.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import CustomSlider from "../ui/CustomSlider.vue";
import { timingFunctions } from "../../animationsList/animationsList";

const show = ref(true);
const route = useRoute();
const description = computed(() => {
  return route.meta.description as string;
});
</script>

<template>
  <ControlPanel>
    <CustomButton @click="">play</CustomButton>
  </ControlPanel>
  <teleport to="#Settings"></teleport>
  <transition name="opacity">
    <ExampleText v-if="show" />
  </transition>
</template>

<style scoped lang="scss"></style>
