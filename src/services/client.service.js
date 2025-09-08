// src/services/client.service.js
import prisma from "@/lib/prisma.js";
import crypto from "crypto";
import { createClientSchema, getClientSchema } from "@/validations/client.schema.js";
import { clientSelect, clientSerializer } from "@/serializers/client.serializer.js";

export const clientService = {
    async createClient(data) {
        const parsedData = createClientSchema.parse(data);

        // generate 16-char hex code
        const code = crypto.randomBytes(8).toString("hex");

        const client = await prisma.clients.create({
            data: {
                name: parsedData.name,
                createdBy: parsedData.createdBy, // assuming camelCase in schema
                code,
            },
            select: clientSelect,
        });

        return clientSerializer(client);
    },

    async getClient(id) {
        const { id: parsedId } = getClientSchema.parse({ id });

        const client = await prisma.clients.findUnique({
            where: { id: BigInt(parsedId) },
            select: clientSelect,
        });

        return clientSerializer(client);
    },

    async listClients() {
        const clients = await prisma.clients.findMany({
            orderBy: { created_at: "desc" },
            select: clientSelect,
        });

        return clients.map(clientSerializer);
    },
};
