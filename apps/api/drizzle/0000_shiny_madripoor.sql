CREATE TABLE "files" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userId" uuid NOT NULL,
	"storage-key" varchar(412) NOT NULL,
	"size" bigint NOT NULL,
	"type" text NOT NULL,
	"date" date NOT NULL,
	CONSTRAINT "files_storage-key_unique" UNIQUE("storage-key")
);
