import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, FirestoreDataConverter, CollectionReference, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Activity } from '@app/models/activity';
import { GameUserPoint, GameUserState } from '@app/models/game/game-user-state';
import { doc, getDoc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
  }

  getUserGameState(): Promise<GameUserState> {
    const docRef = doc(this.firestore, `game-state/${this.authService.getCurrentUser()?.uuid}`);
    return getDoc(docRef).then(res => {
      return <GameUserState>res?.data();
    });
  }

  getAvailablePoints(): Observable<GameUserPoint[]> {
    const pointsCollectionRef = collection(this.firestore, 'game-state', this.authService.getCurrentUser().uuid, 'points');
    const unlockedPlacesQuery = query(pointsCollectionRef, where('state', '==', true));
    return collectionData(unlockedPlacesQuery, { idField: 'id' }) as Observable<GameUserPoint[]>;
  }
}
