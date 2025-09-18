<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
	items: { type: Array, required: true },
	multiple: { type: Boolean, default: false },
	placeholder: { type: String, default: 'Виберіть...' }
})

const emit = defineEmits(['update:selected'])

const search = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const selected = ref(props.multiple ? [] : null)

const filteredItems = computed(() =>
	props.items.filter(item =>
		item.toLowerCase().includes(search.value.toLowerCase())
	)
)

function selectItem(item) {
	if (props.multiple) {
		if (selected.value.includes(item)) {
			selected.value = selected.value.filter(i => i !== item)
		} else {
			selected.value.push(item)
		}
	} else {
		selected.value = item
		isOpen.value = false
	}
	emit('update:selected', selected.value)
	updateInput()
}

function updateInput() {
	if (props.multiple) {
		search.value = selected.value.join(', ')
	} else {
		search.value = selected.value || ''
	}
}

function clearSelection() {
	selected.value = props.multiple ? [] : null
	search.value = ''
	emit('update:selected', selected.value)
}

function onKeyDown(e) {
	if (!isOpen.value) return

	if (e.key === 'ArrowDown') {
		highlightedIndex.value = (highlightedIndex.value + 1) % filteredItems.value.length
	} else if (e.key === 'ArrowUp') {
		highlightedIndex.value =
			(highlightedIndex.value - 1 + filteredItems.value.length) %
			filteredItems.value.length
	} else if (e.key === 'Enter' && highlightedIndex.value >= 0) {
		selectItem(filteredItems.value[highlightedIndex.value])
	}
}
</script>

<template>
	<div class="relative w-64" @keydown="onKeyDown">
		<div class="flex items-center border rounded-md px-2 py-1 bg-white">
			<input type="text" class="flex-1 outline-none" v-model="search" :placeholder="placeholder"
				@focus="isOpen = true" />
			<button v-if="selected && (Array.isArray(selected) ? selected.length : selected)"
				class="text-gray-400 hover:text-black ml-2" @click="clearSelection">
				✖
			</button>
		</div>

		<ul v-if="isOpen" class="absolute mt-1 max-h-40 w-full overflow-y-auto border rounded-md bg-white shadow-lg z-10">
			<li v-for="(item, index) in filteredItems" :key="item" @click="selectItem(item)" :class="[
				'px-3 py-2 cursor-pointer',
				index === highlightedIndex ? 'bg-blue-100' : '',
				(Array.isArray(selected) ? selected.includes(item) : selected === item)
					? 'bg-blue-500 text-white'
					: ''
			]">
				{{ item }}
			</li>
			<li v-if="filteredItems.length === 0" class="px-3 py-2 text-gray-500">
				Нічого не знайдено
			</li>
		</ul>
	</div>
</template>
