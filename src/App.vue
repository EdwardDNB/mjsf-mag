<script setup>
import { ref } from "vue";
import Button from "./components/Button.vue";
import SearchableDropdown from "./components/SearchableDropdown.vue";
import TabsDemo from "./components/TabsDemo.vue";

// для кнопки
const colors = ["red", "blue", "green", "yellow"];
const selectedColor = ref("blue");

// для списку
const cities = ["Київ", "Львів", "Одеса", "Харків", "Дніпро"];
const selectedCity = ref("");
</script>

<template>
  <div class="p-6 space-y-10 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-center">Lab 2 – Компоненти Vue + Tailwind</h1>

    <!-- 🔹 Демо кнопки -->
    <section class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Кнопка зі зміною кольору</h2>

      <SearchableDropdown :items="colors" placeholder="Виберіть колір кнопки"
        @update:modelValue="selectedColor = $event" />

      <div class="mt-4">
        <Button label="Я міняю колір" :color="selectedColor" size="medium"
          @click="alert('Кнопка кольору: ' + selectedColor)" />
      </div>
    </section>

    <!-- 🔹 Демо випадаючого списку -->
    <section class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Вибір міста</h2>
      <SearchableDropdown :items="cities" placeholder="Оберіть місто" @update:modelValue="selectedCity = $event" />

      <p v-if="selectedCity" class="mt-3 text-lg">
        Ви обрали: <span class="font-semibold">{{ selectedCity }}</span>
      </p>
    </section>

    <!-- 🔹 Демо вкладок -->
    <section class="bg-white p-6 rounded-xl shadow">
      <TabsDemo />
    </section>
  </div>
</template>
