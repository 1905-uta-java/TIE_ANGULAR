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

  constructor(private pokeService: AjaxCallService , private globalAllTeams:GlobalAllTeams) {  }

  ngOnInit() {

    this.teamName = "Team Name and stuff";
    this.userPoke = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
 

  this.teammatesArr = [];

 
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
                   id:0
                 };
  this.pokeArr = [];

  this.allTeams = [];

                 
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
