<script setup lang="ts">
import { ref } from "vue";
import { TimingFunction } from "../../animationsList/animationsList";

interface Props {
  selection: TimingFunction[];
  header: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update"]);

const selectedButton = ref<string | null>(null);
const handleClick = (input: string) => {
  selectedButton.value = input;
  emit("update", input);
};
</script>

<template>
  <div class="radio-wrap">
    <h5>{{ header }}</h5>
    <div class="radio-flex">
      <div
        class="radio-item"
        v-for="item in selection"
        :class="{ activeBg: selectedButton === item.function }"
      >
        <h4
          class="radio-item-text"
          @click="handleClick(item.function)"
          :class="{ activeText: selectedButton === item.function }"
        >
          {{ item.name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio {
  &-wrap {
    margin-top: 10px;
  }
  &-flex {
    margin-top: 3px;
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #333333;
    cursor: pointer;
    transition: color 0.3s ease;
    &-text {
      color: rgb(255, 250, 242);
      transition: color 0.3s ease;
    }
  }
}
.activeBg {
  background-color: rgb(255, 250, 242);
  box-shadow: 0.1px 0.1px 2.2px rgba(0, 0, 0, 0.034),
    0.3px 0.1px 5.3px rgba(0, 0, 0, 0.048), 0.6px 0.3px 10px rgba(0, 0, 0, 0.06),
    1.1px 0.4px 17.9px rgba(0, 0, 0, 0.072),
    2.1px 0.8px 33.4px rgba(0, 0, 0, 0.086), 5px 2px 80px rgba(0, 0, 0, 0.12);
}
.activeText {
  color: #333333;
}
</style>
