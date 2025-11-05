import type { App } from 'vue'

export interface DocumentUploaderProps {
	modelValue: File[]
	documents?: { type: string; icon: string; name: string }[]
	maxFiles?: number
}

export interface DocumentUploaderPlugin {
	install(app: App): void
}
