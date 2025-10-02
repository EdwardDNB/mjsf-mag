import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App);
app.provide("title", "Hello, Vue!!! It is provide example")
app.mount('#app')


