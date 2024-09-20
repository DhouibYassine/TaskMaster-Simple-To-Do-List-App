import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo = { title: '', description: '' };
  isEditing = false;
  editIndex: number | null = null;
  apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
    this.getAllTodos();
  }

  getAllTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe(todos => {
      this.todos = todos;
    }, error => {
      console.error('Error fetching todos', error);
    });
  }

  addTodo() {
    this.http.post<Todo>(this.apiUrl, this.newTodo).subscribe(todo => {
      this.todos.push(todo);
      this.newTodo = { title: '', description: '' };
    }, error => {
      console.error('Error adding todo', error);
    });
  }

  editTodo(index: number) {
    this.isEditing = true;
    this.editIndex = index;
    this.newTodo = { ...this.todos[index] };
  }

  updateTodo() {
    if (this.editIndex !== null) {
      const todoToUpdate = { ...this.todos[this.editIndex], ...this.newTodo };
      this.http.put<Todo>(`${this.apiUrl}/${todoToUpdate._id}`, todoToUpdate).subscribe(updatedTodo => {
        if (this.editIndex !== null) {
          this.todos[this.editIndex] = updatedTodo;
        }
        this.isEditing = false;
        this.editIndex = null;
        this.newTodo = { title: '', description: '' };
      }, error => {
        console.error('Error updating todo', error);
      });
    }
  }

  deleteTodo(index: number) {
    const todoId = this.todos[index]._id;
    this.http.delete(`${this.apiUrl}/${todoId}`).subscribe(() => {
      this.todos.splice(index, 1);
    }, error => {
      console.error('Error deleting todo', error);
    });
  }

  toggleCompleted(index: number, completed: boolean) {
    const todoId = this.todos[index]._id;
    this.http.put<Todo>(`${this.apiUrl}/${todoId}`, { completed }).subscribe(updatedTodo => {
      this.todos[index].completed = updatedTodo.completed;
    }, error => {
      console.error('Error updating completed status', error);
    });
  }
}
