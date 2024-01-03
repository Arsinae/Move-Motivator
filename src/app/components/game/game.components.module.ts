import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { KilometerPipe } from '@app/pipes/kilometer.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';



@NgModule({
  declarations: [
    MapComponent,
    MarkerPopupComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
    PipesModule
  ],
  providers: [
    DecimalPipe,
    KilometerPipe
  ],
  exports: [
    MapComponent,
  ]
})
export class GameComponentsModule { }
