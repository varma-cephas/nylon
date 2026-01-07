import type { FileMetaDataWithPresignUrlDTO } from '@repo/api'
import type { Dispatch, SetStateAction } from 'react'


export interface FilesType extends FileMetaDataWithPresignUrlDTO {
  fileRawInfo: File
}

export interface PickFilePropTypes {
  setFiles: Dispatch<SetStateAction<Array<FilesType> | null>>
}

export interface FileListType {
  files: Array<FilesType> | null
  setFiles: Dispatch<SetStateAction<Array<FilesType> | null>>
  uploads: {[key: string]: { progress: number, status: string }}
}
