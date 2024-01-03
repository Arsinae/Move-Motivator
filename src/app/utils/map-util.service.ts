import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { MarkerPopupComponent } from '@app/components/game/marker-popup/marker-popup.component';
import { CurrentMarkerIcon, MarkerIcon } from '@app/models/game/marker';
import { Place } from '@app/models/game/places';
import { latLng, LatLng, marker, tileLayer } from 'leaflet';

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
  
  public prepareMarker(point: Place, isCurrent: boolean) {
    const newMarker = marker(latLng(point.pos.latitude, point.pos.longitude), isCurrent ? CurrentMarkerIcon : MarkerIcon);
    newMarker.bindPopup(this.createTooltip(point), {closeButton: false, className: 'place-popup'});
    return newMarker;
  }

  public createTooltip(point: Place) {
    const componentRef = this.viewRef.createComponent(MarkerPopupComponent, {injector: this.injector});
    componentRef.instance.title = point.name;
    componentRef.instance.imgSrc = point.imgSrc;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }
}
