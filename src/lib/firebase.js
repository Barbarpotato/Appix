import admin from "firebase-admin";

let app;

if (!admin.apps.length) {
	const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

	app = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		storageBucket:
			serviceAccount.storageBucket ||
			`${serviceAccount.project_id}.appspot.com`,
	});
} else {
	app = admin.app();
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
