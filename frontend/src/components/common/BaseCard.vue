<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  padding: 'md',
  hoverable: false,
})

// Dynamic class untuk padding area konten utama (body)
const bodyPaddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    class="bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-200 overflow-hidden"
    :class="{ 'hover:shadow-md hover:border-slate-300': hoverable }"
  >
    <!-- Card Header (Render jika prop title diset ATAU slot 'header' diisi) -->
    <div
      v-if="title || $slots.header"
      class="px-6 py-4 border-b border-slate-100 flex items-center justify-between"
    >
      <slot name="header">
        <div>
          <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
          <p v-if="subtitle" class="text-xs text-slate-500 mt-0.5">{{ subtitle }}</p>
        </div>
      </slot>

      <!-- Slot khusus untuk aksi header (misal: Tombol Filter/Export) -->
      <div v-if="$slots['header-action']" class="flex items-center gap-2">
        <slot name="header-action" />
      </div>
    </div>

    <!-- Card Body (Konten Utama) -->
    <div :class="bodyPaddingClasses[padding]">
      <slot />
    </div>

    <!-- Card Footer (Render hanya jika slot 'footer' diisi) -->
    <div
      v-if="$slots.footer"
      class="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
