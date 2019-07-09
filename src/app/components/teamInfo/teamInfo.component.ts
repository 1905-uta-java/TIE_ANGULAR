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

  //need a teammateMember object
  //need a teammates array
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


  userInfoPokeArr:PokeInfo[] = [
    {id: '26', moveArr:['1', '3', '9','17']},
    {id:'133', moveArr:['0']},
    {id: '40', moveArr:['3', '4', '10', '11']},
    {id: '46', moveArr:['3', '56', '10', '20']},
    {id: '57', moveArr:['6', '52', '19', '21']},
    {id: '83', moveArr:['1', '36', '15', '24']}
  ];
  userInfoPoke:UserPokes = {id:"0", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
  currentUser: TeammateInfo = {username: "me", pokes: this.userInfoPokeArr, level:"44", userPokeArr: []};
  
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
                          id:""};


  teammatesArr: TeammateInfo[] = [
    {username: "theDude01", pokes: this.pokeInfoArr, level:"24", userPokeArr: [this.userPoke]},
    {username: "tankgirl", pokes: this.pokeInfoArr, level:"25",  userPokeArr: [this.userPoke]},
    {username: "leroyJenkins", pokes: this.pokeInfoArr2, level:"14",  userPokeArr: [this.userPoke]},
    {username: "....yo idk", pokes: this.pokeInfoArr3, level:"4",  userPokeArr: [this.userPoke]}
  ];

  
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


  spriteURL:string = "";
  lvl:string = "";
  pokeAge:string = "";
  id:string = "";
  moves:string = "";
  types:string = "";
  dateAdded:string = "";
  counter: number = 0;
  newCounter: number = 0;
  custName: string;
  
  tradePokeArr:Pokes[] = [{sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                          {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                          {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                          {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                          {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                          {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"},
                  ]; // = new Array<Pokes>(6);

  

  constructor(private pokeService: AjaxCallService, private modalService: BsModalService, private globalTeam: GlobalTeam, 
              private pokeObj: PokesObj) { }

  ngOnInit() {
    // server call here, that does things
    this.getPokes();
  }

  getPokes(){
    if(this.globalTeam.getTeammateLength() !== 0){
      console.log("Drawing team components. Length is: " + this.globalTeam.getTeammateLength());
      this.teammatesArr = this.globalTeam.getAllTeammates();
    } else {
      for(let i = 0; i < this.teammatesArr.length; i++){ //gets teammate
        for(let j = 0; j < this.teammatesArr[i].pokes.length; j++){ //gets 1 poke of current teammate
          this.pokeService.getPoke(this.teammatesArr[i].pokes[j].id).then((pokes)=>{
            this.pokes = pokes;
            console.log("Check this out. We're getting this pokemon from " + this.teammatesArr[i].username + " pokemon ID: " + this.teammatesArr[i].pokes[j].id);
            console.log("pushing poke: " + this.pokes.name + " with index: " + i);
            console.log("CALLING DATA!!!");
  
            this.data(this.pokes, i);
          });/*.catch(function(error){
            console.log(error.error);
          })*/
        }
        if(this.pokeArr.includes(this.pokes) === false)
          this.pokeArr.push(this.pokes); // add to a global array 
        this.counter = 0;
        console.log("COUNTER RESET");
      }
      console.log(this.teammatesArr);
    }
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
        if(this.pokes.name === "ditto"){
          this.userPoke.moveArr.push(pokes.moves[0].move.name);
        } else {
          for(let k = 0; k < this.currentUser.pokes[j].moveArr.length; k++){
            let indx = this.currentUser.pokes[j].moveArr[k];
            this.userPoke.moveArr.push(pokes.moves[indx].move.name);
          }
        }
      }

      if(this.currentUser.userPokeArr.includes(this.userPoke) === false )
        this.currentUser.userPokeArr.push(this.userPoke); 
      
      
      this.userPoke = {id:"", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
       
       
      //this.data(this.pokes);
    });
    console.log(this.currentUser);
  }

}


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

    this.userPoke = {id:"", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
  }

  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

  showInfo(teammate: TeammateInfo){
    console.log(teammate);
    this.selTeammate = teammate;
  }

  showPokeInfo(id, index){
    console.log(id);
    let moveArrHeres:Move[] = [];
    let typeArr:string[] = [];
    let newPoke = new PokesObj().poke = {sprite: {back_default: "",back_female: "",back_shiny: "",back_shiny_female: "",front_default: "",front_female: "",front_shiny: "",front_shiny_female: ""},name:"",moves:[this.move],type:[],id:"0"};
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
                          id:"0"};

    }
  }

}
