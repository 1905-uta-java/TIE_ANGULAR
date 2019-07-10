import { TeammateInfo } from './TeammateInfo';

export interface Team{
    id:number,
    created:Date,
    teamName:string,
    teammates: TeammateInfo[];
}