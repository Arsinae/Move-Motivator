import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameComponentsModule } from '@app/components/game/game.components.module';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    GameComponentsModule
  ]
})
export class GameModule { }
