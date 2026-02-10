# nylon drive

A lightweight file storage system. High-performance streaming to Cloudflare R2, PostgreSQL for metadata, and a Vite frontend.

Key Architecture
- Hybrid Storage: Files go to R2; metadata stays in Postgres.
- In-Memory Cache: Uses NestJS CacheModule to handle temporary file state during uploads (no Redis required).
- Type Safety: Shared DTOs between API and Frontend via internal workspace packages.
- RBAC: Simple role column in the user table with NestJS Guards for Admin/User access.

Getting Started
1. Install dependencies
```Bash
pnpm install
```
2. Environment
- Create a .env in packages/api:
- DATABASE_URL: Postgres connection string.
- R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY: Cloudflare credentials.
- R2_ENDPOINT: S3-compatible endpoint.
3. Database Migrations
To start adding or fetching files from the DB, ensure you run:
```Bash
# This generates the migration scripts
drizzle-kit generate

# This starts the actual migration
pnpm run start:migra-gen
```

4. Run Development
```Bash
pnpm run dev
```

5. Structure
- apps/frontend: React + TanStack Query + Tailwind.
- packages/api: NestJS + Drizzle + AWS SDK (S3).
- packages/typescript-config: Shared tsconfig base.
