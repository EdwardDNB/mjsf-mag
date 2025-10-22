<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="recipe" class="max-w-3xl mx-auto">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="rounded-2xl shadow-md mb-6 w-full"
      />
      <h1 class="text-3xl font-bold mb-2">{{ recipe.name }}</h1>
      <div class="text-gray-500 mb-4">
        <span class="mr-4">🍽 {{ recipe.cuisine }}</span>
        <span class="mr-4">⏱ {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min</span>
        <span>⭐ {{ recipe.rating }} ({{ recipe.reviewCount }} reviews)</span>
      </div>

      <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
      <ul class="list-disc list-inside mb-6">
        <li v-for="(item, i) in recipe.ingredients" :key="i">{{ item }}</li>
      </ul>

      <h2 class="text-xl font-semibold mb-2">Instructions</h2>
      <ol class="list-decimal list-inside space-y-2">
        <li v-for="(step, i) in recipe.instructions" :key="i">{{ step }}</li>
      </ol>

      <div class="mt-8 text-gray-600 text-sm border-t pt-4">
        Servings: {{ recipe.servings }} |
        Calories per serving: {{ recipe.caloriesPerServing }} kcal
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Loading recipe...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type {Recipe} from "@/api/types/recipes/recipe.type.ts";
import {recipeService} from "@/api/services/recipes.service.ts";



const route = useRoute();
const recipe = ref<Recipe | null>(null);

onMounted(async () => {
  const id = Number(route.params.id);
  recipe.value = await recipeService.getById(id);
});
</script>
