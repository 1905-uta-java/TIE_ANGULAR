import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { Pokes } from '../../models/Pokes';
import { PokeInfo } from '../../models/PokeInfo';
import { UserPokes } from '../../models/UserPokes';
import { Move } from '../../models/Pokes';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { GlobalPokes } from '../global/globalPokes';

@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.css']
})
export class BackpackComponent implements OnInit {
  move:Move = {move:{name:""}};
  modalRef : BsModalRef;
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
  userPoke:UserPokes = {id:"0", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
  userPokeArr:UserPokes[] = [];
  
  //info we want to print on the page
  pokeInfoArr:PokeInfo[] = [
                            {id: '25', moveArr:['1', '3', '9','17']},
                            {id:'132', moveArr:['0']},
                            {id: '39', moveArr:['3', '4', '10', '11']},
                            {id: '45', moveArr:['3', '56', '10', '20']},
                            {id: '56', moveArr:['6', '52', '19', '21']},
                            {id: '82', moveArr:['1', '36', '15', '24']}
                          ];
  moves:Move[] = [];
  types:string[] = [];
  counter:number = 0;
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
  
  
  constructor(private pokeService: AjaxCallService, private modalService: BsModalService, private globalPokes: GlobalPokes) { }

  ngOnInit() {
    if(this.globalPokes.getPokesLength() == 6){
      this.userPokeArr = this.globalPokes.getAllPokes();
      console.log("Calling draw components, globalPokes is already filled");
      this.drawComponents();
    } else {
      this.getPokes();

    }
  }    

  //TODO - gotta...ya know, do DB calls so we can get the correct moves and such
  // parses the info from AJAX

  
  getPokes(){
    for(let i = 0; i < this.pokeInfoArr.length; i++){
      console.log("Getting API info for Poke with id: " + this.pokeInfoArr[i].id + " and it's got a length of: " + this.pokeInfoArr.length);
      this.pokeService.getPoke(this.pokeInfoArr[i].id).then((pokes)=>{
        this.pokes = pokes;
        
        if(this.pokeArr.includes(this.pokes) === false)
          this.pokeArr.push(this.pokes); // add to a global array 
        
        console.log("CALLING DATA!!!");

        this.data(this.pokes);
      });/*.catch(function(error){
        console.log(error.error);
      })*/
    }
  }
  


  data(pokes:Pokes){
    console.log(this.globalPokes);
    console.log(this.userPokeArr);

    this.newCounter++;
    let indx;

    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = this.dateAdded;
    this.userPoke.custName = this.custName;

    if(pokes.name === 'ditto'){
      this.userPoke.moveArr.push(pokes.moves[0].move.name);
    } else {
      for(let k = 0; k < this.pokeInfoArr[this.counter].moveArr.length; k++){
        let indx = this.pokeInfoArr[this.counter].moveArr[k];
        this.userPoke.moveArr.push(pokes.moves[indx].move.name);
      }
    }

    ++this.counter;
    console.log(this.counter);

    for(let k = 0; k < pokes["types"].length; k++)
      this.userPoke.type.push(pokes["types"][k].type.name);      

    this.userPokeArr.push(this.userPoke); 
    console.log(this.userPokeArr);
    this.globalPokes.setAllPokes(this.userPokeArr);
    console.log(this.globalPokes.getAllPokes());
    console.log("With length: " + this.globalPokes.getPokesLength());
    console.log(this.userPokeArr);

    // empty userPoke
    this.userPoke = {id:"0", name:"", sprite:"", dateAdded:"", type:[], custName:"", moveArr:[]};
    
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
    this.getPokes();
  }



  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

  //TODO - implement this later. 
  setCurrData(userPokemon){
    console.log("HIIIII!!");
    console.log(userPokemon);
    
    this.types = userPokemon.type;
    this.spriteURL = userPokemon.sprite;
    this.pokeAge = "12";
    this.id = userPokemon.id;
    this.moves = userPokemon.moveArr;
  }


}
