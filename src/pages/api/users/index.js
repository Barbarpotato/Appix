import { db } from "@/lib/firebase";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const snapshot = await db.collection("users-appix").get();
			const todos = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return res.status(200).json(todos);
		}

		if (req.method === "POST") {
			const docRef = await db.collection("users-appix").add(req.body);
			return res.status(200).json({ id: docRef.id, ...req.body });
		}

		// If method is not allowed
		return res.status(405).json({ error: "Method Not Allowed" });
	} catch (error) {
		console.error("API error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
