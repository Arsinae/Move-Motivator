import { Place } from "./places";

export interface IOnCompleteDialog {
  type: 'nextIndex' | 'endDialog';
  value: string | number;
}

export class IGameDialog {
  type: 'classic';
  index: number;
  dialog: string;
  actionText: string;
  onComplete: IOnCompleteDialog[];

  constructor(index: number) {
    this.type = 'classic';
    this.index = index;
    this.dialog = '';
    this.actionText = 'Valider'
    this.onComplete = [];
  }
}

export interface IDisplayGameDialog {
  dialogs: IGameDialog[];
  place: Place;
}

export interface IGameDialogRequest {
  place: string;
}

export interface IGameDialogResponse {
  data: IGameDialog[];
}