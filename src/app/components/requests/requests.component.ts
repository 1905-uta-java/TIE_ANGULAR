import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerTrainer, ServerReqPokemon } from 'src/app/service/serverTrainer';
import { ServerRequest } from 'src/app/service/serverTrainer';
import { PokeInfo } from 'src/app/models/PokeInfo';
import { Pokes, Move } from 'src/app/models/Pokes';
import { TradeMini } from 'src/app/models/TradeMini';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  downHidden:boolean = false;
  upHidden:boolean = true;
  userId:number = 0;
  serverTrainer:ServerTrainer;
  serverRequest:ServerRequest[] = [];
  APIPoke1:Pokes;
  APIPoke2:Pokes;
  tempPokemon1:PokeInfo;
  tempPokemon2:PokeInfo;
  tradeMini:TradeMini;
  tradeArr:TradeMini[] = [];

  move1:string;
  move2:string;
  move3:string;
  move4:string;

  move:Move[];

  //temp pokes go into trade mini array. along with other things. 

  pokeInfoArr:Pokes[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(){
    let headers = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    this.userId = parseInt(token.substring(1, token.length).split(":")[0]);
    token = token.substring(1,token.length-1);
    headers = headers.set('Authentication', token);
    console.log(this.userId + " token: " + token);


    this.http.post<ServerTrainer>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id', this.userId, {headers: headers}).subscribe((retse)=>{
      this.serverTrainer = retse;

      this.http.post<ServerRequest[]>('http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trades/incoming', this.userId, {headers:headers}).subscribe((ret)=>{
        this.serverRequest = ret;
        console.log(this.serverRequest);
        console.log(this.serverTrainer);
        console.log(this.serverRequest);
        for(let i = 0; i < this.serverRequest.length; i++){
          
          console.log(typeof this.serverRequest[i].pkmn_2);

          if(typeof this.serverRequest[i].pkmn_1 === "number"){
            console.log("hey this is a number: " + typeof this.serverRequest[i].pkmn_1);
            this.http.post<ServerReqPokemon>("http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id",  this.serverRequest[i].pkmn_1, {headers:headers}).subscribe((pokemon1)=>{
              console.log(pokemon1);
              this.serverRequest[i].pkmn_1 = pokemon1;
            });
          }
          if(typeof this.serverRequest[i].pkmn_2 === "number"){
            console.log("hey this is a number: " + typeof this.serverRequest[i].pkmn_2);
            this.http.post<ServerReqPokemon>("http://ec2-3-19-77-116.us-east-2.compute.amazonaws.com:8080/poketie/Trainers/id",  this.serverRequest[i].pkmn_2, {headers:headers}).subscribe((pokemon2)=>{
              console.log(pokemon2);
              this.serverRequest[i].pkmn_2 = pokemon2;
            });
          }
               



          console.log(this.serverRequest);
          this.http.get<Pokes>("https://pokeapi.co/api/v2/pokemon/"+this.serverRequest[i].pkmn_1.pkmn_id).subscribe((poke1API) =>{
            console.log(poke1API);
            this.APIPoke1 = poke1API;
                
                this.http.get<Pokes>("https://pokeapi.co/api/v2/pokemon/"+this.serverRequest[i].pkmn_2.pkmn_id).subscribe((poke2API) =>{
                  console.log(poke2API);
                  this.APIPoke2 = poke2API;

                   
                 // this.tradeMiniArr.push(
                    /*this.tradeMini = {
                      id: poke1API.id,
                      poke1:{
                        id:poke1API.id,
                        custName: this.serverRequest[i].pkmn_1.nickname,
                        moveArr:[
                          this.APIPoke1.moves[this.serverRequest[i].pkmn_1.move_one].move.name,
                          this.APIPoke1.moves[this.serverRequest[i].pkmn_1.move_two].move.name,
                          this.APIPoke1.moves[this.serverRequest[i].pkmn_1.move_three].move.name,
                          this.APIPoke1.moves[this.serverRequest[i].pkmn_1.move_four].move.name
                        ],
                        dateAdded: this.serverRequest[i].pkmn_1.created,
                        name:this.APIPoke1.name,
                        sprite:this.APIPoke1.sprite.front_default,
                        type:this.APIPoke1.type
                    },
                    poke2:{
                      id:poke2API.id,
                        custName: this.serverRequest[i].pkmn_2.nickname,
                        moveArr:[
                          this.APIPoke2.moves[this.serverRequest[i].pkmn_2.move_one].move.name,
                          this.APIPoke2.moves[this.serverRequest[i].pkmn_2.move_two].move.name,
                          this.APIPoke2.moves[this.serverRequest[i].pkmn_2.move_three].move.name,
                          this.APIPoke2.moves[this.serverRequest[i].pkmn_2.move_four].move.name
                        ],
                        dateAdded: this.serverRequest[i].pkmn_2.created,
                        name:this.APIPoke2.name,
                        sprite:this.APIPoke2.sprite.front_default,
                        type:this.APIPoke2.type
                    },
                    user1:{
                      id: this.serverRequest[i].pkmn_1.trainer_id.id,
                      created: this.serverRequest[i].pkmn_1.trainer_id.created,
                      email: this.serverRequest[i].pkmn_1.trainer_id.email,
                      is_lead: this.serverRequest[i].pkmn_1.trainer_id.is_lead,
                      login: this.serverRequest[i].pkmn_1.trainer_id.login
                    },
                    user2:{
                      id: this.serverRequest[i].pkmn_2.trainer_id.id,
                      created: this.serverRequest[i].pkmn_2.trainer_id.created,
                      email: this.serverRequest[i].pkmn_2.trainer_id.email,
                      is_lead: this.serverRequest[i].pkmn_2.trainer_id.is_lead,
                      login: this.serverRequest[i].pkmn_2.trainer_id.login
                    }
                    }*/
                //);

                  //this.setInfo(this.APIPoke1, this.APIPoke2, i);
              //this.tradeMini.id = this.serverRequest.push
    //         });
          // }
    //       });
    //     });
      });
      });
    // } 
          }
        });
      });
    }


  setInfo(APIPoke1:Pokes, APIPoke2:Pokes, index:number){
    console.log(APIPoke1);
    console.log(APIPoke2);
    console.log(index);


  }

  showDownArrow(){
    console.log("Showing down arrow");
    this.downHidden = false;
    this.upHidden = true;
  }
  
  showUpArrow(){
    console.log("Showing up arrow");
    this.downHidden = true;
    this.upHidden = false;
  }

}
