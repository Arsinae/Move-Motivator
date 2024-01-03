import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, FirestoreDataConverter, CollectionReference, DocumentData, QueryDocumentSnapshot, documentId } from '@angular/fire/firestore';
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

  getPlaces(): Observable<Place[]> {
    const unlockedPlacesQuery = query(this.collectionRef/*, where(documentId(), 'in', ['MMJAwlhvdijDq3sRj9Vw'])*/);
    return collectionData(unlockedPlacesQuery, { idField: 'id' }) as Observable<Place[]>;
  }

}
