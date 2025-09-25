<script setup lang="ts">
import type { GalleryProps, ImageItem } from '@/components/Gallery/types.ts'
import GalleryItem from '@/components/Gallery/GalleryItem.vue'
withDefaults(defineProps<GalleryProps>(), {
  items: () => [],
})
const onRemove = (item: ImageItem) => {
  console.log('Remove item', item)
}
</script>

<template>
  <div class="gallery">
    <div class="gallery__items">
      <GalleryItem v-for="item in items" :key="item.id" :item="item" removable configurable @remove="onRemove" />
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
