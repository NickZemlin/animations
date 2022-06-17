<script setup lang="ts">
import { onMounted } from "vue";

interface Props {
  previewHeight: string;
}
const props = withDefaults(defineProps<Props>(), {
  previewHeight: "auto",
});
</script>

<template>
  <div class="preview-wrap">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.preview {
  &-wrap {
    width: 100%;
    overflow: hidden;
    height: v-bind(previewHeight);
    display: flex;
    justify-content: center;
    padding-top: 100px;
  }
}
</style>
