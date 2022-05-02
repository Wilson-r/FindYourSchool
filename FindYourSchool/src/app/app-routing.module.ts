import { AppComponent } from './app.component';
import { NgModule, OnInit }             from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RicercaScuolaComponent } from './ricerca-scuola/ricerca-scuola.component';

const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
  { path: 'ricerca', component: RicercaScuolaComponent },

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
