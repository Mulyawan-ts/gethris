<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline-primary'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => {
  const sizeClass = props.size === 'sm' ? 'btn-sm' : props.size === 'lg' ? 'btn-lg' : ''
  return ['btn', `btn-${props.variant}`, sizeClass]
})
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm me-2"
      role="status"
      aria-hidden="true"
    ></span>
    <slot />
  </button>
</template>
