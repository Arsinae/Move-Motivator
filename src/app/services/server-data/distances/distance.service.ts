import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, FirestoreDataConverter, CollectionReference, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Activity } from '@app/models/activity';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  private collectionRef: CollectionReference<DocumentData>;
  public converter: FirestoreDataConverter<Activity>;

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.collectionRef = collection(this.firestore, 'user', this.authService.getCurrentUser().uuid, 'distances');
    this.converter = {
      toFirestore: (data) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => {
        const data = snap.data()
        return {...data, creationDate: (<any>data).creationDate.toDate()} as Activity;
      }
    };
  }

  getTodayDistances(): Observable<Activity[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const distanceQuery = query(this.collectionRef, where('creationDate', '>=', today));
    return collectionData(distanceQuery, { idField: 'id' }) as Observable<Activity[]>;
  }

  getDistancesBetweenDates(startDate: Date, endDate: Date): Observable<Activity[]> {
    const distanceQuery = query(this.collectionRef, where('creationDate', '>=', startDate), where('creationDate', '<=', endDate)).withConverter(this.converter);
    return collectionData(distanceQuery, { idField: 'id' }) as Observable<Activity[]>;
  }
}
