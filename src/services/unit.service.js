import prisma from "@/lib/prisma.js";
import {
    createUnitSchema,
    updateUnitSchema,
    getUnitSchema,
    paginationSchema,
    clientCodeSchema,
} from "@/validations/unit.schema.js";
import {
    unitSelect,
    unitSerializer,
    unitsSerializer,
} from "@/serializers/unit.serializer.js";

export const unitService = {
    async createUnit(data, clientCode) {
        const parsedData = createUnitSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const unit = await prisma.units.create({
            data: {
                code: parsedData.code,
                name: parsedData.name,
                description: parsedData.description,
                created_by: parsedData.created_by,
            },
            select: unitSelect,
        });

        return unitSerializer(unit);
    },

    async getUnit(id, clientCode) {
        const { id: parsedId } = getUnitSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const unit = await prisma.units.findFirst({
            where: { id: BigInt(parsedId) },
            select: unitSelect,
        });

        return unitSerializer(unit);
    },

    async listUnits(params, clientCode) {
        const { page, pageSize, sortBy, order } = paginationSchema.parse(params);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const total = await prisma.units.count();

        const items = await prisma.units.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [sortBy]: order },
            select: unitSelect,
        });

        return { items: unitsSerializer(items), total };
    },

    async updateUnit(data, clientCode) {
        const parsedData = updateUnitSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const unit = await prisma.units.update({
            where: { id: BigInt(parsedData.id) },
            data: {
                ...(parsedData.code && { code: parsedData.code }),
                ...(parsedData.name && { name: parsedData.name }),
                ...(parsedData.description && { description: parsedData.description }),
            },
            select: unitSelect,
        });

        return unitSerializer(unit);
    },

    async deleteUnit(id, clientCode) {
        const { id: parsedId } = getUnitSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const unit = await prisma.units.findFirst({
            where: { id: BigInt(parsedId) },
        });
        if (!unit) throw new Error("unit not found");

        // check if unit is used in items
        const count = await prisma.items.count({
            where: { unit_id: unit.id },
        });
        if (count > 0) throw new Error("cannot delete: unit used in items");

        return prisma.units.delete({ where: { id: unit.id } });
    },
};
