import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ReceiveFileMetadataDto, ReceiveFileMetadataWithPresignUrlDto } from '@repo/api';
import { BUCKET_NAME, S3_CONNECTION } from 'src/s3/s3.connection';
import {v4 as uuidv4} from "uuid"

@Injectable()
export class PresignUrlService {
    constructor(@Inject(S3_CONNECTION) private readonly s3Connection: S3Client, @Inject(BUCKET_NAME) private readonly bucketName: string) {}

    private async presignUrl(fileName: string, fileType:string, fileSize: number){
        const fileId = uuidv4()
        const uniqueFileKey = `${fileId}-${fileName}`
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: uniqueFileKey,
            ContentType: fileType,
            ContentLength: fileSize
        })
        const url = await getSignedUrl(this.s3Connection, command, {expiresIn: 30})
        return {
            url: url,
            fileId: fileId,
            key: uniqueFileKey
        }
    }

    async generateFilesPresignedUrl(filesMetaData: ReceiveFileMetadataDto): Promise<ReceiveFileMetadataWithPresignUrlDto>{
        const filesWithPresignUrl = await Promise.all(
            filesMetaData.files.map( async file=> {
            const generatedFileData = await this.presignUrl(file.fileName, file.fileType, file.fileSize)
            return {
                ...file,
                fileId: generatedFileData.fileId,
                presignedUrl: generatedFileData.url
            }
        })
        )
        return {files: filesWithPresignUrl}
    }
}
