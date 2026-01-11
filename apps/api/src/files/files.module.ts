import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PresignUrlService } from './presign-url.service';

@Module({
  providers: [FilesService, PresignUrlService],
  controllers: [FilesController]
})
export class FilesModule {}


