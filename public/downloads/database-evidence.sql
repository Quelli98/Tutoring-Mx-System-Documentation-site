-- Run on the intended authorised Neon branch. Read-only; no personal row values returned.
BEGIN READ ONLY;

SELECT 'Profile' AS table_name, count(*) AS row_count FROM public."Profile"
UNION ALL
SELECT 'OrganiserApplication' AS table_name, count(*) AS row_count FROM public."OrganiserApplication"
UNION ALL
SELECT 'Notification' AS table_name, count(*) AS row_count FROM public."Notification"
UNION ALL
SELECT 'Course' AS table_name, count(*) AS row_count FROM public."Course"
UNION ALL
SELECT 'TutorMark' AS table_name, count(*) AS row_count FROM public."TutorMark"
UNION ALL
SELECT 'AcademicTerm' AS table_name, count(*) AS row_count FROM public."AcademicTerm"
UNION ALL
SELECT 'TimeSlot' AS table_name, count(*) AS row_count FROM public."TimeSlot"
UNION ALL
SELECT 'OccurrenceException' AS table_name, count(*) AS row_count FROM public."OccurrenceException"
UNION ALL
SELECT 'TutorHourLimit' AS table_name, count(*) AS row_count FROM public."TutorHourLimit"
UNION ALL
SELECT 'Allocation' AS table_name, count(*) AS row_count FROM public."Allocation"
UNION ALL
SELECT 'Timesheet' AS table_name, count(*) AS row_count FROM public."Timesheet"
UNION ALL
SELECT 'TimesheetRevision' AS table_name, count(*) AS row_count FROM public."TimesheetRevision"
UNION ALL
SELECT 'TimesheetDeclaration' AS table_name, count(*) AS row_count FROM public."TimesheetDeclaration"
UNION ALL
SELECT 'TimesheetDispute' AS table_name, count(*) AS row_count FROM public."TimesheetDispute"
UNION ALL
SELECT 'WorkLog' AS table_name, count(*) AS row_count FROM public."WorkLog"
UNION ALL
SELECT 'Excuse' AS table_name, count(*) AS row_count FROM public."Excuse"
UNION ALL
SELECT 'OverflowWork' AS table_name, count(*) AS row_count FROM public."OverflowWork"
UNION ALL
SELECT 'VolunteerClaim' AS table_name, count(*) AS row_count FROM public."VolunteerClaim"
UNION ALL
SELECT 'StaffingRequirement' AS table_name, count(*) AS row_count FROM public."StaffingRequirement"
UNION ALL
SELECT 'ApiWriteReceipt' AS table_name, count(*) AS row_count FROM public."ApiWriteReceipt";

SELECT role, count(*) AS profiles FROM public."Profile" GROUP BY role ORDER BY role;
-- These counts alone do NOT classify real versus test accounts. Use the team's known demo register.
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, ordinal_position;
SELECT conrelid::regclass AS table_name, conname, pg_get_constraintdef(oid) AS constraint
FROM pg_constraint WHERE connamespace = 'public'::regnamespace ORDER BY 1, 2;
SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' ORDER BY 1, 2;
SELECT migration_name, started_at, finished_at, rolled_back_at, applied_steps_count
FROM public."_prisma_migrations" ORDER BY migration_name;
ROLLBACK;
