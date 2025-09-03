import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token) {
	try {
		const url =
			"https://oauth2.googleapis.com/token?" +
			new URLSearchParams({
				client_id: process.env.AUTH_GOOGLE_ID,
				client_secret: process.env.AUTH_GOOGLE_SECRET,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, { method: "POST" });
		const refreshedTokens = await response.json();

		if (!response.ok) throw refreshedTokens;

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // fall back
		};
	} catch (error) {
		return { ...token, error: "RefreshAccessTokenError" };
	}
}

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				url: "https://accounts.google.com/o/oauth2/v2/auth",
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token ?? token.refreshToken,
					user,
				};
			}

			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
