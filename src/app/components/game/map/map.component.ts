import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MapUtilService } from '@app/utils/map-util.service';
import { latLng, MapOptions, Layer, Map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public isLoaded: boolean = false;

  public map: Map;
  public options: MapOptions;
  public layers: Layer[] = [];

  constructor(
    private viewContainer: ViewContainerRef,
    private mapUtil: MapUtilService
  ) {
    this.mapUtil.viewRef = this.viewContainer;
  }

  ngOnInit(): void {
    this.setMapOption();
  }

  public setMapOption(): void {
    this.options = this.mapUtil.setMapOption(latLng(48.58499691577, 7.735219997578202))
  }

  public onMapReady(map: Map) {
    this.map = map;
    this.addMarker();
  }

  public addMarker() {
    const newMarker = this.mapUtil.prepareMarker(latLng(48.58499691577, 7.735219997578202))
    this.layers.push(newMarker);
    newMarker.addTo(this.map);
  }
}
