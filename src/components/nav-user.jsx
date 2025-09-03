import {
	IconCreditCard,
	IconDotsVertical,
	IconLogout,
} from "@tabler/icons-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
export function NavUser({ user }) {
	const { data: session, status } = useSession();
	const { isMobile } = useSidebar();

	const imageUrl = session?.user?.image || user?.image; // fallback

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar>
								<Image
									src={
										session?.user?.image || "/fallback.png"
									}
									alt={session?.user?.name || "User"}
									width={32}
									height={32}
									className="rounded-lg"
								/>
								<AvatarFallback className="rounded-lg">
									CN
								</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{session?.user?.name || user?.name}
								</span>
								<span className="text-muted-foreground truncate text-xs">
									{session?.user?.email || user?.email}
								</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<Button
							className="w-full bg-sidebar-accent"
							onClick={() => signOut()}
						>
							<IconLogout />
							Log out
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
