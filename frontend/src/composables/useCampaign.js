import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useCampaignStore } from "@/stores/campaigns";

export function useCampaign() {
  const route = useRoute();
  const store = useCampaignStore();

  const campaign = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const campaignId = computed(() => route.params.id);

  const fetchCampaign = async (id) => {
    loading.value = true;
    try {
      let c = store.getCampaignById(id);
      if (!c) {
        c = await store.fetchCampaignById(id);
      }
      campaign.value = c;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // fetch on mount and whenever route id changes
  watch(
    campaignId,
    (id) => {
      if (id) fetchCampaign(id);
      else campaign.value = null;
    },
    { immediate: true },
  );

  return { campaign, loading, error };
}
