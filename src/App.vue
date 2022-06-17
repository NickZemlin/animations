<script setup lang="ts">
	import { computed, ref } from 'vue';
	import LeftSideLayout from './components/layout/LeftSideLayout.vue';
	import RightSideLayout from './components/layout/RightSideLayout.vue';

	const layout = ref({
		vw: Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		),
		left: 0,
		get right() {
			return this.vw - this.left;
		},
	});
	const leftResizeHandle = (payload: string) => {
		layout.value.left = parseInt(payload, 10);
	};
	const rightSideWidth = computed(() => {
		return layout.value.right + 'px';
	});
	const hoverHandle = (value: boolean) => {
		hover.value = value;
	};
	const hover = ref(false);
</script>

<template>
	<div class="app-wrap">
		<LeftSideLayout
			id="leftSideWrap"
			@left-resize="leftResizeHandle"
			@hover="hoverHandle"
		/>
		<RightSideLayout :right-side-width="rightSideWidth" :hover="hover" />
	</div>
</template>

<style lang="scss">
	* {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.app-wrap {
		width: 100vw;
		height: 100vh;
		// position: fixed;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
</style>
