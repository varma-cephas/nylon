import { Module } from '@nestjs/common';
import { PresignUrlService } from './presign-url.service';

@Module({
    providers: [PresignUrlService],
    exports: [PresignUrlService]
})
export class PresignUrlModule {}
