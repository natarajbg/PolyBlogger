import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INewUser } from '../models/newUser.model';
import { INewPost } from '../models/newPost.model';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  baseUrl = "https://gorest.co.in/public-api/";

  constructor(private http:HttpClient) { }

  getPosts(page: number){
    return this.http.get(this.baseUrl + 'posts?page=' + page);
  }

  getUsers(page: number){
    return this.http.get(this.baseUrl + 'users?page=' + page);
  }

  getTodoList(page: number){
    return this.http.get(this.baseUrl + 'todos?page=' + page);
  }

  getUser(id: number){
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  getUserPosts(id: number){
    return this.http.get(this.baseUrl + 'users/' + id + "/posts");
  }

  createUser(user: INewUser) {
    return this.http.post(this.baseUrl + 'users', user, httpOptions);
  }

  updateUser(userId: number, user: INewUser) {
    return this.http.put(this.baseUrl + 'users/' + userId, user, httpOptions);
  }

  createPost(userId: number, newPost: INewPost) {
    return this.http.post(this.baseUrl + 'users/' + userId +'/posts', newPost, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'users/' + id, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
  'Authorization' : 'Bearer 7a1b1a04ca1a4e1cf2f785028076658df7be0701467b4911baea7f0ea35776a0' })
};
