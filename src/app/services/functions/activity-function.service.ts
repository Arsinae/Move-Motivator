import { inject, Injectable } from '@angular/core';
import { connectFunctionsEmulator, Functions, HttpsCallable, httpsCallable } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityFunctionService {

  private functions: Functions;

  public addDistance: HttpsCallable<any, any>;

  constructor() {
    this.functions = inject(Functions);
    if (environment.production === false) {
      connectFunctionsEmulator(this.functions, "127.0.0.1", 5001);
    }
    this.addDistance = httpsCallable(this.functions, 'addDistance');
  }
}
