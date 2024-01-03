import { GeoPoint } from "@angular/fire/firestore";

export interface Place {
  id?: string;
  name: string;
  pos: GeoPoint;
  imgSrc: string;
}