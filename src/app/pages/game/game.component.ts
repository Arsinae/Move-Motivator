import { Component, OnInit } from '@angular/core';
import { Place } from '@app/models/game/places';
import { PlacesService } from '@app/services/server-data/places/places.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public points: Place[] = [];

  constructor(
    private placeService: PlacesService
  ) { }

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(res => {
      this.points = res;
    })
  }

}
