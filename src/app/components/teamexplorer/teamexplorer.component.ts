import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/Team';
import { Move, Pokes } from 'src/app/models/Pokes';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { UserPokes } from 'src/app/models/UserPokes';
import { PokeInfo } from 'src/app/models/PokeInfo';
import { TeammateInfo } from 'src/app/models/TeammateInfo';
import { GlobalAllTeams } from 'src/app/components/global/globalAllTeams';
import { AjaxCallService } from 'src/app/service/ajax-call.service';


@Component({
  selector: 'app-teamexplorer',
  templateUrl: './teamexplorer.component.html',
  styleUrls: ['./teamexplorer.component.css']
})
export class TeamexplorerComponent implements OnInit {

  // team obj needs array of userObjs from before with team. Holds their pokes, and stuff
  /* team obj
      - team name
      - team lead username
      - users[]
  */


  
 modalRef: BsModalRef;
 teamName:string;
 userPoke:UserPokes;
 //userPokeArr:UserPokes[] = [];

 pokeInfoArr:PokeInfo[];
 pokeInfoArr2:PokeInfo[];
 pokeInfoArr3:PokeInfo[];
 teammatesArr: TeammateInfo[];
 
 move:Move = {move:{name:""}};
 pokes: Pokes;
 pokeArr:Pokes[];


  team: Team;
  allTeams: Team[];

  /*
 modalRef : BsModalRef;
 teamName:string = "Team Name and stuff";
 userPoke:UserPokes = {id:"0", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
 //userPokeArr:UserPokes[] = [];

 pokeInfoArr:PokeInfo[] = [
   {id: '25', moveArr:['1', '3', '9','17']},
   {id:'132', moveArr:['0']},
   {id: '39', moveArr:['3', '4', '10', '11']},
   {id: '45', moveArr:['3', '56', '10', '20']},
   {id: '56', moveArr:['6', '52', '19', '21']},
   {id: '82', moveArr:['1', '36', '15', '24']}
 ];
 pokeInfoArr2:PokeInfo[] = [
   {id: '5', moveArr:['1', '3', '9','17']},
   {id:'32', moveArr:['0']},
   {id: '9', moveArr:['3', '4', '10', '11']},
   {id: '4', moveArr:['3', '56', '10', '20']},
   {id: '6', moveArr:['6', '52', '19', '21']},
   {id: '2', moveArr:['1', '36', '15', '24']}
 ];
 pokeInfoArr3:PokeInfo[] = [
   {id: '51', moveArr:['1', '3', '9','17']},
   {id:'2', moveArr:['0']},
   {id: '19', moveArr:['3', '4', '10', '11']},
   {id: '47', moveArr:['3', '56', '10', '20']},
   {id: '60', moveArr:['6', '52', '19', '21']},
   {id: '22', moveArr:['1', '36', '15', '24']}
 ];

 teammatesArr: TeammateInfo[] = [
   {username: "theDude01", pokes: this.pokeInfoArr, level:"24", userPokeArr: [this.userPoke]},
   {username: "tankgirl", pokes: this.pokeInfoArr, level:"25",  userPokeArr: [this.userPoke]},
   {username: "leroyJenkins", pokes: this.pokeInfoArr2, level:"14",  userPokeArr: [this.userPoke]},
   {username: "....yo idk", pokes: this.pokeInfoArr3, level:"4",  userPokeArr: [this.userPoke]}
 ];

 
 move:Move = {move:{name:""}};
 pokes: Pokes = {sprite: {back_default: "",
                           back_female: "",
                           back_shiny: "",
                           back_shiny_female: "",
                           front_default: "",
                           front_female: "",
                           front_shiny: "",
                           front_shiny_female: ""},
                   name:"",
                   moves:[this.move],
                   type:[],
                   id:""
                 };
 pokeArr:Pokes[] = [];


  team: Team = {teamName: "TIE", teammates: this.teammatesArr};
*/

  constructor(private pokeService: AjaxCallService , private globalAllTeams:GlobalAllTeams) {  }

  ngOnInit() {

    this.teamName = "Team Name and stuff";
    this.userPoke = {id:"0", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
 //userPokeArr:UserPokes[] = [];

  this.pokeInfoArr= [
                      {id: '25', moveArr:['1', '3', '9','17']},
                      {id:'132', moveArr:['0']},
                      {id: '39', moveArr:['3', '4', '10', '11']},
                      {id: '45', moveArr:['3', '56', '10', '20']},
                      {id: '56', moveArr:['6', '52', '19', '21']},
                      {id: '82', moveArr:['1', '36', '15', '24']}
                    ];
  this.pokeInfoArr2= [
                    {id: '5', moveArr:['1', '3', '9','17']},
                    {id:'32', moveArr:['0']},
                    {id: '9', moveArr:['3', '4', '10', '11']},
                    {id: '4', moveArr:['3', '56', '10', '20']},
                    {id: '6', moveArr:['6', '52', '19', '21']},
                    {id: '2', moveArr:['1', '36', '15', '24']}
                  ];
  this.pokeInfoArr3 = [
          {id: '51', moveArr:['1', '3', '9','17']},
          {id:'2', moveArr:['0']},
          {id: '19', moveArr:['3', '4', '10', '11']},
          {id: '47', moveArr:['3', '56', '10', '20']},
          {id: '60', moveArr:['6', '52', '19', '21']},
          {id: '22', moveArr:['1', '36', '15', '24']}
        ];

  this.teammatesArr = [
      {username: "theDude01", pokes: this.pokeInfoArr, level:"24", userPokeArr: [this.userPoke]},
      {username: "tankgirl", pokes: this.pokeInfoArr, level:"25",  userPokeArr: [this.userPoke]},
      {username: "leroyJenkins", pokes: this.pokeInfoArr2, level:"14",  userPokeArr: [this.userPoke]},
      {username: "....yo idk", pokes: this.pokeInfoArr3, level:"4",  userPokeArr: [this.userPoke]}
    ];

 
 this.move = {move:{name:""}};
 this.pokes= {sprite: {back_default: "",
                           back_female: "",
                           back_shiny: "",
                           back_shiny_female: "",
                           front_default: "",
                           front_female: "",
                           front_shiny: "",
                           front_shiny_female: ""},
                   name:"",
                   moves:[this.move],
                   type:[],
                   id:""
                 };
  this.pokeArr = [];

  this.allTeams = [{teamName: "team_tie", teammates: this.teammatesArr}, 
                   {teamName: "this_other_team", teammates:this.teammatesArr}];

                 
  this.getAllTeams();

  }

  getAllTeams(){
    if(this.globalAllTeams.getAllTeamLength() !== 0){
      console.log('just do things');
      this.globalAllTeams.setAllTeams(this.allTeams);
    } else {
      for(let i = 0; i < this.teammatesArr.length; i++){ //gets teammate
        for(let j = 0; j < this.teammatesArr[i].pokes.length; j++){ //gets 1 poke of current teammate
          this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).then((pokes)=>{
            console.log("");
            this.pokes = pokes;
            this.data(this.pokes);
          });
        }
      }
    }
  }

  data(poke:Pokes){
    
    
  }

}
