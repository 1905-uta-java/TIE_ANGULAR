import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxCallService } from 'src/app/service/ajax-call.service';
import { Pokes } from '../../models/Pokes';
import { Template } from '@angular/compiler/src/render3/r3_ast';




@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.css']
})
export class BackpackComponent implements OnInit {

  modalRef : BsModalRef;
  pokes: Pokes;
  moves:string[] = [];
  types:string[] = [];
  name:string;
  id:string;
  spriteURL:string;
  lvl:string = "19";
  dateAdded:string = "12-DEC-2010";
  pokeAge:string = "14";
  
  


  constructor(private pokeService: AjaxCallService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPokes();
  }    

  //TODO - gotta...ya know, do DB calls so we can get the correct moves and such
  // parses the info from AJAX
  getPokes(){
    this.pokeService.getPoke("pikachu")
      .then((pokes)=>{
        this.pokes = pokes; 
        //this.moves=pokes["moves"];
        for(let i = 0;  i < this.pokes["moves"].length; i++){
          if(this.pokes["moves"][i].move.name === "mega-punch" ||
          this.pokes["moves"][i].move.name === "slam" ||
          this.pokes["moves"][i].move.name === "tail-whip" || 
          this.pokes["moves"][i].move.name === "thunderbolt"){
            this.moves.push(this.pokes["moves"][i].move.name);
            console.log("adding " + this.pokes["moves"][i].move.name + " to moves array");
          } 
        }
        this.name = pokes.name;
        this.id = pokes.id;
        
        for(let i = 0; i < this.pokes["types"].length; i++){
          this.types.push(this.pokes["types"][i].type.name);
          console.log("adding " + this.pokes["types"][i].type.name + " to types array");
        }
  
        this.spriteURL = this.pokes["sprites"].front_default;
  

      }).catch(function (error){
        console.log(error.error);
      });
    }
      
      openModalWithClass(template:TemplateRef<any>){
      this.modalRef = this.modalService.show(
        template,
        Object.assign({class: 'gray modal-lg'})
      );
  }


}
