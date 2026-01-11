import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, FilesModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
