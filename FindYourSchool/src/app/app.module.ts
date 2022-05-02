import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RicercaScuolaComponent } from './ricerca-scuola/ricerca-scuola.component';


@NgModule({
  declarations: [
    AppComponent,
    RicercaScuolaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
