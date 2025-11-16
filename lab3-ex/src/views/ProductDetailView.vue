<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Product } from "@/types";
import { serviceProvider } from "@/services/ServiceProvider";

const route = useRoute();
const product = ref<Product | null>(null);

const fetchProduct = async () => {
	const id = Number(route.params.id);
	product.value = await serviceProvider.products.getById(id);
};

onMounted(fetchProduct);
</script>

<template>
	<main class="container mx-auto p-6">
		<div v-if="!product">Loading...</div>

		<div v-else>
			<h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
			<img :src="product.images?.[0]" class="max-w-xs mb-4">
			<p class="text-lg font-semibold">{{ product.price }}$</p>
			<p class="mt-4">{{ product.description }}</p>
		</div>
	</main>
</template>
