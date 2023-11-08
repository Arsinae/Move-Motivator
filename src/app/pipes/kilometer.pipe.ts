import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilometer'
})
export class KilometerPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, ...args: unknown[]): unknown {
    return this.decimalPipe.transform(value / 1000, '1.0-2');
  }

}
