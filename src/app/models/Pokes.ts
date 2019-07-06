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
    name:string,
    moves:Array<Move>,
    type: [],
    id: string
    //Array<Sprite>,
    //move:Array<Moves>,
    //type: Array<Types>,
}

export interface Move{
    move:{name:string}
}

interface Types{
    name: string
}