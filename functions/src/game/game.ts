import { Firestore, FieldValue } from 'firebase-admin/firestore';
import * as logger from "firebase-functions/logger";
import { CallableRequest } from 'firebase-functions/v2/https';

export function movePlayer(request: CallableRequest, firestore: Firestore) {
  const { distance, place } = request.data;
  logger.info(`Move Place = User ${request.auth?.uid}, Place: ${place}, Distance: ${distance}`);
  firestore.collection('game-state').doc(`${request.auth?.uid}`).update({distance: FieldValue.increment(distance), currentPlace: place});
  return request.auth?.uid;
}

export async function getPlaceDialog(request: CallableRequest, firestore: Firestore) {
  const { place } = request.data;
  logger.info(`Get Dialog = User ${request.auth?.uid}, Place: ${place}, `);
  // const userGameState = await firestore.collection('game-state').doc(request.auth?.uid).get();
  const placeDialogs = (await firestore.collection(`places/${place}/dialog`).get()).docs;
  logger.info(`Result Dialog List: ${placeDialogs?.length} entry; ${JSON.stringify(placeDialogs.map(dialog => dialog.data()))}`);
  return placeDialogs.map(dialog => dialog.data());
}