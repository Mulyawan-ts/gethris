<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
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

// Config gaya & icon berdasarkan tipe Toast
const toastConfig = computed(() => {
  const configs = {
    success: {
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      iconColor: 'text-emerald-500',
      icon: `M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z`,
    },
    error: {
      bgColor: 'bg-rose-50 border-rose-200 text-rose-800',
      iconColor: 'text-rose-500',
      icon: `M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z`,
    },
    warning: {
      bgColor: 'bg-amber-50 border-amber-200 text-amber-800',
      iconColor: 'text-amber-500',
      icon: `M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z`,
    },
    info: {
      bgColor: 'bg-sky-50 border-sky-200 text-sky-800',
      iconColor: 'text-sky-500',
      icon: `M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z`,
    },
  }

  return configs[props.type]
})
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="max-w-sm w-full border rounded-lg shadow-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 transition-all"
      :class="toastConfig.bgColor"
    >
      <div class="flex items-start w-full">
        <!-- Icon Toast -->
        <div class="flex-shrink-0">
          <svg
            class="h-6 w-6"
            :class="toastConfig.iconColor"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="toastConfig.icon" />
          </svg>
        </div>

        <!-- Text Konten -->
        <div class="ml-3 flex-1 pt-0.5">
          <p v-if="title" class="text-sm font-semibold">{{ title }}</p>
          <p class="text-sm font-medium opacity-90">{{ message }}</p>
        </div>

        <!-- Tombol Close (X) -->
        <div class="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-60 hover:opacity-100 transition"
            @click="emit('close')"
          >
            <span class="sr-only">Close</span>
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
