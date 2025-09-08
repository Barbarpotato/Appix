import DashboardLayout from "@/components/layouts/dashbord";
import data from "../data/dashboard/data.json";
import { DataTable } from "@/components/ui/data-table";

export default function StorixPage() {
    return (
        <DashboardLayout>
            <DataTable data={data} />
        </DashboardLayout>
    );
}
