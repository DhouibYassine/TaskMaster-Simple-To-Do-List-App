import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>) {}

  async create(todo: Todo): Promise<Todo> {
    const newTodo = await this.todoModel.create(todo);
    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo list not found.');
    }
    return todo;
  }

  async updateById(id: string, todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });

  }

  async deleteById(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id);
  }
}
