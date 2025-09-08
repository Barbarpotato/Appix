import { physicalLocationService } from "@/services/physicalLocation.service.js";

export default async function handler(req, res) {
    const { method, query, body } = req;
    const clientCode = query.clientCode;

    try {
        if (method === "GET") {
            const loc = await physicalLocationService.getPhysicalLocation(Number(query.id), clientCode);
            return res.json({ success: true, data: loc });
        }

        if (method === "PUT") {
            if (query.action === "set-active") {
                const loc = await physicalLocationService.setActivePhysicalLocation(Number(query.id), clientCode, true);
                return res.json({ success: true, data: loc });
            }
            if (query.action === "set-inactive") {
                const loc = await physicalLocationService.setActivePhysicalLocation(Number(query.id), clientCode, false);
                return res.json({ success: true, data: loc });
            }
            const loc = await physicalLocationService.updatePhysicalLocation(body, clientCode);
            return res.json({ success: true, data: loc });
        }

        if (method === "DELETE") {
            const loc = await physicalLocationService.deletePhysicalLocation(Number(query.id), clientCode);
            return res.json({ success: true, data: loc });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
