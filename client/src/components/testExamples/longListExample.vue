<script setup lang="ts"></script>

<template>
  <div>
    <div style="padding: 5px" class="examplelist-wrap">
      <div class="examplelist-item" v-for="item in 50">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.examplelist {
  &-wrap {
    outline: 1px solid #333333;
    width: 500px;
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    flex-grow: 1;
    width: 50px;
    height: 50px;
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 5px 10px;
    background-color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
</style>
