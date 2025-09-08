import { stockCardService } from "@/services/stockCard.service";

export default async function handler(req, res) {
    const clientCode = req.query.clientCode;

    try {
        switch (req.method) {
            case "GET": {
                const { page, pageSize, sortBy, order } = req.query;
                const result = await stockCardService.listStockCards(
                    {
                        page: Number(page) || 1,
                        pageSize: Number(pageSize) || 10,
                        sortBy,
                        order,
                    },
                    clientCode
                );
                return res.status(200).json({ success: true, ...result });
            }

            case "POST": {
                const stockCard = await stockCardService.createStockCard(
                    req.body,
                    clientCode
                );
                return res.status(201).json({ success: true, data: stockCard });
            }

            default:
                return res.status(405).json({ success: false, error: "Method not allowed" });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
