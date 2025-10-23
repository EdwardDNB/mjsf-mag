<script setup lang="ts">
import type {GalleryProps, ImageItem} from '@/components/Gallery/types.ts'
import GalleryItem from '@/components/Gallery/GalleryItem.vue'

withDefaults(defineProps<GalleryProps>(), {
  items: () => [],
})
const onRemove = (item: ImageItem) => {
  console.log('Remove item', item)
}
const handelBase = (data) => {
  console.log("base", data)
}
</script>

<template>
  <div class="gallery">
    <div class="gallery__header">
      Header
    </div>
    <div class="gallery__items">
      <GalleryItem v-for="item in items" :key="item.id" :item="item" removable configurable
                   @remove="onRemove"
                   @edit="handelBase"
                   @configure="handelBase"
                   @view="handelBase"
      />
    </div>
    <div class="gallery__pagination">
      Pagination
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {

  &__items {
    @apply
    flex
    flex-wrap
    gap-1
    ;
  }
}
</style>
