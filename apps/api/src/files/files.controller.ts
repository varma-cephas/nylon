import { Controller, Body, Post, Get } from '@nestjs/common';
import { ReceiveFileMetadataDto, ReceiveFileMetadataWithPresignUrlDto } from '@repo/api';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(public readonly filesService: FilesService) { }
    @Get()
    async getAll(){
      return this.filesService.getAll()
    }
    @Post('metadata')
    async receiveFilesMetaData(@Body() filesMetaData: ReceiveFileMetadataDto) {
      const filesWithPresignUrl: ReceiveFileMetadataWithPresignUrlDto = await this.filesService.addPresignUrlToFilesMetadata(filesMetaData)
      return filesWithPresignUrl;
    }
    @Post('confirm-upload')
    async receiveUploadConfirmation(@Body() fileIds:{ id: string []}){
      return this.filesService.confirmUpload(fileIds)
    }
}
