import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-poke-modal',
  templateUrl: './edit-poke-modal.component.html',
  styleUrls: ['./edit-poke-modal.component.css']
})
export class EditPokeModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
