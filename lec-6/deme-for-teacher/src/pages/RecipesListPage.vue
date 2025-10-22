<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">🍕 Recipes</h1>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center py-20">
      <span class="text-gray-500 animate-pulse">Loading recipes...</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center py-20">
      {{ error }}
    </div>

    <!-- Recipes grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
      >
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="h-48 w-full object-cover"
        />
        <div class="p-4 flex flex-col flex-1">
          <h2 class="text-lg font-semibold mb-1">{{ recipe.name }}</h2>
          <p class="text-gray-500 text-sm mb-2">{{ recipe.cuisine }} · {{ recipe.difficulty }}</p>

          <div class="flex items-center mb-2">
            <span class="text-yellow-400">★</span>
            <span class="ml-1 text-sm text-gray-600">{{ recipe.rating }}</span>
            <span class="ml-2 text-xs text-gray-400">({{ recipe.reviewCount }} reviews)</span>
          </div>

          <p class="text-sm text-gray-600 line-clamp-3 mb-4">
            {{ recipe.ingredients.join(', ') }}
          </p>

          <RouterLink
            :to="`/recipes/${recipe.id}`"
            class="mt-auto inline-block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Recipe
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {Recipe} from "@/api/types/recipes/recipe.type.ts";
import {recipeService} from "@/api/services/recipes.service.ts";

const recipes = ref<Recipe[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await recipeService.getAll({ limit: 20 })
    recipes.value = res.recipes
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
})
</script>
