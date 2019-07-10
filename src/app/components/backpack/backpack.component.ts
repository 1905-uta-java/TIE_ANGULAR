import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { Pokes } from '../../models/Pokes';
import { PokeInfo } from '../../models/PokeInfo';
import { UserPokes } from '../../models/UserPokes';
import { UserInfo } from '../../models/UserInfo';
import { Move } from '../../models/Pokes';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { GlobalPokes } from '../global/globalPokes';
import { GetUserPokesService } from 'src/app/service/get-user-pokes.service';
import { ServerTrainer } from 'src/app/service/serverTrainer';
import { InitUserInfoService } from 'src/app/service/init-user-info.service';



@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.css']
})
export class BackpackComponent implements OnInit {
  move:Move = {move:{name:null}};
  userInfo:UserInfo = {id: null, login: null, is_lead:null, created:null, email:null};
  modalRef : BsModalRef;
  pokes: Pokes = {sprite: {back_default: null,
                            back_female: null,
                            back_shiny: null,
                            back_shiny_female: null,
                            front_default: null,
                            front_female: null,
                            front_shiny: null,
                            front_shiny_female: null},
                    name:null,
                    moves:[this.move],
                    //moves:null,
                    type:null,
                    id:null
                  };
  pokeArr:Pokes[] = [];
  userPoke:UserPokes = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};
  userPokeArr:UserPokes[] = [];
  
  //info we want to print on the page
  pokeInfoArr:PokeInfo[] = [];
  moves:Move[] = [];
  types:string[] = [];
  counter:number = 0
  newCounter:number = 0;
  custName:string;

  name:string;
  id:string;
  spriteURL:string;
  lvl:string = "19";
  dateAdded:string = "12-DEC-2010";
  pokeAge:string = "14";
  
  curSpriteURL:string;
  curLvl:string;
  curPokeAge:string;
  curId:string;
  curMove:string [] = [];
  curType:string[] = [];
  curDateAdded:string;

  serverPokemon:ServerTrainer;
  ret:any;
  
  
  constructor(private pokeService: AjaxCallService, private modalService: BsModalService,
     private globalPokes: GlobalPokes, private getUserPokesServer: GetUserPokesService) { }

  ngOnInit() {
    console.log("HERE's TRISTAN's STUFF!");
    console.log(this.globalPokes);
    
    if(this.globalPokes.getPokesLength() == 6){
      this.userPokeArr = this.globalPokes.getAllPokes();
      // console.log("Calling draw components, globalPokes is already filled");
      this.drawComponents();
    } else {
      //this.initInfo;
      //this.userPokeArr = this.globalPokes.getAllPokes();
      this.getUserPokes();
    }
  }
  
  
  getUserPokes(){
    this.getUserPokesServer.getUserPokes(52).subscribe((ret) => {
      this.serverPokemon = ret;
      console.log(this.serverPokemon);

      //user info from server
      this.userInfo.created = this.serverPokemon.created;
      this.userInfo.email = this.serverPokemon.email;
      this.userInfo.id = this.serverPokemon.id;
      this.userInfo.is_lead = this.serverPokemon.is_lead;
      this.userInfo.login = this.serverPokemon.login;
      console.log(this.userInfo);

      //poke info from server
      this.pokeInfoArr = this.serverPokemon.pokemon;
      console.log(this.pokeInfoArr);

      

      for(let i = 0; i < this.pokeInfoArr.length; i++){
        //console.log("Getting API info for Poke with id: " + this.pokeInfoArr[i].id + " and it's got a length of: " + this.pokeInfoArr.length);
        this.pokeService.getPoke(this.pokeInfoArr[i].pkmn_id).then((pokes)=>{
          this.pokes = pokes;
          
          if(this.pokeArr.includes(this.pokes) === false)
            this.pokeArr.push(this.pokes); // add to a global array 
          console.log(this.pokeArr);
          this.data(this.pokes, i);
        });/*.catch(function(error){
          console.log(error.error);
        })*/
      }
    });
  }
  


  data(pokes:Pokes, i:number){
    // console.log(this.globalPokes);
    // console.log(this.userPokeArr);

    this.newCounter++;

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
    
    this.drawComponents();
  }



  drawComponents(){
    for(let i = 0; i < this.userPokeArr.length; i++){

      let moveStr:string = "";
      let typeStr:string = "";
    
      for(let k = 0; k < this.userPokeArr[i].moveArr.length; k++)
        if(this.userPokeArr[i].moveArr[k] !== "undefined")
          moveStr += "<span>"+this.userPokeArr[i].moveArr[k] + "<span><br>";
      
      for(let k = 0; k < this.userPokeArr[i].type.length; k++)
        if(this.userPokeArr[i].type[k] !== "undefined")
          typeStr += "<span>"+this.userPokeArr[i].type[k] + "<span><br>";
    }
  }

  refreshPokes(){
    //this.globalPokes.empty();
    //this.userPokeArr = [];
    //this.getPokes();
  }



  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

  //TODO - implement this later. 
  setCurrData(userPokemon){
    // console.log("HIIIII!!");
    // console.log(userPokemon);
    
    this.types = userPokemon.type;
    this.spriteURL = userPokemon.sprite;
    this.pokeAge = "12";
    this.id = userPokemon.id;
    this.moves = userPokemon.moveArr;
  }


}
