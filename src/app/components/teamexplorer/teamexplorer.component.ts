import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/Team';
import { Move, Pokes } from 'src/app/models/Pokes';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { UserPokes } from 'src/app/models/UserPokes';
import { PokeInfo } from 'src/app/models/PokeInfo';
import { TeammateInfo } from 'src/app/models/TeammateInfo';
import { GlobalAllTeams } from 'src/app/components/global/globalAllTeams';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { TeamService } from 'src/app/service/team.service';
import { ServerTeam } from 'src/app/service/serverTrainer';


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

  userId:number = 0;
  serverTeam:ServerTeam;

  constructor(private pokeService: AjaxCallService , 
              private globalAllTeams:GlobalAllTeams,
              private teamService: TeamService) {  }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    let token = sessionStorage.getItem('token');
    this.userId = parseInt(token.substring(1, token.length).split(":")[0]);
    console.log(this.userId);
    this.teamService.getAllTeams(this.userId).subscribe((ret)=>{
      this.serverTeam = ret;
      console.log(this.serverTeam);
    });  
  
}

  data(poke:Pokes){
    
    
  }

}
