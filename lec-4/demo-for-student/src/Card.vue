<script setup lang="ts">

import {inject} from "vue";

const title = inject('title')
const  caption = inject('caption')
</script>

<template>
  <div class="shadow-sm p-4 border">
    Its may cart
    <p>
      {{title}}
    </p>
    <p>
      {{caption}}
    </p>
  </div>

</template>

<style scoped>

</style>
