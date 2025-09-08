import { unitService } from "@/services/unit.service.js";

export default async function handler(req, res) {
    const { method, query, body } = req;
    const clientCode = query.clientCode;

    try {
        if (method === "GET") {
            const units = await unitService.listUnits(query, clientCode);
            return res.json({ success: true, ...units });
        }

        if (method === "POST") {
            const unit = await unitService.createUnit(body, clientCode);
            return res.status(201).json({ success: true, data: unit });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
