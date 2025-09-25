import type {Reactive, Ref} from "vue";

export interface StepItem {
  title?: string
  slug: string
  disabled?: boolean
}

export interface StepperProvider {
  registerStep: (step: StepItem) => void
  currentStep: Ref<string | null>
  steps: Reactive<StepItem[]>
  next: () => void
  prev: () => void
  goToStep: (slug: string) => void
}
