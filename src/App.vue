<script setup lang="ts">
import { useBreakpoints } from './composables/useBreakpoints'

const {
  width,
  isMobile,
  isTablet,
  isDesktop,
  greater,
  smaller,
  between
} = useBreakpoints({
  mobile: 640,
  tablet: 960,
  desktop: 1280
})
</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-gray-100 rounded-2xl shadow-md text-center mt-10">
    <h2 class="text-xl font-semibold mb-4">📱 Перевірка брейкпоінтів</h2>

    <p class="mb-2">📏 Поточна ширина: <b>{{ width }}</b> px</p>

    <p v-if="isMobile" class="text-blue-600 font-semibold">Мобільний пристрій</p>
    <p v-else-if="isTablet" class="text-green-600 font-semibold">Планшет</p>
    <p v-else-if="isDesktop" class="text-purple-600 font-semibold">Десктоп</p>

    <hr class="my-4 border-gray-300" />

    <div class="space-y-2 text-left">
      <p>greater("tablet") → {{ greater("tablet").value }}</p>
      <p>smaller("desktop") → {{ smaller("desktop").value }}</p>
      <p>between("mobile","desktop") → {{ between("mobile", "desktop").value }}</p>
    </div>
  </div>
</template>
