import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { CacheModule } from './cache/cache.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, FilesModule, CacheModule, S3Module],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
