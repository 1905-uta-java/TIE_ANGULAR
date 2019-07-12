import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BackpackComponent } from './components/backpack/backpack.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeamInfoComponent } from './components/teamInfo/teamInfo.component';
import { EditPokeModalComponent } from './components/edit-poke-modal/edit-poke-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TradeModalComponent } from './components/trade-modal/trade-modal.component';
import { PokebackpackComponent } from './components/pokebackpack/pokebackpack.component';
import { TeamexplorerComponent } from './components/teamexplorer/teamexplorer.component';
import { RequestsComponent } from './components/requests/requests.component';
import { GlobalPokes } from './components/global/globalPokes';
import { GlobalTeam } from './components/global/globalTeam';
import { GlobalAllTeams } from './components/global/globalAllTeams';
import { GlobalTrades } from './components/global/globalTrades';
import { PokesObj } from './components/pokesObj';
import { FormsModule } from '@angular/forms';
import { GlobalUser } from './components/global/globalUser';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackpackComponent,
    NavbarComponent,
    TeamInfoComponent,
    EditPokeModalComponent,
    TradeModalComponent,
    PokebackpackComponent,
    TeamexplorerComponent,
    RequestsComponent  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    StorageServiceModule
  ],
  providers: [ GlobalPokes,
               GlobalTeam ,
               GlobalUser ,
               GlobalAllTeams,
               GlobalTrades,
               PokesObj ],
  bootstrap: [AppComponent]
})
export class AppModule { }
