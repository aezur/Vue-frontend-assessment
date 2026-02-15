<template>
  <li class="campaign-list-item" @click="onClick">
    <h3 :style="{ viewTransitionName: `item-title-${campaign.id}` }">
      {{ campaign.name }}
    </h3>
    <div class="campaign-details">
      <p>Budget: {{ formatCurrency(campaign.budget) }}</p>
      <p>Status: {{ campaign.status }}</p>
      <p>Start Date: {{ formatDate(campaign.startDate) }}</p>
      <p>End Date: {{ formatDate(campaign.endDate) }}</p>
    </div>
  </li>
</template>

<script setup>
import { formatCurrency, formatDate } from "@/utils/formatters";

defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  onClick: {
    type: Function,
    required: false,
  },
});
</script>

<style scoped>
.campaign-list-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  list-style: none;
  transition: border-color, background-color, box-shadow;
  transition-duration: 0.2s;
}

.campaign-list-item:hover {
  border-color: var(--color-primary-accent);
  background-color: var(--color-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.campaign-list-item:active {
  background-color: var(--color-bg-card);
  border-color: var(--color-primary-active);
}

.campaign-list-item h3 {
  margin: 0 0 0.5rem 0;
}

.campaign-list-item p {
  margin: 0.25rem 0;
}

.campaign-details {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
