import { itemService } from "@/services/item.service";

export default async function handler(req, res) {
    const clientCode = req.headers["x-client-code"] || req.query.clientCode;

    try {
        switch (req.method) {
            case "GET": {
                const params = {
                    page: parseInt(req.query.page || "1"),
                    pageSize: parseInt(req.query.pageSize || "10"),
                    sortBy: req.query.sortBy || "name",
                    order: req.query.order || "asc",
                };
                const result = await itemService.listItems(params, clientCode);
                return res.status(200).json({ success: true, ...result });
            }

            case "POST": {
                const data = req.body;
                const newItem = await itemService.createItem(data, clientCode);
                return res.status(201).json({ success: true, data: newItem });
            }

            default:
                return res.status(405).json({ success: false, error: "Method Not Allowed" });
        }
    } catch (err) {
        console.error("API Error:", err);
        return res.status(400).json({ success: false, error: err.message });
    }
}
