# nylon drive

A lightweight file storage system. High-performance streaming to Cloudflare R2, PostgreSQL for metadata, and a React frontend.

### Architecture
 - Hybrid Storage: Files go to R2; metadata stays in Postgres.
 - In-Memory Cache: Uses NestJS CacheModule to handle temporary file state during uploads.
 - Type Safety: Shared DTOs between API and Frontend via internal workspace packages.
 - RBAC: Simple role column in the user table with NestJS Guards for Admin/User access.

### Getting Started
1. Install dependencies
```Bash
pnpm install
```
2. Environment variables
Create a .env in apps/api directory the based on the `.env.example` file.

3. Start the database
```Bash
pnpm run start:db
```

3. Database Migrations
To start adding or fetching files from the DB, ensure you `cd` **into the apps/api directory** and run:

```Bash
# This generates the migration scripts
pnpm run start:migra

# This starts the actual migration
pnpm run start:migra-gen
```

4. Run Development
```Bash
pnpm run dev
```

5. Stop DB
```Bash
pnpm run start:db:down
```

### Structure
  - apps/frontend: React + TanStack Query + Tailwind.
  - apps/api: NestJS + Drizzle + AWS SDK (S3).
  - packages/typescript-config: Shared tsconfig base.
  - packages/api: Shared types.