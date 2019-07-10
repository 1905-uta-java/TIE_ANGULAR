import { Injectable } from '@angular/core';

export interface ServerTrainer{
    id:number;
    created:Date;
    login:string;
    email:string;
    team_id:ServerTeam[];
    is_lead:number;
    pokemon:ServerPokemon[];
} //end of ... things

export interface ServerTeam{
    id:number;
    created:Date;
    team_name:string;
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