import { Status } from "./status.model";

export interface INewUser {
    name: string,
    email: string,
    gender?: string,
    status: Status  
}