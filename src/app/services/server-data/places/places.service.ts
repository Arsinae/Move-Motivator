import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, CollectionReference, DocumentData, getDoc, doc, documentId } from '@angular/fire/firestore';
import { Place } from '@app/models/game/places';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private collectionRef: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
  ) {
    this.collectionRef = collection(this.firestore, 'places');
  }

  getPlaces(pointsId: string[]): Observable<Place[]> {
    const unlockedPlacesQuery = query(this.collectionRef, where(documentId(), 'in', pointsId));
    return collectionData(unlockedPlacesQuery, { idField: 'id' }) as Observable<Place[]>;
  }

  getPlaceById(placeId: string): Promise<Place> {
    const docRef = doc(this.firestore, `places/${placeId}`);
    return getDoc(docRef).then(res => {
      return <Place>res?.data();
    });
  }

}
