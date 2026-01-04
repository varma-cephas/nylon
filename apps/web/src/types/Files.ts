import type { FileMetaDataWithPresignUrlDTO } from '@repo/api'

export interface FilesType extends FileMetaDataWithPresignUrlDTO {
  fileRawInfo: File
}
