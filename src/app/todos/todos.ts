import { Component, inject, OnInit, signal } from '@angular/core';
import { ToDo } from '../services/to-do';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  toDoService = inject(ToDo)
  todoItems = signal<Todo[]>([]);
  showAddInput = signal(false);
  newTodoText = signal('');

  ngOnInit() {
    this.toDoService.getTodosFromApi().pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe(todos => {
      this.todoItems.set(todos)
    })
  }

  toggleTodo(id: number) {
    this.todoItems.update(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  addNewTodo() {
    this.showAddInput.set(true);
    this.newTodoText.set('');
  }

  saveNewTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      const newTodo: Todo = {
        id: Date.now(),
        todo: text,
        completed: false,
        userId: 1
      };
      this.todoItems.update(items => [...items, newTodo]);
      this.showAddInput.set(false);
    }
  }

  cancelAddTodo() {
    this.showAddInput.set(false);
  }

  deleteTodo(id: number) {
    this.todoItems.update(items => items.filter(todo => todo.id !== id));
  }
}
