import { Controller, Body, Post } from '@nestjs/common';
import { ReceiveFileMetadataDto, ReceiveFileMetadataWithPresignUrlDto } from '@repo/api';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(public readonly filesService: FilesService) { }
    @Post('metadata')
    async receiveFilesMetaData(@Body() filesMetaData: ReceiveFileMetadataDto) {
      const filesWithPresignUrl: ReceiveFileMetadataWithPresignUrlDto = await this.filesService.addPresignUrlToFilesMetadata(filesMetaData)
      return filesWithPresignUrl;
    }
}
