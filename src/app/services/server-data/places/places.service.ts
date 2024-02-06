import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, CollectionReference, DocumentData, getDoc, doc, documentId, limit, orderBy, startAfter } from '@angular/fire/firestore';
import { Place } from '@app/models/game/places';
import { addDoc } from 'firebase/firestore';
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

  getUnlockedPlaces(pointsId: string[]): Observable<Place[]> {
    const unlockedPlacesQuery = query(this.collectionRef, where(documentId(), 'in', pointsId));
    return collectionData(unlockedPlacesQuery, { idField: 'id' }) as Observable<Place[]>;
  }

  getPlaceById(placeId: string): Promise<Place> {
    const docRef = doc(this.firestore, `places/${placeId}`);
    return getDoc(docRef).then(res => {
      return <Place>res?.data();
    });
  }

  getPlacesList(lastIndex: number, pageSize: number): Observable<Place[]> {
    const placesQuery = query(this.collectionRef, orderBy('index'), limit(pageSize), startAfter(lastIndex ? lastIndex : 0));
    return  collectionData(placesQuery, {idField: 'id'}) as Observable<Place[]>;
  }

  uploadPlace(place: Place) {
    return addDoc(this.collectionRef, Object.assign({}, place));
  }
}
