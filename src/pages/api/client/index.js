import { clientService } from "@/services/client.service.js";

export default async function handler(req, res) {
	try {
		if (req.method === "POST") {
			const client = await clientService.createClient(req.body);
			return res.status(201).json({ success: true, data: client });
		}

		if (req.method === "GET") {
			const clients = await clientService.listClients();
			return res.status(200).json({ success: true, data: clients });
		}

		return res.status(405).json({ success: false, error: "Method not allowed" });
	} catch (err) {
		return res.status(400).json({ success: false, error: err.message });
	}
}
