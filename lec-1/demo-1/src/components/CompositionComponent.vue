<script setup lang="ts">
import { computed, onMounted, onUpdated, reactive, ref, watch, } from 'vue'

const counter = ref(0)
const obj = reactive({
  count: 0
})
counter.value = 100
obj.count = 200

const countView = computed(() => {
  return `It is computed value: ${counter.value} ${obj.count}`
})
const color = ref('red')
const bordered = ref(false)
const items = ref([
])
const input = ref(null)
onMounted(() => {
  console.log("component mounted")
  console.log(input.value)
  input.value.focus()

})
onUpdated(() => {
  console.log("component updated")
})

watch(()=>bordered.value, (newVal, oldVal) => {
  console.log("bordered changed", newVal, oldVal)
})

</script>

<template>
  <div :class="`demo-component ${bordered ? 'bordered' : '' }`" :style="{backgroundColor: color}">
    <input ref="input" />
    <p>It is options {{ countView }}</p>
    <p>Counter value: {{ counter }} {{ obj.count }}</p>
    <button
      @mouseenter="bordered=!bordered"
      @click="color = 'green'">Green</button>
    <button @click="bordered = !bordered">Bordered</button>
    <button @click="counter++">Add</button>
    <p v-if="bordered">Цей блок має границю</p>
    <p v-else>Цей блок не має границю</p>
    <p v-show="bordered">Цей блок завжди е на сторінці</p>
    <ul>
      <template v-for="(item, index) in items" :key="item">
        <li>
          <p>{{ index + 1 }}</p>
          <p>{{ item }}</p>
        </li>
      </template>
    </ul>

  </div>
</template>

<style scoped>
.demo-component {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  background-color: gray;
}

.bordered {
  border: 5px solid black;
}
</style>
