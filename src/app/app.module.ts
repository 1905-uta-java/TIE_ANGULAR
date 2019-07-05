import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BackpackComponent } from './components/backpack/backpack.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeamInfoComponent } from './components/teamInfo/teamInfo.component';
import { EditPokeModalComponent } from './components/edit-poke-modal/edit-poke-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackpackComponent,
    NavbarComponent,
    TeamInfoComponent,
    EditPokeModalComponent  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
