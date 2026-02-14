<template>
  <div>
    <slot name="loading" v-if="loading && !items.length" />
    <slot name="error" v-else-if="error" :error="error" />
    <slot name="empty" v-else-if="items.length === 0" />
    <ul v-else>
      <slot name="item" v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  loading: Boolean,
  error: String
})
</script>
