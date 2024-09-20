/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() 
    todo: CreateTodoDto
  ): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get()
  async getAlltodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: string
  ): Promise<Todo> {
    return this.todoService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body() 
    todo: UpdateTodoDto
  ): Promise<Todo> {
    return this.todoService.updateById(id, todo);
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id')
    id: string
  ): Promise<Todo> {
    return this.todoService.deleteById(id);
  }
}
