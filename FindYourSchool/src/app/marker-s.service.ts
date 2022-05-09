import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerSService {
  baseUrl : string = "https://5000-wilsonr-findyourschool-pz06k3ptawn.ws-eu44.gitpod.io/scuole"


  constructor(private http: HttpClient) { 
    
  }


  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.baseUrl).subscribe((res: any) => {
      for (const c of res) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        
        marker.addTo(map);
      }
    });
   }
}
