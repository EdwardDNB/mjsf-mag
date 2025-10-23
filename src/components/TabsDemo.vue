<template>
	<div class="max-w-2xl mx-auto mt-10">
		<h2 class="text-2xl font-bold mb-4">Демонстрація компоненту вкладок</h2>

		<Tabs v-model="current" variant="underline">
			<Tab title="Профіль" slug="profile">
				<p class="p-2">Тут може бути інформація користувача.</p>
			</Tab>

			<Tab title="Налаштування" slug="settings">
				<form class="space-y-3 p-2">
					<label class="block">
						<span class="text-gray-700">Ім’я користувача</span>
						<input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
							placeholder="Введіть ім’я" />
					</label>
					<button type="button" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
						Зберегти
					</button>
				</form>
			</Tab>

			<Tab title="Контакти" slug="contacts">
				<div class="p-2">
					<p>Телефон: +380 67 123 4567</p>
					<p>Email: user@example.com</p>
				</div>
			</Tab>
		</Tabs>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tabs from "./Tabs.vue";
import Tab from "./Tab.vue";

const current = ref("profile");
</script>
