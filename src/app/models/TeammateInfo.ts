import { PokeInfo } from './PokeInfo';

export interface TeammateInfo{
    username:string,
    pokes:PokeInfo[],
    level: string
}