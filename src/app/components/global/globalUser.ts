import { Injectable } from '@angular/core';
import { PokeInfo } from 'src/app/models/PokeInfo';
import { empty } from 'rxjs';


@Injectable()
export class GlobalUser{
    id:number = 0;
    username: string = "";
    email: string = "";
    is_lead:number = null;
    dateCreated:Date = new Date();
    pokeIds: PokeInfo[] = [];
    auth:string

    empty(){
        this.id= 0;
        this.username = "";
        this.email = "";
        this.dateCreated= new Date();
        this.pokeIds = [];
        this.auth = '';
    }
}