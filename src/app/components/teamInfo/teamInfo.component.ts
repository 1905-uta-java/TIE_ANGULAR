import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teamInfo',
  templateUrl: './teamInfo.component.html',
  styleUrls: ['./teamInfo.component.css']
})
export class TeamInfoComponent implements OnInit {

  curSpriteURL:string;
  curLvl:string;
  curPokeAge:string;
  curId:string;
  curMoves:[] = [];
  curType:[] = [];
  curDateAdded:string;
  pokeAge: string;
  constructor() { }

  ngOnInit() {
  }

}
