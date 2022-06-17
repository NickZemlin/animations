<script setup lang="ts">
	import { onMounted } from 'vue';

	interface Props {
		previewHeight: string;
	}
	const props = withDefaults(defineProps<Props>(), {
		previewHeight: 'auto',
	});

	onMounted(() => {
		console.log(props.previewHeight);
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
			height: v-bind(previewHeight);
		}
	}
</style>
