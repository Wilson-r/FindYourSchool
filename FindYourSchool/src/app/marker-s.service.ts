import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'rxjs';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class MarkerSService {

  constructor(private http: HttpClient) { 
    
  }


  makeCapitalMarkers(Mymap: L.Map): void {
    this.http.get(AppSettings._API +"scuola").subscribe((res: any) => {
      for (const c of res) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        marker.addTo(Mymap);
      }
    })
   }
   getPosition(): Promise<any>{
    return new Promise((resolve, reject)=> {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng : resp.coords.longitude, lat : resp.coords.latitude})
      })
    })
  }
  makeCapitalMarkers1(Mymap: L.Map,lat : any, lon: any): void {
    this.http.post<any>(AppSettings._API +"scuola", { longitude2: lat, latitude2 : lon}).subscribe((res: any) => {
      for (const c of res) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        marker.addTo(Mymap).bindPopup('Questa è la scuola <br> piu vicina a te, indipendentemente dal tipo <br> di scuola da noi consigliato.');
      

      }
    })
   }
}