<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Layout from './layouts/LayoutMain.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
</script>

<template>
  <Layout>
    <ToastContainer></ToastContainer>
    <router-view></router-view>
  </Layout>
</template>

<style scoped></style>
