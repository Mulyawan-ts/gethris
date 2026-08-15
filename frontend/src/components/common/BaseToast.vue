<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'danger' | 'warning' | 'info'
  title?: string
  message: string
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  title: '',
  show: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const bgClass = computed(() => `text-bg-${props.type}`)
</script>

<template>
  <div
    v-if="show"
    class="toast show align-items-center border-0 shadow"
    :class="bgClass"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">
        <strong v-if="title" class="d-block mb-1">{{ title }}</strong>
        {{ message }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        aria-label="Close"
        @click="emit('close')"
      ></button>
    </div>
  </div>
</template>
