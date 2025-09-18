<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	label: { type: String, required: true },
	color: { type: String, default: 'blue' }, // blue, red, green, gray
	size: { type: String, default: 'md' }, // sm, md, lg
	icon: { type: String, default: '' }
})

const emit = defineEmits(['click'])

const sizeClasses = {
	sm: 'px-3 py-1 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg'
}

// генерація кольорових класів
function colorClass(color) {
	switch (color) {
		case 'red': return 'bg-red-600 hover:bg-red-700 text-white'
		case 'green': return 'bg-green-600 hover:bg-green-700 text-white'
		case 'gray': return 'bg-gray-300 hover:bg-gray-400 text-black'
		default: return 'bg-blue-600 hover:bg-blue-700 text-white'
	}
}
</script>

<template>
	<button
		:class="`flex items-center gap-2 rounded-md font-medium transition ${sizeClasses[size]} ${colorClass(color)}`"
		@click="$emit('click')">
		<span v-if="icon">{{ icon }}</span>
		<span>{{ label }}</span>
	</button>
</template>
