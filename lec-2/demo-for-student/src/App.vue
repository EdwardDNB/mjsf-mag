<script setup lang="ts">
import type { ImageItem } from '@/components/Gallery/types.ts'
import Gallery from '@/components/Gallery/Gallery.vue'
import Image from '@/components/Image/Image.vue'

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
</script>

<template>
  <div class="container">
    <h1 class="font-bold text-xl p-4">Image Gallery</h1>
    <Gallery :items="images" />
    <div class="p-4 w-80">
      <Image url="https://placebeard.it/640/480" title="Test title"/>
    </div>
    <!--...-->
  </div>
</template>

<style scoped lang="scss">
.container{
  @apply
  max-w-6xl
  mx-auto
  bg-gray-200
  text-center;
}
</style>
