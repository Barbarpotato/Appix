import { z } from "zod";

export const createPhysicalLocationSchema = z.object({
    name: z.string().min(1, "name is required"),
    location: z.string().min(1, "location is required"),
});

export const updatePhysicalLocationSchema = z.object({
    id: z.number().int().positive("id must be positive"),
    name: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
});

export const getPhysicalLocationSchema = z.object({
    id: z.number().int().positive("id must be positive"),
});

export const paginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
    sortBy: z.enum(["name", "location", "createdAt"]).default("name"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export const clientCodeSchema = z.string().length(16, "invalid client code");
