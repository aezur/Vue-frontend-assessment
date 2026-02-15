import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../../services/campaignService", () => ({
  getCampaigns: vi.fn(),
  getCampaignById: vi.fn(),
  createCampaign: vi.fn(),
  updateCampaign: vi.fn(),
  deleteCampaign: vi.fn(),
}));

import { setActivePinia, createPinia } from "pinia";
import { useCampaignStore } from "../campaigns";
import * as campaignService from "../../services/campaignService";

describe("useCampaignStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("fetchCampaigns", () => {
    it("should fetch and store campaigns and pagination", async () => {
      const mockCampaigns = [
        { id: "1", name: "Campaign 1", status: "active" },
        { id: "2", name: "Campaign 2", status: "draft" },
      ];
      const mockPagination = { page: 1, limit: 10, total: 2, totalPages: 1 };
      campaignService.getCampaigns.mockResolvedValue({
        data: mockCampaigns,
        pagination: mockPagination,
      });

      const store = useCampaignStore();
      store.search = "foo";
      store.status = "active";
      store.page = 2;
      store.limit = 5;
      store.sortBy = "name";
      store.sortOrder = "asc";

      await store.fetchCampaigns();

      expect(campaignService.getCampaigns).toHaveBeenCalledWith({
        search: "foo",
        status: "active",
        page: 2,
        limit: 5,
        sortBy: "name",
        sortOrder: "asc",
      });
      expect(store.campaigns).toEqual(mockCampaigns);
      expect(store.pagination).toEqual(mockPagination);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it("should set error state when fetch fails with network error", async () => {
      campaignService.getCampaigns.mockRejectedValue({ isNetworkError: true });
      const store = useCampaignStore();
      await store.fetchCampaigns();
      expect(store.campaigns).toEqual([]);
      expect(store.error).toBeTruthy();
      expect(store.loading).toBe(false);
    });
  });

  describe("fetchCampaignById", () => {
    it("should fetch single campaign and add to store", async () => {
      const mockCampaign = { id: "1", name: "Campaign 1", status: "active" };
      campaignService.getCampaignById.mockResolvedValue(mockCampaign);

      const store = useCampaignStore();
      const result = await store.fetchCampaignById("1");

      expect(result).toEqual(mockCampaign);
      expect(store.campaigns).toContainEqual(mockCampaign);
      expect(store.error).toBeNull();
    });

    it("should set error state on 404", async () => {
      campaignService.getCampaignById.mockRejectedValue({
        status: 404,
      });

      const store = useCampaignStore();
      await store.fetchCampaignById("999");

      expect(store.error).toBeTruthy();
    });

    it("should update campaigns array if campaign already exists", async () => {
      const mockCampaign = {
        id: "1",
        name: "Updated Campaign",
        status: "active",
      };
      campaignService.getCampaignById.mockResolvedValue(mockCampaign);

      const store = useCampaignStore();
      store.campaigns = [{ id: "1", name: "Old Name", status: "draft" }];

      await store.fetchCampaignById("1");

      expect(store.campaigns[0]).toEqual(mockCampaign);
    });
  });

  describe("createCampaign", () => {
    it("should create campaign and add to store", async () => {
      const newCampaign = {
        name: "New Campaign",
        status: "draft",
        budget: 10000,
      };
      const createdCampaign = { id: "123", ...newCampaign };
      campaignService.createCampaign.mockResolvedValue(createdCampaign);

      const store = useCampaignStore();
      const result = await store.createCampaign(newCampaign);

      expect(result).toEqual(createdCampaign);
      expect(store.campaigns).toContainEqual(createdCampaign);
      expect(store.error).toBeNull();
    });

    it("should set error and re-throw on validation failure", async () => {
      const validationError = {
        status: 400,
        data: { message: "Invalid campaign data" },
      };
      campaignService.createCampaign.mockRejectedValue(validationError);

      const store = useCampaignStore();

      await expect(store.createCampaign({})).rejects.toEqual(validationError);
      expect(store.error).toBeTruthy();
    });
  });

  describe("updateCampaign", () => {
    it("should update campaign in store", async () => {
      const store = useCampaignStore();
      const original = { id: "1", name: "Original", status: "draft" };
      store.campaigns = [{ ...original }];

      const updates = { name: "Updated" };
      const serverResponse = { id: "1", name: "Updated", status: "draft" };

      campaignService.updateCampaign.mockResolvedValue(serverResponse);

      await store.updateCampaign("1", updates);

      expect(store.campaigns[0]).toEqual(serverResponse);
    });

    it("should set error on update failure", async () => {
      const store = useCampaignStore();
      store.campaigns = [{ id: "1", name: "Original", status: "draft" }];
      campaignService.updateCampaign.mockRejectedValue({ status: 500 });
      await expect(
        store.updateCampaign("1", { name: "Failed" }),
      ).rejects.toBeTruthy();
      expect(store.error).toBeTruthy();
    });
  });

  describe("deleteCampaign", () => {
    it("should remove campaign from store", async () => {
      const store = useCampaignStore();
      store.campaigns = [
        { id: "1", name: "Campaign 1" },
        { id: "2", name: "Campaign 2" },
      ];
      campaignService.deleteCampaign.mockResolvedValue();
      await store.deleteCampaign("1");
      expect(store.campaigns).toHaveLength(1);
      expect(store.campaigns[0].id).toBe("2");
    });

    it("should set error on delete failure", async () => {
      const store = useCampaignStore();
      store.campaigns = [
        { id: "1", name: "Campaign 1" },
        { id: "2", name: "Campaign 2" },
      ];
      campaignService.deleteCampaign.mockRejectedValue({ status: 500 });
      await expect(store.deleteCampaign("2")).rejects.toBeTruthy();
      expect(store.error).toBeTruthy();
    });
  });

  // No client-side search functionality in backend-driven store

  describe("getCampaignById getter", () => {
    it("should return campaign when id exists", () => {
      const store = useCampaignStore();
      const targetCampaign = { id: "2", name: "Campaign 2" };
      store.campaigns = [{ id: "1", name: "Campaign 1" }, targetCampaign];
      const result = store.getCampaignById("2");
      expect(result).toEqual(targetCampaign);
    });
    it("should return undefined when id does not exist", () => {
      const store = useCampaignStore();
      store.campaigns = [{ id: "1", name: "Campaign 1" }];
      const result = store.getCampaignById("999");
      expect(result).toBeUndefined();
    });
  });

  describe("clearError", () => {
    it("should clear error state", () => {
      const store = useCampaignStore();
      store.error = "Some error";

      store.clearError();

      expect(store.error).toBeNull();
    });
  });
});
