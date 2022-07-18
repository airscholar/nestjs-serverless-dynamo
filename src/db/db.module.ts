import { DatabaseService } from './db.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DbModule {}
