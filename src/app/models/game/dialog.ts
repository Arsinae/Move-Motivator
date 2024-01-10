import { Place } from "./places";

export interface IGameDialog {
  type: 'dialog';
  index: number;
  dialog: string;
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