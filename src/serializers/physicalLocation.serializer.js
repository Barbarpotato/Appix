export const physicalLocationSelect = {
    id: true,
    client_id: true,
    name: true,
    location: true,
    created_by: true,
    created_at: true,
    is_active: true,
};

export function physicalLocationSerializer(location) {
    if (!location) return null;
    return {
        id: location.id.toString(),
        clientId: location.client_id.toString(),
        name: location.name,
        location: location.location,
        createdBy: location.created_by,
        createdAt: location.created_at,
        isActive: location.is_active,
    };
}

export function physicalLocationsSerializer(locations) {
    return locations.map(physicalLocationSerializer);
}
