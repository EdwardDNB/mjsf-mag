<script setup>

//let title = "It is a Vue.js component example";
import {ref} from "vue";

let title = ref("It is a Vue.js component example");

</script>

<template>
  <h1>{{ title }}
    <button @click="title = 'Hello World!'">
      Change
    </button>
  </h1>
</template>

<style scoped>

</style>
