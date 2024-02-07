import { GeoPoint } from "@angular/fire/firestore";

export class Place {
  id?: string;
  index: number;
  name: string;
  pos: GeoPoint;
  imgSrc: string;
  dungeons?: Array<string>;

  constructor(index: number = 1) {
    this.index = index;
    this.name = '';
    this.pos = new GeoPoint(0, 0);
    this.imgSrc = null;
    this.dungeons = [];
  }
}

export interface IMove {
  distance: number;
  place: string;
}