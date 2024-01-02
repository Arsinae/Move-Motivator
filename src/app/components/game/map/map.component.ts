import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, MapOptions } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(48.58499691577, 7.735219997578202)
  };

  constructor() { }

  ngOnInit(): void {
  }

}
