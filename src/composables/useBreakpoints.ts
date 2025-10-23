import { ref, computed } from 'vue'
import { useEventListener } from './useEventListener'

export interface Breakpoints {
	mobile: number
	tablet: number
	desktop: number
	[key: string]: number
}

export function useBreakpoints(customBreakpoints?: Partial<Breakpoints>) {
	// 🔹 Стандартні брейкпоінти
	const defaultBreakpoints: Breakpoints = {
		mobile: 768,
		tablet: 1024,
		desktop: 1440,
	}

	// 🔹 Об’єднуємо кастомні та стандартні
	const breakpoints = { ...defaultBreakpoints, ...customBreakpoints }

	// 🔹 Реактивна ширина вікна
	const width = ref(window.innerWidth)

	// 🔹 Оновлення ширини при resize
	const updateWidth = () => {
		width.value = window.innerWidth
	}

	useEventListener('resize', updateWidth)

	// 🔹 Поточний тип пристрою
	const isMobile = computed(() => width.value < breakpoints.mobile)
	const isTablet = computed(
		() =>
			width.value >= breakpoints.mobile &&
			width.value < breakpoints.tablet
	)
	const isDesktop = computed(() => width.value >= breakpoints.tablet)

	// 🔹 Допоміжні функції з перевіркою ключів
	const greater = (name: keyof Breakpoints) =>
		computed(() => {
			const val = breakpoints[name]
			return val !== undefined ? width.value >= val : false
		})

	const smaller = (name: keyof Breakpoints) =>
		computed(() => {
			const val = breakpoints[name]
			return val !== undefined ? width.value < val : false
		})

	const between = (min: keyof Breakpoints, max: keyof Breakpoints) =>
		computed(() => {
			const minVal = breakpoints[min]
			const maxVal = breakpoints[max]
			if (minVal === undefined || maxVal === undefined) return false
			return width.value >= minVal && width.value < maxVal
		})

	return {
		width,
		isMobile,
		isTablet,
		isDesktop,
		greater,
		smaller,
		between,
	}
}
