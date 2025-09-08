import { itemService } from "@/services/item.service";

export default async function handler(req, res) {
    const { id } = req.query;
    const clientCode = req.headers["x-client-code"] || req.query.clientCode;

    try {
        switch (req.method) {
            case "GET": {
                const item = await itemService.getItem(Number(id), clientCode);
                if (!item) return res.status(404).json({ success: false, error: "Item not found" });
                return res.status(200).json({ success: true, data: item });
            }

            case "PUT": {
                const updated = await itemService.updateItem({ ...req.body, id: Number(id) }, clientCode);
                return res.status(200).json({ success: true, data: updated });
            }

            case "DELETE": {
                // Optional: you can implement delete in service
                return res.status(405).json({ success: false, error: "Delete not implemented" });
            }

            default:
                return res.status(405).json({ success: false, error: "Method Not Allowed" });
        }
    } catch (err) {
        console.error("API Error:", err);
        return res.status(400).json({ success: false, error: err.message });
    }
}
