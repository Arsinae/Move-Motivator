import { Injectable } from '@angular/core';
import { IDisplayGameDialog, IGameDialog } from '@app/models/game/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDialogService {

  private _nextDialog: BehaviorSubject<IDisplayGameDialog> = new BehaviorSubject(null);

  constructor() { }

  public getDialogs(): Observable<IDisplayGameDialog> {
    return this._nextDialog.asObservable();
  }

  public setNextDialog(dialogs: IDisplayGameDialog): void {
    this._nextDialog.next(dialogs);
  }
}
