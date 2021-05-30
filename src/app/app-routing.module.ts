import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './poly-blog/components/author-details/author-details.component';
import { AuthorsListComponent } from './poly-blog/components/authors-list/authors-list.component';
import { CreatePostComponent } from './poly-blog/components/create-post/create-post.component';
import { HomeComponent } from './poly-blog/components/home/home.component';
import { TodoComponent } from './poly-blog/components/todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'author', component: AuthorDetailsComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
