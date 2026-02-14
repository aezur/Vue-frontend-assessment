<template>
  <div class="history">
    <h2>History</h2>
    <ul class="history-list">
      <li v-for="item in history" :key="item.date" class="history-item">
        <div class="history-date">{{ formatDate(item.date) }}</div>
        <div class="history-action">{{ item.action }}</div>
        <!-- TODO: Restyle this and also add scroll -->
        <div v-if="item.changes && Object.keys(item.changes).length" class="history-changes">
          {{ JSON.stringify(item.changes, null, 2) }}
        </div>
      </li>
      <p v-if="history.length === 0" class="text-center">No events.</p>
    </ul>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/formatters'

defineProps({
  history: { type: Array, required: true }
})
</script>

<style scoped>
.history h2 {
  font-size: 1.125rem;
  margin-bottom: 12px;
  padding-bottom: 10px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  padding: 12px;
  margin-bottom: 10px;
  background: #fffaf0;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
  box-shadow: 0 1px 0 rgba(16, 24, 40, 0.02);
}

.history-date {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.95rem;
}

.history-action {
  color: #374151;
  margin: 6px 0;
}

.history-changes {
  font-size: 0.9rem;
  color: #4b5563;
  background: #f5f7f9;
  padding: 8px;
  border-radius: 6px;
  font-family: monospace;
  white-space: pre-wrap;
  margin-top: 6px;
  overflow: auto;
  max-height: 160px;
}
</style>