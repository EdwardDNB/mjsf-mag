<script setup lang="ts">

import type {ButtonProps} from "@/components/Button/types.ts";

const props = withDefaults(defineProps<ButtonProps>(),{
  text: "Button",
  rounded: false,
  color: 'red'
})
const emit = defineEmits(["click"]);
</script>

<template>
  <button type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          :class="{'rounded-lg': rounded}"

          @click.prevent="emit('click')"
    >
    {{text}}
  </button>
</template>

<style scoped>

</style>
