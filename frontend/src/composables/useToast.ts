import { ref } from 'vue'

export interface ToastOptions {
  id?: number
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

const toasts = ref<ToastOptions[]>([])
let nextId = 1

export function useToast() {
  const addToast = (options: ToastOptions) => {
    const id = nextId++
    const duration = options.duration ?? 3000

    const toastItem: ToastOptions = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
    }

    toasts.value.push(toastItem)

    // Otomatis hapus toast setelah durasi habis
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  // Helper methods untuk sintaks ringkas
  const success = (message: string, title = 'Berhasil') => {
    addToast({ type: 'success', title, message })
  }

  const error = (message: string, title = 'Gagal') => {
    addToast({ type: 'error', title, message })
  }

  const warning = (message: string, title = 'Peringatan') => {
    addToast({ type: 'warning', title, message })
  }

  const info = (message: string, title = 'Informasi') => {
    addToast({ type: 'info', title, message })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
