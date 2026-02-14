import api from "./api";

/**
 * Campaign Service
 * Handles all campaign-related API calls
 */

/**
 * Fetch all campaigns
 * @returns {Promise<Array>} Array of campaign objects
 */

/**
 * Fetch campaigns with backend filtering, search, pagination, sorting
 * @param {Object} params - Query params: search, status, page, limit, sortBy, sortOrder
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export const getCampaigns = async (params = {}) => {
  const response = await api.get("/campaigns", { params });
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};

/**
 * Fetch a single campaign by ID
 * @param {string} id - Campaign ID
 * @returns {Promise<Object>} Campaign object
 */
export const getCampaignById = async (id) => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data.data;
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
  return response.data.data;
};

/**
 * Update an existing campaign
 * @param {string} id - Campaign ID
 * @param {Object} campaignData - Updated campaign data
 * @returns {Promise<Object>} Updated campaign object
 */
export const updateCampaign = async (id, campaignData) => {
  const response = await api.put(`/campaigns/${id}`, campaignData);
  return response.data.data;
};

/**
 * Delete a campaign
 * @param {string} id - Campaign ID
 * @returns {Promise<void>}
 */
export const deleteCampaign = async (id) => {
  await api.delete(`/campaigns/${id}`);
};
