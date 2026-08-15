<script setup lang="ts">
import BaseToast from './BaseToast.vue'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm">
    <BaseToast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :show="true"
      @close="removeToast(toast.id!)"
    />
  </div>
</template>
