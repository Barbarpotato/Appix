import DashboardLayout from "@/components/layouts/dashbord";
import { SectionCards } from "@/components/ui/section-cards";


export default function DashboardPage() {
	return (
		<DashboardLayout>
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<SectionCards />
			</div>
		</DashboardLayout>
	);
}
