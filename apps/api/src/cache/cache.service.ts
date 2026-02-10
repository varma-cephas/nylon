import { Injectable } from '@nestjs/common';
import { FileMetaDataDBInsert } from '@repo/api';
import { IKVStore } from './interface/kv-store.interface';

@Injectable()
export class CacheService implements IKVStore {
    private store = new Map<string, {value: FileMetaDataDBInsert, expires: number | null}>()
    
    async put(key:string, value: FileMetaDataDBInsert, options: {expirationTtl: number}){
        const expires = options.expirationTtl ? Date.now() + options.expirationTtl * 1000 : null
        this.store.set(key, {value, expires})
    }

    async get(key: string){
        const item = this.store.get(key)
        if(!item) return null
        if(item.expires && Date.now() > item.expires){
            this.store.delete(key)
            return null
        }
        return item.value
    }

    async delete(key: string){
        this.store.delete(key)
    }
}
