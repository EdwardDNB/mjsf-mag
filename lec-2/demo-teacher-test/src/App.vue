<script setup lang="ts">
import Gallery from '@/components/Gallery/Gallery.vue'
import type { ImageItem } from '@/components/Gallery/types.ts'

const imageFactory = (count: number): ImageItem[] => {
  const res = []
  for (let i = 0; i < count; i++) {
    res.push({
      id: i + 1,
      url: `https://placebeard.it/640/480`,
      title: `Image title ${i + 1}`,
    })
  }
  return res
}
const images = imageFactory(10)
console.log(images)
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 max-w-7xl mx-auto">
    <!-- Заголовок -->
    <h1 class="text-3xl font-bold text-gray-800 mb-8">📸 Фото Галерея</h1>
    <Gallery :items="images" />
  </div>
</template>

<style scoped lang="scss">

</style>
