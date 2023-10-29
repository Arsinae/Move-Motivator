import { Firestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import * as logger from "firebase-functions/logger";
import { CallableRequest } from 'firebase-functions/v2/https';
import { differenceInDays } from 'date-fns'

export function storeDistance(request: CallableRequest, firestore: Firestore) {
  const { distance, type } = request.data;
  logger.info(`New Distance = UID ${request.auth?.uid}, Distance: ${distance}, type: ${type}`);
  firestore.collection(`user/${request.auth?.uid}/distances`).add({distance: distance, type: type, creationDate: Timestamp.now()});
  return request.auth?.uid;
}

export async function aggregateDistanceInfos(userUid: string, data: any, firestore: Firestore) {
  logger.info(`Aggregate Distance: UID: ${userUid}, Data: ${JSON.stringify(data)}`);
  const doc = await firestore.doc(`user/${userUid}/infos/distance`).get();
  const userStatInfo = doc.data();
  const total = userStatInfo?.totalDistance + data?.distance;
  const userInfo = (await firestore.doc(`user/${userUid}`).get()).data();
  const dayTotal = Math.max(differenceInDays(new Date(), new Date(userInfo?.createdAt?._seconds * 1000)), 0) + 1;
  logger.info(`Total: ${total}, Days: ${dayTotal}`);
  doc.ref.update({totalDistance: FieldValue.increment(data?.distance), maxDistance: Math.max(userStatInfo?.maxDistance, data?.distance), dailyAverage: total/dayTotal});
}