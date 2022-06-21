<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: string | number;
  name: string;
  default: string | number;
  value: number;
  max: number;
  min: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "0",
});

const localValue = ref<string | number>(props.default);

const emit = defineEmits(["update:modelValue", "update"]);

const changeHandler = () => {
  emit("update:modelValue", Number(localValue.value));
};
</script>

<template>
  <div class="input-wrap">
    <span class="inline">
      <h5>{{ name }}:</h5>
      <h6>{{ localValue }}</h6>
    </span>
    <input
      type="range"
      id="volume"
      name="volume"
      :min="min"
      :max="max"
      v-model="localValue"
      @input="changeHandler"
    />
    <label for="volume"><slot /></label>
  </div>
</template>

<style scoped lang="scss">
.input-wrap {
  width: 60%;
  margin-top: 10px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
}
.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
