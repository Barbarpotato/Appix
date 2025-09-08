import prisma from "@/lib/prisma.js";
import {
    createItemSchema,
    updateItemSchema,
    getItemSchema,
    paginationSchema,
    clientCodeSchema,
} from "@/validations/item.schema.js";
import {
    itemSelect,
    itemSerializer,
    itemsSerializer,
} from "@/serializers/item.serializer.js";

export const itemService = {
    async createItem(data, clientCode) {
        const parsedData = createItemSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        // validate client
        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        // validate unit
        const unit = await prisma.units.findUnique({
            where: { id: BigInt(parsedData.unitId) },
        });
        if (!unit) throw new Error(`invalid unit_id ${parsedData.unitId}`);

        const item = await prisma.items.create({
            data: {
                number: "DRAFT",
                client_id: client.id,
                name: parsedData.name,
                unit_id: unit.id,
                unit_code: unit.code,
                unit_name: unit.name,
                document_url: parsedData.document_url,
                description: parsedData.description,
                price: parsedData.price,
                created_by: parsedData.created_by,
                is_active: false,
            },
            select: itemSelect,
        });

        return itemSerializer(item);
    },

    async updateItem(data, clientCode) {
        const parsedData = updateItemSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const item = await prisma.items.update({
            where: {
                id: BigInt(parsedData.id),
                client_id: client.id,
            },
            data: {
                ...(parsedData.name && { name: parsedData.name }),
                ...(parsedData.description && { description: parsedData.description }),
                ...(parsedData.price !== undefined && { price: parsedData.price }),
                ...(parsedData.document_url && { document_url: parsedData.document_url }),
            },
            select: itemSelect,
        });

        return itemSerializer(item);
    },

    async getItem(id, clientCode) {
        const { id: parsedId } = getItemSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const item = await prisma.items.findFirst({
            where: { id: BigInt(parsedId), client_id: client.id },
            select: itemSelect,
        });

        return itemSerializer(item);
    },

    async listItems(params, clientCode) {
        const { page, pageSize, sortBy, order } = paginationSchema.parse(params);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("client_code not found");

        const total = await prisma.items.count({
            where: { client_id: client.id },
        });

        const items = await prisma.items.findMany({
            where: { client_id: client.id },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [sortBy]: order },
            select: itemSelect,
        });

        return { items: itemsSerializer(items), total };
    },
};
