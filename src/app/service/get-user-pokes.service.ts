import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTrainer } from './serverTrainer';


@Injectable({
  providedIn: 'root'
})

export class GetUserPokesService {
  url:string = 'http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id';
  constructor(private http: HttpClient) { }

  getUserPokes(id:number):Observable<ServerTrainer>{
    let header = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    token = token.substring(1);
    token = token.substring(0, token.length - 1);
    header = header.set('Authentication', token);
    return this.http.post<ServerTrainer>(this.url, id, {headers: header});
    // return this.http.get(this.url);
  }
}
