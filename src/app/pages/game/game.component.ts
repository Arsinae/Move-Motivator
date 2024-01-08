import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameUserState } from '@app/models/game/game-user-state';
import { Place } from '@app/models/game/places';
import { AuthService } from '@app/services/auth/auth.service';
import { GameStateService } from '@app/services/server-data/game/game-state.service';
import { PlacesService } from '@app/services/server-data/places/places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  public gameState: GameUserState = null;
  public points: Place[] = [];

  private userSubscription: Subscription = null;
  private gameStateSubscription: Subscription = null;
  private pointsSubscription: Subscription = null;

  constructor(
    private authService: AuthService,
    private gameStateService: GameStateService,
    private placeService: PlacesService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.getCurrentUserObservable().subscribe(res => {
      this.gameStateSubscription = this.gameStateService.listenToUserGameState().subscribe(gameState => {
        this.gameState = gameState;
        this.getPoints();
      })
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
    if (this.pointsSubscription) {
      this.pointsSubscription.unsubscribe();
    }
  }

  public getPoints(): void {
    if (this.pointsSubscription) {
      this.pointsSubscription.unsubscribe();
    }
    this.pointsSubscription = this.gameStateService.getAvailablePoints().subscribe(availablePoints => {
      this.placeService.getPlaces(availablePoints.map(point => point.id)).subscribe(res => {
        this.points = res;
      });
    });
  }

}
