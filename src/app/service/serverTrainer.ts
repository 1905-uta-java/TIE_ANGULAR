import { Injectable } from '@angular/core';

export interface ServerTrainer{
    id:number;
    created:Date;
    login:string;
    email:string;
    team_id:ServerTeam;
    is_lead:number;
    pokemon:Array<ServerPokemon>;
} //end of ... things

export interface ServerTeam{
    id:number;
    created:Date;
    team_name:string;
    team_mates:Array<ServerTrainer>;
} //end 

export interface ServerPokemon{
    id:number;
    created:Date;
    pkmn_id:number;
    trainer_id: ServerTrainer;
    move_one:string;
    move_two:string;
    move_three:string;
    move_four:string;
    nickname:string;
    
} //end of ... things

export interface ServerReqPokemon{
    id:number;
    created:Date;
    pkmn_id:number;
    move_one:string;
    trainer_id:ServerTrainer;
    move_two:string;
    move_three:string;
    move_four:string;
    nickname:string;
    pokemon:ServerPokemon;
    team_id:ServerTeam;

}

export interface ServerRequest{
    id:number,
    pkmn_1:ServerReqPokemon,
    pkmn_2:ServerReqPokemon
}