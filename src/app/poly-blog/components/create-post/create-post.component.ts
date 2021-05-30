import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INewPost } from '../../models/newPost.model';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post = <INewPost>{};
  userId: number = 0;

  constructor(private bloggerService: BloggerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  createNewPost(){
    this.bloggerService.createPost(this.userId, this.post).subscribe((response: any) => {
      if (response && response.data && (response.code == '200' ||  response.code == '201')) {
        this.snackBar.open("Successfully created new post", 'Close', { duration: 2000 });
      }
      else{
        this.snackBar.open("Failed to create new post", 'Close', { duration: 2000 });
      }      
    },
    ()=> {
      this.snackBar.open("Failed to create new post", 'Close', { duration: 2000 });
    });
  }

}
