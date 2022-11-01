import * as functions from "firebase-functions";
import admin, { db } from "./admin";

export const createUser = functions.auth.user().onCreate((user) => {
  db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    nation: null,
    registeredOn: admin.firestore.FieldValue.serverTimestamp()
  })
});