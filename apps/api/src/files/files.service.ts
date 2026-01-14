import { Injectable } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';
import { PresignUrlService } from './presign-url.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class FilesService {
    constructor( private presignUrlService: PresignUrlService, private cacheService: CacheService ) {}
    async addPresignUrlToFilesMetadata(filesMetaData: ReceiveFileMetadataDto) {
      const data = await this.presignUrlService.generateFilesPresignedUrl(filesMetaData)
      data.files.forEach(file => this.cacheService.put(file.fileId, file, {expirationTtl: null}))
      return data
    }
    async confirmUpload(fileIds: string []){
      return fileIds
    }
}

