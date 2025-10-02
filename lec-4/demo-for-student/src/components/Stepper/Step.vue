<script setup lang="ts">
import { inject, onMounted, computed } from "vue"
import { StepperKey } from "./key"
import type { StepItem } from "./types"

const props = withDefaults(defineProps<StepItem>(),   {
  title: '',
  slug: '',
  disabled: false,
})

const stepper = inject(StepperKey)
if (!stepper) {
  throw new Error("Step must be used inside Stepper")
}

onMounted(() => {
  stepper.registerStep({
    title: props.title,
    slug: props.slug,
    disabled: props.disabled,
  } as StepItem)
})

const isActive = computed(() => stepper.currentStep.value === props.slug)
</script>

<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<style scoped>

</style>
