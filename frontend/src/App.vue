<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Layout from './layouts/LayoutMain.vue'

const message = ref('Sedang mengambil data...')

onMounted(async () => {
  try {
    // Memanggil API AdonisJS yang ada di port 3333
    const response = await fetch('http://localhost:3333/')
    const data = await response.json()

    // Mengambil nilai "world" dari { hello: "world" }
    message.value = data.hello
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
})
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style scoped></style>
