-- Tutor MX production evidence queries (read-only).
-- Run each statement in the Neon SQL Editor on the tutor-mx-system "production" branch.
-- Results contain only table names, roles and counts; no personal row values are returned.

-- 1. Row count for every table in the public schema, counted automatically.
SELECT table_name,
  (xpath('/row/c/text()', query_to_xml(
     format('SELECT count(*) AS c FROM public.%I', table_name), false, true, '')))[1]::text::int AS row_count
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Accounts by role. Counts alone do not separate real users from test accounts.
SELECT role, count(*) FROM "Profile" GROUP BY role;

-- 3. Applied Prisma migrations and the most recent one.
SELECT count(*) AS migrations_applied, max(finished_at) AS latest
FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL;
