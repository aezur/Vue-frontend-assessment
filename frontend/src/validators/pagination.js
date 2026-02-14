import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().min(0),
  totalPages: z.number().int().min(0),
});
