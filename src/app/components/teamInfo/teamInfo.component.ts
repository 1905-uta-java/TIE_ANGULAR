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
import { GlobalTeam } from 'src/app/components/global/globalTeam';
import { PokesObj } from '../pokesObj';
import { ThrowStmt, NullTemplateVisitor } from '@angular/compiler';
import { ServerTrainer } from 'src/app/service/serverTrainer';
import { GetUserPokesService } from 'src/app/service/get-user-pokes.service';
import { UserInfo } from 'src/app/models/UserInfo';
import { GlobalPokes } from '../global/globalPokes';
import { Team } from 'src/app/models/Team';
import { GlobalUser } from '../global/globalUser';


@Component({
  selector: 'app-teamInfo',
  templateUrl: './teamInfo.component.html',
  styleUrls: ['./teamInfo.component.css']
})
export class TeamInfoComponent implements OnInit {
  modalRef : BsModalRef;
  teamName:string = "Team Name and stuff";
  emptyArrUSObj: Array<UserPokes> = [];
  selTeammate: TeammateInfo = {id:null, username:null, email:null, pokes:[], level: null, team_id:null, is_lead:null, userPokeArr: []};
  move:Move = {move:{name:""}};
  
  userInfo:UserInfo = {id: null, login: null, is_lead:null, created:null, email:null};
  userPoke:UserPokes = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  //userPokeArr:UserPokes[] = [];
  
  pokeInfoArr:PokeInfo[] = [];
  pokeTeammateArr:PokeInfo[] = [];


  userInfoPokeArr:PokeInfo[] = [];
  userInfoPoke:UserPokes = {id:null, name:null, sprite:null, dateAdded:null, type:null, custName:null, moveArr:null};
  currentUser: TeammateInfo = {id:null, username:null, email:null, pokes:null, level: null, team_id:null, is_lead:null, userPokeArr: null};
  
  selPoke:Pokes = {sprite: {back_default: "",
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
                          id:0};


  teammatesArr: TeammateInfo[] = [];

  
  pokes: Pokes;
  pokeArr:Pokes[] = [];
  pokeTempArr:PokeInfo[] = [];
  pokeInfo:PokeInfo;//  = { id:null, created:null, pkmn_id:null, move_one:null, move_two:null,  move_three:null,move_four:null,nickname:null};


  spriteURL:string = "";
  lvl:string = "";
  pokeAge:string = "";
  id:string = "";
  moves:string = "";
  types:string = "";
  dateAdded:Date = null;
  counter: number = 0;
  newCounter: number = 0;
  custName: string;
  
  tradePokeArr:Pokes[] = [{sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
                          {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
                          {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
                          {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
                          {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
                          {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0}]; // = new Array<Pokes>(6);
  
  serverTrainer:ServerTrainer;
  userPokeArr:UserPokes[] = [];
  team:Team = {id:null, created:null, teamName:null, team_mates:null};
  userId:number;
  

  constructor(private pokeService: AjaxCallService, private modalService: BsModalService, private globalUser:GlobalUser, 
              private globalTeam: GlobalTeam, private pokeObj: PokesObj, private getUserPokesServer: GetUserPokesService, 
              private globalPokes: GlobalPokes) { }

  ngOnInit() {
    // server call here, that does things
    if(this.globalTeam.getTeammateLength() !== 0){
      //console.log("Drawing team components. Length is: " + this.globalTeam.getTeammateLength());
      this.teammatesArr = this.globalTeam.getAllTeammates();
    } else {
      this.getPokes();
    }
  }


  getPokes(){
    let token = sessionStorage.getItem('token');
    this.userId = parseInt(token.substring(1, token.length).split(":")[0]);
    this.getUserPokesServer.getUserPokes(this.userId).subscribe((ret)=>{
      this.serverTrainer = ret;
      // console.log(this.serverTrainer);

      //get trainer from server. Set pokemans for him and teammates. 
      this.globalUser.dateCreated = this.serverTrainer.created;
      this.globalUser.email = this.serverTrainer.email;
      this.globalUser.id = this.serverTrainer.id;
      this.globalUser.is_lead = this.serverTrainer.is_lead;
      this.globalUser.username = this.serverTrainer.login;
      
      
      // console.log(this.globalUser);

      //poke info from server
      console.log(this.serverTrainer.pokemon);
      this.pokeInfoArr = this.serverTrainer.pokemon;
    
      console.log(this.pokeInfoArr);

      
      console.log("LENGTH of pokeInfoArr: " + this.pokeInfoArr.length);
      for(let i = 0; i < this.pokeInfoArr.length; i++){
        //console.log("Getting API info for Poke with id: " + this.pokeInfoArr[i].id + " and it's got a length of: " + this.pokeInfoArr.length);
        if(this.pokeInfoArr[i].pkmn_id){
          this.pokeService.getPoke(this.pokeInfoArr[i].pkmn_id).subscribe((pokes)=>{
          // this.pokeService.getPoke(this.pokeInfoArr[i].pkmn_id).then((pokes)=>{
            this.pokes = pokes;
            console.log(this.pokes);
            if(this.pokeArr.includes(this.pokes) === false)
              this.pokeArr.push(this.pokes); // add to a global array 
            // console.log(this.pokeArr);
            this.pokeData(this.pokes, i);
          });/*.catch(function(error){
            console.log(error.error);
          })*/

        }
      }
      
      console.log(this.serverTrainer);
      // this.team = this.serverTrainer.team_id;
      //this.selTeammate.pokes = Array<PokeInfo>();
      let pokeInfoArrAgain: PokeInfo[] = [];
      for(let i = 0; i< this.serverTrainer.team_id.team_mates.length; i++){
        if( typeof this.serverTrainer.team_id.team_mates[i] === 'object'){
          for(let j = 0; j < this.serverTrainer.team_id.team_mates[i].pokemon.length; j++){
            this.pokeInfo = {
              id: this.serverTrainer.team_id.team_mates[i].pokemon[j].id,
              created:this.serverTrainer.team_id.team_mates[i].pokemon[j].created,
              pkmn_id: this.serverTrainer.team_id.team_mates[i].pokemon[j].pkmn_id,
              move_one: this.serverTrainer.team_id.team_mates[i].pokemon[j].move_one,
              move_two: this.serverTrainer.team_id.team_mates[i].pokemon[j].move_two,
              move_three: this.serverTrainer.team_id.team_mates[i].pokemon[j].move_three,
              move_four: this.serverTrainer.team_id.team_mates[i].pokemon[j].move_four,
              nickname: this.serverTrainer.team_id.team_mates[i].pokemon[j].nickname
            };
            pokeInfoArrAgain.push(this.pokeInfo);
          }
          console.log(pokeInfoArrAgain);
          
          this.selTeammate.email=  this.serverTrainer.team_id.team_mates[i].email;
          this.selTeammate.id= this.serverTrainer.team_id.team_mates[i].id;
          this.selTeammate.username= this.serverTrainer.team_id.team_mates[i].login;
          this.selTeammate.is_lead= this.serverTrainer.team_id.team_mates[i].is_lead;
          
        }
        
        
        
        if(this.selTeammate.id || this.selTeammate.id === 0){
            console.log("adding pokemon with ID: " + this.pokeInfo.id)
            this.selTeammate.pokes = pokeInfoArrAgain;
            pokeInfoArrAgain = [];
            // this.selTeammate.pokes.push(this.pokeInfo);
            console.log(this.selTeammate);
            this.teammatesArr.push(this.selTeammate);
          }
      
        this.selTeammate = {id:null, username:null, email:null, pokes:[], level: null, team_id:null, is_lead:null, userPokeArr: []};
        this.pokeInfo = { id:null, created:null, pkmn_id:null, move_one:null, move_two:null,  move_three:null,move_four:null,nickname:null};
        //this.teammatesArr.push(this.serverTrainer);
      }
      //this.currentUser.

      //console.log(this.selTeammate);
      // this.teammatesArr = this.serverTrainer.team_id.team_mates;
      
      //remove the user from the array so we don't mess things up
      for(let i = 0; i < this.teammatesArr.length; i++){
        if(typeof this.teammatesArr[i] === 'number'){
          this.teammatesArr.splice(i, 1);
        }
      }

      console.log(this.teammatesArr);
      let tempArr:any;
      //this.pokeInfoArr = [];
      for(let i = 0; i < this.teammatesArr.length; i++){ //gets teammate
        // this.pokeTeammateArr = this.teammatesArr[i].pokemon;
        //console.log(this.pokeTeammateArr);
        console.log(this.teammatesArr[i].pokes.length + " " + this.teammatesArr[i].username);
        for(let j = 0; j < this.teammatesArr[i].pokes.length; j++){ //gets 1 poke of current teammate
          //console.log(this.teammatesArr[i].pokes[j]);
          if(this.teammatesArr[i].pokes[j].id){
            console.log("HERE WE AAAARE!");
            
            this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).subscribe((pokes)=>{
              this.pokeTempArr.push(this.teammatesArr[i].pokes[j]);
            
              // this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).then((pokes)=>{
              this.pokes = pokes;
            
              //if(this.pokeTempArr.includes(this.pokes) === false)
                //this.pokeTempArr.push(this.pokes); // add to a global array 
              // console.log("pushing poke: " + this.pokes.name + " with index: " + i);  
              
              //tempArr = this.pokeTeammateData(this.pokes, i, j);
              this.pokeTeammateData(this.pokes, i, j);
              console.log(tempArr);
              
              //this.teammatesArr[i].userPokeArr.push(tempArr);
              
              console.log(this.teammatesArr[i].userPokeArr);
            });
          }
        }
      }
      console.log(this.teammatesArr);
      this.currentUser.email = this.globalUser.email;
      this.currentUser.id = this.globalUser.id;
      this.currentUser.is_lead = this.globalUser.is_lead;
      this.currentUser.username = this.globalUser.username;
      this.currentUser.userPokeArr = this.userPokeArr;
      console.log(this.currentUser);

      /*
    //get pokes from current user too
      for(let j = 0; j < this.currentUser.pokes.length; j++){
        this.pokeService.getPoke(this.currentUser.pokes[j].id).then((pokes)=>{
          this.pokes = pokes;
          this.userPoke.name = this.pokes.name;
          this.userPoke.id = this.pokes.id;
          this.userPoke.sprite = this.pokes["sprites"].front_default;
          this.userPoke.dateAdded = this.dateAdded;
          this.userPoke.custName = this.custName;
          
          if(this.currentUser.pokes[j]){
            for(let k = 0; k < this.currentUser.pokes[j].moveArr.length; k++){
              let indx = this.currentUser.pokes[j].moveArr[k];
              this.userPoke.moveArr.push(pokes.moves[indx].move.name);
            }
          }

          if(this.currentUser.userPokeArr.includes(this.userPoke) === false )
            this.currentUser.userPokeArr.push(this.userPoke); 
          
          
          this.userPoke = {id:null, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
          
          
          //this.data(this.pokes);
        });
        console.log(this.currentUser);
      }*/

      //now we get team data
    });
    //console.log(this.team);
    //console.log(this.teammatesArr);
  }
  
  pokeTeammateData(pokes:Pokes, ti:number, pi:number){
    console.log(pokes);
    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = null;
    this.userPoke.custName = this.custName;
    console.log(pi);
    // console.log(this.pokeInfoArr);
    console.log(this.pokeTempArr);
    if(this.pokeTempArr[pi].move_one === "" || this.pokeTempArr[pi].move_one === null){
      this.userPoke.moveArr[0] = '';
    } else {
      this.userPoke.moveArr[0]=pokes.moves[this.pokeTempArr[pi].move_one].move.name;
    }

    if(this.pokeTempArr[pi].move_two === "" || this.pokeTempArr[pi].move_two === null){
      this.userPoke.moveArr[1]= '';
    } else {
      this.userPoke.moveArr[1]=pokes.moves[this.pokeTempArr[pi].move_two].move.name;
    }

    if(this.pokeTempArr[pi].move_three === "" || this.pokeTempArr[pi].move_three === null){
      this.userPoke.moveArr[2]= '';
    } else {
      this.userPoke.moveArr[2]=pokes.moves[this.pokeTempArr[pi].move_three].move.name;
    }

    if(this.pokeTempArr[pi].move_four === "" || this.pokeTempArr[pi].move_four === null){
      this.userPoke.moveArr[3]= '';
    } else {
      this.userPoke.moveArr[3]=pokes.moves[this.pokeTempArr[pi].move_four].move.name;
    }
    
    // console.log(this.userPoke.moveArr);

    //++this.counter;

    for(let k = 0; k < pokes["types"].length; k++)
      this.userPoke.type.push(pokes["types"][k].type.name);      
    
      console.log(this.teammatesArr[ti]);
      console.log("ready to push this poke to " + this.teammatesArr[ti].username + "'s array");
      console.log(this.userPoke);

      // this.teammatesArr[teammateIndex].userPokeArr.push(this.userPoke); 

      this.teammatesArr[ti].userPokeArr.push(this.userPoke); 
      //this.teammatesArr[ti].userPokeArr.push(this.userPoke);
      console.log(this.teammatesArr);

      //return this.userPoke;
      // this.userPokeArr.push(this.userPoke);
    
    // console.log(this.userPokeArr);
    // this.globalPokes.setAllPokes(this.userPokeArr);
    // console.log(this.globalPokes.getAllPokes());
    // console.log("With length: " + this.globalPokes.getPokesLength());
    // console.log(this.userPokeArr);

    // empty userPoke
    this.userPoke = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  }
  
  pokeData(pokes:Pokes, i:number){
    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = null;
    this.userPoke.custName = this.custName;

    if(this.pokeInfoArr[i].move_one === "" || this.pokeInfoArr[i].move_one === null){
      this.userPoke.moveArr[0] = '';
    } else {
      this.userPoke.moveArr[0]=pokes.moves[this.pokeInfoArr[i].move_one].move.name;
    }

    if(this.pokeInfoArr[i].move_two === "" || this.pokeInfoArr[i].move_two === null){
      this.userPoke.moveArr[1]= '';
    } else {
      this.userPoke.moveArr[1]=pokes.moves[this.pokeInfoArr[i].move_two].move.name;
    }

    if(this.pokeInfoArr[i].move_three === "" || this.pokeInfoArr[i].move_three === null){
      this.userPoke.moveArr[2]= '';
    } else {
      this.userPoke.moveArr[2]=pokes.moves[this.pokeInfoArr[i].move_three].move.name;
    }

    if(this.pokeInfoArr[i].move_four === "" || this.pokeInfoArr[i].move_four === null){
      this.userPoke.moveArr[3]= '';
    } else {
      this.userPoke.moveArr[3]=pokes.moves[this.pokeInfoArr[i].move_four].move.name;
    }

    // console.log(this.userPoke.moveArr);

    //++this.counter;

    for(let k = 0; k < pokes["types"].length; k++)
      this.userPoke.type.push(pokes["types"][k].type.name);      
    
    // console.log(this.userPoke.type);

    this.userPokeArr.push(this.userPoke); 
    // console.log(this.userPokeArr);
    this.globalPokes.setAllPokes(this.userPokeArr);
    // console.log(this.globalPokes.getAllPokes());
    // console.log("With length: " + this.globalPokes.getPokesLength());
    // console.log(this.userPokeArr);

    // empty userPoke
    this.userPoke = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  }



      // for(let i = 0; i < this.teammatesArr.length; i++){ //gets teammate
      //   for(let j = 0; j < this.teammatesArr[i].pokes.length; j++){ //gets 1 poke of current teammate
      //     this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).then((pokes)=>{
      //       this.pokes = pokes;
      //       console.log("Check this out. We're getting this pokemon from " + this.teammatesArr[i].username + " pokemon ID: " + this.teammatesArr[i].pokes[j].id);
      //       console.log("pushing poke: " + this.pokes.name + " with index: " + i);
      //       console.log("CALLING DATA!!!");
  
      //       this.data(this.pokes, i);
      //     });
      //   }
      //   if(this.pokeArr.includes(this.pokes) === false)
      //     this.pokeArr.push(this.pokes); // add to a global array 
      //   this.counter = 0;
      //   console.log("COUNTER RESET");
      // }
      // console.log(this.teammatesArr);

//get pokes from current user too
  // for(let j = 0; j < this.currentUser.pokes.length; j++){
  //   this.pokeService.getPoke(this.currentUser.pokes[j].id).then((pokes)=>{
  //     this.pokes = pokes;
  //     this.userPoke.name = this.pokes.name;
  //     this.userPoke.id = this.pokes.id;
  //     this.userPoke.sprite = this.pokes["sprites"].front_default;
  //     this.userPoke.dateAdded = this.dateAdded;
  //     this.userPoke.custName = this.custName;
      
  //     if(this.currentUser.pokes[j]){
  //       for(let k = 0; k < this.currentUser.pokes[j].moveArr.length; k++){
  //         let indx = this.currentUser.pokes[j].moveArr[k];
  //         this.userPoke.moveArr.push(pokes.moves[indx].move.name);
  //       }
  //     }

  //     if(this.currentUser.userPokeArr.includes(this.userPoke) === false )
  //       this.currentUser.userPokeArr.push(this.userPoke); 
      
      
  //     this.userPoke = {id:null, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
       
       
  //     //this.data(this.pokes);
  //   });
  //   console.log(this.currentUser);
  // }

  // }




  
  data(pokes: Pokes, teammateIndex:number){
    let indx;

    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = this.dateAdded;
    this.userPoke.custName = this.custName;

    console.log("Counter is at: " + this.counter);

    if(this.teammatesArr[teammateIndex].pokes[this.counter]){
      if(this.pokes.name === "ditto"){
        this.userPoke.moveArr.push(pokes.moves[0].move.name);
      // } else {
      //   for(let k = 0; k < this.teammatesArr[teammateIndex].pokes[this.counter].moveArr.length; k++){
      //     let indx = this.teammatesArr[teammateIndex].pokes[this.counter].moveArr[k];
      //     this.userPoke.moveArr.push(pokes.moves[indx].move.name);
      //   }
      // }
    }
    }

    ++this.counter;
    //console.log(this.counter);

    if(this.teammatesArr[teammateIndex].userPokeArr.includes(this.userPoke) === false )
      this.teammatesArr[teammateIndex].userPokeArr.push(this.userPoke); 
    
    this.globalTeam.setAllTeammates(this.teammatesArr);
    //console.log(this.teammatesArr[teammateIndex].userPokeArr);

    this.userPoke = {id:null, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  }

  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

  closeModal(template:TemplateRef<any>){
    this.modalService.hide(1);
    this.modalService._hideModal(1);
    this.emptyTradeArr();
  }

  emptyTradeArr(){
    this.tradePokeArr = [
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0},
      {sprite: {back_default:null,back_female:null, back_shiny:null, back_shiny_female:null, front_default:null, front_female:null, front_shiny:null, front_shiny_female:null},name:null,moves:[],type: [],id: 0}]; // = new Array<Pokes>(6);
  }
  showInfo(teammate: TeammateInfo){
    this.selTeammate = teammate;
    console.log(this.selTeammate);
  }

  showPokeInfo(id:number, index:number){
    console.log(id);
    let moveArrHeres:Move[] = [];
    let typeArr:string[] = [];
    let newPoke = new PokesObj().poke = {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null};
    console.log(newPoke);

    if(id !== 0){
      for(let i = 0; i < this.currentUser.userPokeArr.length; i++){
        if(this.currentUser.userPokeArr[i].id == id){
          newPoke.id = this.currentUser.userPokeArr[i].id;
          
          //ohhhh this is so bad, i'm ashamed of this
          for (let k = 0; k < this.currentUser.userPokeArr[i].moveArr.length; k++){
            moveArrHeres.push({move:{name: this.currentUser.userPokeArr[i].moveArr[k]}});
          }
          newPoke.moves = moveArrHeres;
          newPoke.sprite.front_default = this.currentUser.userPokeArr[i].sprite;
          newPoke.name = this.currentUser.userPokeArr[i].name;
          
          for(let k = 0; k < this.currentUser.userPokeArr[i].type.length; k++){
            typeArr.push(this.currentUser.userPokeArr[i].type[k]);
          }
          //console.log(typeArr);
          newPoke.type = typeArr;
          
          //empty things
          typeArr = [];
          moveArrHeres = [];
        }
      }
      console.log(this.selPoke);
      this.tradePokeArr[index] = {id: newPoke.id,
                                moves: newPoke.moves,
                                name: newPoke.name,
                                sprite: newPoke.sprite,
                                type: newPoke.type};
      console.log("chosen poke with name " + this.selPoke.name + " is now at in array at index " + index + ". Here's the entire array: ");
      console.log(this.tradePokeArr);

    } else {
      console.log('yeeeee nothin');
      this.selPoke = {sprite: {back_default: "",
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
                          id:null};

    }
  }

  clearPokeInfo(){
    // do things
  }

}
