<template>
  <div class="audience-display">
    <PhUsersThree  :size="24" style="color: var(--color-primary);" />
    <div class="audience-text">
      <p>{{ audience }}</p>
    </div>
  </div>
</template>

<script setup>
import { PhUsersThree } from '@phosphor-icons/vue';

const props = defineProps({
  audience: {
    type: String,
    required: true
  },
})
</script>

<style scoped>
.audience-display {
  display: flex;
  align-items: center;
  gap: 8px;
}
.audience-text {
  display: flex;
  justify-content: space-evenly;
}
</style>