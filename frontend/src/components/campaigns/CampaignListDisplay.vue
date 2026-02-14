<template>
  <List :items="campaigns" :loading="loading" :error="error">
    <template #loading>
      <loading-spinner />
    </template>

    <template #error="{ error }">
      <error-message :message="error" />
    </template>

    <template #empty>
      <p class="text-center">No campaigns found</p>
    </template>

    <template #item="{ item }">
      <campaign-list-item :campaign="item" @click="() => onCampaignClick(item)" />
    </template>
  </List>
</template>

<script setup>
import List from '@/components/core/List.vue'
import CampaignListItem from './CampaignListItem.vue'
import LoadingSpinner from '@/components/core/LoadingSpinner.vue'
import ErrorMessage from '@/components/core/ErrorMessage.vue'
import { useViewTransitionRouter } from '@/composables/useViewTransitionRouter';

const { push } = useViewTransitionRouter();

defineProps({
  campaigns: {
    type: Array,
    required: true,
  },
  loading: Boolean,
  error: String
})

function onCampaignClick(campaign) {
  push({ name: "campaign-detail", params: { id: campaign.id } });
}
</script>
