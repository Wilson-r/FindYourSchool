import { AppComponent } from './app.component';
import { NgModule, OnInit }             from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RicercaScuolaComponent } from './ricerca-scuola/ricerca-scuola.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ricerca', component: RicercaScuolaComponent },
  { path: 'mappa', component: MapComponent }
  


];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule implements OnInit{


    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


 

}
