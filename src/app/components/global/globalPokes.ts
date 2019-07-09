import { Injectable } from '@angular/core';
import { Pokes } from 'src/app/models/Pokes';
import { PokeInfo } from 'src/app/models/PokeInfo';
import { UserPokes } from 'src/app/models/UserPokes';

@Injectable()
export class GlobalPokes{
    private pokes: UserPokes[] =  [];
    
    getAllPokes(){
        return this.pokes;
    }

    getSinglePoke(id:number){
        for(let i = 0; i < this.pokes.length; i++){
            if(this.pokes[i].id === id.toString()){
                return this.pokes[i]
            }
        }
    }

    addPokes(userPoke: UserPokes){
        if(this.pokes.includes(userPoke) === false )
            this.pokes.push(userPoke);
    }

    setAllPokes(userPokesArr: UserPokes[]){
        this.pokes = userPokesArr;
    }

    getPokesLength(){
        return this.pokes.length;
    }

    empty(){
        this.pokes = [];
    }
}