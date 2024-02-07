import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallable, HttpsCallable } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFunctionService {

  private functions: Functions;

  private _unlockPlaceForAllUsers: HttpsCallable<any, any>;

  constructor() {
    this.functions = inject(Functions);
    if (environment.production === false) {
      // connectFunctionsEmulator(this.functions, "127.0.0.1", 5001);
    }
    this._unlockPlaceForAllUsers = httpsCallable(this.functions, 'unlockPlaceForAllUsers');
  }

  unlockPlaceForAllUsers(placeId: string) {
    return this._unlockPlaceForAllUsers({place: placeId});
  }

}
