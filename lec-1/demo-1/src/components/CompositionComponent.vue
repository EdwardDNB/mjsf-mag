<script setup lang="ts">
import { ref } from 'vue'
const counter = ref(0)
</script>

<template>
  <div>
    <p>It is options component</p>
    <p>Counter value: {{ counter }}</p>
    <button @click="counter++">Add</button>
  </div>
</template>

<style scoped>

</style>
