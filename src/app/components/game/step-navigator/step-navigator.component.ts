import { Component, OnInit } from '@angular/core';
import { Place } from '@app/models/game/places';
import { GameStateService } from '@app/services/server-data/game/game-state.service';
import { PlacesService } from '@app/services/server-data/places/places.service';

@Component({
  selector: 'app-step-navigator',
  templateUrl: './step-navigator.component.html',
  styleUrls: ['./step-navigator.component.scss']
})
export class StepNavigatorComponent implements OnInit {

  public currentPlace: Place = null;

  constructor(
    private gameStateService: GameStateService,
    private placeService: PlacesService
  ) { }

  async ngOnInit(): Promise<void> {
    const gameState = await this.gameStateService.getUserGameState();
    const placeInfo = await this.placeService.getPlaceById(gameState.currentPlace);
    this.currentPlace = placeInfo ? placeInfo : null;
  }

  public get BackgroundImage(): string {
    return `url(${this.currentPlace.imgSrc})`
  }

}
