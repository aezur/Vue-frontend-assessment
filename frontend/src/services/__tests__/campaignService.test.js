import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import * as campaignService from "../campaignService";
import api from "../api";

describe("campaignService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCampaigns", () => {
    it("should fetch campaigns with params and return data and pagination", async () => {
      const mockCampaigns = [
        { id: "1", name: "Campaign 1" },
        { id: "2", name: "Campaign 2" },
      ];
      const mockPagination = { page: 1, limit: 10, total: 2, totalPages: 1 };
      api.get.mockResolvedValue({
        data: { data: mockCampaigns, pagination: mockPagination },
      });

      const result = await campaignService.getCampaigns({
        search: "foo",
        page: 1,
      });

      expect(api.get).toHaveBeenCalledWith("/campaigns", {
        params: { search: "foo", page: 1 },
      });
      expect(result).toEqual({
        data: mockCampaigns,
        pagination: mockPagination,
      });
    });

    it("should throw error when API call fails", async () => {
      api.get.mockRejectedValue(new Error("Network error"));

      await expect(campaignService.getCampaigns()).rejects.toThrow(
        "Network error",
      );
    });
  });

  describe("getCampaignById", () => {
    it("should fetch a single campaign by id", async () => {
      const mockCampaign = { id: "1", name: "Campaign 1" };

      api.get.mockResolvedValue({ data: { data: mockCampaign } });

      const result = await campaignService.getCampaignById("1");

      expect(api.get).toHaveBeenCalledWith("/campaigns/1");
      expect(result).toEqual(mockCampaign);
    });
  });

  describe("createCampaign", () => {
    it("should create a new campaign", async () => {
      const newCampaign = {
        name: "New Campaign",
        status: "draft",
        budget: 10000,
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        description: "Test campaign",
        targetAudience: "Test audience",
      };
      const mockResponse = { id: "123", ...newCampaign };

      api.post.mockResolvedValue({ data: { data: mockResponse } });

      const result = await campaignService.createCampaign(newCampaign);

      expect(api.post).toHaveBeenCalledWith("/campaigns", newCampaign);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateCampaign", () => {
    it("should update an existing campaign", async () => {
      const updates = { name: "Updated Name" };
      const mockResponse = { id: "1", ...updates };

      api.put.mockResolvedValue({ data: { data: mockResponse } });

      const result = await campaignService.updateCampaign("1", updates);

      expect(api.put).toHaveBeenCalledWith("/campaigns/1", updates);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteCampaign", () => {
    it("should delete a campaign", async () => {
      api.delete.mockResolvedValue({});

      await campaignService.deleteCampaign("1");

      expect(api.delete).toHaveBeenCalledWith("/campaigns/1");
    });
  });
});
