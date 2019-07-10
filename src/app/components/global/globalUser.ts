import { Injectable } from '@angular/core';
import { Pokes } from 'src/app/models/Pokes';
import { PokeInfo } from 'src/app/models/PokeInfo';

@Injectable()
export class GlobalUser{
    id:number = 0;
    username: string = "";
    email: string = "";
    dateCreated:Date = new Date();
    pokeIds: PokeInfo[] = [];
}