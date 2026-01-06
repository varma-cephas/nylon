import { Controller, Body, Post } from '@nestjs/common';
import { ReceiveFileMetadataDto, ReceiveFileMetadataWithPresignUrlDto } from '@repo/api';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(public fileUploadService: FileUploadService) {}
  @Post('metadata')
  async receiveFilesMetaData(@Body() filesMetaData: ReceiveFileMetadataDto) {
    const filesWithPresignUrl: ReceiveFileMetadataWithPresignUrlDto = await this.fileUploadService.addPresignUrlToFilesMetadata(filesMetaData)
    console.info(filesWithPresignUrl)
    return filesWithPresignUrl
  }
}
