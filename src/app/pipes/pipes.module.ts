import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { KilometerPipe } from './kilometer.pipe';



@NgModule({
  declarations: [
    KilometerPipe
  ],
  imports: [
    CommonModule,
    DecimalPipe
  ],
  exports: [
    KilometerPipe
  ]
})
export class PipesModule { }
