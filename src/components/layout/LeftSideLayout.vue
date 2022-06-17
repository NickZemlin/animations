<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	const emit = defineEmits(['leftResize', 'hover']);

	const makeResizableDiv = (div: HTMLElement, resizer: HTMLElement) => {
		const element = div;
		const resizers = [resizer];
		let original_width = 0;
		const minWidth = 50;
		const maxWidth = 500;
		let original_x = element.getBoundingClientRect().left;
		let original_mouse_x = 0;
		resizer.addEventListener('mousedown', function (e) {
			e.preventDefault();
			original_width = parseFloat(
				getComputedStyle(element, null)
					.getPropertyValue('width')
					.replace('px', '')
			);
			original_x = element.getBoundingClientRect().left;
			original_mouse_x = e.pageX;
			window.addEventListener('mousemove', resize);
			window.addEventListener('mouseup', stopResize);
		});

		function resize(e: MouseEvent) {
			const width = original_width + (e.pageX - original_mouse_x);
			if (width < minWidth || width > maxWidth) return;
			element.style.width = width + 'px';
			localStorage.setItem('leftPanelWidth', width + 'px');
			emit('leftResize', width);
		}

		function stopResize() {
			window.removeEventListener('mousemove', resize);
		}
	};

	const getLocalWidth = (el: HTMLElement) => {
		const width = localStorage.getItem('leftPanelWidth');
		if (typeof width === 'string') {
			el.style.width = localStorage.getItem('leftPanelWidth')!;
		}
	};

	const leftSideWrap = ref<HTMLElement | null>(null);
	const resizer = ref<HTMLElement | null>(null);
	const hover = (value: boolean) => {
		emit('hover', value);
	};
	onMounted(() => {
		if (leftSideWrap.value && resizer.value) {
			makeResizableDiv(leftSideWrap.value, resizer.value);
			getLocalWidth(leftSideWrap.value);
		}
	});
</script>

<template>
	<div class="leftSide-wrap" ref="leftSideWrap">
		<div
			class="leftSide-resizeBar"
			ref="resizer"
			@mouseenter="hover(true)"
			@mouseleave="hover(false)"
		/>
		<h3 class="leftSide-pfmHeader">PFM animations</h3>
	</div>
</template>

<style scoped lang="scss">
	.leftSide {
		&-wrap {
			height: 100%;
			width: 300px;
			min-width: 50px;
			max-width: 500px;
			background-color: rgb(250, 249, 244);
			position: relative;
			overflow: hidden;
			* {
				white-space: nowrap;
			}
		}
		&-resizeBar {
			box-sizing: content-box;
			width: 10px;
			position: absolute;
			right: -5px;
			height: 100%;
			cursor: col-resize;
			display: flex;
			flex-direction: column;
		}
		&-pfmHeader {
			margin-top: 20px;
			margin-left: 5px;
			// width: 100%;
			// text-align: center;
		}
	}
</style>
