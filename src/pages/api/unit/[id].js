import { unitService } from "@/services/unit.service.js";

export default async function handler(req, res) {
    const { method, query, body } = req;
    const clientCode = query.clientCode;

    try {
        if (method === "GET") {
            const unit = await unitService.getUnit(Number(query.id), clientCode);
            return res.json({ success: true, data: unit });
        }

        if (method === "PUT") {
            const unit = await unitService.updateUnit(body, clientCode);
            return res.json({ success: true, data: unit });
        }

        if (method === "DELETE") {
            const unit = await unitService.deleteUnit(Number(query.id), clientCode);
            return res.json({ success: true, data: unit });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
