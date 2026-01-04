import { Module } from '@nestjs/common';
import { PresignUrlModule } from 'src/presign-url/presign-url.module';


@Module({
    imports: [PresignUrlModule]
})
export class FileUploadModule {}
