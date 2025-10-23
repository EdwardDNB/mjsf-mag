<template>
	<div>
		<div class="flex border-b mb-4">
			<button v-for="tab in tabs" :key="tab.slug" @click="$emit('update:modelValue', tab.slug)" :class="[
				'py-2 px-4 -mb-px border-b-2 font-semibold',
				modelValue === tab.slug
					? 'border-blue-500 text-blue-600'
					: 'border-transparent text-gray-500 hover:text-gray-700',
			]">
				{{ tab.title }}
			</button>
		</div>

		<div class="p-4">
			<slot />
		</div>
	</div>
</template>

<script setup>
import { provide, ref, onMounted } from 'vue'

// 🟢 Спочатку визначаємо props
const props = defineProps({
	modelValue: String,
	variant: {
		type: String,
		default: 'underline'
	}
})

// 🟢 Потім уже можемо їх використовувати
provide("activeSlug", () => props.modelValue)

const tabs = ref([])

provide("registerTab", (tab) => {
	tabs.value.push(tab)
})

onMounted(() => {
	if (!props.modelValue && tabs.value.length > 0) {
		emit("update:modelValue", tabs.value[0].slug)
	}
})
</script>
