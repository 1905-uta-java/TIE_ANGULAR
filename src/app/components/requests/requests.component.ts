import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  downHidden:boolean = false;
  upHidden:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  showDownArrow(){
    console.log("Showing down arrow");
    this.downHidden = false;
    this.upHidden = true;
  }
  
  showUpArrow(){
    console.log("Showing up arrow");
    this.downHidden = true;
    this.upHidden = false;
  }

}
