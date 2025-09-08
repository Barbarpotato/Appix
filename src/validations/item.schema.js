import { z } from "zod";

// Create item validation
export const createItemSchema = z.object({
    name: z.string().min(1, "Item name is required"),
    unitId: z.number().int().positive("Unit ID must be positive"),
    document_url: z.string().url("Must be a valid URL").optional(),
    description: z.string().optional(),
    price: z.preprocess((val) => (val === "" ? undefined : val), z.number().nonnegative().optional()),
    created_by: z.string().min(1, "Created_by is required"),
});

// Update item validation
export const updateItemSchema = z.object({
    id: z.number().int().positive("ID must be positive"),
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.preprocess((val) => (val === "" ? undefined : val), z.number().nonnegative().optional()),
    document_url: z.string().url("Must be a valid URL").optional(),
});

// Get item validation
export const getItemSchema = z.object({
    id: z.number().int().positive("ID must be positive"),
});

// Pagination + sorting
export const paginationSchema = z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().max(100).default(10),
    sortBy: z.enum(["id", "name", "created_at", "price"]).default("created_at"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

// Client code schema (string, required)
export const clientCodeSchema = z.string().min(1, "Client code is required");
