<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OptionsComponent',
  data () {
    return {
      counter: 0
    }
  },
  methods: {},
  computed: {},
  mounted () {

  }
})
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
