<template>
  <div class="header mb-4">
    <div class="header-top mt-1">
      <div @click="back" class="header-btn">
        <PhArrowLeft :size="16" /><span>Back</span>
      </div>
      <router-link :to="`/campaigns/${campaign.id}/edit`" class="button">
        <PhPencilSimple :size="12" class="mr-2" /><span>Edit Campaign</span>
      </router-link>
    </div>

    <h1
      class="mb-2"
      :style="{ viewTransitionName: `item-title-${campaign.id}` }"
    >
      {{ campaign.name }}
    </h1>

    <CampaignStatusPill class="mb-2" :status="campaign.status" />

    <AudienceDisplay class="mb-2" :audience="campaign.targetAudience" />

    <DateDisplay
      class="mb-4"
      :startDate="campaign.startDate"
      :endDate="campaign.endDate"
    />

    <p class="description">{{ campaign.description }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { PhArrowLeft, PhPencilSimple } from "@phosphor-icons/vue";
import CampaignStatusPill from "./CampaignStatusPill.vue";
import DateDisplay from "@/components/core/DateDisplay.vue";
import AudienceDisplay from "./AudienceDisplay.vue";

defineProps({
  campaign: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function back() {
  router.back();
}
</script>

<style scoped>
.header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color-primary);
  gap: 8px;
  font-size: large;
  font-weight: 500;
}

.description {
  font-size: 1.5rem;
  text-align: center;
}

.mr-2 {
  margin-right: 8px;
}
</style>
