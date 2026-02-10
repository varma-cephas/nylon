ALTER TABLE "files" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "create_at" SET DEFAULT now();