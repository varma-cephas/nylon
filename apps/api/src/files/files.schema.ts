import { bigint, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { pgTable , uuid} from "drizzle-orm/pg-core";

export const file = pgTable('files', {
    fileId: uuid('id').primaryKey(),
    fileName: text('name').notNull(),
    storageKey: varchar('storage_key', {length: 412}).notNull().unique(),
    fileSize: bigint('size', {mode: 'number'}).notNull(),
    fileType: text('type').notNull(),
    createdAt: timestamp('create_at', {withTimezone: true}).defaultNow().$defaultFn(()=> new Date()).notNull()
})