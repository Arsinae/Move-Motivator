import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameComponentsModule } from '@app/components/game/game.components.module';
import { GameRoutingModule } from './game-routing.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    GameRoutingModule,
    GameComponentsModule
  ]
})
export class GameModule { }
