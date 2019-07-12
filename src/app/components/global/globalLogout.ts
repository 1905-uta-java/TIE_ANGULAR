import { GlobalPokes } from './globalPokes';
import { GlobalTeam } from './globalTeam';
import { GlobalTrades } from './globalTrades';
import { GlobalUser } from './globalUser';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalLogout{
    globalPokes:GlobalPokes;
    globalTeam:GlobalTeam;
    globalTrades:GlobalTrades;
    globalUser:GlobalUser;
    
    logout(){
        console.log("Empting everything!");
        this.globalPokes.empty();
        this.globalTeam.empty();
        this.globalTrades.empty();
        this.globalUser.empty();
    }
}
