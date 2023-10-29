import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserDistanceStats } from '@app/models/stats';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserDistanceStat(): Promise<UserDistanceStats | undefined> {
    const docRef = doc(this.firestore, `user/${this.authService.getCurrentUser()?.uuid}/infos/distance`);
    return getDoc(docRef).then(res => {
      return <UserDistanceStats>res?.data();
    });
  }
}
