"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/ui/loader";

export default function AuthGuard({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return <FullPageLoader />;

    if (!session) {
        if (typeof window !== "undefined") {
            router.push("/login");
        }
        return null;
    }

    return children;
}
