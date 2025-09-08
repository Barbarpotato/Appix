import prisma from "@/lib/prisma.js";
import {
    createStockCardSchema,
    updateStockCardSchema,
    getStockCardSchema,
    paginationSchema,
    clientCodeSchema,
} from "@/validations/stockCard.schema.js";
import { stockCardSelect, stockCardSerializer } from "@/serializers/stockCard.serializer.js";

export const stockCardService = {
    async createStockCard(data, clientCode) {
        const parsedData = createStockCardSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.client.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const stockCard = await prisma.stockCard.create({
            data: { ...parsedData, clientId: client.id },
            select: stockCardSelect,
        });

        return stockCardSerializer(stockCard);
    },

    async getStockCard(id, clientCode) {
        const { id: parsedId } = getStockCardSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.client.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const stockCard = await prisma.stockCard.findFirst({
            where: { id: parsedId, clientId: client.id },
            select: stockCardSelect,
        });

        return stockCardSerializer(stockCard);
    },

    async listStockCards(params, clientCode) {
        const { page, pageSize, sortBy, order } = paginationSchema.parse(params);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.client.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const total = await prisma.stockCard.count({
            where: { clientId: client.id },
        });

        const items = await prisma.stockCard.findMany({
            where: { clientId: client.id },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                [sortBy && ["date", "createdAt"].includes(sortBy) ? sortBy : "date"]: order || "asc",
            },
            select: stockCardSelect,
        });

        return { items: items.map(stockCardSerializer), total };
    },

    async updateStockCard(data, clientCode) {
        const parsedData = updateStockCardSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.client.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const stockCard = await prisma.stockCard.update({
            where: { id: parsedData.id, clientId: client.id },
            data: parsedData,
            select: stockCardSelect,
        });

        return stockCardSerializer(stockCard);
    },

    async deleteStockCard(id, clientCode) {
        const { id: parsedId } = getStockCardSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.client.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const stockCard = await prisma.stockCard.findFirst({
            where: { id: parsedId, clientId: client.id },
        });
        if (!stockCard) throw new Error("stock card not found for this client");

        await prisma.stockCard.delete({
            where: { id: stockCard.id },
        });

        return { success: true };
    },
};
