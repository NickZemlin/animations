<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["settingsResize"]);

const makeResizableDiv = (div: HTMLElement, resizer: HTMLElement) => {
  const element = div;
  const resizers = [resizer];
  let original_height = 300;
  const minHeight = 50;
  const maxHeight = 500;
  let original_y = element.getBoundingClientRect().bottom;
  let original_mouse_y = 0;
  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_y = element.getBoundingClientRect().bottom;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  function resize(e: MouseEvent) {
    const height = original_height - (e.pageY - original_mouse_y);
    if (height < minHeight || height > maxHeight) return;
    element.style.height = height + "px";
    localStorage.setItem("settingsPannelHeight", height + "px");
    emit("settingsResize", height);
  }

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }
};

const getLocalHeight = (el: HTMLElement) => {
  const height = localStorage.getItem("settingsPannelHeight");
  if (typeof height === "string") {
    el.style.width = height;
  }
};

const settingsWrap = ref<HTMLElement | null>(null);
const settingsResizer = ref<HTMLElement | null>(null);
onMounted(() => {
  if (settingsResizer.value && settingsWrap.value) {
    makeResizableDiv(settingsWrap.value, settingsResizer.value);
  }
});
</script>

<template>
  <div class="settings-wrap" ref="settingsWrap">
    <div class="settings-resizer" ref="settingsResizer"></div>
    <div class="settings-inputs" id="Settings"></div>
  </div>
</template>

<style scoped lang="scss">
.settings {
  &-wrap {
    width: 100%;
    height: 300px;
    position: absolute;
    bottom: 0;
    box-shadow: 0px -0.3px 2.2px rgba(0, 0, 0, 0.01),
      0px -0.7px 5.3px rgba(0, 0, 0, 0.007),
      0px -1.3px 10px rgba(0, 0, 0, 0.006),
      0px -2.2px 17.9px rgba(0, 0, 0, 0.005),
      0px -4.2px 33.4px rgba(0, 0, 0, 0.004),
      0px -10px 80px rgba(0, 0, 0, 0.003);
    overflow-y: overlay;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #333333;
      border-radius: 10px;
    }
  }
  &-resizer {
    position: sticky;
    top: 0px;
    width: 100%;
    height: 10px;
    border-top: 2px solid #3333;
    cursor: row-resize;
    scrollbar-color: #6969dd #e0e0e0;
    scrollbar-width: thin;
  }
  &-inputs {
    padding: 20px;
  }
}
</style>
