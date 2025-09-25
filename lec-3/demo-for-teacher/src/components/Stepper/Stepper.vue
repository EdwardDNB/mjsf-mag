<script setup lang="ts">
import {computed, provide, reactive, ref} from "vue";
import type {StepItem, StepperProvider} from "@/components/Stepper/types.ts";
import {StepperKey} from "@/components/Stepper/key.ts";

const steps = reactive<StepItem[]>([])
const currentStep = ref<string | null>(null)

const registerStep = (step: StepItem) => {
  steps.push(step)
  if (currentStep.value === null) {
    currentStep.value = step.slug // первый шаг сразу активный
  }
  return step.slug
}

const goToStep = (slug: string) => {
  currentStep.value = slug
}

const currentIndex = computed(() =>
  steps.findIndex((s) => s.slug === currentStep.value)
)

const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === steps.length - 1)

function next() {
  if (!isLast.value) {
    currentStep.value = steps[currentIndex.value + 1].slug
  }
}

function prev() {
  if (!isFirst.value) {
    currentStep.value = steps[currentIndex.value - 1].slug
  }
}

const provider: StepperProvider = {
  registerStep,
  steps,
  currentStep,
  next,
  prev,
  goToStep
}
provide(StepperKey, provider)
</script>

<template>
  <div class="stepper">
    <div class="stepper-header">
      <!-- Панель шагов -->
      <ol class="stepper-header__items">
        <li v-for="(step, index) in steps" :key="step.slug"
            :class="{
              'stepper-item': true,
              'stepper-item--first': currentIndex === index ,
              'stepper-item--last': index === steps.length - 1,
              'stepper-item--active': currentIndex === index,
            }"
        >
          <div class="stepper-item__activator" @click="goToStep(step.slug)">
            <span class="stepper-item__index">
              {{ index + 1 }}
            </span>
            <span  class="stepper-item__title">{{ step.title }}
            </span>
          </div>
        </li>
      </ol>
    </div>
    <div class="stepper-content">
      <slot/>
    </div>
    <div class="stepper-footer">
      <button
        class="py-2.5 px-6 text-sm bg-indigo-50 text-indigo-500 rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 "
        @click="prev">
        BACK
      </button>
      <button type="button"
              class="py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-lg cursor-pointer font-semibold text-center shadow-xs uppercase transition-all duration-500 hover:bg-indigo-700"
              @click="next">Continue
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stepper {
  @apply
  w-full;
}

.stepper-header {
  @apply
  flex
  gap-2;

  &__items {
    @apply
    flex
    items-center
    w-full
    text-xs
    text-gray-900
    font-medium
    sm:text-base;
  }
}

.stepper-item {
  $self: &;
  @apply
  flex
  justify-center
  w-full relative
  after:w-full
  after:h-0.5
  after:bg-gray-200
  after:inline-block
  after:absolute

  after:top-4
  after:left-0
  after:rounded-full
  lg:after:top-5
  ;
  &__activator {
    @apply
    block whitespace-nowrap z-10 cursor-pointer;
  }

  &__index {
    @apply
    w-8 h-8
    lg:w-10
    lg:h-10
    flex
    justify-center
    items-center
    mx-auto
    mb-3
    text-sm
    rounded-full
    border-2
    bg-gray-50
    border-gray-200
    text-gray-900;

  }
  &--active {
    #{$self}{
      &__index {
        @apply
        text-white
        bg-indigo-600;
      }
      &__title {
        @apply
        font-bold
      }
    }
  }
}

.stepper-header-item {
  padding: 6px 12px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.stepper-header-item.active {
  background: #42b883;
  color: white;
}

.stepper-content {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid #ddd;
}


</style>
