<script setup>
import { ref, onBeforeMount } from 'vue'
import { MButton, MDataTableV2 } from '@mozaic-ds/vue-3'

let orders = ref([])
const headers = ref([
  { label: 'id', value: 'id' },
  { label: 'Fecha de creación', value: 'creationDate' },
  { label: 'Número de productos', value: 'totalProducts' },
  { label: 'Precio SIN IVA', value: 'priceWithoutIVA' },
  { label: 'Precio IVA', value: 'priceIVA' },
  { label: 'Estado', value: 'status' }
])
onBeforeMount(async () => {
  // eslint-disable-next-line no-debugger
  console.log('AboutView mounted')
  const response = await fetch('http://localhost:3000/orders')
  if (!response.ok) {
    console.error('HTTP error', response.status)
  } else {
    orders.value = await response.json()
  }
})
</script>
<template>
  <div class="about">
    <template>
      <MButton label="Mozaic button" />
      <MDataTableV2 :items="orders || []" :headers="headers"></MDataTableV2>
    </template>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
