import { Component } from '@angular/core';
import { Move, Pokes } from './models/Pokes';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { UserPokes } from './models/UserPokes';
import { PokeInfo } from './models/PokeInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon';
}
