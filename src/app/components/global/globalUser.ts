import { Injectable } from '@angular/core';
import { Pokes } from 'src/app/models/Pokes';
import { PokeInfo } from 'src/app/models/PokeInfo';

@Injectable()
export class GlobalUser{
    username: string = ""
    email: string = ""
    dateCreated:string =  ""
    pokeIds: PokeInfo[] = [ {id: '25', moveArr:['1', '3', '9','17']},
                            {id:'132', moveArr:['0']},
                            {id: '39', moveArr:['3', '4', '10', '11']},
                            {id: '45', moveArr:['3', '56', '10', '20']},
                            {id: '56', moveArr:['6', '52', '19', '21']},
                            {id: '82', moveArr:['1', '36', '15', '24']}]
}