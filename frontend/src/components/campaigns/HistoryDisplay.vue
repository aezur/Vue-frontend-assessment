<template>
  <div class="history">
    <h2>History</h2>
    <ul class="history-list">
      <HistoryItem v-for="item in history" :key="item.date" :item="item" />
      <p v-if="history.length === 0" class="text-center">No events.</p>
    </ul>
  </div>
</template>

<script setup>
import HistoryItem from "@/components/campaigns/HistoryItem.vue";

defineProps({
  history: { type: Array, required: true },
});
</script>

<style scoped>
.history h2 {
  font-size: 1.125rem;
  margin-bottom: 8px;
  padding-bottom: 6px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 125px;
  overflow-y: auto;
}
</style>
