// src/serializers/client.serializer.js

export const clientSelect = {
    id: true,
    code: true,
    name: true,
};

export function clientSerializer(client) {
    if (!client) return null;

    const serialized = {};

    for (const field of Object.keys(clientSelect)) {
        const value = client[field];

        // Special case: BigInt → string
        if (typeof value === "bigint") {
            serialized[field] = value.toString();
        } else {
            serialized[field] = value;
        }
    }

    return serialized;
}
