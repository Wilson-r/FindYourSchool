import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Users} from './users.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl : string = "https://5000-wilsonr-findyourschool-r4391zl5nj1.ws-eu44.gitpod.io/"

  constructor(private http :HttpClient) { }

  getData(){
    let url = "https://5000-wilsonr-findyourschool-r4391zl5nj1.ws-eu44.gitpod.io/";
    return this.http.get(url +"users");
  }

  public addUser(user: any,informatica: any,matematica: any,arte: any,longitude: any,latitude: any){
    return this.http.post<any>(this.baseUrl +"usersRec",{user,informatica,matematica,arte,latitude,longitude}).pipe(map((Users: any) => {return Users}))
  }

  getPosition(): Promise<any>{
    return new Promise((resolve, reject)=> {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng : resp.coords.longitude, lat : resp.coords.latitude})
      })
    })
  }
}