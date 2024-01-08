import {onCall} from "firebase-functions/v2/https";
import {onDocumentCreated} from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { aggregateDistanceInfos, storeDistance, recalculateDailyAverage } from "./distance/distance";
import { movePlayer } from './game/game';

admin.initializeApp();

exports.addDistance = onCall((request) => {
  storeDistance(request, admin.firestore());
});

exports.distanceAggregator = onDocumentCreated(`user/{userUid}/distances/{distanceId}`, async (event) => {
  const data = event.data?.data();
  const userUid = event.params.userUid;
  aggregateDistanceInfos(userUid, data, admin.firestore());
});

exports.computeDailyAverage = onCall((request) => {
  recalculateDailyAverage(request.auth?.uid, admin.firestore());
})

exports.movePlayer = onCall((request) => {
  movePlayer(request, admin.firestore());
});