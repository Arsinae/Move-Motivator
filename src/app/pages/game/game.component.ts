import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '@app/components/game/game-dialog/game-dialog.component';
import { IDisplayGameDialog } from '@app/models/game/dialog';
import { GameUserState } from '@app/models/game/game-user-state';
import { Place } from '@app/models/game/places';
import { AuthService } from '@app/services/auth/auth.service';
import { GameDialogService } from '@app/services/game/game-dialog.service';
import { GameStateService } from '@app/services/server-data/game/game-state.service';
import { PlacesService } from '@app/services/server-data/places/places.service';
import { filter, Subscription } from 'rxjs';

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
  private gameDialogSubscription: Subscription = null;

  constructor(
    private dialogService: MatDialog,
    private authService: AuthService,
    private gameStateService: GameStateService,
    private placeService: PlacesService,
    private gameDialogService: GameDialogService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.getCurrentUserObservable().subscribe(res => {
      this.gameStateSubscription = this.gameStateService.listenToUserGameState().subscribe(gameState => {
        this.gameState = gameState;
        this.getPoints();
      })
    });
    this.gameDialogSubscription = this.gameDialogService.getDialogs().pipe(filter(res => res !== null)).subscribe(res => {
      this._showDialog(res);
    })
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
    if (this.gameDialogSubscription) {
      this.gameDialogSubscription.unsubscribe();
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

  private _showDialog(dialogInfo: IDisplayGameDialog) {
    this.dialogService.open(GameDialogComponent, {data: dialogInfo, width: '80%', panelClass: 'full-width-dialog'})
  }
}
