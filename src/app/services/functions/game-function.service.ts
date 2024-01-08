import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallable, HttpsCallable } from '@angular/fire/functions';
import { IMove } from '@app/models/game/places';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameFunctionService {

  private functions: Functions;

  private _movePlayer: HttpsCallable<any, any>;

  constructor() {
    this.functions = inject(Functions);
    if (environment.production === false) {
      // connectFunctionsEmulator(this.functions, "127.0.0.1", 5001);
    }
    this._movePlayer = httpsCallable(this.functions, 'movePlayer');
  }

  callMovePlayer(data: IMove) {
    this._movePlayer(data);
  }
}
