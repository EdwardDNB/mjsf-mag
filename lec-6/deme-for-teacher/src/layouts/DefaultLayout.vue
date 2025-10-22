<template>
  <div class="flex flex-col min-h-screen">
    <!-- Верхнє меню -->
    <header class="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="text-xl font-bold">MySite</div>
        <nav class="space-x-4">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-blue-600"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/' }"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/recipes/create"
            class="text-gray-700 hover:text-blue-600"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/recipes/create' }"
          >
            Create Recipe
          </RouterLink>
          <RouterLink
            to="/login"
            class="text-gray-700 hover:text-blue-600"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/login' }"
          >
            Login
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Контент -->
    <main class="flex-1 pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RouterView/>
      </div>
    </main>

    <!-- Футер -->
    <footer class="bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 text-sm">
        &copy; {{ currentYear }} MySite. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
