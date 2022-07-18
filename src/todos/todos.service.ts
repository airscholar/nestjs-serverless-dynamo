import { DatabaseService } from 'src/db/db.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodosService {
  TABLE_NAME = 'TodosTable';

  constructor(private dbService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto) {
    const todoObj = {
      id: uuid(),
      ...createTodoDto,
    };

    try {
      return {
        message: 'Record created successfully!',
        data: await this.dbService
          .connect()
          .put({
            TableName: this.TABLE_NAME,
            Item: todoObj,
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll() {
    try {
      return {
        message: 'Retrieved successfully!',
        data: await this.dbService
          .connect()
          .scan({
            TableName: this.TABLE_NAME,
          })
          .promise(),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string) {
    try {
      return {
        message: 'Retrieved successfully!',
        data: await this.dbService
          .connect()
          .get({
            TableName: this.TABLE_NAME,
            Key: { id },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      return {
        message: 'Updated!',
        data: await this.dbService
          .connect()
          .update({
            TableName: this.TABLE_NAME,
            Key: { id },
            UpdateExpression:
              'set #variable1 = :x, #variable2 = :y, #variable3 = :z',
            ExpressionAttributeNames: {
              '#variable1': 'title',
              '#variable2': 'description',
              '#variable3': 'isCompleted',
            },
            ExpressionAttributeValues: {
              ':x': updateTodoDto.title,
              ':y': updateTodoDto.description,
              ':z': updateTodoDto.isCompleted,
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      return {
        message: 'Deleted!',
        data: await this.dbService
          .connect()
          .delete({
            TableName: this.TABLE_NAME,
            Key: { id },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
