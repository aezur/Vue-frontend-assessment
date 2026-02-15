<template>
  <div class="campaign-list">
    <div class="container">
      <div class="page-header">
        <h2>Campaigns</h2>
        <router-link to="/campaigns/new" class="button">
          + New Campaign
        </router-link>
      </div>

      <search-filters
        class="mb-2"
        v-model:filter-value="campaignStore.status"
        v-model:start-date="campaignStore.startDate"
        v-model:end-date="campaignStore.endDate"
      />

      <search-bar
        class="mb-4"
        v-model="campaignStore.search"
        placeholder="Search campaigns..."
      />

      <campaign-list-display
        :campaigns="campaignStore.campaigns"
        :loading="campaignStore.loading"
        :error="campaignStore.error"
      />

      <pagination
        :pagination="campaignStore.pagination"
        :page-sizes="[3, 5, 10]"
        @page="onPageChange"
        @limit="onLimitChange"
      />
    </div>
  </div>
</template>

<script setup>
import CampaignListDisplay from "@/components/campaigns/CampaignListDisplay.vue";
import Pagination from "@/components/core/PaginationControl.vue";
import SearchBar from "@/components/core/SearchBar.vue";
import SearchFilters from "@/components/campaigns/SearchFilters.vue";
import { useCampaignStore } from "@/stores/campaigns";
import { onMounted, watch } from "vue";

const campaignStore = useCampaignStore();

onMounted(async () => {
  await campaignStore.fetchCampaigns();
});

// Refetch campaigns when search, status, dates or limit changes
watch(
  () => [
    campaignStore.search,
    campaignStore.status,
    campaignStore.startDate,
    campaignStore.endDate,
    campaignStore.limit,
  ],
  async () => {
    await campaignStore.fetchCampaigns();
  },
);

function onPageChange(newPage) {
  campaignStore.page = newPage;
  campaignStore.fetchCampaigns();
}

function onLimitChange(newLimit) {
  campaignStore.limit = newLimit;
  campaignStore.page = 1; // Reset to first page
  campaignStore.fetchCampaigns();
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0;
  font-size: 2rem;
}

.search-container {
  padding: 1rem;
  background-color: var(--color-primary-active);
  border-radius: 8px;
}
</style>
