import { MTabsV2 } from '@mozaic-ds/vue-3'; import { MTab } from '@mozaic-ds/vue-3';
<template>
  <div class="container">
    <MHeader
      class="mu-mb-100 header-bg-primary"
      v-bind="{
        title: 'OBRAMAT TECHNICAL TEST',
        showShadow: true,
        items: {
          0: { text: 'Header Item 1', href: '#' },
          1: { text: 'Header Item 2', href: '#' },
          2: { text: 'Header Item 3', href: '#', isActive: true }
        },
        showTabs: true,
        sticky: true,
        tabs: {
          0: { id: 1, text: 'One', active: true },
          1: { id: 2, text: 'Two' },
          2: { id: 3, text: 'Three' },
          3: { id: 4, text: 'Four' }
        }
      }"
    >
      <template #icons>
        <MIcon name="StoreBM32" />
        <MIcon name="AccountProfileView32" />
        <MIcon name="Trolley32" />
      </template>
    </MHeader>
  </div>
  <div class="container">
    <MTabsV2 align="full" :model-value="selectedTab" :tabs="tabs" class="mu-mb-200"  @tab-clicked="onClickTab"></MTabsV2>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const tabs = ref([
  {label: 'Inicio' },
  { label: 'Productos' },
])


const onClickTab = (tab) => {
  switch (tab.index) {
    case 0:
      router.push('/')
      break
    case 1:
      router.push('/products')
      break
  }
  selectedTab.value = tab.index
}
const selectedTab = ref(0)
</script>
<style lang="scss" scoped>
:deep(.mc-header__content) {
  color: #fff;
  grid-column: 1;
  grid-row: auto;
  padding-top: 0.5rem;
}
</style>
