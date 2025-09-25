<script setup lang="ts">
import type { GalleryItemProps, ImageItem } from '@/components/Gallery/types.ts'
import GalleryImage from '@/components/Gallery/GalleryImage.vue'
import { ref } from 'vue'

withDefaults(defineProps<GalleryItemProps>(), {
  item: () => ({}) as ImageItem,
})
const showToolbar = ref(true)
</script>

<template>
  <div class="gallery-item">
    <GalleryImage :url="item.url" :title="item.title" @load="showToolbar = true" />
    <div v-if="showToolbar" class="gallery-item__toolbar">
      <i class="gallery-item__icon gallery-item__icon--remove" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-item {
  $self: &;
  @apply relative
  flex-1
  basis-56
  h-40
  border
  border-solid
  border-gray-300
  aspect-[3/4]
  opacity-70
  hover:opacity-100
  rounded-lg
  ;

  &:hover {
    #{$self}{
      &__toolbar {
        @apply
        block;
      }
    }
  }

  &__toolbar {
    @apply
    hidden
    absolute
    top-0
    right-0
    p-1
    ;
  }

  &__icon {
    @apply
      block
    bg-white
    opacity-50
    w-10
    h-10
    rounded-lg;

    &--remove {
      background-image: url("@/assets/images/remove.svg");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% auto;
      @apply
      cursor-pointer
      ;
    }
  }
}
</style>
