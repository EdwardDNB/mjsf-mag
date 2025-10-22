<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Вхід до системи</h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Увійти
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Немає акаунта?
        <RouterLink to="/register" class="text-blue-600 hover:underline">
          Зареєструватися
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
  // Тут пізніше можна підключити API-запит
}
</script>
