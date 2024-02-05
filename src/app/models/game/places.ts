import { GeoPoint } from "@angular/fire/firestore";

export interface Place {
  id?: string;
  index: number;
  name: string;
  pos: GeoPoint;
  imgSrc: string;
  dungeons?: Array<string>;
}

export interface IMove {
  distance: number;
  place: string;
}