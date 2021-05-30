import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    private userData : BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as any);    
    getUserdata = this.userData.asObservable();    

    setUserInfo(user: IUser) {
        this.userData.next(user);
    }

    getUserInfo() {
        return this.userData;
    }
}