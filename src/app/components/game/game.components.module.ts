import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { KilometerPipe } from '@app/pipes/kilometer.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
    PipesModule
  ],
  providers: [
    KilometerPipe
  ],
  exports: [
    MapComponent
  ]
})
export class GameComponentsModule { }
