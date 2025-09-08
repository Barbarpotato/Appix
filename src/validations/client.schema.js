import { z } from "zod";

export const createClientSchema = z.object({
    name: z.string().min(1, "Client name is required"),
    created_by: z.string().min(1, "Created_by is required"),
});

export const getClientSchema = z.object({
    id: z.number().int().positive(),
});
