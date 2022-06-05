import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users.model';
import { UsersService } from '../users.service';
import { first } from 'rxjs/operators';
import { Recommendation } from '../recommendation.model';
import { Observable } from 'rxjs';
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

  obsRec: Observable<Recommendation[]> = undefined!
  dati: Recommendation[] = undefined!
  
  constructor(
    private router: Router,
    private fb : FormBuilder,
    private route: Router,
    private usersService: UsersService
  ) { 
    this.angForm = this.fb.group({
      user : ["", Validators.required],
      informatica: ["", Validators.required],
      matematica: ["", Validators.required],
      arte: ["", Validators.required],
      scienze : ["", Validators.required],
      storia : ["", Validators.required],
      tecnologia : ["", Validators.required],
      musica : ["", Validators.required],
      geografia : ["", Validators.required],
      pri_inglese : ["", Validators.required],
      sec_leng : ["", Validators.required]

    })
  }

  ngOnInit(): void {
    
  }


  postdata(forms : any){
    this.usersService.addUser(
      this.angForm.value.user,
      this.angForm.value.informatica,
      this.angForm.value.matematica,
      this.angForm.value.arte,
      this.angForm.value.scienze,
      this.angForm.value.storia,
      this.angForm.value.tecnologia,
      this.angForm.value.musica,
      this.angForm.value.geografia,
      this.angForm.value.pri_inglese,
      this.angForm.value.sec_leng,).pipe(first()).subscribe((data: any) => {
        this.newData = data;
        console.warn(data)
      });

  }
  
}
