<template>
	<div class="document-uploader">
		<!-- Drop area -->
		<div
			class="upload-zone border-2 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors"
			:class="{
				'border-dashed': true,
				'bg-blue-50': isDragOver,
				'opacity-50 pointer-events-none': isFull
			}" @click="onClickZone" @dragenter.prevent="onDragEnter" @dragover.prevent="onDragOver"
			@dragleave.prevent="onDragLeave" @drop.prevent="onDrop" role="button">
			<input ref="inputRef" type="file" class="hidden" multiple @change="onFileInput" />
			<div class="text-center">
				<p class="font-semibold">Перетягніть файли сюди або клікніть</p>
				<p class="text-sm text-gray-500">Підтримуються будь-які типи файлів. Максимум: {{ maxFiles }}</p>
			</div>
		</div>

		<!-- Previews grid -->
		<div class="mt-4 grid gap-4" :class="{ 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4': true }">
			<!-- Prepared documents (from prop) -->
			<div v-for="(doc, idx) in documentsLocal" :key="'preset-' + idx"
				class="doc-card relative border rounded p-3 flex items-center gap-3 bg-white">
				<img :src="doc.icon" alt="icon" class="w-10 h-10 object-contain" />
				<div class="flex-1">
					<div class="text-sm font-medium truncate">{{ doc.name }}</div>
					<div class="text-xs text-gray-500">{{ doc.type }}</div>
				</div>
				<button class="ml-2 text-red-500 hover:text-red-700" @click="removePreset(idx)" type="button"
					aria-label="Remove">
					✖
				</button>
			</div>

			<!-- Uploaded files previews -->
			<div v-for="(f, idx) in internalFiles" :key="f._uid" class="doc-card relative border rounded p-3 bg-white">
				<div class="flex items-start gap-3">
					<div class="preview w-14 h-14 rounded bg-gray-50 flex items-center justify-center overflow-hidden">
						<template v-if="isImage(f.file)">
							<img :src="f.url" class="max-w-full max-h-full" alt="preview" />
						</template>
						<template v-else>
							<!-- generic file icon -->
							<svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none">
								<path d="M7 7h6l4 4v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" stroke="currentColor"
									stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M13 7V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</template>
					</div>

					<div class="flex-1">
						<div class="text-sm font-medium truncate">{{ f.file.name }}</div>
						<div class="text-xs text-gray-500">{{ readableSize(f.file.size) }}</div>
					</div>
				</div>

				<button class="absolute top-2 right-2 text-red-500 hover:text-red-700" @click="removeFileByIndex(idx)"
					type="button" aria-label="Remove file">
					✖
				</button>
			</div>
		</div>

		<!-- Limit / hints -->
		<div class="mt-3 text-sm text-gray-600">
			<span v-if="isFull" class="text-red-600">Достигнуто максимальної кількості файлів ({{ maxFiles }})</span>
			<span v-else>Вибрано файлів: {{ totalSelected }}/{{ maxFiles }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, reactive, onUnmounted, toRefs } from 'vue'

/**
 * Types
 */
type PresetDoc = { type: string; icon: string; name: string }

interface InternalFile {
	file: File
	url: string
	_uid: string
}

const props = defineProps({
	modelValue: { type: Array as () => File[], default: () => [] },
	documents: { type: Array as () => PresetDoc[], default: () => [] },
	maxFiles: { type: Number, default: 10 }
})

const emit = defineEmits(['update:modelValue'])

/**
 * Refs/state
 */
const inputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const internalFiles = ref<InternalFile[]>([])
const documentsLocal = ref<PresetDoc[]>([...props.documents]) // we keep local so we can remove presets
const uidCounter = ref(0)

/**
 * Helpers
 */
const makeUid = () => `f_${Date.now()}_${uidCounter.value++}`

function createPreview(file: File) {
	const url = URL.createObjectURL(file)
	return { file, url, _uid: makeUid() } as InternalFile
}

function readableSize(size: number) {
	if (size < 1024) return `${size} B`
	if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
	return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

function isImage(file: File) {
	return file.type.startsWith('image/')
}

/**
 * Derived values
 */
const totalSelected = computed(() => internalFiles.value.length + documentsLocal.value.length)
const isFull = computed(() => totalSelected.value >= props.maxFiles)

/**
 * File input handlers
 */
function onClickZone() {
	if (isFull.value) return
	inputRef.value?.click()
}

function onFileInput(e: Event) {
	const input = e.target as HTMLInputElement
	if (!input?.files) return
	addFiles(Array.from(input.files))
	input.value = '' // reset
}

/**
 * Drag events
 */
function onDragEnter() { if (!isFull.value) isDragOver.value = true }
function onDragOver() { if (!isFull.value) isDragOver.value = true }
function onDragLeave() { isDragOver.value = false }
function onDrop(e: DragEvent) {
	isDragOver.value = false
	if (!e.dataTransfer) return
	const files = Array.from(e.dataTransfer.files)
	addFiles(files)
}

/**
 * Add files with respect to maxFiles
 */
function addFiles(files: File[]) {
	if (files.length === 0) return
	const space = Math.max(0, props.maxFiles - totalSelected.value)
	const allowed = files.slice(0, space)
	const newItems = allowed.map(f => createPreview(f))

	internalFiles.value.push(...newItems)
	emitUpdate()
}

/**
 * Remove file and revoke URL
 */
function removeFileByIndex(index: number) {
	const item = internalFiles.value[index]
	if (!item) return
	URL.revokeObjectURL(item.url)
	internalFiles.value.splice(index, 1)
	emitUpdate()
}

/**
 * Remove preset (prepared) doc
 */
function removePreset(index: number) {
	documentsLocal.value.splice(index, 1)
	emitUpdate()
}

/**
 * Emit update:modelValue with current File[]
 */
function emitUpdate() {
	// combine uploaded files + no File info for presets; only upload files should be in modelValue per spec
	const files = internalFiles.value.map(i => i.file)
	emit('update:modelValue', files)
}

/**
 * Watch incoming modelValue changes (if parent programmatically changes them)
 * We'll sync: create previews for any files not yet present
 */
watch(
	() => props.modelValue,
	(newVal) => {
		// sync: if props.modelValue changed externally, reconstruct internalFiles
		// Only if lengths differ or Files names differ
		const existingNames = new Set(internalFiles.value.map(i => i.file.name + i.file.size))
		const toAdd = (newVal || []).filter(f => !existingNames.has(f.name + f.size))
		const newItems = toAdd.map(createPreview)
		internalFiles.value.push(...newItems)
	},
	{ deep: true }
)

/**
 * Cleanup on unmount: revoke object URLs
 */
onUnmounted(() => {
	internalFiles.value.forEach(i => URL.revokeObjectURL(i.url))
})

/**
 * Provide small public API (optional) for unit tests
 */
const api = {
	addFiles,
	removeFileByIndex,
	removePreset
}

</script>

<style scoped>
.upload-zone {
	min-height: 112px;
	background-clip: padding-box;
}

.upload-zone.border-dashed {
	border-style: dashed;
}

.doc-card {
	min-height: 72px;
}

.preview img {
	display: block;
}
</style>
