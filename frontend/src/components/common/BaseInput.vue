<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number
  label?: string
  id?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  id: '',
  type: 'text',
  placeholder: '',
  error: '',
  required: false,
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

// Generate ID acak jika id prop tidak diisi
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-3">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="form-label font-medium text-secondary">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- Input Field -->
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="form-control"
      :class="{ 'is-invalid': Boolean(error) }"
      @input="handleInput"
    />

    <!-- Validation Error Text -->
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
  </div>
</template>
