import * as firebase from "firebase";
import 'firebase/database';

import { FirebaseConfig } from "../Config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const upcomingMatchesFBRef = databaseRef.child("upcomingmatches");
export const matchPredictionsFBRef = databaseRef.child("matchPredictions");
export const matchPredictionResultsFBRef = databaseRef.child("matchPredictionResults");
export const matchResultsFBRef = databaseRef.child("matchResults");
