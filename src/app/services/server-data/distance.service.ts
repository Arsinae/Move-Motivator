import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, orderBy } from '@angular/fire/firestore';
import { Activity } from '@app/models/activity';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getTodayDistances(): Observable<Activity[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const distanceCollection = collection(this.firestore, 'user', this.authService.getCurrentUser().uuid, 'distances');
    const distanceQuery = query(distanceCollection, where('creationDate', '>=', today));
    return collectionData(distanceQuery, { idField: 'id' }) as Observable<Activity[]>;
  }
}
