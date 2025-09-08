import { signIn, useSession } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Login() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") return <Loader />;

	if (session) {
		// redirect to login
		if (typeof window !== "undefined") {
			router.replace("/");
		}
		return null; // prevent flashing
	}

	return (
		<div
			className={`${geistSans.className} ${geistMono.className} font-sans w-full h-screen gap-16 p-5 sm:p-20`}
		>
			<main className="flex h-full items-center justify-center">
				<div>
					<h1 className="text-3xl lg:text-5xl">Welcome Back to</h1>
					<h1 className="text-3xl lg:text-5xl">Appix</h1>
					<Separator className="my-8 !h-3 rounded bg-zinc-800" />

					<h1 className="text-xl lg:text-2xl">
						Sign in to Google to continue to your acccount.
					</h1>

					<Button
						onClick={() => signIn("google")}
						className="cursor-pointer hover:bg-gray-800 w-50 mt-5 flex items-center justify-center gap-2"
					>
						<svg
							className="h-5 w-5"
							viewBox="0 0 533.5 544.3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M533.5 278.4c0-17.9-1.6-35.1-4.6-51.9H272v98.2h146.9c-6.4 34.6-25.4 63.9-54.4 83.5v69.1h87.9c51.6-47.5 81.1-117.9 81.1-198.9z"
								fill="#4285f4"
							/>
							<path
								d="M272 544.3c73.4 0 135-24.4 180-66.3l-87.9-69.1c-24.4 16.3-55.8 25.9-92.1 25.9-70.9 0-131-47.8-152.5-112.2H29.6v70.4c44.8 88.9 137.5 151.3 242.4 151.3z"
								fill="#34a853"
							/>
							<path
								d="M119.5 321c-5.1-15.3-8-31.6-8-48.3s2.9-33 8-48.3V154h-89.9C13.5 201.8 0 238.1 0 272s13.5 70.2 29.6 118h89.9v-69z"
								fill="#fbbc04"
							/>
							<path
								d="M272 107.7c39.9 0 75.7 13.7 103.8 40.5l77.8-77.8C407 24.7 345.4 0 272 0 167 0 74.3 62.4 29.6 151.3l89.9 70.4c21.5-64.4 81.6-112 152.5-112z"
								fill="#ea4335"
							/>
						</svg>
						Sign in with Google
					</Button>
				</div>
			</main>
		</div>
	);
}
