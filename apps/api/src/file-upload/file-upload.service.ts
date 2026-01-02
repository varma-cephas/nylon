import { Injectable } from '@nestjs/common';
import { ReceiveFileMetadataDto } from '@repo/api';

@Injectable()
export class FileUploadService {
  receiveFilesMetaData(filesMetaData: ReceiveFileMetadataDto) {
    console.info('changed metadata')
    console.info(filesMetaData);
    return filesMetaData;
  }
}
