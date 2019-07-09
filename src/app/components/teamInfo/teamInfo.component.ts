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

@Component({
  selector: 'app-teamInfo',
  templateUrl: './teamInfo.component.html',
  styleUrls: ['./teamInfo.component.css']
})
export class TeamInfoComponent implements OnInit {
  modalRef : BsModalRef;
  teamName:string = "Team Name and stuff";
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

  teammatesArr: TeammateInfo[] = [
    {username: "theDude01", pokes: this.pokeInfoArr, level:"24", userPokeArr: [this.userPoke]},
    {username: "tankgirl", pokes: this.pokeInfoArr, level:"25",  userPokeArr: [this.userPoke]},
    {username: "leroyJenkins", pokes: this.pokeInfoArr2, level:"14",  userPokeArr: [this.userPoke]},
    {username: "....yo idk", pokes: this.pokeInfoArr3, level:"4",  userPokeArr: [this.userPoke]}
  ];

  
  move:Move = {move:{name:""}};
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
  

  constructor(private pokeService: AjaxCallService, private modalService: BsModalService, private globalTeam: GlobalTeam) { }

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

}
