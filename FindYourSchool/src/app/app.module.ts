import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RicercaScuolaComponent } from './ricerca-scuola/ricerca-scuola.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { MarkerSService } from './marker-s.service';

@NgModule({
  declarations: [
    AppComponent,
    RicercaScuolaComponent,
    HomeComponent,
    MapComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersService,MarkerSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
