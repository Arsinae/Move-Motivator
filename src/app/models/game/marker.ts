import { icon } from "leaflet";

export const MarkerIcon = {
  icon: icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "assets/img/marker/marker-icon.png",
    shadowUrl: "assets/img/marker/marker-shadow.png"
  })
};

export const CurrentMarkerIcon = {
  icon: icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "assets/img/marker/current-marker-icon.png",
    shadowUrl: "assets/img/marker/marker-shadow.png"
  })
};