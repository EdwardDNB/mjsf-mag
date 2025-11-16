<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Product } from "@/types";
import { serviceProvider } from "@/services/ServiceProvider";

const products = ref<Product[]>([]);
const loading = ref(false);

const fetchProducts = async () => {
	try {
		loading.value = true;
		products.value = await serviceProvider.products.get({ limit: 20, offset: 0 });
	} finally {
		loading.value = false;
	}
};

onMounted(fetchProducts);
</script>

<template>
	<main class="container mx-auto p-6">
		<h1 class="text-xl font-bold mb-4">Products</h1>

		<div v-if="loading">Loading...</div>

		<ul v-else class="grid grid-cols-3 gap-4">
			<li v-for="p in products" :key="p.id">
				<router-link :to="`/products/${p.id}`" class="block border p-4 hover:bg-gray-100">
					<h3 class="font-semibold">{{ p.title }}</h3>
					<p>{{ p.price }}$</p>
				</router-link>
			</li>
		</ul>
	</main>
</template>
