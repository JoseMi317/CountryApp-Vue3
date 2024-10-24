export interface Country{
    name: {
        common: string
    },
    capital: string[];
    cca3 : String;
    flags : {
        alt : string;
        png : string;
    },
    population : number;
    region : string;
}