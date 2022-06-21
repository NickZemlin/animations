<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "../../store/AppStore";

const appStore = useAppStore();

const expand = ref(false);
const expandText = computed(() => {
  return expand.value ? "Collapse" : "Export";
});

const settingsPresenter = computed(() => {
  return appStore.getFormatedSettings();
});

const textToCopy = computed(() => {
  let map = settingsPresenter.value.map(
    (line) => `${line.header} ${line.setting} \n`
  );
  map.unshift((animationName.value as string) + "\n");
  return map.reduce((acc, line) => (acc += line));
});

const copyAnimation = ref(false);
const copySettings = () => {
  if (!copyAnimation.value) {
    copyAnimation.value = true;
    window.setTimeout(() => {
      copyAnimation.value = false;
    }, 700);
  }
  navigator.clipboard.writeText(textToCopy.value);
};

const route = useRoute();
const animationName = computed(() => {
  return route.name;
});
</script>

<template>
  <div class="export-wrap">
    <div class="export-expand" @click="expand = !expand">
      <p>{{ expandText }}</p>
    </div>
    <transition name="export">
      <div class="export-settings-wrap" v-if="expand">
        <h3 class="export-settings-name">{{ animationName }}</h3>
        <div class="export-settings-content">
          <div
            class="export-settings-setting"
            v-for="settings in settingsPresenter"
          >
            <h4 style="user-select: text">{{ settings.header }}</h4>
            <p style="user-select: text">{{ settings.setting }}</p>
          </div>
          <div class="export-settings-copy" @click="copySettings">
            <transition-group name="text">
              <p
                class="export-settings-copy-text"
                key="copy"
                v-if="!copyAnimation"
              >
                copy
              </p>
              <p
                class="export-settings-copy-text"
                key="copied"
                v-if="copyAnimation"
              >
                copied
              </p>
            </transition-group>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.export {
  &-wrap {
    user-select: text;
    position: absolute;
    top: 15vh;
    right: 20px;
    z-index: 10;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
  &-expand {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    padding: 5px;
    display: flex;
    justify-content: center;
    height: 5em;
    font-size: 1.5em;
    background-color: #f2f3f5;
    align-self: flex-start;
    border-radius: 0px 10px 10px 0px;
  }
  &-settings {
    &-wrap {
      box-sizing: border-box;
      width: 300px;
      padding: 10px 0px;
      padding-left: 10px;
      background-color: #f2f3f5;
      border-radius: 0px 10px 10px 10px;
      overflow: hidden;
      white-space: nowrap;
    }
    &-name {
      text-align: center;
      margin-bottom: 20px;
    }
    &-setting {
      margin-bottom: 5px;
    }
    &-copy {
      height: 30px;
      margin-top: 10px;
      margin-left: 25%;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #333;
      cursor: pointer;
      &-text {
        color: white;
      }
    }
  }
}

.export-enter-from {
  padding: 0;
  width: 0;
}
.export-enter-to {
  width: 300px;
}
.export-enter-active {
  transition: all 0.6s cubic-bezier(0.87, 0, 0.13, 1);
}

.export-leave-from {
  width: 300px;
}
.export-leave-to {
  padding: 0;
  width: 0;
}
.export-leave-active {
  transition: all 0.6s cubic-bezier(0.87, 0, 0.13, 1);
}

.text-enter-from {
  transform: translateY(15px);
  opacity: 0;
}

.text-enter-active {
  transition: all 0.3s ease-out 0.3s;
  position: absolute;
}
.text-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}

.text-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.setting-enter-from {
  transform: translateY(15px);
  opacity: 0;
}
</style>
