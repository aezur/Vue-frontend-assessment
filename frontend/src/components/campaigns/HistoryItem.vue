<template>
  <li class="history-item">
    <div class="history-item-header">
      <div class="history-date">{{ formatDate(item.date) }}</div>
      <div class="history-action">{{ item.action }}</div>
    </div>
    <div
      v-if="item.changes && Object.keys(item.changes).length"
      class="history-changes"
    >
      <div v-for="(change, key) in item.changes" :key="key" class="change-item">
        {{ capitalize(key) }}: {{ change[0] }} → {{ change[1] }}
      </div>
    </div>
  </li>
</template>

<script setup>
import { formatDate } from "@/utils/formatters";

defineProps({
  item: { type: Object, required: true },
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<style scoped>
.history-item {
  padding: 8px;
  margin-bottom: 6px;
  background: var(--color-bg-card);
  border-radius: 6px;
  border-left: 3px solid var(--color-warning);
  box-shadow: 0 1px 0 rgba(16, 24, 40, 0.02);
}

.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.history-date {
  font-weight: 600;
  color: var(--color-text-header);
  font-size: 0.9rem;
}

.history-action {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.history-changes {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: var(--color-bg);
  padding: 6px;
  border-radius: 4px;
  margin-top: 4px;
}

.change-item {
  margin-bottom: 2px;
}

.change-item:last-child {
  margin-bottom: 0;
}
</style>
