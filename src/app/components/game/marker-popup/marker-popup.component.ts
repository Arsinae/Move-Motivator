import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from '@app/models/game/places';
import { KilometerPipe } from '@app/pipes/kilometer.pipe';
import { MapUtilService } from '@app/utils/map-util.service';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss']
})
export class MarkerPopupComponent implements OnInit {

  @Input() public point: Place = null;
  @Input() public currentPlace: Place = null;

  public isCurrentPlace: boolean = false;
  public distance: number = 0;

  constructor(
    private kilometerPipe: KilometerPipe,
    private mapUtilsService: MapUtilService
  ) { }

  ngOnInit(): void {
  }

  public computeData() {
    this.isCurrentPlace = this.point.id === this.currentPlace.id;
    this.distance = this.mapUtilsService.calculatePointDistance(this.currentPlace.pos, this.point.pos);
  }

  public get DistanceText(): string {
    return `Aller (${this.kilometerPipe.transform(this.distance)}km)`
  }
}
