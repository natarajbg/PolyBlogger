import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../models/user.model';
import { BloggerService } from '../../services/blogger.service';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'gender', 'action'];
  authorList: IUser[] = [];
  currentPage = 0;
  pageLength = 0;
  limit = 0;
  deleteIcon = faTrashAlt;
  editIcon = faEdit;

  constructor(private bloggerService: BloggerService, private router: Router,
    private persistencService: PersistenceService, private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(pageNum?: number) {
    pageNum = pageNum ? pageNum : this.currentPage;
    this.bloggerService.getUsers(pageNum).subscribe((response: any) => {
      if (response && response.data) {
        this.limit = response.meta && response.meta.pagination && response.meta.pagination.limit ? response.meta.pagination.limit : 20;
        this.pageLength = response.meta && response.meta.pagination && response.meta.pagination.total ? response.meta.pagination.total : 20;
        this.authorList = response.data;
      }
    });
  }

  getPaginatorData(page: PageEvent) {
    this.getAllUsers(page.pageIndex + 1);
  }

  onDelete(user: IUser) {
    this.bloggerService.deleteUser(user.id).subscribe(res => {  
      this.snackBar.open("Successfully deleted user " + user.name, 'Close', { duration: 1000 });    
      this.getAllUsers();
    });
  }

  onEdit(user: IUser) {
    this.persistencService.setUserInfo(user);
    this.router.navigate(['author']);
  }

  createUser() {
    this.persistencService.setUserInfo(<IUser>{});
    this.router.navigate(['author']);
  }
}
