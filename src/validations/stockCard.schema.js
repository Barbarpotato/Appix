import { z } from "zod";

export const clientCodeSchema = z.string().min(1);

export const getStockCardSchema = z.object({
    id: z.number().int().positive(),
});

export const createStockCardSchema = z.object({
    date: z.date(),
    itemId: z.number().int().positive(),
    physicalLocationId: z.number().int().positive(),
    quantity: z.number().int(),
    // add other fields from your stockCard model
});

export const updateStockCardSchema = createStockCardSchema.extend({
    id: z.number().int().positive(),
});

export const paginationSchema = z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().max(100).default(10),
    sortBy: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
});
