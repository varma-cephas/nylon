import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database.connection';
import { drizzle } from "drizzle-orm/node-postgres"
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: (configService: ConfigService)=>{
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL_LOCAL')
                })
                return drizzle(pool, {
                    schema: {}
                })
            },
            inject: [ConfigService]
        }
    ]
})
export class DatabaseModule {}
