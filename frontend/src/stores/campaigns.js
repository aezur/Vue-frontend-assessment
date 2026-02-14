import { defineStore } from "pinia";
import { ref } from "vue";
import * as campaignService from "../services/campaignService";

export const useCampaignStore = defineStore("campaigns", () => {
  // State
  const campaigns = ref([]);
  const pagination = ref({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const loading = ref(false);
  const error = ref(null);

  // Query params for backend
  const search = ref("");
  const status = ref("");
  const page = ref(1);
  const limit = ref(10);
  const sortBy = ref("updatedAt");
  const sortOrder = ref("desc");

  // Track deleted campaign ids for optimistic update/rollback
  const deletedIds = ref(new Set());

  // Getters
  const getCampaignById = (id) => campaigns.value.find((c) => c.id === id);

  // Actions

  const fetchCampaigns = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, pagination: pag } = await campaignService.getCampaigns({
        search: search.value || undefined,
        status: status.value || undefined,
        page: page.value,
        limit: limit.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
      });
      campaigns.value = data;
      pagination.value = pag;
    } catch (err) {
      error.value = handleError(err, "Failed to load campaigns");
      campaigns.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchCampaignById = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const campaign = await campaignService.getCampaignById(id);

      // Also update in campaigns array if it exists, or add it
      const index = campaigns.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        campaigns.value[index] = campaign;
      } else {
        campaigns.value.push(campaign);
      }

      return campaign;
    } catch (err) {
      error.value = handleError(err, "Failed to load campaign details");

      // If 404, return specific error
      if (err.status === 404) {
        error.value = "Campaign not found";
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createCampaign = async (campaignData) => {
    loading.value = true;
    error.value = null;

    try {
      const newCampaign = await campaignService.createCampaign(campaignData);

      // Add to local state
      campaigns.value.push(newCampaign);

      return newCampaign;
    } catch (err) {
      error.value = handleError(err, "Failed to create campaign");
      throw err; // Re-throw so component can handle redirect
    } finally {
      loading.value = false;
    }
  };

  const updateCampaign = async (id, updates) => {
    loading.value = true;
    error.value = null;

    // Store original values for rollback
    const index = campaigns.value.findIndex((c) => c.id === id);
    const originalCampaign =
      index !== -1 ? { ...campaigns.value[index] } : null;

    // Optimistic update - apply changes immediately
    if (index !== -1) {
      campaigns.value[index] = { ...campaigns.value[index], ...updates };
    }

    try {
      const updatedCampaign = await campaignService.updateCampaign(id, updates);

      // Only apply server response if campaign wasn't deleted while update was in progress
      if (!deletedIds.value.has(id)) {
        // Re-find index after async operation (index may have changed)
        const currentIndex = campaigns.value.findIndex((c) => c.id === id);
        if (currentIndex !== -1) {
          campaigns.value[currentIndex] = updatedCampaign;
        }
      }

      return updatedCampaign;
    } catch (err) {
      // Rollback on error only if campaign wasn't deleted
      if (!deletedIds.value.has(id)) {
        if (originalCampaign) {
          const currentIndex = campaigns.value.findIndex((c) => c.id === id);
          if (currentIndex !== -1) {
            campaigns.value[currentIndex] = originalCampaign;
          }
        }
        error.value = handleError(err, "Failed to update campaign");
      } else {
        error.value = handleError(err, "Failed to update campaign");
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteCampaign = async (id) => {
    loading.value = true;
    error.value = null;

    // Mark as deleted immediately
    deletedIds.value.add(id);

    // Store original state for rollback
    const index = campaigns.value.findIndex((c) => c.id === id);
    const removedCampaign = index !== -1 ? { ...campaigns.value[index] } : null;

    // Optimistic update - remove from UI immediately
    if (index !== -1) {
      campaigns.value.splice(index, 1);
    }

    try {
      await campaignService.deleteCampaign(id);
    } catch (err) {
      // Rollback on error - restore at original position
      deletedIds.value.delete(id);

      if (removedCampaign && index !== -1) {
        campaigns.value.splice(index, 0, removedCampaign);
      }
      error.value = handleError(err, "Failed to delete campaign");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  // Helper function for error handling
  const handleError = (err, defaultMessage) => {
    if (err.isNetworkError) {
      return "Network error. Please check your connection and try again.";
    }

    if (err.status === 404) {
      return "Campaign not found";
    }

    if (err.status >= 500) {
      return "Server error. Please try again later.";
    }

    if (err.status === 400 && err.data?.message) {
      return err.data.message;
    }

    return defaultMessage;
  };

  return {
    // State
    campaigns,
    pagination,
    loading,
    error,
    search,
    status,
    page,
    limit,
    sortBy,
    sortOrder,

    // Getters
    getCampaignById,

    // Actions
    fetchCampaigns,
    fetchCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    clearError,
  };
});
