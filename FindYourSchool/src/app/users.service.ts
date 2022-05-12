import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Users} from './users.model';
import { map } from 'rxjs/operators';
import { AppSettings } from './appSettings';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http :HttpClient) { }

  getData(){
    return this.http.get(AppSettings._API +"users");
  }

  public addUser(user: any,informatica: any,matematica: any,arte: any,longitude: any,latitude: any){
    return this.http.post<any>(AppSettings._API +"usersRec",{user,informatica,matematica,arte,latitude,longitude}).pipe(map((Users: any) => {return Users}))
  }

  
}