import { clientService } from "@/services/client.service.js";

export default async function handler(req, res) {
    try {
        const { id } = req.query;

        if (req.method === "GET") {
            const client = await clientService.getClient(Number(id));
            return res.status(200).json({ success: true, data: client });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
