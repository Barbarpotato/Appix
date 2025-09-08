"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // render nothing on server

	return (
		<div
			className="flex h-screen w-full items-center justify-center"
			aria-label="Loading"
		>
			<Loader2 className="h-10 w-10 animate-spin" />
		</div>
	);
}
