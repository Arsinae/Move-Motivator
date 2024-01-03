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