<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Add New Recipe</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block font-medium mb-1">Cuisine</label>
        <input
          v-model="form.cuisine"
          type="text"
          class="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label class="block font-medium mb-1">Ingredients</label>
        <textarea
          v-model="ingredientsText"
          class="w-full border rounded-lg px-3 py-2"
          placeholder="One ingredient per line"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label class="block font-medium mb-1">Instructions</label>
        <textarea
          v-model="instructionsText"
          class="w-full border rounded-lg px-3 py-2"
          placeholder="One instruction per line"
          rows="4"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Prep Time (min)</label>
          <input
            v-model.number="form.prepTimeMinutes"
            type="number"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Cook Time (min)</label>
          <input
            v-model.number="form.cookTimeMinutes"
            type="number"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label class="block font-medium mb-1">Image URL</label>
        <input
          v-model="form.image"
          type="text"
          class="w-full border rounded-lg px-3 py-2"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type {Recipe} from "@/api/types/recipes/recipe.type.ts";
import {recipeService} from "@/api/services/recipes.service.ts";


const router = useRouter()

// Форма
const form = ref<Partial<Recipe>>({
  name: '',
  cuisine: '',
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  image: '',
})

// Текстові поля, які потім розділимо в масиви
const ingredientsText = ref('')
const instructionsText = ref('')

// Відправлення
const handleSubmit = async () => {
  const payload = {
    ...form.value,
    ingredients: ingredientsText.value
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean),
    instructions: instructionsText.value
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean),
  }

  await recipeService.create(payload)
  router.push('/recipes')
}
</script>
