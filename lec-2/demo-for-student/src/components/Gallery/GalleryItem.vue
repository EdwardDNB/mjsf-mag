<script setup lang="ts">
import type { GalleryItemProps, ImageItem } from '@/components/Gallery/types.ts'
import Image from '@/components/Image/Image.vue'
import { ref } from 'vue'

withDefaults(defineProps<GalleryItemProps>(), {
  item: () => ({}) as ImageItem,
  editable: false,
  removable: false,
  configurable: false,
  viewable: false,
})
const showToolbar = ref(true)
const emits = defineEmits(['edit', 'remove', 'configure', 'view'])
</script>

<template>
  <div class="gallery-item">
    <Image :url="item.url" :title="item.title" @load="showToolbar = true"/>
    <div v-if="showToolbar" class="gallery-item__toolbar">
      <div class="gallery-item__toolbar-items">
        <i v-if="editable" class="gallery-item__icon gallery-item__icon--edit"  @click="emits('edit', item)" />
        <i v-if="viewable" class="gallery-item__icon gallery-item__icon--view" @click="emits('view', item)" />
        <i v-if="configurable" class="gallery-item__icon gallery-item__icon--settings" @click="emits('configure', item)" />
        <i v-if="removable" class="gallery-item__icon gallery-item__icon--remove" @click="emits('remove', item)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-item {
  $self: &;
  @apply
  relative
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
    #{$self} {
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
    &-items {
      @apply
      flex
      gap-1
      flex-row
      ;
    }
  }

  &__icon {
    @apply
    cursor-pointer
    block
    bg-white
    opacity-50
    w-10
    h-10
    hover:opacity-85
    rounded-lg;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% auto;

    &--edit {
      background-image: url("@/assets/images/edit.svg");
    }

    &--remove {
      background-image: url("@/assets/images/remove.svg");
    }

    &--settings {
      background-image: url("@/assets/images/settings.svg");
    }

    &--view {
      background-image: url("@/assets/images/view.svg");
    }


  }
}

</style>
