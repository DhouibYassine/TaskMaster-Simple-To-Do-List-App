/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true

    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
