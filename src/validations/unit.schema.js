import { z } from "zod";

export const createUnitSchema = z.object({
    code: z.string().min(1, "code is required"),
    name: z.string().min(1, "name is required"),
    description: z.string().optional(),
    created_by: z.string().min(1, "Created_by is required"),
});

export const updateUnitSchema = z.object({
    id: z.number().int().positive("id must be positive"),
    code: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
});

export const getUnitSchema = z.object({
    id: z.number().int().positive("id must be positive"),
});

export const paginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
    sortBy: z.enum(["code", "name", "createdAt"]).default("code"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export const clientCodeSchema = z.string().length(16, "invalid client code");
