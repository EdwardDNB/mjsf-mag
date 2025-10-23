import { onMounted, onUnmounted } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(
	event: K,
	handler: (e: WindowEventMap[K]) => void,
	target: Window = window
) {
	onMounted(() => target.addEventListener(event, handler))
	onUnmounted(() => target.removeEventListener(event, handler))
}
