<template>
  <div class="financials">
    <h2>Financials</h2>
    <div class="financial-grid">
      <div class="financial-item">
        <span class="label">Budget:</span>
        <span class="value">{{ formatCurrency(campaign.budget) }}</span>
      </div>
      <div class="financial-item">
        <span class="label">Spent:</span>
        <span class="value">{{ formatCurrency(campaign.spent) }}</span>
      </div>
      <div class="financial-item">
        <span class="label">Remaining:</span>
        <span class="value">{{ formatCurrency(remaining) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '@/utils/formatters'
import { computed } from 'vue'

const props = defineProps({
  campaign: { type: Object, required: true }
})

const remaining = computed(() => props.campaign.budget - props.campaign.spent)
</script>

<style scoped>
.financials h2 {
  font-size: 1.125rem;
  margin-bottom: 12px;
  padding-bottom: 10px;
}

.financial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width:1023px) {
  .financial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:767px) {
  .financial-grid {
    grid-template-columns: 1fr;
  }
}

.financial-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  min-height: 64px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
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