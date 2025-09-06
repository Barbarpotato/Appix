"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FullPageLoader from "@/components/private/loader";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../app/dashboard/data.json";
import { useEffect, useState } from "react";

export default function Index() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [open, setOpen] = useState(true);
	const [canClose, setCanClose] = useState(true); // control when dialog can close

	// always call hooks at the top
	useEffect(() => {
		if (session) {
			// validate the user data if session is exist
			// fetch("/api/users?id=" + session.user.id, "GET").then((res) => {});
		}
	}, [session]);

	if (status === "loading") return <FullPageLoader />;

	if (!session) {
		if (typeof window !== "undefined") {
			router.push("/login");
		}
		return null;
	}

	return (
		<SidebarProvider
			style={{
				"--sidebar-width": "calc(var(--spacing) * 72)",
				"--header-height": "calc(var(--spacing) * 12)",
			}}
		>
			<Dialog
				open={open}
				onOpenChange={(nextOpen) => {
					// only allow closing if `canClose` is true
					if (nextOpen === false && !canClose) return;
					setOpen(nextOpen);
				}}
			>
				<DialogContent
					showCloseButton={false}
					className="sm:max-w-md"
					onInteractOutside={(e) => e.preventDefault()} // block outside click close
					onEscapeKeyDown={(e) => e.preventDefault()} // block ESC close
				>
					<DialogHeader>
						<DialogTitle>Complete action first</DialogTitle>
						<DialogDescription>
							You must press "Finish" before closing this dialog.
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-2">
						<Input id="task" placeholder="Type something..." />
					</div>

					<DialogFooter className="sm:justify-start">
						<Button
							type="button"
							onClick={() => {
								// unlock dialog close
								setCanClose(true);
								setOpen(false);
							}}
						>
							Finish
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

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
