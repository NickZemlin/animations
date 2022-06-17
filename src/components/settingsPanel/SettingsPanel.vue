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
    overflow-y: auto;
  }
  &-resizer {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 10px;
    border-top: 2px solid #3333;
    cursor: row-resize;
  }
  &-inputs {
    padding: 20px;
  }
}
</style>
