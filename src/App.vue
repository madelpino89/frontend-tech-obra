<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="ml-container ml-container--fluid">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped></style>
