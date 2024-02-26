<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { MAutocomplete, MDataTableV2, MField } from '@mozaic-ds/vue-3'
import useUtils from '@/composables/useUtils'
import useDataInfo from '@/composables/useDataInfo'

const {
  orders,
  products,
  loading,
  productsToAdd,
  productsAddedToOrder,
  selectedProductsToAdd,
  showAddLayer,
  totalPriceOrder,
  getProducts,
  getOrders,
  removeOrders,
  formatProductsForAutocomplete,
  calculateTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  addNewOrder,
  updateSelection,
  getTypeStaus,
  selectedOrders,
  showRemoveModal
} = useDataInfo()

const headers = ref([
  { label: 'id', value: 'id' },
  { label: 'Fecha de creación', value: 'creationDate' },
  { label: 'Número de productos', value: 'totalProducts' },
  { label: 'Precio SIN IVA', value: 'priceWithoutIVA' },
  { label: 'Precio IVA', value: 'priceIVA' },
  { label: 'Estado', value: 'status' }
])

const headersProducts = ref([
  { label: 'id', value: 'id' },
  { label: 'Nombre', value: 'name' },
  { label: 'Descripción', value: 'description' },
  { label: 'Cantidad', value: 'quantity' },
  { label: 'Precio', value: 'price' }
])

const headersProductsAddedToOrder = ref([
  { label: 'Nombre', value: 'name' },
  { label: 'Precio', value: 'price' },
  { label: 'Cantidad', value: 'quantity' }
])

const { eurFormat, dateFormatStr } = useUtils()

watch(selectedProductsToAdd, (newValue) => {
  console.log('selectedProductsToAdd', newValue)
  const newProductsAddedToOrder = []
  selectedProductsToAdd.value.forEach((productId) => {
    const productFound = products.value.find((p) => p.id === productId)
    if (productFound) {
      const existingProduct = productsAddedToOrder.value.find((p) => p.id === productFound.id)
      if (existingProduct) {
        newProductsAddedToOrder.push(existingProduct)
      } else {
        const newProduct = { ...productFound, quantity: 1 }
        newProductsAddedToOrder.push(newProduct)
      }
    }
  })
  productsAddedToOrder.value = newProductsAddedToOrder
  calculateTotalPrice()
})

onMounted(async () => {
  // eslint-disable-next-line no-debugger
  await getOrders()
  await getProducts()
  formatProductsForAutocomplete()
})
</script>

<template>
  <div class="container">
    <MModal modal-title="Eliminar orden" :open="showRemoveModal" @update:open="showRemoveModal = !showRemoveModal">
      <template v-slot:default>
        <div class="example-modal-content">
          <p v-if="selectedOrders.length > 0">
            ¿Estás seguro de que quieres eliminar las ordenes seleccionadas?
          </p>
          <p v-else>
            Para eliminar una o más ordenes debe seleccionarlas primero.
          </p>
        </div>
      </template>
      <template v-slot:footer>
          <MButton v-if="selectedOrders.length > 0" label="Eliminar seleccionadas" @click="removeOrders" />
          <MButton label="Salir" theme="bordered" @click="showRemoveModal = false"/>
      </template>
    </MModal>
    <MLayer
      extendend
      layer-title="Nueva orden"
      title="Datos de nueva orden"
      :open="showAddLayer"
      @update:open="showAddLayer = !showAddLayer"
    >
      <template v-slot:default>
        <div id="formAddOrder">
          <MField id="product" label="Seleccione los productos deseados" class="mu-mb-100">
            <MAutocomplete
              multiple
              sort
              v-model="selectedProductsToAdd"
              :items="productsToAdd"
              item-text="name"
              item-value="id"
              label="Producto"
            />
          </MField>
          <MDataTableV2
            v-if="selectedProductsToAdd.length > 0"
            :items="productsAddedToOrder"
            :headers="headersProductsAddedToOrder"
          >
            <template v-slot:cell.quantity="{ item }">
              <MButton
                icon="ControlLess48"
                theme="bordered-danger"
                size="s"
                width="fit"
                class="mu-mr-050"
                @click="decreaseQuantity(item)"
              />
              <MTag :key="item.name" :label="item.quantity" class="mu-mr-050" />
              <MButton
                icon="ControlMore48"
                width="fit"
                theme="bordered-danger"
                size="s"
                @click="increaseQuantity(item)"
              />
            </template>
          </MDataTableV2>
          <MBadge  v-if="selectedProductsToAdd.length > 0" type="success" size="xl" class="mu-mt-100 right-align">
            {{ `Precio total del pedido: ${eurFormat(totalPriceOrder)}` }}
          </MBadge>
        </div>
      </template>
      <template v-slot:footer>
        <MButton label="Añadir orden" @click="addNewOrder" />
        <MButton label="Cancelar" theme="bordered" @click="showAddLayer = false" />
      </template>
    </MLayer>

    <MDataTableV2
      :items="orders || []"
      :headers="headers"
      :loading="loading"
      selectable
      expandable
      allowRowClick
      @update:selection="updateSelection"
    >
      <template #topbar>
        <MDataTableTop>
          <template #edition>
            <MButton icon="PublishEdit24" theme="bordered-neutral" size="s" />
            <MButton icon="DownloadWeb24" theme="bordered-neutral" size="s" />
          </template>
          <template #actions>
            <MButton
              icon="ControlMore48"
              label="Agregar orden"
              size="s"
              @click="showAddLayer = true"
            />
            <MButton
              icon="PublishTrashbin48"
              label="Borrar orden"
              theme="bordered-danger"
              size="s"
              @click="showRemoveModal = true"
            />
          </template>
        </MDataTableTop>
      </template>
      <template v-slot:cell.status="{ item }">
        <MBadge :type="getTypeStaus(item)">
          {{ item.status }}
        </MBadge>
      </template>
      <template v-slot:cell.creationDate="{ item }">
        {{ dateFormatStr(item.creationDate) }}
      </template>
      <template v-slot:expandContent="rowData">
        <div style="display: flex; justify-content: center; align-items: center; padding: 20px">
          <MDataTableV2 :items="rowData.item.products" :headers="headersProducts"></MDataTableV2>
        </div>
      </template>
    </MDataTableV2>
  </div>

  <RouterView />
</template>

<style scoped></style>
