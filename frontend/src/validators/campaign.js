import { z } from "zod";

export const CampaignSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    status: z.enum(["active", "paused", "completed", "draft"]),
    budget: z.number().min(0),
    spent: z.number().min(0),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    description: z.string().optional(),
    targetAudience: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    metrics: z.object({
      impressions: z.number().min(0),
      clicks: z.number().min(0),
      conversions: z.number().min(0),
      ctr: z.number().min(0),
      cpc: z.number().min(0),
      roas: z.number().min(0),
    }),
    history: z.array(
      z.object({
        date: z.string().datetime(),
        action: z.string(),
        changes: z.record(z.any()),
        user: z.string().optional(),
      }),
    ),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be before or equal to end date",
    path: ["startDate"],
  });
