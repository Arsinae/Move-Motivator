export enum ActivityType {
  WALK = 1,
  RUN,
  BIKE
}

export interface Activity {
  distance: number;
  type: ActivityType;
  id?: string;
  creationDate?: Date;
}