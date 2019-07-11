import { Injectable } from '@angular/core';
import { TeammateInfo } from 'src/app/models/TeammateInfo';


@Injectable()
export class GlobalTeam{
    private teamName:string;
    private teammates: TeammateInfo[] = [];

    //returns all teammates associated with the team
    getAllTeammates(){
        return this.teammates;
    }

    getTeammateLength(){
        return this.teammates.length;
    }

    //returns the team name
    getTeamName(){
        return this.teamName;
    }

    //gets a single teammate from a team
    getSingleTeammate(username:string){
        for(let i = 0; i < this.teammates.length; i++){
            if(this.teammates[i].username === username){
                return this.teammates[i]
            }
        }
    }

    // sets the teammates of a team
    setAllTeammates(teammateIn: TeammateInfo[]){
        this.teammates = teammateIn;
    }   

    //ADMIN ONLY: sets the team name. 
    //Also might interact with DB when it's all said and done.
    setTeamName(){
        //check if user is admin first, then it's all good
    }

    empty(){
        this.teamName = "";
        this.teammates = [];
    }

    
}