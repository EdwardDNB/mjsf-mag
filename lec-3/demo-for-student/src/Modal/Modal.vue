<script setup lang="ts">
import type {ModalProps} from "@/Modal/types.ts";

const props = withDefaults(defineProps<ModalProps>(), {
  cancelText: "Скасувати",
  confirmText: "Підтвердити",
});
const emit = defineEmits(["update:modelValue", "confirm"]);

const close = () => {
  emit("update:modelValue", false);
};

const confirm = () => {
  emit("confirm");
  close();
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
    <div
      v-if="modelValue"
      class="my-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="close"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">

          <h3 class="text-lg font-semibold text-gray-900">
            <slot name="header">{{ title }}</slot>
          </h3>

          <button
            class="text-gray-500 hover:text-gray-700 transition"
            @click="close"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="text-gray-700">
          <slot :default-messege="message" name="default">
            {{ message }}
          </slot>
        </div>

        <!-- Footer -->
        <div class="mt-6 flex justify-end gap-2">
          <slot name="footer">
            <button
              class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              @click="close"
            >
              {{ cancelText }}
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              @click="confirm"
            >
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
