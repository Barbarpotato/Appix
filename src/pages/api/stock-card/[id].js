import { stockCardService } from "@/services/stockCard.service";

export default async function handler(req, res) {
    const { id } = req.query;
    const clientCode = req.query.clientCode;

    try {
        switch (req.method) {
            case "GET": {
                const stockCard = await stockCardService.getStockCard(Number(id), clientCode);
                if (!stockCard) {
                    return res.status(404).json({ success: false, error: "Stock card not found" });
                }
                return res.status(200).json({ success: true, data: stockCard });
            }

            case "PUT": {
                const updated = await stockCardService.updateStockCard(
                    { ...req.body, id: Number(id) },
                    clientCode
                );
                return res.status(200).json({ success: true, data: updated });
            }

            case "DELETE": {
                await stockCardService.deleteStockCard(Number(id), clientCode);
                return res.status(200).json({ success: true, message: "Stock card deleted" });
            }

            default:
                return res.status(405).json({ success: false, error: "Method not allowed" });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
