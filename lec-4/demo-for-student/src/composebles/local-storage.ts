import {ref, type Ref, watch} from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const data: Ref<T> = ref(storedValue ? JSON.parse(storedValue) : defaultValue) as Ref<T>
  watch(
    data,
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    },
    {deep: true}
  )
  const set = (value: T | ((prev: T) => T)) => {
    if (typeof value === 'function') {
      data.value = (value as (prev: T) => T)(data.value)
    } else {
      data.value = value
    }
  }
  const remove = () => {
    localStorage.removeItem(key)
    data.value = defaultValue
  }
  const reset = () => {
    data.value = defaultValue
  }
  return {
    data,
    set,
    remove,
    reset,
  }
}
