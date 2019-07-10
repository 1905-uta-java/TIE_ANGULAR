import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, @Inject(SESSION_STORAGE) private session: WebStorageService) { }

  ngOnInit() {
  }

  logout(){
    this.session.remove("token") 
    console.log("Nonexisting sessiontoken: " + this.session.get("token"))
  }

}
