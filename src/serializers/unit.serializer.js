export const unitSelect = {
    id: true,
    code: true,
    name: true,
    description: true,
    created_by: true,
    created_at: true,
};

export function unitSerializer(unit) {
    if (!unit) return null;
    return {
        id: unit.id.toString(),
        code: unit.code,
        name: unit.name,
        description: unit.description,
        createdBy: unit.created_by,
        createdAt: unit.created_at,
    };
}

export function unitsSerializer(units) {
    return units.map(unitSerializer);
}
