import { PokeInfo } from './PokeInfo';
import { UserPokes } from './UserPokes';

export interface TeammateInfo{
    username:string,
    pokes:PokeInfo[],
    level: string,
    userPokeArr: UserPokes[]
}