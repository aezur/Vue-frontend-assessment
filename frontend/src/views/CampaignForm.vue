<template>
  <div class="campaign-form">
    <div class="container">
      <h1 class="mb-4">{{ mode === 'edit' ? 'Edit Campaign' : 'Create Campaign' }}</h1>

      <!-- Wait until campaign is loaded in edit mode -->
      <CampaignsForm v-if="mode === 'create' || campaignLoaded" :mode="mode" :initialValues="initialValues"
        @submit="handleSubmit" />

      <loading-spinner v-else />
    </div>
  </div>
</template>

<script setup>
import CampaignsForm from '@/components/campaigns/CampaignsForm.vue'
import LoadingSpinner from '@/components/core/LoadingSpinner.vue'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCampaignStore } from '@/stores/campaigns'
import { useCampaign } from '@/composables/useCampaign'

const route = useRoute()
const router = useRouter()
const store = useCampaignStore()

const mode = computed(() => (route.params.id ? 'edit' : 'create'))

const initialValues = ref({
  name: 'New Campaign',
  status: 'draft',
  budget: 0,
  spent: 0,
  startDate: '',
  endDate: '',
  description: '',
  targetAudience: '',
  metrics: {
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
  },
})

// composable
const { campaign } = useCampaign()

// track when campaign is loaded
const campaignLoaded = ref(false)

watch(campaign, (c) => {
  if (mode.value === 'edit' && c) {
    initialValues.value = {
      name: c.name,
      status: c.status,
      budget: c.budget,
      spent: c.spent,
      startDate: c.startDate,
      endDate: c.endDate,
      description: c.description,
      targetAudience: c.targetAudience,
      metrics: c.metrics,
    }
    campaignLoaded.value = true
  }
  // for create mode, we can just show immediately
  if (mode.value === 'create') campaignLoaded.value = true
}, { immediate: true })

async function handleSubmit(data) {
  try {
    let campaignId
    if (mode.value === 'create') {
      const newCampaign = await store.createCampaign(data)
      campaignId = newCampaign.id
    } else {
      await store.updateCampaign(route.params.id, data)
      campaignId = route.params.id
    }
    router.push({ name: 'campaign-detail', params: { id: campaignId } })
  } catch (error) {
    console.error('Error submitting campaign:', error)
  }
}
</script>