import { Status } from "./status.model";

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: Status,
    created_at: Date,
    updated_at: Date
}