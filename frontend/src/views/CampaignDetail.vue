<template>
  <!-- TODO: Add skeleton loader UI -->
  <div class="container">
    <!-- TODO: Add 404 page or display -->
    <error-message v-if="store.error" :message="store.error" @close="store.clearError" />

    <template v-if="campaign">
      <campaign-details-header :campaign="campaign" />

      <financials-display class="mb-4" :campaign="campaign" />

      <div class="metrics-history">
        <metrics-display :metrics="campaign.metrics" />
        <history-display :history="campaign.history" />
      </div>
    </template>

    <div v-else-if="store.loading">
      <loading-spinner />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCampaignStore } from '@/stores/campaigns'
import CampaignDetailsHeader from '@/components/campaigns/CampaignDetailsHeader.vue'
import ErrorMessage from '@/components/core/ErrorMessage.vue'
import MetricsDisplay from '@/components/campaigns/MetricsDisplay.vue'
import HistoryDisplay from '@/components/campaigns/HistoryDisplay.vue'
import FinancialsDisplay from '@/components/campaigns/FinancialsDisplay.vue'
import LoadingSpinner from '@/components/core/LoadingSpinner.vue'

const route = useRoute()
const store = useCampaignStore()

const campaign = computed(() => store.getCampaignById(route.params.id))

onMounted(async () => {
  if (!campaign.value) {
    await store.fetchCampaignById(route.params.id);
  }
})
</script>

<style scoped>
.metrics-history {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
  align-items: start;
}

@media (max-width: 767px) {
  .metrics-history {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
