import "@/styles/globals.css";
import AuthGuard from "@/components/app/auth-guard";
import ClientVerificationDialog from "@/components/app/client-verification-dialog";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
	const [dialogOpen, setDialogOpen] = useState(true);

	return (
		<SessionProvider session={pageProps.session}>
			<AuthGuard>
				<ClientVerificationDialog
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
				/>
				<Component {...pageProps} />
			</AuthGuard>
		</SessionProvider>
	);
}

export default MyApp;