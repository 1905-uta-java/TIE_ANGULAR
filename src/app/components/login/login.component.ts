import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GlobalUser } from '../global/globalUser';
import { PokesObj } from '../pokesObj';
import { Pokes } from 'src/app/models/Pokes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTrainer } from '../../service/serverTrainer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  
  newusername: string = "";
  newpassword: string = "";
  newemail :string = "";

  error:string = "";
  createError:string = "";

  createBtnDis:boolean = false;
  createDesc:string = "Create";

serverTrainer:ServerTrainer;
  //TODO: insert DB API endpoint here
  url: string = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Login/";
  urlNew :string = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/new";
  urlPoke :string = "http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Pokemon/new";
  //url: string = "http://localhost:8080/poketie/Login/"
  //private globalUser:GlobalUser = {id: null, dateCreated: null, email: null, pokeIds:null, username:null, auth:null};

  constructor(private route: Router, @Inject(SESSION_STORAGE) private session: WebStorageService,
              private http: HttpClient) { }
  
  ngOnInit() {
  }

  login(event){

    let creds = [this.username,this.password]
    var router = this.route
    var sesh = this.session
    var error = '';
    
  
    let globalUserAuth;

    if(this.username !== "" && this.password !== ""){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.url);
    xhr.onreadystatechange = function (){
      if(this.readyState === 4 && this.status===200){
        error = "";
        let autho = xhr.getResponseHeader("Authentication");
        console.log("HERE IS THE AUTHO: " + autho)
        sesh.set("token", autho);
        //return autho;
        //sessionStorage.setItem("token", autho);
        //redirect here
        console.log("THIS SHOULD BE THE AUTHO FROM SESSIONSTORAGE: "+sesh.get("token"))
        router.navigate(['/backpack'])
      } else if(this.readyState === 4 && this.status === 403){
        error = "Invalid username or password";
      }
    }
    error = "";
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(router.url);
    xhr.setRequestHeader('Access-Control-Allow-Origin', router.url)
    xhr.send(JSON.stringify(creds));
  } else {
    console.log("User tried inputting blank fields...");
    //alert("Please input into the username and password fields");
    this.error = 'Please input into the username and password fields';
  }
  this.error = error;

  }

  //[trainer_id, login, pass, email, team_id, is_lead]

  createAccount(event){
    console.log(event);
    this.createBtnDis = true;
    this.createDesc = "Creating...";
    
    
    let response = ["0", this.newusername, this.newpassword, this.newemail, "0", "0"];
    var router = this.route
    var sesh = this.session
    var createError = "";

    console.log(response);
    //this needs to move to the inside 
    
    this.http.post<ServerTrainer>(this.urlNew, response).subscribe((ret) =>{
      this.serverTrainer = ret;
      console.log(this.serverTrainer);
      this.getRandomPokes(this.serverTrainer);
    });
    
    ///this.serverTrainer = {id: 4052, created:null, email:null,is_lead:null, login:null, pokemon:null,
    //team_id:null};
    //this.getRandomPokes(this.serverTrainer);
  }

  getRandomPokes(ret:ServerTrainer){
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let pokeIdArr = [];

    let moves:number[] = [];
    let id:number;
    let myPokeObj:MyPokeObj;
    let pokeObjArr:MyPokeObj[] = [];
    let counter = 0;

    let pokeArr:Pokes;
    let randNum = 0;
    for(let i = 0; i < 6; i++){
      randNum = Math.floor(Math.random() * 151) + 1;
      if(pokeIdArr.includes(randNum) === false)
        pokeIdArr.push(randNum);
    }
    
    console.log(pokeIdArr);
    
    for(let i = 0; i < pokeIdArr.length; i++){
      this.http.get<Pokes>(url+pokeIdArr[i]).subscribe((ret) =>{
        console.log(ret);

        for(let j = 0; j < ret.moves.length; j++){
          if(counter === 3){
            break;
          }
          randNum = Math.floor(Math.random() * ret.moves.length);
          moves.push(randNum);
          counter = j;
        }
        counter = 0;

        myPokeObj = {id:pokeIdArr[i], moves:moves};
        pokeObjArr.push(myPokeObj);
        console.log(pokeObjArr);
        moves = [];

        let trainer_id = this.serverTrainer.id;
        //this.urlPoke;
        let response = [];
        console.log(trainer_id);
        console.log(pokeObjArr);


          //[0, pkmn_id, "", trainer_id, move1, move2, move3, move4]
          console.log(pokeObjArr.length);
          if(pokeObjArr.length === 6){
            for(let k = 0; k< pokeObjArr.length; k++){
            //response = ["0", pokeObjArr[i].id, "", trainer_id];
            
            if(pokeObjArr[k].moves.length === 0){
              response = ["0", pokeObjArr[k].id.toString(), "", trainer_id.toString(), "", "", "", ""];
            }
            else if(pokeObjArr[k].moves.length === 1){
              response = ["0", pokeObjArr[k].id.toString(), "0", trainer_id.toString(), pokeObjArr[k].moves[0].toString(),  "", "",""];
            }
            else if(pokeObjArr[k].moves.length === 2){
              response = ["0", pokeObjArr[k].id.toString(), "0", trainer_id.toString(), pokeObjArr[k].moves[0].toString(),  pokeObjArr[k].moves[1].toString(), "",""];
            }
            else if(pokeObjArr[i].moves.length === 3){
              response = ["0", pokeObjArr[k].id.toString(), "0", trainer_id.toString(), pokeObjArr[k].moves[0].toString(),  pokeObjArr[k].moves[1].toString(),  pokeObjArr[k].moves[2].toString(),""];
            }
            else if(pokeObjArr[i].moves.length === 4){
              response = ["0", pokeObjArr[k].id.toString(), "0", trainer_id.toString(), pokeObjArr[k].moves[0].toString(),  pokeObjArr[k].moves[1].toString(),  pokeObjArr[k].moves[2].toString(),  pokeObjArr[k].moves[3].toString()];
            }

            console.log(response);
            
            let headers = new HttpHeaders();
            headers = headers.set('Authentication', (this.serverTrainer.id.toString() + ":" + this.serverTrainer.login));
            this.http.post<ServerTrainer>(this.urlPoke, response, {headers: headers}).subscribe((rets) =>{
              console.log(rets);
              response = [];
              if(k === 5){
                this.createDesc = "Finsihed!";
                this.createBtnDis = false;
              }
            });

          }
          }
      });
    }

    // console.log(pokeObjArr);
    //this.sendPokes(this.serverTrainer.id, pokeObjArr);

  }

  //[pk_id, pkmn_id, nickname, trainer_id, move1, move2, move3, move4]
    //pk_id req, set to 0
    //[0, pkmn_id, "", trainer_id, move1, move2, move3, move4]
  // sendPokes(trainer_id, pokeObjArr:MyPokeObj[]){
    
  // }






}


export class MyPokeObj{
  id:number
  moves:number[]
}
