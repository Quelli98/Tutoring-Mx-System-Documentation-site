// Builds public/downloads/openapi.json from the route catalogue (src/data/endpoints.json).
// Every registered route is included. The main workflows also get request and response
// schemas, written from the validators and handlers in the final application source.
// Usage: npm run docs:openapi
import fs from 'node:fs';

const endpoints = JSON.parse(fs.readFileSync('src/data/endpoints.json', 'utf8'));
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const data = (schema) => ({ type: 'object', required: ['data'], properties: { data: schema } });
const dataOf = (key, schema) => data({ type: 'object', required: [key], properties: { [key]: schema } });
const json = (schema, description = 'Success') => ({ description, content: { 'application/json': { schema } } });
const body = (schema, required = true) => ({ required, content: { 'application/json': { schema } } });
const obj = (description) => ({ type: 'object', description, additionalProperties: true });
const id = { type: 'integer', minimum: 1 };
const dateTime = { type: 'string', format: 'date-time' };

const schemas = {
  Error: {
    type: 'object', required: ['error'],
    properties: { error: { type: 'object', required: ['code', 'message'], properties: {
      code: { type: 'string', example: 'VALIDATION_ERROR' }, message: { type: 'string' } } } },
  },
  DataEnvelope: { type: 'object', required: ['data'], properties: { data: {} }, description: 'Successful responses wrap their result in `data`.' },
  Role: { type: 'string', enum: ['STUDENT', 'TUTOR', 'ORGANISER'] },
  Profile: { type: 'object', required: ['id', 'email', 'fullName', 'role'], properties: {
    id, email: { type: 'string', format: 'email' }, fullName: { type: 'string' }, role: ref('Role') } },
  ProfileResponse: data({ type: 'object', required: ['profile'], properties: {
    profile: ref('Profile'),
    capabilities: { type: 'object', description: 'Present only for a Master Organiser.', properties: { masterOrganiser: { type: 'boolean' } } } } }),
  CourseInput: { type: 'object', additionalProperties: false, required: ['code', 'name'], properties: {
    code: { type: 'string', minLength: 1, maxLength: 50, example: 'COMS1018A' },
    name: { type: 'string', minLength: 1, maxLength: 120, example: 'Introduction to Algorithms' },
    hourlyRate: { type: 'number', exclusiveMinimum: true, minimum: 0, nullable: true, example: 180 },
    budget: { type: 'number', minimum: 0, nullable: true, example: 25000 } } },
  ClashDetail: { type: 'object', required: ['kind', 'startsAt', 'endsAt'], properties: {
    kind: { type: 'string', enum: ['busy', 'allocation'] }, label: { type: 'string', nullable: true },
    startsAt: dateTime, endsAt: dateTime,
    recurrence: { type: 'string', enum: ['WEEKLY', 'FORTNIGHTLY', 'ONCE'], nullable: true } } },
  AllocationCandidate: { type: 'object', properties: {
    tutorId: id, fullName: { type: 'string' }, mark: { type: 'number' }, weeklyLimit: { type: 'number' },
    usedHours: { type: 'number' }, remainingHours: { type: 'number' }, hasClash: { type: 'boolean' },
    isEligible: { type: 'boolean' },
    reasonCodes: { type: 'array', items: { type: 'string', enum: ['insufficient-mark', 'schedule-clash', 'hour-limit-exceeded'] } },
    clashDetails: { type: 'array', items: ref('ClashDetail') },
    markBand: { type: 'integer', description: 'Mark rounded down to its band of ten.' },
    capacityShare: { type: 'number', description: 'Weekly hours used as a fraction of the limit.' } } },
  AllocationWriteInput: { type: 'object', required: ['tutorId', 'courseId', 'startsAt', 'endsAt', 'minimumMark', 'requestedHours'], properties: {
    tutorId: id, courseId: id, startsAt: dateTime, endsAt: dateTime,
    minimumMark: { type: 'number', minimum: 0, maximum: 100 },
    requestedHours: { type: 'number', exclusiveMinimum: true, minimum: 0, description: 'No longer than the session.' },
    status: { type: 'string', enum: ['PROPOSED', 'CONFIRMED'] } } },
  Allocation: { type: 'object', properties: {
    id, tutorId: id, courseId: id, startsAt: dateTime, endsAt: dateTime,
    allocatedHours: { type: 'number' }, status: { type: 'string' } } },
  WorkLogInput: { type: 'object', required: ['allocationId', 'workDate', 'hours', 'description'], properties: {
    allocationId: id, workDate: { type: 'string', format: 'date' },
    hours: { type: 'number', exclusiveMinimum: true, minimum: 0, maximum: 24, multipleOf: 0.01 },
    description: { type: 'string', minLength: 1, maxLength: 500 } } },
  TimesheetDecisionInput: { type: 'object', required: ['decision'], properties: {
    decision: { type: 'string', enum: ['APPROVE', 'RETURN'] },
    reason: { type: 'string', description: 'Required when the decision is RETURN.' } } },
  ExcuseInput: { type: 'object', required: ['allocationId', 'reason'], properties: {
    allocationId: id, reason: { type: 'string', minLength: 1, maxLength: 1000 } } },
  VolunteerRequestInput: { type: 'object', required: ['overflowWorkId'], properties: { overflowWorkId: id } },
  Booking: { type: 'object', properties: {
    id, studentId: id, tutorId: id, courseId: id, termId: id, studentName: { type: 'string' },
    tutorName: { type: 'string' }, courseCode: { type: 'string' }, courseName: { type: 'string' },
    startsAt: dateTime, endsAt: dateTime, status: { type: 'string', example: 'CONFIRMED' },
    occurrenceStatus: { type: 'string', example: 'SCHEDULED' }, version: { type: 'integer' },
    createdAt: dateTime, updatedAt: dateTime } },
  BookingDetail: { type: 'object', properties: {
    booking: ref('Booking'),
    sickNotes: { type: 'array', items: obj('Sick note'), description: 'Returned to the booking Student only.' },
    sickNotePending: { type: 'boolean' }, canSubmitSickNote: { type: 'boolean' },
    history: { type: 'array', items: obj('Booking history event') }, canCancel: { type: 'boolean' } } },
  BookingCreateInput: { type: 'object', additionalProperties: false, required: ['tutorId', 'courseId', 'termId', 'startsAt', 'endsAt', 'requestKey'], properties: {
    tutorId: id, courseId: id, termId: id, startsAt: dateTime, endsAt: dateTime,
    requestKey: { type: 'string', pattern: '^[a-zA-Z0-9_-]{8,128}$', description: 'Retry key: repeating the same request returns the original booking.' } } },
  BookingCancelInput: { type: 'object', additionalProperties: false, required: ['version'], properties: {
    version: { type: 'integer', minimum: 1, description: 'The booking version you last saw.' }, note: { type: 'string' } } },
  Page: { type: 'object', properties: { items: { type: 'array', items: {} }, page: { type: 'integer' }, hasMore: { type: 'boolean' } } },
  PublicHoliday: { type: 'object', properties: {
    date: { type: 'string', format: 'date' }, name: { type: 'string' }, countryCode: { type: 'string', enum: ['ZA'] },
    nationalHoliday: { type: 'boolean' }, holidayTypes: { type: 'array', items: { type: 'string' } } } },
  PublicHolidays: data({ type: 'object', required: ['source', 'holidays', 'retrievedAt'], properties: {
    source: { type: 'string', enum: ['external', 'fallback'] }, holidays: { type: 'array', items: ref('PublicHoliday') },
    retrievedAt: { ...dateTime, nullable: true }, reason: { type: 'string', description: 'Present when source is fallback.' } } }),
};

// Realistic request samples, matching the examples in the API chapter (IDs and names are made up).
Object.assign(schemas.CourseInput, { example: { code: 'COMS1018A', name: 'Introduction to Algorithms', hourlyRate: 180, budget: 25000 } });
Object.assign(schemas.AllocationWriteInput, { example: { tutorId: 41, courseId: 12, startsAt: '2026-10-13T08:00:00.000Z', endsAt: '2026-10-13T10:00:00.000Z', minimumMark: 65, requestedHours: 2, status: 'CONFIRMED' } });
Object.assign(schemas.WorkLogInput, { example: { allocationId: 301, workDate: '2026-10-13', hours: 2, description: 'COMS1018A lab session' } });
Object.assign(schemas.TimesheetDecisionInput, { example: { decision: 'RETURN', reason: 'Please split the Monday hours by session.' } });
Object.assign(schemas.ExcuseInput, { example: { allocationId: 301, reason: 'Medical appointment' } });
Object.assign(schemas.VolunteerRequestInput, { example: { overflowWorkId: 17 } });
Object.assign(schemas.BookingCreateInput, { example: { tutorId: 41, courseId: 12, termId: 3, startsAt: '2026-10-15T12:00:00.000Z', endsAt: '2026-10-15T13:00:00.000Z', requestKey: 'booking-7f3c1d2a' } });
Object.assign(schemas.BookingCancelInput, { example: { version: 1, note: 'Clashes with a test' } });

const errorResponse = (description) => ({ description, content: { 'application/json': { schema: ref('Error') } } });
const responses = {
  ValidationError: errorResponse('Invalid input (`VALIDATION_ERROR`).'),
  Unauthorized: errorResponse('Missing, expired or invalid access token (`AUTHENTICATION_REQUIRED`).'),
  Forbidden: errorResponse('Signed in, but the role, Master privilege or ownership does not allow this.'),
  NotFound: errorResponse('Record not found, or hidden because it is not yours.'),
  Conflict: errorResponse('Duplicate, stale version, illegal state change or a business-rule conflict.'),
  RateLimited: errorResponse('Too many requests (`RATE_LIMITED`).'),
};

const page = { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 }, description: 'Page number, starting at 1.' };
const q = (name, schema, required = false, description) => ({ name, in: 'query', required, schema, ...(description ? { description } : {}) });

// Main workflows: summaries, inputs and success schemas from the final source.
const detail = {
  'GET /health': { summary: 'API process health', ok: json({ type: 'object', properties: { status: { type: 'string', example: 'ok' } } }) },
  'GET /ready': { summary: 'API and database readiness', ok: json({ type: 'object', properties: { status: { type: 'string', example: 'ready' }, database: { type: 'string', example: 'connected' } } }) },
  'POST /api/auth/password-reset': { summary: 'Request a password-reset email', requestBody: body({ type: 'object', required: ['email'], properties: { email: { type: 'string', format: 'email' } } }), ok: json(dataOf('message', { type: 'string' }), 'Accepted; Auth0 sends instructions if the account can be reset.') },
  'POST /api/auth/onboarding': { summary: 'Choose Student or Tutor after first sign-in', requestBody: body({ type: 'object', required: ['role'], properties: { role: { type: 'string', enum: ['STUDENT', 'TUTOR'], description: 'Organisers register through organiser-registration instead.' } } }), ok: json(dataOf('profile', ref('Profile'))) },
  'DELETE /api/auth/delete-account': { summary: 'Delete my account' },
  'GET /api/me': { summary: 'Current user profile', ok: json(ref('ProfileResponse')) },
  'GET /api/public-holidays': { summary: 'South African public holidays', parameters: [q('year', { type: 'integer' }, false, 'Calendar year.')], ok: json(ref('PublicHolidays')) },
  'GET /api/courses': { summary: 'List courses', ok: json(dataOf('courses', { type: 'array', items: obj('Course') })) },
  'POST /api/courses': { summary: 'Create a course', requestBody: body(ref('CourseInput')), ok: json(dataOf('course', obj('Course')), 'Created') },
  'PATCH /api/courses/:courseId': { summary: 'Update a course', requestBody: body(ref('CourseInput')), ok: json(dataOf('course', obj('Course'))) },
  'DELETE /api/courses/:courseId': { summary: 'Delete a course' },
  'GET /api/allocations/candidates': { summary: 'Rank Tutors for a session', parameters: [
      q('courseId', id, true), q('startsAt', dateTime, true), q('endsAt', dateTime, true),
      q('minimumMark', { type: 'number', minimum: 0, maximum: 100 }, true), q('requestedHours', { type: 'number' }, true),
      q('excludeAllocationId', id, false, 'Leave out this allocation, e.g. when re-checking one already saved.')],
    ok: json(dataOf('candidates', { type: 'array', items: ref('AllocationCandidate') })) },
  'POST /api/allocations': { summary: 'Create an allocation', requestBody: body(ref('AllocationWriteInput')), ok: json(dataOf('allocation', ref('Allocation')), 'Created'),
    note: 'Every rule is rechecked on save. A failed rule returns **409** with its code (`insufficient-mark`, `schedule-clash`, `hour-limit-exceeded`); an unknown Tutor or course returns **404** (`TUTOR_NOT_FOUND`, `COURSE_NOT_FOUND`); a conflicting concurrent change returns **409** `ALLOCATION_CONFLICT`.' },
  'PATCH /api/allocations/:allocationId': { summary: 'Update an allocation', requestBody: body(ref('AllocationWriteInput')), ok: json(dataOf('allocation', ref('Allocation'))) },
  'DELETE /api/allocations/:allocationId': { summary: 'Remove an allocation' },
  'GET /api/reports/payroll-export': { summary: 'Export approved hours as CSV', ok: { description: 'CSV file', content: { 'text/csv': { schema: { type: 'string' } } } } },
  'PATCH /api/timesheets/:timesheetId/decision': { summary: 'Approve or return a timesheet', requestBody: body(ref('TimesheetDecisionInput')), ok: json(dataOf('timesheet', obj('Timesheet'))) },
  'POST /api/tutor/work-logs': { summary: 'Log worked hours', requestBody: body(ref('WorkLogInput')), ok: json(dataOf('workLog', obj('Work log')), 'Created'),
    note: 'Returns **409** `TIMESHEET_LOCKED` if that week\'s timesheet has already been submitted or approved.' },
  'POST /api/tutor/timesheets/:timesheetId/submit': { summary: 'Submit a weekly timesheet', ok: json(dataOf('timesheet', obj('Timesheet'))) },
  'POST /api/tutor/excuses': { summary: 'Ask to be excused from a session', requestBody: body(ref('ExcuseInput')), ok: json(dataOf('excuse', obj('Excuse')), 'Created') },
  'GET /api/student/open-work': { summary: 'List open work to volunteer for', ok: json(dataOf('workItems', { type: 'array', items: obj('Open work item') })) },
  'GET /api/student/volunteer-requests': { summary: 'List my volunteer requests', ok: json(dataOf('volunteerRequests', { type: 'array', items: obj('Volunteer request') })) },
  'POST /api/student/volunteer-requests': { summary: 'Volunteer for open work', requestBody: body(ref('VolunteerRequestInput')), ok: json(dataOf('volunteerRequest', obj('Volunteer request')), 'Created') },
  'PATCH /api/student/volunteer-requests/:requestId/withdraw': { summary: 'Withdraw a pending volunteer request', ok: json(dataOf('volunteerRequest', obj('Volunteer request'))) },
  'GET /api/me/bookings': { summary: 'List my bookings', parameters: [page, q('startsAt', dateTime, false, 'Calendar window start (use with endsAt; up to 28 days).'), q('endsAt', dateTime)],
    ok: json(data({ allOf: [ref('Page'), { type: 'object', properties: { items: { type: 'array', items: ref('Booking') } } }] })) },
  'POST /api/student/bookings': { summary: 'Book a tutoring session', requestBody: body(ref('BookingCreateInput')), ok: json(data(ref('BookingDetail')), 'Created'),
    note: 'Returns **409** `BOOKING_UNAVAILABLE` if the time was taken, **409** `SCHEDULING_STALE` if the request key was used for a different request, and **422** `TOO_MANY_SESSIONS` when the booking limit is reached.' },
  'GET /api/me/bookings/:id': { summary: 'Get one of my bookings', ok: json(data(ref('BookingDetail'))) },
  'POST /api/me/bookings/:id/cancel': { summary: 'Cancel a booking', requestBody: body(ref('BookingCancelInput')), ok: json(data(ref('BookingDetail'))) },
  'GET /api/swaps': { summary: 'List Tutor swaps', parameters: [page] },
  'GET /api/organiser/student-sick-notes': { summary: 'List Student sick notes', parameters: [page] },
  'GET /api/organiser/audit': { summary: 'Search the audit log', parameters: [q('from', dateTime), q('to', dateTime), q('actorId', id), q('action', { type: 'string' }), q('targetType', { type: 'string' }), q('targetId', id), page] },
  'GET /api/search': { summary: 'Search courses, people and records', parameters: [q('q', { type: 'string' }, false, 'Search text.'), q('categories', { type: 'string' }), page, q('pageSize', { type: 'integer', minimum: 1, maximum: 25, default: 10 })] },
  'GET /api/notifications': { summary: 'List my notifications', parameters: [page, q('pageSize', { type: 'integer', minimum: 1, maximum: 25, default: 10 })] },
};

// Readable names for the remaining routes.
const SUMMARY = {
  'POST /api/auth/organiser-registration': 'Register as an Organiser (lecturer)',
  'POST /api/auth/organiser-application-status': 'Check an Organiser application status',
  'POST /api/auth/resend-verification': 'Resend the verification email',
  'GET /api/profile/current': 'Current profile',
  'GET /api/auth/organiser-application/me': 'My Organiser application',
  'GET /api/master-organiser/organiser-applications': 'List Organiser applications',
  'POST /api/master-organiser/organiser-applications/:id/approve': 'Approve an Organiser application',
  'POST /api/master-organiser/organiser-applications/:id/reject': 'Reject an Organiser application',
  'GET /api/tutors': 'List Tutors',
  'GET /api/allocations': 'List allocations',
  'GET /api/reports/workload': 'Workload report',
  'POST /api/allocations/bulk-preview': 'Preview a bulk allocation',
  'POST /api/allocations/bulk-commit': 'Save a bulk allocation',
  'GET /api/staffing-requirements': 'List staffing requirements',
  'POST /api/staffing-requirements': 'Create a staffing requirement',
  'PATCH /api/staffing-requirements/:requirementId': 'Update a staffing requirement',
  'PATCH /api/staffing-requirements/:requirementId/status': 'Change a staffing requirement status',
  'GET /api/organiser/command-centre': 'Organiser command centre summary',
  'GET /api/organiser/approvals': 'Items waiting for Organiser approval',
  'PATCH /api/volunteer-claims/:claimId/decision': 'Approve or reject a volunteer claim',
  'GET /api/organiser/overflow-work': 'List overflow work',
  'POST /api/organiser/overflow-work': 'Post overflow work',
  'PATCH /api/organiser/overflow-work/:overflowWorkId': 'Update overflow work',
  'PATCH /api/organiser/overflow-work/:overflowWorkId/close': 'Close overflow work',
  'GET /api/organiser/timesheet-disputes': 'List timesheet disputes',
  'PATCH /api/timesheet-disputes/:disputeId': 'Resolve a timesheet dispute',
  'GET /api/tutors/:tutorId/marks': "List a Tutor's course marks",
  'PUT /api/tutors/:tutorId/marks': "Set a Tutor's course marks",
  'DELETE /api/tutors/:tutorId/marks/:courseId': "Remove a Tutor's mark for a course",
  'GET /api/tutors/:tutorId/time-slots': "View a Tutor's timetable",
  'GET /api/tutor/dashboard': 'Tutor dashboard',
  'POST /api/me/time-slots': 'Add a timetable entry',
  'GET /api/me/time-slots': 'List my timetable entries',
  'POST /api/tutor/time-slots': 'Add a timetable entry (Tutor route)',
  'GET /api/tutor/time-slots': 'List my timetable entries (Tutor route)',
  'PATCH /api/me/time-slots/:timeSlotId': 'Update a timetable entry',
  'DELETE /api/me/time-slots/:timeSlotId': 'Delete a timetable entry',
  'PATCH /api/tutor/time-slots/:timeSlotId': 'Update a timetable entry (Tutor route)',
  'DELETE /api/tutor/time-slots/:timeSlotId': 'Delete a timetable entry (Tutor route)',
  'GET /api/academic-terms': 'List academic terms',
  'POST /api/organiser/academic-terms': 'Create an academic term',
  'GET /api/academic-terms/published': 'List published academic terms',
  'PATCH /api/organiser/academic-terms/:id': 'Update an academic term',
  'DELETE /api/organiser/academic-terms/:id': 'Delete an academic term',
  'POST /api/me/time-slots/import/preview': 'Preview a timetable import',
  'POST /api/tutor/time-slots/import/preview': 'Preview a timetable import (Tutor route)',
  'POST /api/me/time-slots/import/commit': 'Save a timetable import',
  'POST /api/tutor/time-slots/import/commit': 'Save a timetable import (Tutor route)',
  'PATCH /api/tutor/weekly-capacity': 'Set my weekly work capacity',
  'GET /api/tutor/timesheets/:timesheetId/history': 'Timesheet history',
  'PATCH /api/tutor/timesheets/:timesheetId/work-logs/:workLogId': 'Correct a work log on a returned timesheet',
  'POST /api/tutor/timesheets/:timesheetId/declaration': 'Sign the timesheet declaration',
  'POST /api/tutor/timesheets/:timesheetId/disputes': 'Dispute a timesheet decision',
  'GET /api/student/volunteer-requests/:requestId': 'Get a volunteer request',
  'GET /api/tutor/timesheets/:timesheetId/status': 'Timesheet status',
  'GET /api/tutor/excuses/:excuseId/status': 'Excuse status',
  'PATCH /api/excuses/:excuseId/decision': 'Approve or reject an excuse',
  'GET /api/organiser/audit/export': 'Export the audit log',
  'GET /api/organiser/audit/:id': 'Get an audit event',
  'GET /api/organiser/allocations/:id/history': 'Allocation change history',
  'POST /api/organiser/allocations/:id/restore-preview': 'Preview restoring an earlier allocation version',
  'POST /api/organiser/allocations/:id/restore': 'Restore an earlier allocation version',
  'POST /api/student/bookings/:id/sick-notes': 'Submit a sick note for a booking',
  'POST /api/organiser/student-sick-notes/:id/decision': 'Approve or reject a sick note',
  'GET /api/swaps/:id': 'Get a Tutor swap',
  'GET /api/tutor/allocations/:id/replacements': 'Find replacement Tutors for a session',
  'POST /api/tutor/swaps': 'Request a Tutor swap',
  'POST /api/swaps/:id/actions': 'Act on a Tutor swap',
  'POST /api/organiser/proposals/preview': 'Preview an allocation proposal',
  'POST /api/organiser/proposals/compare': 'Compare proposal strategies',
  'POST /api/organiser/proposals/generate': 'Generate a proposal as a draft scenario',
  'GET /api/organiser/proposals/:scenarioId/explanations': 'Explain a proposal',
  'POST /api/organiser/proposals/:scenarioId/adjust': 'Adjust a proposal assignment',
  'GET /api/organiser/scenarios': 'List scenarios',
  'POST /api/organiser/scenarios': 'Create a scenario',
  'GET /api/organiser/scenarios/:scenarioId': 'Get a scenario',
  'GET /api/organiser/scenarios/:scenarioId/compare': 'Compare a scenario with live allocations',
  'POST /api/organiser/scenarios/:scenarioId/actions': 'Act on a scenario',
  'POST /api/organiser/scenarios/:scenarioId/presence': 'Report who is viewing a scenario',
  'GET /api/student/tutoring-options': 'List tutoring options',
  'POST /api/student/mutual-availability': 'Find times free for me and a Tutor',
  'POST /api/navigation/resolve': 'Resolve a navigation target',
  'GET /api/notifications/unread-count': 'Unread notification count',
  'GET /api/notifications/:id': 'Get a notification',
  'PATCH /api/notifications/:id/read': 'Mark a notification as read',
  'POST /api/notifications/read-all': 'Mark all notifications as read',
  'POST /api/notifications/reminders/run': 'Send due reminders',
};

const tagRules = [
  [/^\/(health|ready)$/, 'Health'],
  [/^\/api\/(auth\/|me$|profile\/)/, 'Account and sign-in'],
  [/^\/api\/master-organiser/, 'Master Organiser'],
  [/^\/api\/public-holidays/, 'Public holidays'],
  [/^\/api\/courses|\/marks/, 'Courses and marks'],
  [/bookings|sick-notes|tutoring-options|mutual-availability/, 'Bookings and sick notes'],
  [/swaps|replacements/, 'Tutor swaps'],
  [/proposals|scenarios/, 'Planning: proposals and scenarios'],
  [/\/audit|\/history$|restore/, 'Audit and restore'],
  [/^\/api\/(allocations|reports)/, 'Allocations and reports'],
  [/staffing-requirements|command-centre|organiser\/approvals/, 'Organiser operations'],
  [/timesheet|work-logs/, 'Timesheets and work logs'],
  [/excuses/, 'Excuses'],
  [/overflow-work|open-work|volunteer/, 'Overflow work and volunteering'],
  [/time-slots|academic-terms/, 'Timetables and academic terms'],
  [/navigation|search|notifications/, 'Notifications and search'],
  [/^\/api\/tutors?(\/|$)/, 'Tutors'],
];
const tagFor = (path) => (tagRules.find(([re]) => re.test(path)) || [null, 'Other'])[1];

const ACTIONS = new Set(['approve', 'reject', 'submit', 'cancel', 'actions', 'decision', 'run', 'read-all', 'read', 'preview', 'commit', 'compare', 'generate', 'adjust', 'presence', 'resolve', 'restore', 'restore-preview', 'declaration', 'disputes', 'close', 'status', 'withdraw', 'bulk-preview', 'bulk-commit', 'explanations', 'history', 'export', 'unread-count', 'replacements', 'resend-verification', 'organiser-registration', 'organiser-application-status']);
const words = (s) => s.replace(/-/g, ' ');
function summaryFor(method, path) {
  const segs = path.split('/').filter((s) => s && s !== 'api' && !s.startsWith(':'));
  const last = segs[segs.length - 1] || path;
  const resource = segs.filter((s) => !ACTIONS.has(s)).slice(-1)[0] || last;
  const s = ACTIONS.has(last)
    ? `${words(last)} (${words(resource)})`
    : { GET: path.endsWith('}') || /:\w+$/.test(path) ? `Get ${words(resource)}` : `List ${words(resource)}`, POST: `Create ${words(resource)}`, PATCH: `Update ${words(resource)}`, PUT: `Replace ${words(resource)}`, DELETE: `Delete ${words(resource)}` }[method];
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const access = {
  PUBLIC: 'Public: no access token needed.',
  IDENTITY: 'Any valid Auth0 access token; a Tutor MX profile may not exist yet.',
  'MASTER ORGANISER': 'Organiser with the additional Auth0 Master Organiser privilege.',
};
const paths = {};
for (const e of endpoints) {
  const key = `${e.method} ${e.path}`;
  const d = detail[key] || {};
  const oaPath = e.path.replace(/:(\w+)/g, '{$1}');
  const params = [...e.path.matchAll(/:(\w+)/g)].map(([, name]) => ({ name, in: 'path', required: true, schema: id }));
  const known = new Set((d.parameters || []).map((p) => p.name));
  const query = e.query.filter((n) => !known.has(n)).map((n) => q(n, { type: 'string' }));
  const headers = e.idempotency ? [{ name: 'Idempotency-Key', in: 'header', required: false, schema: { type: 'string', pattern: '^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$' }, description: 'Repeating the same request with the same key returns the original result; reusing a key for different content returns 409 IDEMPOTENCY_KEY_REUSED.' }] : [];
  const status = String(e.success[0]);
  const ok = status === '204' ? { description: 'Success, no content' } : (d.ok || json(ref('DataEnvelope')));
  const res = { [status]: ok };
  if (e.path.startsWith('/api')) {
    if (e.access !== 'PUBLIC') Object.assign(res, { 401: { $ref: '#/components/responses/Unauthorized' }, 403: { $ref: '#/components/responses/Forbidden' } });
    if (['POST', 'PATCH', 'PUT'].includes(e.method) || e.query.length || d.parameters) res[400] = { $ref: '#/components/responses/ValidationError' };
    if (params.length) res[404] = { $ref: '#/components/responses/NotFound' };
    if (e.method !== 'GET') res[409] = { $ref: '#/components/responses/Conflict' };
    res[429] = { $ref: '#/components/responses/RateLimited' };
  }
  const desc = [`**Access:** ${access[e.access] || `${e.access.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())} role.`}`];
  if (d.note) desc.push(d.note);
  if (!d.requestBody && ['POST', 'PATCH', 'PUT'].includes(e.method) && (e.body.length || e.validators.length)) {
    desc.push(`Request body${e.body.length ? ` fields include ${e.body.map((f) => `\`${f}\``).join(', ')}` : ''}; validated by ${e.validators.map((v) => `\`${v}\``).join(', ') || 'the route handler'}.`);
  }
  desc.push(`Source: \`src/app.ts\` line ${e.line}.`);
  const op = {
    operationId: e.id, tags: [tagFor(e.path)], summary: d.summary || SUMMARY[key] || summaryFor(e.method, e.path), description: desc.join('\n\n'),
    'x-access': e.access, security: e.access === 'PUBLIC' ? [] : [{ bearerAuth: [] }],
    ...(params.length || query.length || headers.length || d.parameters ? { parameters: [...params, ...(d.parameters || []), ...query, ...headers] } : {}),
    ...(d.requestBody ? { requestBody: d.requestBody } : (['POST', 'PATCH', 'PUT'].includes(e.method) && (e.body.length || e.validators.length) ? { requestBody: body({ type: 'object' }, false) } : {})),
    responses: res,
  };
  (paths[oaPath] ||= {})[e.method.toLowerCase()] = op;
}

const TAG_TEXT = {
  'Health': 'Public checks that the API process and its database are up.',
  'Account and sign-in': 'Onboarding, the current profile, password reset, Organiser registration and account deletion.',
  'Master Organiser': 'Reviewing lecturer applications to become Organisers. Requires the Master Organiser privilege.',
  'Public holidays': 'South African public holidays from Nager.Date, with a safe fallback.',
  'Courses and marks': "Courses, their rates and budgets, and Tutors' course marks.",
  'Bookings and sick notes': 'Student tutoring bookings, shared availability and sick notes.',
  'Tutor swaps': 'Tutors asking to hand a session to a replacement, and the decision.',
  'Planning: proposals and scenarios': 'Draft allocation plans, generated proposals and publishing to live allocations.',
  'Audit and restore': 'The audit log and restoring earlier allocation versions.',
  'Allocations and reports': 'Assigning Tutors to sessions, bulk allocation, workload and payroll reports.',
  'Organiser operations': 'Staffing requirements, the command centre and approval queues.',
  'Timesheets and work logs': 'Logging hours, submitting timesheets, decisions, corrections and disputes.',
  'Excuses': 'Tutors asking to be excused from a session, and the decision.',
  'Overflow work and volunteering': 'Unfilled work offered to Students, and their volunteer requests.',
  'Timetables and academic terms': 'Personal timetables, imports and academic term dates.',
  'Notifications and search': 'Notifications, reminders, search and navigation targets.',
  'Tutors': 'The Tutor list, Tutor dashboard and weekly work capacity.',
};
const tags = [...new Set(endpoints.map((e) => tagFor(e.path)))].map((name) => ({ name, ...(TAG_TEXT[name] ? { description: TAG_TEXT[name] } : {}) }));
const spec = {
  openapi: '3.0.3',
  info: {
    title: 'Tutor MX API', version: '2026-10-11',
    description: [
      'The handwritten Express API behind Tutor MX. All 120 registered routes are listed; the main workflows include full request and response schemas taken from the final source.',
      '**Authentication.** Apart from `/health`, `/ready` and two public account routes, every route needs an Auth0 access token for the Tutor MX API audience, sent as `Authorization: Bearer <token>`. The server then checks the user\'s role and ownership.',
      '**Responses.** Successful responses wrap their result in `data`. Errors use `{"error":{"code","message"}}`.',
      '**Rate limits.** 120 requests per minute on `/api`; 10 per 15 minutes on sensitive account routes. Responses include `RateLimit` and `RateLimit-Policy` headers.',
      '**Pagination.** Growing lists take `page` and return `page` and `hasMore`; search and notifications also take `pageSize` (1–25).',
      'Write examples change data: try them against a local API (`http://localhost:3000`) with a test account.',
    ].join('\n\n'),
  },
  servers: [{ url: 'https://tutor-mx-api.onrender.com', description: 'Production' }, { url: 'http://localhost:3000', description: 'Local development' }],
  tags,
  paths,
  components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Auth0 access token for the Tutor MX API audience.' } }, schemas, responses },
};
fs.writeFileSync('public/downloads/openapi.json', JSON.stringify(spec, null, 2) + '\n');
const detailed = endpoints.filter((e) => detail[`${e.method} ${e.path}`]).length;
console.log(`Wrote public/downloads/openapi.json: ${endpoints.length} operations, ${detailed} with detailed schemas, ${tags.length} tags.`);
