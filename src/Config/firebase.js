import * as firebase from "firebase";

import { FirebaseConfig } from "../Config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const upcomingMatchesRef = databaseRef.child("upcomingmatches");