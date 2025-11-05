<script setup lang="ts">
import { ref } from 'vue'
import DocumentUploader from './components/DocumentUploader.vue'

const uploadedFiles = ref<File[]>([])
const availableDocuments = [
  { type: 'pdf', icon: '/icons/pdf.svg', name: 'Contract.pdf' },
  { type: 'docx', icon: '/icons/docx.svg', name: 'Report.docx' },
  { type: 'xlsx', icon: '/icons/xlsx.svg', name: 'Data.xlsx' }
]
</script>

<template>
  <div class="p-6">
    <DocumentUploader v-model="uploadedFiles" :documents="availableDocuments" :maxFiles="5" />
    <div class="mt-4">
      <h3>Model value (uploadedFiles):</h3>
      <pre>{{ uploadedFiles }}</pre>
    </div>
  </div>
</template>