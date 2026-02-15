import api from "./api";
import { CampaignSchema } from "@/validators/campaign";
import { PaginationSchema } from "@/validators/pagination";

/**
 * Campaign Service
 * Handles all campaign-related API calls
 */

/**
 * Fetch campaigns with backend filtering, search, pagination, sorting
 * @param {Object} params - Query params: search, status, page, limit, sortBy, sortOrder
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export const getCampaigns = async (params = {}) => {
  const response = await api.get("/campaigns", { params });
  const campaigns = response.data.data;
  const pagination = response.data.pagination;

  // Validate campaigns
  const validatedCampaigns = campaigns.map((campaign) => {
    const result = CampaignSchema.safeParse(campaign);
    if (!result.success) {
      console.error("Invalid campaign data received:", result.error, campaign);
      throw new Error(result.error.message);
    }
    return result.data;
  });

  // Validate pagination
  const paginationResult = PaginationSchema.safeParse(pagination);
  if (!paginationResult.success) {
    console.error(
      "Invalid pagination data received:",
      paginationResult.error,
      pagination,
    );
    throw new Error(paginationResult.error.message);
  }

  return {
    data: validatedCampaigns,
    pagination: paginationResult.data,
  };
};

/**
 * Fetch a single campaign by ID
 * @param {string} id - Campaign ID
 * @returns {Promise<Object>} Campaign object
 */
export const getCampaignById = async (id) => {
  const response = await api.get(`/campaigns/${id}`);
  const campaign = response.data.data;

  // Validate campaign
  const result = CampaignSchema.safeParse(campaign);
  if (!result.success) {
    console.error("Invalid campaign data received:", result.error, campaign);
    throw new Error(result.error.message);
  }

  return result.data;
};

/**
 * Create a new campaign
 * @param {Object} campaignData - Campaign data to create
 * @param {string} campaignData.name
 * @param {string} campaignData.status - active | paused | completed | draft
 * @param {number} campaignData.budget
 * @param {string} campaignData.startDate - ISO date string
 * @param {string} campaignData.endDate - ISO date string
 * @param {string} campaignData.description
 * @param {string} campaignData.targetAudience
 * @returns {Promise<Object>} Created campaign object
 */
export const createCampaign = async (campaignData) => {
  const response = await api.post("/campaigns", campaignData);
  const campaign = response.data.data;

  // Validate campaign
  const result = CampaignSchema.safeParse(campaign);
  if (!result.success) {
    console.error("Invalid campaign data received:", result.error, campaign);
    throw new Error(result.error.message);
  }

  return result.data;
};

/**
 * Update an existing campaign
 * @param {string} id - Campaign ID
 * @param {Object} campaignData - Updated campaign data
 * @returns {Promise<Object>} Updated campaign object
 */
export const updateCampaign = async (id, campaignData) => {
  const response = await api.put(`/campaigns/${id}`, campaignData);
  const campaign = response.data.data;

  // Validate campaign
  const result = CampaignSchema.safeParse(campaign);
  if (!result.success) {
    console.error("Invalid campaign data received:", result.error, campaign);
    throw new Error(result.error.message);
  }

  return result.data;
};

/**
 * Delete a campaign
 * @param {string} id - Campaign ID
 * @returns {Promise<void>}
 */
export const deleteCampaign = async (id) => {
  await api.delete(`/campaigns/${id}`);
};
