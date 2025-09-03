"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FullPageLoader from "@/components/private/loader";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../app/dashboard/data.json";

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") return <FullPageLoader />;

	if (!session) {
		// redirect to login
		if (typeof window !== "undefined") {
			router.push("/login");
		}
		return null; // prevent flashing
	}

	return (
		// <div>
		// 	<p>Welcome, {session.user.name}</p>
		// 	<button onClick={() => signOut()}>Logout</button>
		// </div>
		<SidebarProvider
			style={{
				"--sidebar-width": "calc(var(--spacing) * 72)",
				"--header-height": "calc(var(--spacing) * 12)",
			}}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
