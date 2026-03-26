export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    role:"seller" | "buyer";
}

export interface Favourite{
    userId: number;
    propertyId:number;
}

export interface Property{
    id:number;
    name:string;
    location:string;
    price:number;
}