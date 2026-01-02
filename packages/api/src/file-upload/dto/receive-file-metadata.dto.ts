import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FileMetaDataDTO {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsNumber()
  fileSize: number;
}

export class ReceiveFileMetadataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetaDataDTO)
  files: FileMetaDataDTO[];
}