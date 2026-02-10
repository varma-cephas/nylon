import { IsString, IsNumber, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FileMetaDataDTO {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsNumber()
  @Min(1)
  @Max(500 * 1024 * 1024) //limits the file size uploaded
  fileSize: number;
}

export class FileMetaDataWithPresignUrlDTO extends FileMetaDataDTO {
  @IsString()
  fileId: string
  presignedUrl: string
}

export class FileMetaDataDBInsert extends FileMetaDataDTO {
  fileId: string
  storageKey: string
}

export class ReceiveFileMetadataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetaDataDTO)
  files: FileMetaDataDTO[];
}

export class ReceiveFileMetadataWithPresignUrlDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetaDataWithPresignUrlDTO)
  files: FileMetaDataWithPresignUrlDTO[];
}