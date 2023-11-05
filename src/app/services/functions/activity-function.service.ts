import { inject, Injectable } from '@angular/core';
import { connectFunctionsEmulator, Functions, HttpsCallable, httpsCallable } from '@angular/fire/functions';
import { Activity } from '@app/models/activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityFunctionService {

  private functions: Functions;

  private _addDistance: HttpsCallable<any, any>;
  private _computeDailyAverage: HttpsCallable<any, any>;

  constructor() {
    this.functions = inject(Functions);
    if (environment.production === false) {
      // connectFunctionsEmulator(this.functions, "127.0.0.1", 5001);
    }
    this._addDistance = httpsCallable(this.functions, 'addDistance');
    this._computeDailyAverage = httpsCallable(this.functions, 'computeDailyAverage');
  }

  callAddDistance(activity: Activity) {
    return this._addDistance(activity);
  }

  callComputeDailyAverage() {
    if (environment.production === false) {
      this._computeDailyAverage();
    }
  }
}
