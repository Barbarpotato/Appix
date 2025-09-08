export const itemSelect = {
    id: true,
    number: true,
    client_id: true,
    name: true,
    unit_id: true,
    unit_code: true,
    unit_name: true,
    document_url: true,
    description: true,
    price: true,
    created_by: true,
    created_at: true,
    is_active: true,
};

export function itemSerializer(item) {
    if (!item) return null;
    return {
        id: item.id.toString(),
        number: item.number,
        clientId: item.client_id.toString(),
        name: item.name,
        unitId: item.unit_id.toString(),
        unitCode: item.unit_code,
        unitName: item.unit_name,
        documentUrl: item.document_url,
        description: item.description,
        price: item.price?.toString() ?? null, // Decimal → string
        createdBy: item.created_by,
        createdAt: item.created_at,
        isActive: item.is_active,
    };
}

export function itemsSerializer(items) {
    return items.map(itemSerializer);
}
