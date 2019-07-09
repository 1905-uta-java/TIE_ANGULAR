import { Injectable } from '@angular/core';
import { TeammateInfo } from 'src/app/models/TeammateInfo';
import { Team } from 'src/app/models/Team';
import { Trade } from 'src/app/models/Trade';


@Injectable()
export class GlobalTrades{
    trade: Trade[] = [];
    
    //returns all existing teams
    getAllTradeReqs(){
        return this.trade;
    }

    getAllTradeLength(){
        return this.trade.length;
    }

    //returns teammates of specified team
    getTradesFromTeammate(username:string){
        let userTrade: Trade[] = [];
        for(let i = 0; i < this.trade.length; i++){
            if(this.trade[i].teammate.username === username){
                userTrade.push(this.trade[i]); 
            }
        }
        return userTrade;
    }

    //set team variable to parameterized variable 
    setAllTrades(allTrades:Trade[]){
        this.trade = allTrades;
    }

    //gets a single teammate from a team
    findSingleTrade(tradeId:Number){
        for(let i = 0; i < this.trade.length; i++){
            if(this.trade[i].tradeId === tradeId){
                return this.trade[i];
            }
        }
    }
    
    setStatus(tradeId:number, status:string){
        for(let i = 0; i < this.trade.length; i++){
            if(this.trade[i].tradeId === tradeId){
                this.trade[i].status = status;
            }
        }
    }
    
    setType(tradeId:number, type:string){
        for(let i = 0; i < this.trade.length; i++){
            if(this.trade[i].tradeId === tradeId){
                this.trade[i].type = type;
            }
        }
    }


    addRequest(newTrade:Trade){
        if(this.trade.includes(newTrade) === false ){
            this.trade.push(newTrade);
            return true;
        } else {
            return false;
        }
    }

    deleteRequest(tradeId:number){
        for(let i = 0; i < this.trade.length; i++){
            if(this.trade[i].tradeId === tradeId){
                this.trade.splice(i, 1);
            }
        }
    }

} //end of ... things