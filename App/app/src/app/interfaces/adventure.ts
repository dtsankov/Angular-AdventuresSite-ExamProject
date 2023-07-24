import { IUser } from "./user";

export interface IAdventure{
    _id: string;
    title: string;
    description: string[];
    price: number;
    img: string;
    _ownerId: IUser;
    likes: [];
}