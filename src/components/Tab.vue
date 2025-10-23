<template>
	<div v-if="isActive" class="animate-fadeIn">
		<slot />
	</div>
</template>

<script setup>
import { inject, onMounted, computed } from "vue";

const props = defineProps({
	title: String,
	slug: String,
});

// отримуємо дані з Tabs.vue
const registerTab = inject("registerTab");
const activeSlug = inject("activeSlug");

onMounted(() => {
	registerTab({ title: props.title, slug: props.slug });
});

const isActive = computed(() => activeSlug() === props.slug);
</script>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(4px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeIn {
	animation: fadeIn 0.2s ease-in-out;
}
</style>
