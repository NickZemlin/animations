<script setup lang="ts"></script>

<template>
  <div class="button">
    <p class="button-text">
      <slot />
    </p>
  </div>
</template>

<style scoped lang="scss">
.button {
  width: fit-content;
  height: fit-content;
  padding: 2.5px 10px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #333;
  margin-right: 5px;
  &-text {
    color: rgb(255, 250, 242);
  }
}
</style>
