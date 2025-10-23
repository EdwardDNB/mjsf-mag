import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RecipesListPage from "@/pages/RecipesListPage.vue";


const routes = [
  {
    path: '/', component: DefaultLayout,
    redirect: '/recipes',
    children: [
      {path: '/recipes', name: 'recipes-list', component: RecipesListPage},
      {
        path: '/recipes/:id', name: 'recipe-view',
        component: () => import('@/pages/RecipePage.vue'),
      },
      {
        path: '/recipes/create',
        name: 'recipe-create',
        component: () => import('@/pages/CreateRecipe.vue'),
        meta: {requiresAuth: true}, // 👈 захищаємо сторінку
      }
    ]
  },
  {path: '/login', name: 'login', component: LoginPage}
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // наприклад, токен збережено при логіні

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({name: 'login', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})
