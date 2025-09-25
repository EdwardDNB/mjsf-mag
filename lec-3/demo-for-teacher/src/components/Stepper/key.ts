import type { InjectionKey } from "vue"
import type { StepperProvider } from "./types"

export const StepperKey: InjectionKey<StepperProvider> = Symbol("Stepper")
