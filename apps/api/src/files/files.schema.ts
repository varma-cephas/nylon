import { bigint, date, text, varchar } from "drizzle-orm/pg-core";
import { pgTable , uuid} from "drizzle-orm/pg-core";

export const file = pgTable('files', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    userId: uuid('userId').notNull(),
    storageKey: varchar('storage-key', {length: 412}).notNull().unique(),
    size: bigint('size', {mode: 'number'}).notNull(),
    type: text('type').notNull(),
    createdAt: date('date').notNull(),
})