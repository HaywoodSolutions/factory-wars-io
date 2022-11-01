import * as admin from "firebase-admin";

admin.initializeApp();

export default admin;
export const db = admin.firestore();