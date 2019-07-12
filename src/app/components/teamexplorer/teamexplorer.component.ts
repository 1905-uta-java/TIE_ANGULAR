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
import { ServerTeam, ServerTrainer } from 'src/app/service/serverTrainer';
import { HttpClient, HttpHeaders } from '@angular/common/http';



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

  createBtnDis:boolean = false;
  createDesc:string = "Create";
  newTeamName:string = "";

  curTeam:Team = {created:null, id:null, teamName:null, team_mates:null};

  joinBtnDesc:string = "Join Team";


  team: Team;
  allTeams: Team[];

  userId:number = 0;
  serverTeam:ServerTeam;
  serverTrainer:ServerTrainer;

  constructor(private pokeService: AjaxCallService , 
              private globalAllTeams:GlobalAllTeams,
              private teamService: TeamService,
              private http: HttpClient) {  }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    let token = sessionStorage.getItem('token');
    this.userId = parseInt(token.substring(1, token.length).split(":")[0]);
    let username = token.split(":")[1];
    console.log(this.userId + " " + username);
    this.teamService.getAllTeams(this.userId).subscribe((ret)=>{
      this.serverTeam = ret;
      console.log(this.serverTeam);
      //this.serverTrainer.is_lead

      let token = sessionStorage.getItem('token');
      let headers = new HttpHeaders();
      token = token.substring(1,token.length-1);
      headers = headers.set('Authentication', token);
      this.http.post<ServerTrainer>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id', this.userId, {headers:headers}).subscribe((rets)=>{
          this.serverTrainer = rets;
          console.log(this.serverTrainer);
      });  
    });  
  
}

  // data(poke:Pokes){
  // }

  createTeam(event){
    let token = sessionStorage.getItem('token');
    this.userId = parseInt(token.substring(1, token.length).split(":")[0]);
    let url = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Teams/new";
    console.log(this.newTeamName);
    let response = ["0", this.newTeamName];
    let headers = new HttpHeaders();
    token = token.substring(1,token.length-1);
    
    console.log("creating team with name : " + this.newTeamName + " here's your token: " + token);

    this.createBtnDis = true;
    this.createDesc = "Creating...";
    headers = headers.set('Authentication', token);
    
    this.http.post<ServerTeam>(url, response, {headers: headers}).subscribe((ret) =>{
      console.log(ret);
      //this.serverTeam = ret;
      //update user to now be apart of new team
      //headers = headers.set('Authentication', sessionStorage.getItem('token'));
      this.http.post<ServerTrainer>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id', this.userId, {headers:headers}).subscribe((rets)=>{
        this.serverTrainer = rets;
        // console.log(rets);
        console.log(this.serverTrainer);
        this.serverTrainer.is_lead = 1;
        this.serverTrainer.team_id = ret;

        response = [this.serverTrainer.id.toString(), this.serverTrainer.login, null, this.serverTrainer.email, this.serverTrainer.team_id.id.toString(), this.serverTrainer.is_lead.toString()];
        //this.serverTrainer.team_id.team_mates = [this.serverTrainer.team_id.team_mates];
        // this.http.post<any>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id', this.userId, {headers:headers}).subscribe((rets2)=>{
        //     console.log(rets2);
        // });
        console.log(response);
        this.http.put<ServerTrainer>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/update', response, {headers: headers} ).subscribe((retse)=>{
           console.log(retse);
           this.refresh();
         });

      });
    });
    
  }
  
  joinTeam(team:Team){
    let url = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainer/update";
    let team_id = team.id;
    let user_id = this.userId;
    let headers = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    token = token.substring(1,token.length-1);
    headers = headers.set('Authentication', token);

    // do the thing that does the thing
    // console.log("Joining team " + team_id);
    console.log("User with id: " + this.userId + " is now joining team with id: " + team_id);
    console.log(team);

    let response = [user_id, null, null, null, team_id.toString(), 0];

    this.http.put<ServerTrainer>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/update', response, {headers: headers} ).subscribe((retse)=>{
      console.log(retse);
      this.refresh();
    });

  }

  showTeam(inTeam:Team){
    console.log(inTeam);
    this.curTeam = inTeam;
  }

  refresh(){
    console.log("Refreshing the page");
    this.serverTeam.created = null;
    this.serverTeam.id = null;
    this.serverTeam.team_mates = [];
    this.serverTeam.team_name = null;
    this.getTeams();
  }

}
