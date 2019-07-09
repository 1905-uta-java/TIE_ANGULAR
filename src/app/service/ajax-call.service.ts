import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pokes} from '../models/Pokes';


@Injectable({
  providedIn: 'root'
})
export class AjaxCallService {

  url:string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  //works for both ID and name, as long as they are strings
  getPoke(inStr:string): Promise<Pokes> {
    //console.log(this.http.get<Pokes>(this.url+inStr));
    return this.http.get<Pokes>(this.url+inStr).toPromise();
  }
}
