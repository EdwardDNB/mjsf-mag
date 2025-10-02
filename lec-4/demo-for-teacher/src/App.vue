<script setup lang="ts">
import Stepper from "@/components/Stepper/Stepper.vue";
import Step from "@/components/Stepper/Step.vue";
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 max-w-7xl mx-auto">
    <h1 class="text-xl font-bold pb-5">Stepper header</h1>
    <Stepper>
      <Step title="Шаг 1" slug="step1">Контент шага 1</Step>
      <Step title="Шаг 2" slug="step2">Контент шага 2</Step>
      <Step title="Шаг 3" slug="step3">Контент шага 3</Step>
      <Step title="Шаг 4" slug="step4">Контент шага 2</Step>
      <Step title="Шаг 5" slug="step5">Контент шага 2</Step>
    </Stepper>
    <div class="w-full pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Stepper>
          <Step title="Шаг 1" slug="step1">Контент шага 1</Step>
          <Step title="Шаг 2" slug="step2">Контент шага 2</Step>
          <Step title="Шаг 3" slug="step3">Контент шага 3</Step>
        </Stepper>
      </div>
      <div>
        <Stepper>
          <Step title="Шаг 1" slug="step1">Контент шага 1</Step>
          <Step title="Шаг 2" slug="step2">Контент шага 2</Step>
        </Stepper>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
