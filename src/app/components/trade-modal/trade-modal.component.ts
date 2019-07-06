import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { TemplateRef } from '@angular/core';


@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.css']
})
export class TradeModalComponent implements OnInit {

  modalRef : BsModalRef;
  curSpriteURL:string;
  curLvl:string;
  curPokeAge:string;
  curId:string;
  curMoves:[] = [];
  curType:[] = [];
  curDateAdded:string;
  pokeAge: string;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  openModalWithClass(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({class: 'gray modal-lg'})
    );
  }

}
