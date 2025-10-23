<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required/>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required/>
        </div>

        <button type="submit" :disabled="auth.loading">
          <span v-if="auth.loading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <p class="hint">Use any email/password for demo.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/auth.ts";


const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

async function onSubmit() {
  await auth.login(email.value, password.value)
  const redirect = (route.query.redirect as string) || '/'
  router.push(redirect)
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #3b3b98);
  color: #fff;
  font-family: Inter, sans-serif;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


.hint {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
