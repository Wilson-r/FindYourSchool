import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users.model';
import { UsersService } from '../users.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ricerca-scuola',
  templateUrl: './ricerca-scuola.component.html',
  styleUrls: ['./ricerca-scuola.component.css']
})
export class RicercaScuolaComponent implements OnInit {
  newData: Object | undefined;
  longitude : number | undefined;
  latitude  :number | undefined;

  angForm: FormGroup;
  constructor(
    private fb : FormBuilder,
    private route: Router,
    private usersService: UsersService
  ) { 
    this.angForm = this.fb.group({
      user : ["", Validators.required],
      informatica: ["", Validators.required],
      matematica: ["", Validators.required],
      arte: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.getLocation();
  }


  postdata(forms : any){
    this.usersService.addUser(
      this.angForm.value.user,
      this.angForm.value.informatica,
      this.angForm.value.matematica,
      this.angForm.value.arte,
      this.latitude ,
      this.longitude).pipe(first()).subscribe((data: any) => {
        this.newData = data;
        console.warn(data)
      });

  }

  getLocation(){
    this.usersService.getPosition().then(resp => {
      this.longitude = resp.lng;
      this.latitude  = resp.lat;
      console.log(resp.lng);
      console.log(resp.lat);
    })
  }
}
