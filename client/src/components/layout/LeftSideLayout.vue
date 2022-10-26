<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { animations } from "../../animationsList/animationsList";
import router from "../../router/router";
import { useAppStore } from "../../store/AppStore";

const emit = defineEmits(["leftResize", "hover"]);

const makeResizableDiv = (div: HTMLElement, resizer: HTMLElement) => {
  const element = div;
  const resizers = [resizer];
  let original_width = 0;
  const minWidth = 50;
  const maxWidth = 500;
  let original_x = element.getBoundingClientRect().left;
  let original_mouse_x = 0;
  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    original_x = element.getBoundingClientRect().left;
    original_mouse_x = e.pageX;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  function resize(e: MouseEvent) {
    const width = original_width + (e.pageX - original_mouse_x);
    if (width < minWidth || width > maxWidth) return;
    element.style.width = width + "px";
    localStorage.setItem("leftPanelWidth", width + "px");
    emit("leftResize", width);
  }

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }
};

const getLocalWidth = (el: HTMLElement) => {
  const width = localStorage.getItem("leftPanelWidth");
  if (typeof width === "string") {
    el.style.width = localStorage.getItem("leftPanelWidth")!;
  }
};

const route = useRoute();

const leftSideWrap = ref<HTMLElement | null>(null);
const resizer = ref<HTMLElement | null>(null);
const hover = (value: boolean) => {
  emit("hover", value);
};

const navigateTo = (route: string) => {
  router.push({ path: route });
};

onMounted(() => {
  if (leftSideWrap.value && resizer.value) {
    makeResizableDiv(leftSideWrap.value, resizer.value);
    getLocalWidth(leftSideWrap.value);
  }
});
</script>

<template>
  <div class="leftSide-wrap" ref="leftSideWrap">
    <div
      class="leftSide-resizeBar"
      ref="resizer"
      @mouseenter="hover(true)"
      @mouseleave="hover(false)"
    />
    <a href="https://planetfor.me" target="_blank">
      <div class="leftSide-pfmHeader">
        <h3>Animatios</h3>
      </div>
    </a>
    <div class="leftSide-animationsList">
      <div
        class="leftSide-animationsList-animation"
        v-for="animation in animations"
        @click="navigateTo(animation.route)"
        :class="{ active: route.name === animation.route }"
      >
        <h5>{{ animation.name }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active {
  border-left: 10px solid #333 !important;
  padding-left: 5px;
}
.leftSide {
  &-wrap {
    height: 100%;
    width: 300px;
    min-width: 50px;
    max-width: 500px;
    background-color: #f2f3f5;
    position: relative;
    overflow: hidden;
    padding-left: 10px;
    * {
      white-space: nowrap;
    }
  }
  &-resizeBar {
    box-sizing: content-box;
    width: 10px;
    position: absolute;
    right: -5px;
    height: 100%;
    cursor: col-resize;
    display: flex;
    flex-direction: column;
  }
  &-pfmHeader {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  &-animationsList {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 20px;
    &-animation {
      margin-bottom: 10px;
      cursor: pointer;
      position: relative;
      border-left: 0px solid #333;
      transition: all 0.1s ease-out;
      will-change: border;
      &:hover {
        border-left: 10px solid #333;
      }
    }
  }
}
</style>
