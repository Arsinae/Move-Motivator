import { createComponent, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { MarkerPopupComponent } from '@app/components/game/marker-popup/marker-popup.component';
import { GoalBarComponent } from '@app/components/goals/goal-bar/goal-bar.component';
import { MarkerIcon } from '@app/models/game/marker';
import { LatLng, marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapUtilService {

  public viewRef: ViewContainerRef;

  constructor(
    private injector: Injector
  ) { }
  
  public setMapOption(pos: LatLng) {
    return {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 14,
      center: pos
    };
  }
  
  public prepareMarker(pos: LatLng) {
    const newMarker = marker(pos, MarkerIcon);
    newMarker.bindPopup(this.createTooltip(), {closeButton: false, className: 'place-popup'});
    return newMarker;
  }

  public createTooltip() {
    const componentRef = this.viewRef.createComponent(MarkerPopupComponent, {injector: this.injector});
    componentRef.instance.title = 'Gare de Strasbourg';
    componentRef.instance.imgSrc = 'https://lh3.googleusercontent.com/places/ANXAkqHZQC0cVog9-SQ2oQbZ1CAvQS6nhpgpyopl2v5VHYn_UhRYSkdxRGpCUQEfnDrAFl2XYeLJXfgSQFnJ2cwZ4LJAOZyK4b-moQ=s1600-w408';
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }
}
