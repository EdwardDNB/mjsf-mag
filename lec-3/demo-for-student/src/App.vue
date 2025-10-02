<script setup lang="ts">
import {ref} from "vue";
import Modal from "@/Modal/Modal.vue";
import Loader from "@/components/Loader/Loader.vue";

const showModal = ref(false);
const onConfirm = () => {
  console.log("Confirmed")
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 max-w-7xl mx-auto">
    <h1 class="text-xl font-bold pb-5">Stepper header</h1>
    <button
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      @click="showModal = true"
    >
      Відкрити модал
    </button>
    <Modal
      v-model="showModal"
      title="Підтвердження"
      message="Ви впевнені, що хочете виконати цю дію?"
      @confirm="onConfirm"
    >
      Ваш контент!

      <template #header >
        Нова назва!
      </template>

      <template #footer >
        <button @click="showModal = false">Close</button>
      </template>
    </Modal>

  </div>
</template>

<style scoped lang="scss">

</style>
