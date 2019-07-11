import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { GlobalLogout } from '../global/globalLogout';
import { GlobalPokes } from '../global/globalPokes';
import { GlobalTrades } from '../global/globalTrades';
import { GlobalUser } from '../global/globalUser';
import { GlobalTeam } from '../global/globalTeam';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  globalLogout:GlobalLogout = new GlobalLogout();
  constructor(private route: Router, @Inject(SESSION_STORAGE) private session: WebStorageService,
              private globalPokes: GlobalPokes, private globalTeam: GlobalTeam, 
              private globalTrades: GlobalTrades, private globalUser: GlobalUser) { }
  username:string;
  ngOnInit() {
    this.username = this.globalUser.username;
  }

  logout(){
    //this.globalLogout.logout();
    console.log("Hope you didn't need anything else, it's gone now");
    this.globalPokes.empty();
    console.log(this.globalPokes);
    this.globalTeam.empty();
    console.log(this.globalTeam);
    this.globalTrades.empty();
    console.log(this.globalTrades);
    this.globalUser.empty();
    console.log(this.globalUser);

    

    this.session.remove("token") 
    console.log("Nonexisting sessiontoken: " + this.session.get("token"))
  }

}
