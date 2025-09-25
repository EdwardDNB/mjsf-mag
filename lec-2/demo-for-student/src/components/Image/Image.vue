<script setup lang="ts">
import type { ImageProps } from '@/components/Image/types.ts'
import { ref } from 'vue'
import Loader from '@/components/Loader/Loader.vue'

withDefaults(defineProps<ImageProps>(), {
  url: '',
  title: '',
})
const loaded = ref(false)
const emit = defineEmits(['load'])
const onLoaded = () => {
  loaded.value = true
  emit('load')
}
</script>

<template>
  <figure class="image">
    <loader v-if="!loaded"></loader>
    <img v-show="loaded" :src="url" :alt="title" class="image__image" @load="onLoaded" />
    <figcaption class="image__figcaption" v-show="loaded">{{ title }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.image {
  @apply w-full
  h-full
  relative
  flex
  items-center
  justify-center
  rounded-lg
  bg-gray-200;

  &__image {
    @apply object-cover
    w-full
    h-full
    rounded
    ;
  }

  &__figcaption {
    @apply
    absolute
    bottom-0
    left-0
    w-full
    bg-black/50
    text-white
    text-sm
    p-2
    text-center
    rounded-b
    ;
  }
}
</style>
