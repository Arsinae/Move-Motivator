import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Place } from '@app/models/game/places';
import { MapUtilService } from '@app/utils/map-util.service';
import { latLng, MapOptions, Layer, Map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() public points: Place[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['points'] !== undefined && this.map !== undefined) {
        this.setPlaceMarkers();
      }
  }

  public setMapOption(): void {
    this.options = this.mapUtil.setMapOption(latLng(48.58499691577, 7.735219997578202))
  }

  public onMapReady(map: Map) {
    this.map = map;
    this.setPlaceMarkers();
  }

  public setPlaceMarkers() {
    this.layers.forEach(layer => {
      layer.remove();
      this.layers.slice(0, 1);
    });
    this.points.forEach(point => {
      const newMarker = this.mapUtil.prepareMarker(point);
      this.layers.push(newMarker);
      newMarker.addTo(this.map);
    });
  }
}
