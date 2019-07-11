import { Injectable } from '@angular/core';
import { TeammateInfo } from 'src/app/models/TeammateInfo';
import { Team } from 'src/app/models/Team';


@Injectable()
export class GlobalAllTeams{
    team: Team[];
    
    //returns all existing teams
    getAllTeams(){
        return this.team;
    }

    getAllTeamLength(){
        return this.team.length;
    }

    //returns team_mates of specified team
    getteam_matesFromTeam(teamName:string){
        for(let i = 0; i < this.team.length; i++)
            if(this.team[i].teamName == teamName)
                return this.team[i];
    }


    //gets a single teammate from a team
    findSingleTeammate(username:string){
        for(let i = 0; i < this.team.length; i++)
            for(let j = 0; j < this.team[i].team_mates.length; j++)
                if(this.team[i].team_mates[j].username === username)
                    return this.team[i].team_mates[j];
    }
    
    // returns entire team that teammate is apart of
    getTeammateTeam(username:string){
        for(let i = 0; i < this.team.length; i++)
            for(let j = 0; j < this.team[i].team_mates.length; j++)
                if(this.team[i].team_mates[j].username === username)
                    return this.team[i];
    }

    //if you know the teamName and username of user in team, then return that users info
    getTeammateOfTeam(username:string, teamName:String){
        for(let i = 0; i < this.team.length; i++)
            if(this.team[i].teamName === teamName)
                for(let j = 0; j < this.team[i].team_mates.length; j++)
                    if(this.team[i].team_mates[j].username == username)
                        return this.team[i].team_mates[j];
    }


    //set team variable to parameterized variable 
    setAllTeams(allTeams: Team[]){
        this.team = allTeams;
    }

    //ADMIN ONLY: sets the team name. 
    //Also might interact with DB when it's all said and done.
    // returns true if team was found and name was updated successfully
    // return false if team wasn't found, or...idk some other error occured 
    setTeamName(oldTeamName:string, newTeamName:string){
        //check if user is admin first, then it's all good
        for(let i = 0; i < this.team.length; i++)
            if(this.team[i].teamName === oldTeamName)
                this.team[i].teamName = newTeamName;
                return true;
        return false;
    }

    //ADMIN ONLY...kinda?
    //adds user to a team
    addUserToTeam(user:TeammateInfo, teamName:string){
        for(let i = 0; i < this.team.length; i++)
            if(this.team[i].teamName === teamName)
                if(this.team[i].team_mates.length < 10)
                    for(let j = 0; j < this.team[i].team_mates.length; j++)
                        this.team[i].team_mates.push(user);
    }

} //end of ... things