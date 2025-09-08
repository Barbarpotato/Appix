import prisma from "@/lib/prisma.js";
import {
    createPhysicalLocationSchema,
    updatePhysicalLocationSchema,
    getPhysicalLocationSchema,
    paginationSchema,
    clientCodeSchema,
} from "@/validations/physicalLocation.schema.js";
import {
    physicalLocationSelect,
    physicalLocationSerializer,
    physicalLocationsSerializer,
} from "@/serializers/physicalLocation.serializer.js";

export const physicalLocationService = {
    async createPhysicalLocation(data, clientCode) {
        const parsedData = createPhysicalLocationSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const location = await prisma.physical_locations.create({
            data: {
                ...parsedData,
                client_id: client.id,
                is_active: false,
            },
            select: physicalLocationSelect,
        });

        return physicalLocationSerializer(location);
    },

    async getPhysicalLocation(id, clientCode) {
        const { id: parsedId } = getPhysicalLocationSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const location = await prisma.physical_locations.findFirst({
            where: { id: BigInt(parsedId), client_id: client.id },
            select: physicalLocationSelect,
        });

        return physicalLocationSerializer(location);
    },

    async listPhysicalLocations(params, clientCode) {
        const { page, pageSize, sortBy, order } = paginationSchema.parse(params);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const total = await prisma.physical_locations.count({
            where: { client_id: client.id },
        });

        const locations = await prisma.physical_locations.findMany({
            where: { client_id: client.id },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [sortBy]: order },
            select: physicalLocationSelect,
        });

        return { items: physicalLocationsSerializer(locations), total };
    },

    async updatePhysicalLocation(data, clientCode) {
        const parsedData = updatePhysicalLocationSchema.parse(data);
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const location = await prisma.physical_locations.update({
            where: { id: BigInt(parsedData.id) },
            data: {
                ...(parsedData.name && { name: parsedData.name }),
                ...(parsedData.location && { location: parsedData.location }),
            },
            select: physicalLocationSelect,
        });

        return physicalLocationSerializer(location);
    },

    async setActivePhysicalLocation(id, clientCode, active = true) {
        const { id: parsedId } = getPhysicalLocationSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const updated = await prisma.physical_locations.updateMany({
            where: { id: BigInt(parsedId), client_id: client.id },
            data: { is_active: active },
        });

        return updated;
    },

    async deletePhysicalLocation(id, clientCode) {
        const { id: parsedId } = getPhysicalLocationSchema.parse({ id });
        const code = clientCodeSchema.parse(clientCode);

        const client = await prisma.clients.findUnique({ where: { code } });
        if (!client) throw new Error("invalid client");

        const loc = await prisma.physical_locations.findFirst({
            where: { id: BigInt(parsedId), client_id: client.id },
        });
        if (!loc) throw new Error("location not found");

        // check stock cards usage
        const count = await prisma.stock_cards.count({
            where: { physical_location_id: loc.id },
        });
        if (count > 0) throw new Error("cannot delete: used in stock_cards");

        if (loc.is_active) throw new Error("cannot delete: still active");

        return prisma.physical_locations.delete({ where: { id: loc.id } });
    },
};
