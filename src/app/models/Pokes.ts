export interface Pokes{
    sprite: {
        back_default: string,
        back_female: string,
        back_shiny: string,
        back_shiny_female: string,
        front_default: string,
        front_female: string,
        front_shiny: string,
        front_shiny_female: string
    },
    //Array<Sprite>,
    name:string,
    move:[],
    type: [],
    //move:Array<Moves>,
    //type: Array<Types>,
    id: string
}

interface Moves{
    name:String
}

interface Types{
    name: string
}