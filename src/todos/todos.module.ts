import { DatabaseService } from 'src/db/db.service';
import { DbModule } from './../db/db.module';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [DbModule],
  controllers: [TodosController],
  providers: [TodosService, DatabaseService],
})
export class TodosModule {}
