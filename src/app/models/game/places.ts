import { GeoPoint } from "@angular/fire/firestore";

export interface Place {
  id?: string;
  name: string;
  pos: GeoPoint;
  imgSrc: string;
}

export interface IMove {
  distance: number;
  place: string;
}