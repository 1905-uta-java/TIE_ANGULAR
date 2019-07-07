import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { Pokes } from '../../models/Pokes';
import { PokeInfo } from '../../models/PokeInfo';
import { UserPokes } from '../../models/UserPokes';
import { Move } from '../../models/Pokes';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { TeammateInfo } from 'src/app/models/TeammateInfo';

@Component({
  selector: 'app-teamInfo',
  templateUrl: './teamInfo.component.html',
  styleUrls: ['./teamInfo.component.css']
})
export class TeamInfoComponent implements OnInit {

  teamName:string = "Team Name and stuff";
  //need a teammateMember object
  //need a teammates array
  pokeInfoArr:PokeInfo[] = [
    {id: '25', moveArr:['1', '3', '9','17']},
    {id:'132', moveArr:['0']},
    {id: '39', moveArr:['3', '4', '10', '11']},
    {id: '45', moveArr:['3', '56', '10', '20']},
    {id: '56', moveArr:['6', '52', '19', '21']},
    {id: '82', moveArr:['1', '36', '15', '24']}
  ];

  teammates: TeammateInfo[] = [
    {username: "theDude01", pokes: this.pokeInfoArr, level:"24"},
    {username: "tankgirl", pokes: this.pokeInfoArr, level:"25"},
    {username: "leroyJenkins", pokes: this.pokeInfoArr, level:"14"},
    {username: "....yo idk", pokes: this.pokeInfoArr, level:"4"}
  ];


  spriteURL:string = "";
  lvl:string = "";
  pokeAge:string = "";
  id:string = "";
  moves:string = "";
  types:string = "";
  dateAdded:string = "";
  

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    // server call here, that does things
  }

}
