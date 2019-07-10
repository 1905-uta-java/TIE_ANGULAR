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


@Component({
  selector: 'app-teamInfo',
  templateUrl: './teamInfo.component.html',
  styleUrls: ['./teamInfo.component.css']
})
export class TeamInfoComponent implements OnInit {
  modalRef : BsModalRef;
  teamName:string = "Team Name and stuff";
  selTeammate: TeammateInfo;
  move:Move = {move:{name:""}};
  
  userInfo:UserInfo = {id: null, login: null, is_lead:null, created:null, email:null};
  userPoke:UserPokes = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  //userPokeArr:UserPokes[] = [];
  
  pokeInfoArr:PokeInfo[] = [];
  pokeTeammateArr:PokeInfo[] = [];


  userInfoPokeArr:PokeInfo[] = [];
  userInfoPoke:UserPokes = {id:null, name:null, sprite:null, dateAdded:null, type:null, custName:null, moveArr:null};
  currentUser: TeammateInfo = {username: null, pokes: this.userInfoPokeArr, level:"44", userPokeArr: []};
  
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
                    id:null
                  };
  pokeArr:Pokes[] = [];


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
  
  tradePokeArr:Pokes[] = []; // = new Array<Pokes>(6);
  serverTrainer:ServerTrainer;
  userPokeArr:UserPokes[] = [];
  team:Team = {id:null, created:null, teamName:null, teammates:null};

  

  constructor(private pokeService: AjaxCallService, private modalService: BsModalService, private globalTeam: GlobalTeam, 
              private pokeObj: PokesObj, private getUserPokesServer: GetUserPokesService, private globalPokes: GlobalPokes) { }

  ngOnInit() {
    // server call here, that does things
    if(this.globalTeam.getTeammateLength() !== 0){
      console.log("Drawing team components. Length is: " + this.globalTeam.getTeammateLength());
      this.teammatesArr = this.globalTeam.getAllTeammates();
    } else {
      this.getPokes();
    }
  }


  getPokes(){
    this.getUserPokesServer.getUserPokes(52).subscribe((ret)=>{
      this.serverTrainer = ret;
      console.log(this.serverTrainer);

      //get trainer from server. Set pokemans for him and teammates. 
      this.userInfo.created = this.serverTrainer.created;
      this.userInfo.email = this.serverTrainer.email;
      this.userInfo.id = this.serverTrainer.id;
      this.userInfo.is_lead = this.serverTrainer.is_lead;
      this.userInfo.login = this.serverTrainer.login;
      console.log(this.userInfo);

      //poke info from server
      this.pokeInfoArr = this.serverTrainer.pokemon;
    
      console.log(this.pokeInfoArr);

      

      for(let i = 0; i < this.pokeInfoArr.length; i++){
        //console.log("Getting API info for Poke with id: " + this.pokeInfoArr[i].id + " and it's got a length of: " + this.pokeInfoArr.length);
        this.pokeService.getPoke(this.pokeInfoArr[i].pkmn_id).then((pokes)=>{
          this.pokes = pokes;
          
          if(this.pokeArr.includes(this.pokes) === false)
            this.pokeArr.push(this.pokes); // add to a global array 
          console.log(this.pokeArr);
          this.pokeData(this.pokes, i);
        });/*.catch(function(error){
          console.log(error.error);
        })*/
      }

      //this.team = this.serverTrainer.team_id;
      this.teammatesArr = this.serverTrainer.team_id.teammates;
      
      
      for(let i = 0; i < this.teammatesArr.length; i++){ //gets teammate
        this.pokeTeammateArr = this.teammatesArr[i].pokes;
        console.log(this.pokeTeammateArr);
        
        for(let j = 0; j < this.teammatesArr[i].pokes.length; j++){ //gets 1 poke of current teammate
          this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).then((pokes)=>{
            this.pokes = pokes;
            console.log("pushing poke: " + this.pokes.name + " with index: " + i);  
            this.pokeTeammateData(this.pokes, i, j);
          });
        }
        if(this.pokeArr.includes(this.pokes) === false)
          this.pokeArr.push(this.pokes); // add to a global array 
        this.counter = 0;
        console.log("COUNTER RESET");
      }
      console.log(this.teammatesArr);

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
  }
  
  pokeTeammateData(pokes:Pokes, ti:number, pi:number){
    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = null;
    this.userPoke.custName = this.custName;

    if(this.pokeInfoArr[pi].move_one === "" || this.pokeInfoArr[pi].move_one === null){
      this.userPoke.moveArr[0] = '';
    } else {
      this.userPoke.moveArr[0]=pokes.moves[this.pokeInfoArr[pi].move_one].move.name;
    }

    if(this.pokeInfoArr[pi].move_two === "" || this.pokeInfoArr[pi].move_two === null){
      this.userPoke.moveArr[1]= '';
    } else {
      this.userPoke.moveArr[1]=pokes.moves[this.pokeInfoArr[pi].move_two].move.name;
    }

    if(this.pokeInfoArr[pi].move_three === "" || this.pokeInfoArr[pi].move_three === null){
      this.userPoke.moveArr[2]= '';
    } else {
      this.userPoke.moveArr[2]=pokes.moves[this.pokeInfoArr[pi].move_three].move.name;
    }

    if(this.pokeInfoArr[pi].move_four === "" || this.pokeInfoArr[pi].move_four === null){
      this.userPoke.moveArr[3]= '';
    } else {
      this.userPoke.moveArr[3]=pokes.moves[this.pokeInfoArr[pi].move_four].move.name;
    }

    console.log(this.userPoke.moveArr);

    //++this.counter;

    for(let k = 0; k < pokes["types"].length; k++)
      this.userPoke.type.push(pokes["types"][k].type.name);      
    
    console.log(this.userPoke.type);

    this.userPokeArr.push(this.userPoke); 
    // console.log(this.userPokeArr);
    this.globalPokes.setAllPokes(this.userPokeArr);
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

    console.log(this.userPoke.moveArr);

    //++this.counter;

    for(let k = 0; k < pokes["types"].length; k++)
      this.userPoke.type.push(pokes["types"][k].type.name);      
    
    console.log(this.userPoke.type);

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
      } else {
        for(let k = 0; k < this.teammatesArr[teammateIndex].pokes[this.counter].moveArr.length; k++){
          let indx = this.teammatesArr[teammateIndex].pokes[this.counter].moveArr[k];
          this.userPoke.moveArr.push(pokes.moves[indx].move.name);
        }
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
    this.tradePokeArr = [{sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                            {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                            {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                            {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                            {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                            {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:null},
                        ]; // = new Array<Pokes>(6);
  }

  showInfo(teammate: TeammateInfo){
    console.log(teammate);
    this.selTeammate = teammate;
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
      this.tradePokeArr[index] = newPoke;
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
