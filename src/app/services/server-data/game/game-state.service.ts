import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, limit, documentId } from '@angular/fire/firestore';
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

  listenToUserGameState(): Observable<GameUserState> {
    const gameStateCollection = collection(this.firestore, 'game-state');
    const currentUserGameStateQuery = query(gameStateCollection, where(documentId(), '==', this.authService.getCurrentUser().uuid), limit(1));
    return collectionData(currentUserGameStateQuery, { idField: 'id' }).pipe(map(data => data[0])) as Observable<GameUserState>;
  }

  getAvailablePoints(): Observable<GameUserPoint[]> {
    const pointsCollectionRef = collection(this.firestore, 'game-state', this.authService.getCurrentUser().uuid, 'points');
    const unlockedPlacesQuery = query(pointsCollectionRef, where('state', '==', true));
    return collectionData(unlockedPlacesQuery, { idField: 'id' }) as Observable<GameUserPoint[]>;
  }
}
