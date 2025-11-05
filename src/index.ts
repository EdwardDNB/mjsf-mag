import type { App } from 'vue'
import DocumentUploader from './components/DocumentUploader.vue'

export default {
  install(app: App) {
    app.component('DocumentUploader', DocumentUploader)
  },
}

export { DocumentUploader }
