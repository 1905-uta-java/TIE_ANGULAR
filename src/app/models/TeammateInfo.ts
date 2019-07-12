import { PokeInfo } from './PokeInfo';
import { UserPokes } from './UserPokes';

export interface TeammateInfo{
    id:number,
    username:string,
    email:string,
    pokes:Array<PokeInfo>,
    //pokes:PokeInfo[],
    level: string,
    team_id:number,
    is_lead:number,
    userPokeArr: Array<UserPokes>
    // userPokeArr: UserPokes[]
}