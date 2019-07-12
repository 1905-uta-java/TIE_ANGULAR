import { UserPokes } from './UserPokes';
import { UserInfo } from './UserInfo';

export interface TradeMini{
    id: number,
    user1:UserInfo,
    poke1:UserPokes,
    user2:UserInfo,
    poke2:UserPokes,
}