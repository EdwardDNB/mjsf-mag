import { createApp } from 'vue'
import App from './App.vue'
import DocumentUploaderPlugin from './index'

const app = createApp(App)
app.use(DocumentUploaderPlugin)
app.mount('#app')
