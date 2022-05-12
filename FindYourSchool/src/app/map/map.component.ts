import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { MarkerSService } from '../marker-s.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {
  private map : any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.4773, 9.1815 ],
      zoom: 7.3
    });
  
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);

  L.marker([45.5373529,9.2657862]).addTo(this.map)
}

  constructor(private markerService: MarkerSService) { }


  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }

}
