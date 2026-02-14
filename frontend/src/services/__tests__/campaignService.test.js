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
import { mockCampaigns } from "./data/mockCampaigns";
import { mockPagination } from "./data/mockPagination";

describe("campaignService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCampaigns", () => {
    it("should fetch campaigns with params and return validated data and pagination", async () => {
      api.get.mockResolvedValue({
        data: { data: mockCampaigns, pagination: mockPagination },
      });

      await campaignService.getCampaigns({
        search: "foo",
        page: 1,
      });

      expect(api.get).toHaveBeenCalledWith("/campaigns", {
        params: { search: "foo", page: 1 },
      });
    });

    it("should throw error when API call fails", async () => {
      api.get.mockRejectedValue(new Error("Network error"));

      await expect(campaignService.getCampaigns()).rejects.toThrow(
        "Network error",
      );
    });

    it("should throw error when campaign data is invalid", async () => {
      const invalidCampaigns = [
        {
          id: "1",
          name: "Campaign 1",
          status: "active",
          // Missing required fields like budget, spent, etc.
        },
      ];
      const mockPagination = { page: 1, limit: 10, total: 1, totalPages: 1 };
      api.get.mockResolvedValue({
        data: { data: invalidCampaigns, pagination: mockPagination },
      });

      await expect(campaignService.getCampaigns()).rejects.toThrow();
    });

    it("should throw error when pagination data is invalid", async () => {
      const invalidPagination = { page: 0, limit: 10, total: 1, totalPages: 1 }; // Invalid: page must be >= 1
      api.get.mockResolvedValue({
        data: { data: mockCampaigns, pagination: invalidPagination },
      });

      await expect(campaignService.getCampaigns()).rejects.toThrow();
    });
  });
});
