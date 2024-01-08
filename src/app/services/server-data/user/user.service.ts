import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private converter: FirestoreDataConverter<User>;

  constructor(
    private firestore: Firestore
  ) {
    this.converter = {
      toFirestore: (data) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => {
        const data = snap.data();
        return {...data, uuid: snap.id, lastLogin: (<any>data).lastLogin.toDate(), createdAt: (<any>data).createdAt.toDate()} as User;
      }
    };
  }

  createUser(uuid: string, user: User) {
    const docRef = doc(this.firestore, `user/${uuid}`);
    return setDoc(docRef, {email: user.email, username: user.username, createdAt: new Date(), lastLogin: new Date()});
  }

  async setUserBaseData(uuid: string) {
    await setDoc(doc(this.firestore, `user/${uuid}/infos/distance`), {totalDistance: 0, maxDistance: 0, dailyAverage: 0});
    await setDoc(doc(this.firestore, `game-state/${uuid}`), {distance: 0, currentPlace: 'MMJAwlhvdijDq3sRj9Vw'});
    await setDoc(doc(this.firestore, `game-state/${uuid}/points/MMJAwlhvdijDq3sRj9Vw`), {state: true});
    await setDoc(doc(this.firestore, `game-state/${uuid}/points/ZuCQKVbUordD2mNK1zL6`), {state: true});
  }

  setLastLogin(uuid: string) {
    const docRef = doc(this.firestore, `user/${uuid}`);
    return updateDoc(docRef, {lastLogin: new Date()});
  }

  getUserData(uuid: string) {
    const docRef = doc(this.firestore, `user/${uuid}`).withConverter(this.converter);
    return getDoc(docRef).then(res => {
      return res ? res.data() : null;
    });
  }
}