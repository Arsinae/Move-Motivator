import { Firestore, FieldValue } from 'firebase-admin/firestore';
import * as logger from "firebase-functions/logger";
import { CallableRequest } from 'firebase-functions/v2/https';

export function movePlayer(request: CallableRequest, firestore: Firestore) {
  const { distance, place } = request.data;
  logger.info(`Move Place = User ${request.auth?.uid}, Place: ${place}, Distance: ${distance}`);
  firestore.collection('game-state').doc(`${request.auth?.uid}`).update({distance: FieldValue.increment(distance), currentPlace: place});
  return request.auth?.uid;
}