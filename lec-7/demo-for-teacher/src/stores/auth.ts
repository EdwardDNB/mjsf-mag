import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(token.value ? JSON.parse(localStorage.getItem('user') || 'null') : null)
  const loading = ref(false)

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value)

  // --- Actions ---
  async function login(email: string, password: string) {
    try {
      loading.value = true
      // Example mock request — replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      token.value = 'fake-jwt-token'
      user.value = { id: 1, name: 'Andrii Lisniak', email }
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function fetchProfile() {
    if (!token.value) return
    try {
      loading.value = true
      // Example request to get profile
      await new Promise((resolve) => setTimeout(resolve, 500))
      user.value = { id: 1, name: 'Andrii Lisniak', email: 'you@example.com' }
      localStorage.setItem('user', JSON.stringify(user.value))
    } finally {
      loading.value = false
    }
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    fetchProfile,
  }
})
