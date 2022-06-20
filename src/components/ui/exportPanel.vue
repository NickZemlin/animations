<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "../../store/AppStore";

const appStore = useAppStore();

const expand = ref(false);
const expandText = computed(() => {
  return expand.value ? "Collapse" : "Export";
});

const settingsPresenter = computed(() => {
  const result = [];
  if (appStore.settings) {
    let settings = appStore.settings;
    for (let item = 0; item < Object.keys(settings).length; item++) {
      let field = Object.keys(settings)[item] as keyof typeof settings;
      result.push({ header: field, setting: settings[field] });
    }
  }
  return result;
});
</script>

<template>
  <div class="export-wrap">
    <div class="export-expand" @click="expand = !expand">
      <p>{{ expandText }}</p>
    </div>
    <transition name="export">
      <div class="export-settings-wrap" v-if="expand">
        <h3>Settings:</h3>
        <div class="export-settings-content">
          <div
            class="export-settings-setting"
            v-for="settings in settingsPresenter"
          >
            <h4 style="user-select: text">{{ settings.header }}</h4>
            <p style="user-select: text">{{ settings.setting }}</p>
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
    position: fixed;
    top: 15vh;
    right: 0;
    z-index: 2;
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
      width: 150px;
      padding: 10px 0px;
      padding-left: 10px;
      background-color: #f2f3f5;
      border-radius: 0px 0px 0px 10px;
    }
    &-setting {
      margin-bottom: 5px;
    }
  }
}

.export-enter-from {
  padding: 0;
  width: 0;
}
.export-enter-to {
  width: 150px;
}
.export-enter-active {
  transition: all 0.6s cubic-bezier(0.87, 0, 0.13, 1);
}

.export-leave-from {
  width: 150px;
}
.export-leave-to {
  padding: 0;
  width: 0;
}
.export-leave-active {
  transition: all 0.6s cubic-bezier(0.87, 0, 0.13, 1);
}
</style>
