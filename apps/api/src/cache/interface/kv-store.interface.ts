import { FileMetaDataDBInsert } from '@repo/api';

export interface IKVStore {
  get(key: string): Promise<FileMetaDataDBInsert | null>;
  put(key: string, value: FileMetaDataDBInsert, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}