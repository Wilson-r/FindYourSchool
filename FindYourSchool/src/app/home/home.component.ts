import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'FindYourSchool';

  constructor(private router: Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  functionOnWhichRedirectShouldHappen(){
    this.router.navigate(['/ricerca']);
}

}