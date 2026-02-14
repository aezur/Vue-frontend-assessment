<template>
  <div class="date-display">
    <PhCalendarBlank :size="24" style="color: var(--color-primary);" />
    <div class="date-text">
      <p>{{ formatDate(startDate) }}</p>
      <p>-</p>
      <p>{{ formatDate(endDate) }}</p>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/formatters';
import { PhCalendarBlank } from '@phosphor-icons/vue';

const props = defineProps({
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date-text {
  display: flex;
  justify-content: space-evenly;
}
</style>