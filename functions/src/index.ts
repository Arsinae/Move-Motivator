import {onCall} from "firebase-functions/v2/https";
import {onDocumentCreated} from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { aggregateDistanceInfos, storeDistance } from "./distance/distance";

admin.initializeApp();

exports.addDistance = onCall((request) => {
  storeDistance(request, admin.firestore())
});

exports.distanceAggregator = onDocumentCreated(`user/{userUid}/distances/{distanceId}`, async (event) => {
  const data = event.data?.data();
  const userUid = event.params.userUid;
  aggregateDistanceInfos(userUid, data, admin.firestore());
});