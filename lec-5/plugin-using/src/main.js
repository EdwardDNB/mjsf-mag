import { createApp } from 'vue'
import App from './App.vue'
import "@munspel/upload-preview-input/dist/`upload-preview-input.css";
import plugin  from "@munspel/upload-preview-input";

const app = createApp(App);
app.use(plugin)
app.mount('#app')
