import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { Pokes } from '../../models/Pokes';
import { PokeInfo } from '../../models/PokeInfo';
import { UserPokes } from '../../models/UserPokes';
import { Move } from '../../models/Pokes';
import { Template } from '@angular/compiler/src/render3/r3_ast';




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
  //pokeIdArr:string[] = ['25', '132', '39'];
  
  //info we want to print on the page
  pokeInfoArr:PokeInfo[] = [
                            {id: '25', moveArr:['1', '3', '9','17']},
                            {id:'132', moveArr:['0']},
                            {id: '39', moveArr:['3', '4', '10', '11']},
                            {id: '45', moveArr:['3', '56', '10', '20']}
                          ];
  moves:string[] = [];
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
  
  


  constructor(private pokeService: AjaxCallService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPokes();
  }    

  //TODO - gotta...ya know, do DB calls so we can get the correct moves and such
  // parses the info from AJAX
  getPokes(){
    //console.log("pokeIdArr is " + this.pokeIdArr.length + " units in length");
    for(let i = 0; i < this.pokeInfoArr.length; i++){
      console.log("Getting API info for Poke with id: " + this.pokeInfoArr[i] + " and it's got a length of: " + this.pokeInfoArr.length);
      this.pokeService.getPoke(this.pokeInfoArr[i].id)
      .then((pokes)=>{
        this.pokes = pokes;
        if(this.pokeArr.includes(this.pokes) === false)
          this.pokeArr.push(this.pokes); // add to a global array 
        
          console.log(this.pokes);
        this.data(this.pokes);
      });/*.catch(function(error){
        console.log(error.error);
      })*/
    }
  }
  


  data(pokes:Pokes){
    this.newCounter++;
    let indx;

    for(let i = 0; i < this.pokeInfoArr[this.counter].moveArr.length; i++){
      let indx = this.pokeInfoArr[this.counter].moveArr[i];
      this.moves.push(pokes.moves[indx].move.name);
      console.log(indx);
    }
    this.userPoke.moveArr = this.moves;
    
    ++this.counter;
    console.log(this.counter);

    this.userPoke.name = pokes.name;
    this.userPoke.id = pokes.id;
    this.userPoke.sprite = pokes["sprites"].front_default;
    this.userPoke.dateAdded = this.dateAdded;
    this.userPoke.custName = this.custName;
    
    for(let i = 0; i < pokes["types"].length; i++){
      this.types.push(pokes["types"][i].type.name);
      console.log("adding " + pokes["types"][i].type.name + " to types array");
    }
    this.userPoke.type = this.types;

    //wipe moves and types arrays so we don't duplicate moves that pokes don't actually have 
    this.moves= [];
    this.types= [];

    console.log(this.userPoke);
    
    if(this.userPokeArr.includes(this.userPoke) === false )
      this.userPokeArr.push(this.userPoke); 
    
    console.log(this.userPokeArr);
    //this.pokeArr.push(this.pokes);
    this.drawComponents();
  }



  drawComponents(){
    let pokePrint = document.getElementById("userPokes");
    for(let i = 0; i < this.userPokeArr.length; i++){
      /*curSpriteURL:string
      curLvl:string;
      curPokeAge:string;
      curId:string;
      curMove:string [] = [];
      cuType:string[] = [];
      curDateAdded:string;*/

      let moveStr:string = "";
      let typeStr:string = "";
    
      for(let k = 0; k < this.userPokeArr[i].moveArr.length; k++){
        console.log(this.userPokeArr[i].moveArr[k]);
        if(this.userPokeArr[i].moveArr[k] !== "undefined")
          moveStr += "<span>"+this.userPokeArr[i].moveArr[k] + "<span><br>";
      }
      for(let k = 0; k < this.userPokeArr[i].type.length; k++){
        console.log(this.userPokeArr[i].type[k]);
        if(this.userPokeArr[i].type[k] !== "undefined")
          typeStr += "<span>"+this.userPokeArr[i].type[k] + "<span><br>";
      }
  
      if(moveStr !== "" && typeStr !== ""){
        pokePrint.innerHTML += `<div class = 'col-lg-10 col-md-12 offset-lg-1 offset-md-0' id = 'poke1'>
          <div class = 'row' (click)="setCurrData(${this.userPokeArr[i].id}); lgModal.show()">
            <div class = 'col col-lg-2 col-md-2 col-sm-2 offset-lg-0 offset-sm-1 offset-md-2 pokeImg'>
              <img src= ${this.userPokeArr[i].sprite} alt='stuff'>
            </div>
            <div class = 'col col-lg-2 col-md-3 col-sm-3'>
              <label class = 'pokeLabel'>Name</label>
              <div class = 'pokename'>${this.userPokeArr[i].name}</div>
            </div>
            <div class = 'col col-lg-1 col-md-1 col-sm-2'>
              <label  class = 'pokeLabel'>Level</label>
              <div class = 'pokeLvl'>12</div>
            </div>
            <div class = 'col col-md-2 col-sm-3 d-lg-none'>
              <label class = 'pokeLabel'>ID</label>
              <div class = 'pokeID'>${this.userPokeArr[i].id}</div>
            </div>
        
            <div class = 'col col-lg-3 col-md-4 col-sm-4 offset-lg-0 offset-md-4 offset-sm-3'>
              <label  class = 'pokeLabel'>Moves</label>
              <div class = 'pokeMoveList'> 
                <div>${moveStr}</div>
              </div>
            </div>
            <div class = 'col col-lg-2 col-md-3 col-sm-2'>
              <label class = 'pokeLabel'>Type</label>
              <div class = 'pokeTypes'>
                <div>${typeStr}</div>
              </div>
            </div>
            <div class = 'col col-lg-1 d-lg-block d-none'>
              <label class = 'pokeLabel'>ID</label>
              <div class = 'pokeID'>${this.userPokeArr[i].id}</div>
            </div>
          </div>
          <hr>
        </div>`;
      }
    }
  }



  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

  setCurrData(inId){
    console.log("HIIIII!!");
    let indx = 0;
    for(let i = 0; i < this.userPokeArr.length; i++){
      if(this.userPokeArr[i].id === inId){
        indx = i; 
        break;
      }
    }
    
    
    this.curType = this.userPokeArr[indx].type;
    this.curSpriteURL = this.userPokeArr[indx].sprite;
    this.curPokeAge = "12";
    this.curId = this.userPokeArr[indx].id;
    this.curMove = this.userPokeArr[indx].moveArr;
  }


}
