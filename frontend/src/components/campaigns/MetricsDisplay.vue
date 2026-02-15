<template>
  <div class="metrics">
    <h2>Metrics</h2>
    <div class="metrics-grid">
      <div class="metric-item">
        <span class="label">Impressions:</span>
        <span class="value">{{ metrics.impressions.toLocaleString() }}</span>
      </div>
      <div class="metric-item">
        <span class="label">Clicks:</span>
        <span class="value">{{ metrics.clicks.toLocaleString() }}</span>
      </div>
      <div class="metric-item">
        <span class="label">Conversions:</span>
        <span class="value">{{ metrics.conversions.toLocaleString() }}</span>
      </div>
      <div class="metric-item">
        <span class="label">CTR:</span>
        <span class="value">{{ metrics.ctr }}%</span>
      </div>
      <div class="metric-item">
        <span class="label">CPC:</span>
        <span class="value">{{ formatCurrency(metrics.cpc) }}</span>
      </div>
      <div class="metric-item">
        <span class="label">ROAS:</span>
        <span class="value">{{ metrics.roas }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from "@/utils/formatters";

defineProps({
  metrics: { type: Object, required: true },
});
</script>

<style scoped>
.metrics h2 {
  font-size: 1.125rem;
  margin-bottom: 12px;
  padding-bottom: 10px;
}

.metrics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: stretch;
}

.metrics-grid .metric-item {
  flex: 1 1 calc(33.333% - 12px);
}

@media (max-width: 1023px) {
  .metrics-grid .metric-item {
    flex: 1 1 calc(50% - 12px);
  }
}

@media (max-width: 767px) {
  .metrics-grid .metric-item {
    flex: 1 1 100%;
  }
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 8px;
  min-height: 56px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.03);
  width: 100%;
  height: 100%;
  align-self: stretch;
}

.label {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.95rem;
}

.value {
  color: #0f172a;
  font-weight: 700;
  font-size: 1.05rem;
}
</style>
