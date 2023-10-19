import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore
  ) { }

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
    const docRef = doc(this.firestore, `user/${uuid}`);
    return getDoc(docRef).then(res => {
      if (res) {
        const user: User = User.formatUser(res.id, <User>res.data());
        return user;
      } else {
        return null;
      }
    });
  }
}