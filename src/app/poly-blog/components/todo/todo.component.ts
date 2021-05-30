import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ITodoList } from '../../models/todoList.model';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userId', 'title', 'completed'];
  currentPage = 0;
  pageLength = 0;
  limit = 0;
  todoList: ITodoList[] = [];

  constructor(private bloggerService: BloggerService) { }

  ngOnInit(): void {
    this.getAllTodoList(0);
  }

  getAllTodoList(pageNum: number): void{
    this.bloggerService.getTodoList(pageNum).subscribe((response: any) => {
      if (response && response.data) {
        this.limit = response.meta && response.meta.pagination && response.meta.pagination.limit ? response.meta.pagination.limit : 20;
        this.pageLength = response.meta && response.meta.pagination && response.meta.pagination.total ? response.meta.pagination.total : 20;
        this.todoList = response.data;
      }
    });
  }

  getPaginatorData(page: PageEvent) {
    this.getAllTodoList(page.pageIndex + 1);
  }

}
