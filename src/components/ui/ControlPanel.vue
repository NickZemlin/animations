<script setup lang="ts"></script>

<template>
  <div class="panel-wrap">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.panel-wrap {
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
