import { Inject, Injectable, Logger } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';
import { PresignUrlService } from './presign-url.service';
import { CacheService } from 'src/cache/cache.service';
import { DATABASE_CONNECTION } from 'src/database/database.connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from "./files.schema"
import { desc } from 'drizzle-orm';

@Injectable()
export class FilesService {
    private readonly logger = new Logger(FilesService.name)
    constructor( @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema> , private presignUrlService: PresignUrlService, private cacheService: CacheService ) {}

    async getAll() {
      return await this.database.select().from(schema.file).orderBy(desc(schema.file.createdAt))
    }

    async addPresignUrlToFilesMetadata(filesMetaData: ReceiveFileMetadataDto) {
      const data = await this.presignUrlService.generateFilesPresignedUrl(filesMetaData)
      data.files.forEach(file => this.cacheService.put(file.fileId, { fileId: file.fileId, fileName: file.fileName, fileSize: file.fileSize, fileType: file.fileType, storageKey: `${file.fileId}-${file.fileName}` }, {expirationTtl: null}))
      return data
    }

    async confirmUpload(fileIds:{ id: string []}){
      for(const id of fileIds.id){
       const cachedFile = await this.cacheService.get(id)
       if(cachedFile){
        const insertFile: typeof schema.file.$inferInsert = {
          fileId: cachedFile.fileId,
          fileName: cachedFile.fileName,
          fileSize: cachedFile.fileSize,
          fileType: cachedFile.fileType,
          storageKey: cachedFile.storageKey
        }
        try{ 
          await this.database.insert(schema.file).values(insertFile)
          this.logger.log('item added successfully')
        }catch(error){
          this.logger.error(error)
        }
       }
      }
      return fileIds.id
    }
}

