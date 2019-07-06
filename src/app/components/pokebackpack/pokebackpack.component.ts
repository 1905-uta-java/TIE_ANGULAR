import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokebackpack',
  templateUrl: 'pokebackpack.component.html', 
  /*`<div class = 'col-lg-10 col-md-12 offset-lg-1 offset-md-0' id = 'poke1'>
  <div class = 'row' (click)="setCurrData(${id}); lgModal.show()">
    <div class = 'col col-lg-2 col-md-2 col-sm-2 offset-lg-0 offset-sm-1 offset-md-2 pokeImg'>
      <img src= ${sprite} alt='stuff'>
    </div>
    <div class = 'col col-lg-2 col-md-3 col-sm-3'>
      <label class = 'pokeLabel'>Name</label>
      <div class = 'pokename'>${name}</div>
    </div>
    <div class = 'col col-lg-1 col-md-1 col-sm-2'>
      <label  class = 'pokeLabel'>Level</label>
      <div class = 'pokeLvl'>12</div>
    </div>
    <div class = 'col col-md-2 col-sm-3 d-lg-none'>
      <label class = 'pokeLabel'>ID</label>
      <div class = 'pokeID'>${id}</div>
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
      <div class = 'pokeID'>${id}</div>
    </div>
  </div>
  <hr>
</div>`,*/
  styleUrls: ['./pokebackpack.component.css']
})
export class PokebackpackComponent implements OnInit {
  id:string;
  typeStr:string;
  moveStr:string;
  name:string;
  sprite:string;
  
  constructor() { }

  ngOnInit() {
  }

}
