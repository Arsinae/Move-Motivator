import { Place } from "./places";

export interface IOnCompleteDialog {
  type: 'nextIndex' | 'endDialog';
  value: string | number;
}

export interface IGameDialog {
  type: 'classic';
  index: number;
  dialog: string;
  actionText: string;
  onComplete: IOnCompleteDialog[];
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