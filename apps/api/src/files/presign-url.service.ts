import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReceiveFileMetadataDto, ReceiveFileMetadataWithPresignUrlDto } from '@repo/api';
import {v4 as uuidv4} from "uuid"

@Injectable()
export class PresignUrlService {
    private readonly s3Client: S3Client
    private readonly bucketName: string
    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${this.configService.getOrThrow('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: this.configService.getOrThrow('ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('SECRET_ACCESS_KEY')
            }
        })
        this.bucketName = this.configService.getOrThrow('BUCKET_NAME')
    }
    private async presignUrl(fileName: string, fileType:string, fileSize: number){
        const fileId = uuidv4()
        const uniqueFileKey = `${uuidv4()}-${fileName}`
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: uniqueFileKey,
            ContentType: fileType,
            ContentLength: fileSize
        })
        const url = await getSignedUrl(this.s3Client, command, {expiresIn: 30})
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
