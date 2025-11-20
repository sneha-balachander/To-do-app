import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root'
})

export class ToDo {
  http = inject(HttpClient);
  getTodosFromApi() {
    const url = "https://dummyjson.com/todos/random/3"
    return this.http.get<Todo[]>(url);
  }
}
