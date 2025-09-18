<script setup>
import Button from './components/Button.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'
import { ref } from 'vue'

const selectedSingle = ref(null)
const selectedMultiple = ref([])
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold">Демо компонентів</h1>

    <!-- Button Demo -->
    <div class="flex gap-4">
      <Button label="Синя кнопка" color="blue" size="md" icon="⭐" />
      <Button label="Червона велика" color="red" size="lg" />
      <Button label="Зелена мала" color="green" size="sm" icon="✅" />
      <Button label="Сіра" color="gray" size="md" />
    </div>

    <!-- SearchableDropdown Demo -->
    <div class="space-y-4">
      <h2 class="font-semibold">Dropdown (один вибір)</h2>
      <SearchableDropdown :items="['Київ', 'Львів', 'Одеса', 'Харків']" v-model:selected="selectedSingle" />
      <p>Вибране місто: <b>{{ selectedSingle }}</b></p>

      <h2 class="font-semibold">Dropdown (кілька виборів)</h2>
      <SearchableDropdown :items="['Vue', 'React', 'Angular', 'Svelte']" :multiple="true"
        v-model:selected="selectedMultiple" />
      <p>Вибрані фреймворки: <b>{{ selectedMultiple.join(', ') }}</b></p>
    </div>
  </div>
</template>
