<script setup lang="ts">
import type { GalleryProps } from '@/components/Gallery/types.ts'
import GalleryItem from '@/components/Gallery/GalleryItem.vue'

const props = withDefaults(defineProps<GalleryProps>(), {
  items: () => [],
})
console.log(props.items)
</script>

<template>
  <div class="gallery">
    <div class="gallery__items">
      <GalleryItem v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  &__items {
    @apply
    flex
    flex-wrap
    gap-4;
  }
}
</style>
