import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { MarkerPopupComponent } from '@app/components/game/marker-popup/marker-popup.component';
import { CurrentMarkerIcon, MarkerIcon } from '@app/models/game/marker';
import { Place } from '@app/models/game/places';
import { GeoPoint } from 'firebase/firestore';
import { latLng, LatLng, marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapUtilService {

  public viewRef: ViewContainerRef;

  public EARTH_RADIUS: number = 6371;
  public DISTANCE_CORRECTION: number = 1.15; // Factor to approximatively change straight distance to real

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
  
  public prepareMarker(point: Place, currentPlace: Place) {
    const newMarker = marker(latLng(point.pos.latitude, point.pos.longitude), point.id === currentPlace.id ? CurrentMarkerIcon : MarkerIcon);
    newMarker.bindPopup(this.createTooltip(point, currentPlace), {closeButton: false, className: 'place-popup'});
    return newMarker;
  }

  public createTooltip(point: Place, currentPlace: Place) {
    const componentRef = this.viewRef.createComponent(MarkerPopupComponent, {injector: this.injector});
    componentRef.instance.point = point;
    componentRef.instance.currentPlace = currentPlace;
    componentRef.instance.computeData();
    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location.nativeElement;
  }

  public calculatePointDistance(pointA: GeoPoint, pointB: GeoPoint) {
    const latA = this.getRadians(pointA.latitude), latB = this.getRadians(pointB.latitude);
    const lonA = this.getRadians(pointA.longitude), lonB = this.getRadians(pointB.longitude);
    const sinValue = Math.sin(latA) * Math.sin(latB);
    const latitudeCos = Math.cos(latA) * Math.cos(latB);
    const longitudeCos = Math.cos(lonB - lonA);
    return Math.acos(sinValue + latitudeCos * longitudeCos) * this.EARTH_RADIUS * this.DISTANCE_CORRECTION * 1000;
  }

  private getRadians(point: number) {
    return point * Math.PI / 180;
  }
}
