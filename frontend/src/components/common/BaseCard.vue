<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="card shadow-sm border-0">
    <!-- Card Header -->
    <div
      v-if="title || $slots.header"
      class="card-header bg-white py-3 d-flex align-items-center justify-content-between"
    >
      <slot name="header">
        <div>
          <h5 class="card-title mb-0 fw-bold text-dark">{{ title }}</h5>
          <small v-if="subtitle" class="text-muted d-block mt-1">{{ subtitle }}</small>
        </div>
      </slot>
      <div v-if="$slots['header-action']">
        <slot name="header-action" />
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer bg-light py-2 d-flex justify-content-end gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>
