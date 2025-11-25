import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
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

  private readonly STORAGE_KEY='todoItems';

  ngOnInit() {
    const savedTodos = this.loadTodosFromStorage();

    if (savedTodos && savedTodos.length > 0) {
      this.todoItems.set(savedTodos);
    } 
  // else {
  //     this.toDoService.getTodosFromApi().pipe(
  //       catchError((err) => {
  //       console.log(err);
  //       throw err;
  //     })
  //   ).subscribe(todos => {
  //     this.todoItems.set(todos)
  //   })
  // }
  }

  loadTodosFromStorage():Todo[] | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return null;
    }
  }

  saveTodosToStorage(todos: Todo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }

  toggleTodo(id: number) {
    this.todoItems.update(todos => {
      const updated = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.saveTodosToStorage(updated);
      return updated;
    });
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
      this.todoItems.update(items => {
        const updatedItems = [...items, newTodo];
        this.saveTodosToStorage(updatedItems);
        return updatedItems;
      });
      this.showAddInput.set(false);
    }
  }

  cancelAddTodo() {
    this.showAddInput.set(false);
  }

  deleteTodo(id: number) {
    this.todoItems.update(items => {
      const updated = items.filter(todo => todo.id !== id);
      this.saveTodosToStorage(updated);
      return updated;
    });
  }
}
