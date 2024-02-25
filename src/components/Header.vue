<template>
  <div class="container">
    <MHeader
      class="mu-mb-300"
      v-bind="{
        title: 'Header title',
        showShadow: true,
        items: {
          0: { text: 'Header Item 1', href: '#' },
          1: { text: 'Header Item 2', href: '#' },
          2: { text: 'Header Item 3', href: '#', isActive: true }
        },
        showTabs: true,
        subTitle: 'Subtitle',
        status: { text: 'Text for status', type: 'information' },
        showBreadcrumb: true,
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
        <MIcon name="NotificationQuestion32" />
        <MIcon name="NotificationBell32" />
      </template>
      <template #selector>
        <MSelect
          id="bu-selector"
          placeholder="Choose an option"
          size="s"
          :options="[
            { value: 'GO-LM', text: 'Default' },
            { value: 'LM-FR', text: 'Leroy Merlin France' },
            { value: 'LM-ES', text: 'Leroy Merlin Spain' }
          ]"
        />
      </template>
    </MHeader>
  </div>
</template>
