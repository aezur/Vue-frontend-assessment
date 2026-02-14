<template>
  <div class="container">
    <!-- TODO: Add 404 page or display -->
    <error-message v-if="error" :message="error" />

    <template v-if="campaign">
      <campaign-details-header :campaign="campaign" />

      <financials-display class="mb-4" :campaign="campaign" />

      <div class="metrics-history">
        <metrics-display :metrics="campaign.metrics" />
        <history-display :history="campaign.history" />
      </div>
    </template>

    <div v-else-if="loading">
      <loading-spinner />
    </div>

    <error-message v-else message="Campaign not found." />
  </div>
</template>

<script setup>
import CampaignDetailsHeader from "@/components/campaigns/CampaignDetailsHeader.vue";
import ErrorMessage from "@/components/core/ErrorMessage.vue";
import MetricsDisplay from "@/components/campaigns/MetricsDisplay.vue";
import HistoryDisplay from "@/components/campaigns/HistoryDisplay.vue";
import FinancialsDisplay from "@/components/campaigns/FinancialsDisplay.vue";
import LoadingSpinner from "@/components/core/LoadingSpinner.vue";
import { useCampaign } from "@/composables/useCampaign";

const { campaign, loading, error } = useCampaign();
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
