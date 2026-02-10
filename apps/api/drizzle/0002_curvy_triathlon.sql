ALTER TABLE "files" RENAME COLUMN "storage-key" TO "storage_key";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "date" TO "create_at";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_storage-key_unique";--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_storage_key_unique" UNIQUE("storage_key");