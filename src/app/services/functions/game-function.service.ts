import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallable, HttpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { IGameDialog, IGameDialogRequest, IGameDialogResponse } from '@app/models/game/dialog';
import { IMove } from '@app/models/game/places';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameFunctionService {

  private functions: Functions;

  private _movePlayer: HttpsCallable<any, any>;
  private _getDialogs: HttpsCallable<any, any>;

  constructor() {
    this.functions = inject(Functions);
    if (environment.production === false) {
      // connectFunctionsEmulator(this.functions, "127.0.0.1", 5001);
    }
    this._movePlayer = httpsCallable(this.functions, 'movePlayer');
    this._getDialogs = httpsCallable(this.functions, 'getDialogs');
  }

  callMovePlayer(data: IMove) {
    return this._movePlayer(data);
  }

  callGetDialogs(data: IGameDialogRequest): Promise<IGameDialogResponse> {
    return this._getDialogs(data);
  }
}
