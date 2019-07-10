import { Injectable } from '@angular/core';
import { GetUserPokesService } from 'src/app/service/get-user-pokes.service';
import { ServerTrainer } from 'src/app/service/serverTrainer';
import { UserPokes } from '../models/UserPokes';
import { UserInfo } from '../models/UserInfo';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { GlobalPokes } from '../components/global/globalPokes';
import { Pokes } from '../models/Pokes';
import { Move } from '../models/Pokes';
import { PokeInfo } from '../models/PokeInfo';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class InitUserInfoService {
  // getUserPokesServer: GetUserPokesService;
  userInfo:UserInfo = {id: null, login: null, is_lead:null, created:null, email:null};
  userPokeArr:UserPokes[] = [];
  
  /* 
    id:number;
    created:Date;
    pkmn_id:number;
    move_one:string;
    move_two:string;
    move_three:string;
    move_four:string;
    nickname:string;
  */
  pokeInfoArr:PokeInfo[] = [];
  move:Move = {move:{name:null}};
  pokes: Pokes = {sprite: {back_default: null,back_female: null,back_shiny: null,back_shiny_female: null,front_default: null,front_female: null,front_shiny: null,front_shiny_female: null},name:null,moves:[this.move],type:null,id:null};
  pokeArr:Pokes[] = [];
  userPoke:UserPokes = {id:0, name:"", sprite:"", dateAdded:null, type:[], custName:"", moveArr:[]};


  constructor(private http: HttpClient, private getUserPokesServer: GetUserPokesService, private serverPokemon:ServerTrainer,
              private pokeService: AjaxCallService, private globalPokes: GlobalPokes) { }

  sayHello(){
    console.log("hello");
  }
  getAllInfo(){
    console.log("Initializing Information");
        this.getUserPokesServer.getUserPokes(52).subscribe((ret) => {
          console.log(ret);  
          //this.serverPokemon = ret;
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
          return this.globalPokes;
      }

      private data(pokes:Pokes, i:number){
        this.userPoke.name = pokes.name;
        this.userPoke.id = pokes.id;
        this.userPoke.sprite = pokes["sprites"].front_default;
        this.userPoke.dateAdded = this.pokeInfoArr[i].created;
        this.userPoke.custName = this.serverPokemon[i].nickname;

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
        this.userPoke = {id:null, name:null, sprite:null, dateAdded:null, type:[], custName:null, moveArr:[]};
      
      }

}

