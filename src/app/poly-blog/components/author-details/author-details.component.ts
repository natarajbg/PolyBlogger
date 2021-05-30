import { Component, OnInit } from '@angular/core';
import { INewUser } from '../../models/newUser.model';
import { IUser } from '../../models/user.model';
import { BloggerService } from '../../services/blogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  user!: IUser;
  isNewUser = true;

  constructor(private bloggerService: BloggerService, private snackBar: MatSnackBar, private persistenceSerice: PersistenceService) { }

  ngOnInit(): void {
    this.user = <IUser>{};
    this.persistenceSerice.getUserInfo().subscribe(res => {
      this.user = res;
    });
    this.isNewUser = this.user.name ? false : true;
  }

  getUserDetails(selectedUser: IUser): void {
    this.isNewUser = false;
    this.user = selectedUser;
  }

  update(): void {
    const newUser = <INewUser>{
      name: this.user.name,
      email: this.user.email,
      status: this.user.status
    };
    this.bloggerService.updateUser(this.user.id, newUser).subscribe((response: any) => {
      if (response && response.data) {
        this.snackBar.open("Success", 'Close', { duration: 1000 });
      }
    });
  }

  createUser(): void {
    const newUser = <INewUser>{
      name: this.user.name,
      gender: this.user.gender,
      email: this.user.email,
      status: this.user.status
    };
    this.bloggerService.createUser(newUser).subscribe((response: any) => {
      if (response && response.data) {
        this.snackBar.open("Success", 'Close', { duration: 1000 });
      }
    });
  }  
}
