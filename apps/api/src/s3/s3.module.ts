import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { BUCKET_NAME, S3_CONNECTION } from './s3.connection';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [{
        provide: S3_CONNECTION,
        useFactory: (configService: ConfigService, s3Client: S3Client) => {
            s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${configService.getOrThrow('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: configService.getOrThrow('ACCESS_KEY_ID'),
                secretAccessKey: configService.getOrThrow('SECRET_ACCESS_KEY')
            }
            })
            return s3Client
        },
        inject: [ConfigService]
        },
        {
        provide: BUCKET_NAME,
        useFactory: (configService: ConfigService) => {
            return configService.getOrThrow('BUCKET_NAME')
        },
        inject: [ConfigService]
        },
    ],
    exports: [S3_CONNECTION, BUCKET_NAME]
})
export class S3Module {}
