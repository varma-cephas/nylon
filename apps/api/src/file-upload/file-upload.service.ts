import { Injectable } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';
import { PresignUrlService } from 'src/presign-url/presign-url.service';

@Injectable()
export class FileUploadService {
  constructor( private presignUrlService: PresignUrlService ) {}
  async addPresignUrlToFilesMetadata(filesMetaData: ReceiveFileMetadataDto) {
    return await this.presignUrlService.generateFilesPresignedUrl(filesMetaData)
  }
}
