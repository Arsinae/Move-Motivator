import { Component, OnInit } from '@angular/core';
import { GameUserState } from '@app/models/game/game-user-state';
import { Place } from '@app/models/game/places';
import { AuthService } from '@app/services/auth/auth.service';
import { GameStateService } from '@app/services/server-data/game/game-state.service';
import { PlacesService } from '@app/services/server-data/places/places.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameState: GameUserState = null;
  public points: Place[] = [];

  constructor(
    private authService: AuthService,
    private gameStateService: GameStateService,
    private placeService: PlacesService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUserObservable().subscribe(async res => {
      this.gameState = (await this.gameStateService.getUserGameState());
      this.placeService.getPlaces().subscribe(res => {
        this.points = res;
      });
    });
  }

}
