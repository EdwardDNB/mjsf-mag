<script setup lang="ts">
import {provide, ref} from "vue";
import Stepper from "@/components/Stepper/Stepper.vue";
import Step from "@/components/Stepper/Step.vue";
import {useLocalStorage} from "@/composebles/local-storage.ts";
import Card from "@/Card.vue";
const caption = ref("Test res value")
provide("caption", caption)
const {data} = useLocalStorage("stepper1","ste1")
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 max-w-7xl mx-auto">
    <h1 class="text-xl font-bold pb-5">Stepper header</h1>
    Поточний крок: {{data}}
    <Stepper v-model="data">
      <Step title="Шаг 1" slug="step1">Контент шага 1</Step>
      <Step title="Шаг 2" slug="step2">Контент шага 2</Step>
      <Step title="Шаг 3" slug="step3">Контент шага 3</Step>
      <Step title="Шаг 4" slug="step4">Контент шага 2</Step>
      <Step title="Шаг 5" slug="step5">Контент шага 2</Step>
      <Step title="Шаг 6" slug="step6">Контент шага 2</Step>
    </Stepper>
    <Card/>
  </div>
</template>

<style scoped lang="scss">

</style>
