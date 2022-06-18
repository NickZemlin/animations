<script setup lang="ts">
import SettingsPanel from "../settingsPanel/SettingsPanel.vue";
import PreviewPanel from "../preview/PreviewPanel.vue";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
interface Props {
  rightSideWidth: string;
  hover: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rightSideWidth: "auto",
  hover: false,
});

const layout = ref({
  vh: Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ),
  bottom: 300,
  get top() {
    return this.vh - this.bottom;
  },
});

const resizeHandle = (payload: number) => {
  layout.value.bottom = payload;
};

const heightGetter = computed(() => {
  return layout.value.top + "px";
});
</script>

<template>
  <div class="rightSide-wrap" :class="{ hoverShadow: hover }">
    <PreviewPanel :preview-height="heightGetter" />
    <SettingsPanel @settings-resize="resizeHandle" />
  </div>
</template>

<style scoped lang="scss">
.rightSide {
  &-wrap {
    height: 100%;
    overflow: hidden;
    background-color: white;
    box-shadow: -0.5px 0px 3.6px rgba(0, 0, 0, 0.01),
      -1.3px 0px 10px rgba(0, 0, 0, 0.007), -3px 0px 24.1px rgba(0, 0, 0, 0.005),
      -10px 0px 80px rgba(0, 0, 0, 0.003);
    width: v-bind(rightSideWidth);
    transition: box-shadow 0.5s ease-in;
    z-index: 2;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
.hoverShadow {
  box-shadow: -0.5px 0px 3.6px rgba(0, 0, 0, 0.06),
    -1.3px 0px 10px rgba(0, 0, 0, 0.039), -3px 0px 24.1px rgba(0, 0, 0, 0.03),
    -10px 0px 80px rgba(0, 0, 0, 0.021);
}
</style>
