import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { KilometerPipe } from '@app/pipes/kilometer.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { StepNavigatorComponent } from './step-navigator/step-navigator.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GameDialogComponent } from './game-dialog/game-dialog.component';



@NgModule({
  declarations: [
    MapComponent,
    MarkerPopupComponent,
    StepNavigatorComponent,
    GameDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    LeafletModule,
    PipesModule
  ],
  providers: [
    DecimalPipe,
    KilometerPipe
  ],
  exports: [
    MapComponent,
    StepNavigatorComponent
  ]
})
export class GameComponentsModule { }
