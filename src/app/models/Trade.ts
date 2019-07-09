import { TeammateInfo } from './TeammateInfo';

export interface Trade{
    tradeId: number,
    type:string,
    teammate: TeammateInfo,
    pokeId:number,
    status:string
}