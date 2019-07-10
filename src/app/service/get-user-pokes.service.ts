import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTrainer } from './serverTrainer';


@Injectable({
  providedIn: 'root'
})

export class GetUserPokesService {
  url:string = 'http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id';
  constructor(private http: HttpClient) { }

  getUserPokes(id:number):Observable<ServerTrainer>{
    return this.http.post<ServerTrainer>(this.url, id );
    // return this.http.get(this.url);
  }
}
