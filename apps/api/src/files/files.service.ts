import { Injectable } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';
import { PresignUrlService } from './presign-url.service';

@Injectable()
export class FilesService {
    constructor( private presignUrlService: PresignUrlService ) {}
    async addPresignUrlToFilesMetadata(filesMetaData: ReceiveFileMetadataDto) {
      return await this.presignUrlService.generateFilesPresignedUrl(filesMetaData)
    }
}

