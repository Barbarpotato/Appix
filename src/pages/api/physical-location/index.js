import { physicalLocationService } from "@/services/physicalLocation.service.js";

export default async function handler(req, res) {
    const { method, query, body } = req;
    const clientCode = query.clientCode;

    try {
        if (method === "GET") {
            const locs = await physicalLocationService.listPhysicalLocations(query, clientCode);
            return res.json({ success: true, ...locs });
        }

        if (method === "POST") {
            const loc = await physicalLocationService.createPhysicalLocation(body, clientCode);
            return res.status(201).json({ success: true, data: loc });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
