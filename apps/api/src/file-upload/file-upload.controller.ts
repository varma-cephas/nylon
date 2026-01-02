import { Controller, Body, Post } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(public fileUploadService: FileUploadService) {}
  @Post('metadata')
  receiveFilesMetaData(@Body() filesMetaData: ReceiveFileMetadataDto) {
    return this.fileUploadService.receiveFilesMetaData(filesMetaData);
  }
}
