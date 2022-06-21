<script setup lang="ts">
interface Props {
  text: string;
}
const props = defineProps<Props>();
</script>

<template>
  <span v-html="text" class="description"></span>
</template>

<style scoped lang="scss">
.description {
  list-style-position: inside;
  margin-bottom: 5px;
  :deep(*) {
    padding: 2px;
    margin: 5px 0px;
  }
}
</style>
