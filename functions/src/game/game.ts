import { Firestore, FieldValue, FieldPath } from 'firebase-admin/firestore';
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
  let dialogs = null;
  logger.info(`Get Dialog = User ${request.auth?.uid}, Place: ${place}`);
  const userGameState = (await firestore.collection('game-state').doc(request.auth?.uid).get()).data();
  const step = await firestore.collection('steps').where('place', '==', place).where(FieldPath.documentId(), 'in', userGameState.steps).get();
  if (!step.empty) {
    dialogs = (await firestore.collection(`steps/${step.docs[0].id}/dialog`).get()).docs;
  } else {
    dialogs = (await firestore.collection(`places/${place}/dialog`).get()).docs;
  }
  logger.info(`Result Dialog List: ${dialogs?.length} entry; ${JSON.stringify(dialogs.map(dialog => dialog.data()))}`);
  return dialogs.map(dialog => dialog.data());
}