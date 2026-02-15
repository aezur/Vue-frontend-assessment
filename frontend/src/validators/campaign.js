import { z } from "zod";

export const MetricsSchema = z.object({
  impressions: z.number().min(0),
  clicks: z.number().min(0),
  conversions: z.number().min(0),
  ctr: z.number().min(0).max(100),
  cpc: z.number().min(0),
  roas: z.number().min(0),
});

export const HistoryEntrySchema = z.object({
  date: z.string().datetime(),
  action: z.string(),
  changes: z.record(z.any()),
  user: z.string().optional(),
});

const CampaignBaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "paused", "completed", "draft"]),
  budget: z.number().min(0).default(0),
  spent: z.number().min(0).default(0),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string(),
  targetAudience: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  metrics: MetricsSchema.optional(),
  history: z.array(HistoryEntrySchema),
});

export const CampaignSchema = CampaignBaseSchema.refine(
  (data) => new Date(data.startDate) <= new Date(data.endDate),
  {
    message: "Start date must be before or equal to end date",
    path: ["startDate"],
  },
);

export const CreateCampaignSchema = CampaignBaseSchema.omit({
  id: true,
  history: true,
  createdAt: true,
  updatedAt: true,
})
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be before or equal to end date",
    path: ["startDate"],
  })
  .refine(
    (data) => new Date(data.startDate) >= new Date(new Date().toDateString()),
    {
      message: "Start date must be today or in the future",
      path: ["startDate"],
    },
  );

export const UpdateCampaignSchema = CampaignBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  history: true,
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
  message: "Start date must be before or equal to end date",
  path: ["startDate"],
});
