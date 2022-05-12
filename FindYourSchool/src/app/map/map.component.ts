import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { MarkerSService } from '../marker-s.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {
  private Mymap : any;
  longitude: any;
  latitude: any;

  private initMap(): void {
    this.Mymap = L.map('map', {
      center: [ 45.4773, 9.1815 ],
      zoom: 7.3
    });
  
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.Mymap);

  L.marker([45.5373529,9.2657862]).addTo(this.Mymap)
}

  constructor(private markerService: MarkerSService) { }


  ngAfterViewInit(): void {
    this.getLocation();
    this.initMap();
    this.markerService.makeCapitalMarkers(this.Mymap,this.longitude,this.latitude);
  }
  getLocation(){
    this.markerService.getPosition().then(resp => {
      this.longitude = resp.lng;
      this.latitude  = resp.lat;
      console.log(resp.lng);
      console.log(resp.lat);
    })
  }
}
