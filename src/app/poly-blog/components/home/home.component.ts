import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IBlogs } from '../../models/blogs.model';
import { IUser } from '../../models/user.model';
import { BloggerService } from '../../services/blogger.service';
import { AuthorDetailsComponent } from '../author-details/author-details.component'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(AuthorDetailsComponent, { static: true }) authorInstance!: AuthorDetailsComponent;
  iconVal = faTrashAlt;
  blogList: IBlogs[] = [];
  user!: IUser;
  showUserDetails = false;
  currentPage = 0;
  pageLength = 0;
  limit = 0;
  showPagination = false;

  constructor(private bloggerService: BloggerService) { }

  ngOnInit(): void {
    this.showUserDetails = false;
    this.getAllBlogs(this.currentPage);
  }

  getAllBlogs(pageNum: number) {
    this.bloggerService.getPosts(pageNum).subscribe((response: any) => {
      if (response && response.data) {
        this.loadPosts(response);
      }
    });
  }

  loadPosts(response: any) {
    this.blogList = [];
    this.limit = response.meta && response.meta.pagination && response.meta.pagination.limit ? response.meta.pagination.limit : 20;
    this.pageLength = response.meta && response.meta.pagination && response.meta.pagination.total ? response.meta.pagination.total : 20;
    this.blogList = response.data;
    this.showPagination = this.pageLength > 20 ? true : false;
  }

  getUser(blog: IBlogs) {
    this.bloggerService.getUser(blog.user_id).subscribe((response: any) => {
      if (response && response.data) {
        blog.user_name = response.data.name;
        this.user = response.data;
      }
    });
  }

  onDelete(blog: IBlogs): void {
    this.blogList = this.blogList.filter(item => item.id !== blog.id);
  }

  openPanel(blog: IBlogs): void {
    this.getUser(blog);
  }

  loadUserDetails() {
    if (this.authorInstance) {
      this.authorInstance.getUserDetails(this.user);
      this.showUserDetails = true;
      this.retrieveUserPosts();
    }
  }

  retrieveUserPosts() {
    this.bloggerService.getUserPosts(this.user.id).subscribe((response: any) => {
      if (response && response.data) {
        this.loadPosts(response);
      }
    });
  }

  getPaginatorData(page: PageEvent) {
    this.getAllBlogs(page.pageIndex + 1);
  }

}
