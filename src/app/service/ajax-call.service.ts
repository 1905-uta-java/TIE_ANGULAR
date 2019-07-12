import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pokes} from '../models/Pokes';


@Injectable({
  providedIn: 'root'
})
export class AjaxCallService {

  url:string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  //works for both ID and name, as long as they are strings
  // getPoke(inStr:number): Promise<Pokes> {
  //   //console.log(this.http.get<Pokes>(this.url+inStr));
  //   return this.http.get<Pokes>(this.url+inStr).toPromise();
  // }
  // getPoke(inStr:number): Promise<Pokes> {
  //   //if(inStr){
  //     let headers = new HttpHeaders();
  //     headers = headers.set('Authentication', sessionStorage.getItem('token'));
  //     console.log(sessionStorage.getItem('token'));
  //     //console.log(this.http.get<Pokes>(this.url+inStr));
  //     return this.http.get<Pokes>(this.url+inStr).toPromise();
  //   // }
  //   // return null;
  // }
  getPoke(inStr:number): Observable<Pokes> {
    //console.log(this.http.get<Pokes>(this.url+inStr));
    let headers = new HttpHeaders();
    headers = headers.set('Authentication', sessionStorage.getItem('token'));
    return this.http.get<Pokes>(this.url+inStr);
  }
}
