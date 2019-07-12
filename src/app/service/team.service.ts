import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTeam } from './serverTrainer';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url:string = 'http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Teams/list/';
  
  constructor(private http: HttpClient) { }

  getAllTeams(id:number):Observable<ServerTeam>{
    let header = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    token = token.substring(1);
    token = token.substring(0, token.length - 1);
    header = header.set('Authentication', token);
    return this.http.get<ServerTeam>(this.url, {headers:header});
  }
}
