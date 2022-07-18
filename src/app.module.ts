import { DbModule } from './db/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [DbModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
