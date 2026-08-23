import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Page = {
  title: string;
  label: string;
  description: string;
  group: string;
  updated: string;
  content: ReactNode;
};

function Callout({ title, children, tone = "info" }: { title: string; children: ReactNode; tone?: "info" | "success" | "warning" }) {
  return <aside className={`callout ${tone}`}><span className="callout-mark" aria-hidden="true" /><div><strong>{title}</strong><div>{children}</div></div></aside>;
}

function Code({ children }: { children: string }) {
  return <pre className="code-block"><button type="button" onClick={() => navigator.clipboard?.writeText(children)} aria-label="Copy commands">Copy</button><code>{children}</code></pre>;
}

function Status({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "amber" }) {
  return <span className={`status ${tone}`}>{children}</span>;
}

const pages: Record<string, Page> = {
  home: {
    title: "Tutor MX Documentation",
    label: "Home",
    description: "The central source of truth for the Tutor MX System.",
    group: "Overview",
    updated: "23 August 2026",
    content: <>
      <section className="lead-panel" id="project-overview">
        <div><p className="kicker">COMS3011A · Tutor Management System</p><h2>One place for the project, the process and the proof.</h2><p>Tutor MX helps organisers allocate tutors to courses using marks, availability and weekly hour limits. It also supports student overflow volunteering, timesheets, excuses and the administrative work around tutoring.</p></div>
        <div className="release-card"><span>Current milestone</span><strong>Sprint 1</strong><p>Integrated Sprint 1 foundation, public demo and current handover workflow</p><div><Status tone="green">Public docs</Status><Status>Living record</Status></div></div>
      </section>
      <section id="quick-links"><h2>Start here</h2><div className="link-grid">
        <a href="#getting-started"><span>01</span><strong>Development guide</strong><small>Set up and run the project</small></a>
        <a href="#architecture"><span>02</span><strong>System architecture</strong><small>Understand the application boundary</small></a>
        <a href="#git-methodology"><span>03</span><strong>Git methodology</strong><small>Follow the main-only workflow</small></a>
        <a href="#sprint-evidence"><span>04</span><strong>Sprint evidence</strong><small>See decisions and proof</small></a>
      </div></section>
      <section id="project-status"><h2>Project snapshot</h2><div className="table-wrap"><table><tbody>
        <tr><th>Frontend</th><td>React + Vite</td><td><Status tone="green">Integrated</Status></td></tr>
        <tr><th>Backend</th><td>Node.js + handwritten Express API</td><td><Status tone="green">Integrated</Status></td></tr>
        <tr><th>Database</th><td>Prisma + Neon PostgreSQL</td><td><Status tone="green">Connected</Status></td></tr>
        <tr><th>Authentication</th><td>Auth0 Universal Login + automatic role/Profile onboarding + direct saved-role routing</td><td><Status tone="green">Integrated</Status></td></tr>
        <tr><th>Quality snapshot</th><td>143 backend tests + 147 frontend tests passed in the 23 Aug 2026 full gate</td><td><Status>Recorded</Status></td></tr>
        <tr><th>Documentation</th><td>Public, version-controlled wiki-style site</td><td><Status tone="green">Live</Status></td></tr>
      </tbody></table></div><Callout title="Evidence rule" tone="success">A plan explains intent. A screenshot, issue, commit, review, test run or deployed behaviour proves what happened. This wiki keeps those two categories separate.</Callout></section>
      <section id="documentation-map"><h2>How this documentation is organised</h2><div className="definition-grid">
        <article><strong>Develop</strong><p>Setup, stack, Git and the four-sprint working method.</p></article>
        <article><strong>Design</strong><p>Requirements, architecture, database, API and security decisions.</p></article>
        <article><strong>Verify</strong><p>Testing, deployment, stakeholder decisions and sprint evidence.</p></article>
        <article><strong>Reference</strong><p>Documents, AI attribution, challenges and planned improvements.</p></article>
      </div></section>
    </>,
  },
  "getting-started": {
    title: "Development Guide", label: "Development guide", description: "Set up Tutor MX locally and verify a clean development environment.", group: "Development", updated: "23 August 2026",
    content: <>
      <section id="prerequisites"><h2>Prerequisites</h2><ul className="check-list"><li><strong>Node.js 24</strong> for the current project runtime.</li><li><strong>npm 11 or later</strong> for deterministic installs.</li><li><strong>PostgreSQL 17</strong> only when running real database verification locally.</li><li>Access to the team repository and the required non-secret environment values.</li></ul></section>
      <section id="repository-setup"><h2>Repository setup</h2><ol className="steps">
        <li><span>1</span><div><strong>Start from main</strong><p>Pull the latest main branch before creating your own short-lived work branch.</p></div></li>
        <li><span>2</span><div><strong>Create your environment file</strong><p>Copy <code>.env.example</code> to <code>.env</code>. Never commit the real file.</p></div></li>
        <li><span>3</span><div><strong>Install and prepare</strong><p>Install exact dependencies, generate Prisma and apply the schema.</p></div></li>
        <li><span>4</span><div><strong>Run the application</strong><p>Start the development environment and verify your assigned flow.</p></div></li>
      </ol><Code>{`npm ci\nnpm run generate\nnpm run db:migrate\nnpm run db:seed\nnpm run dev`}</Code></section>
      <section id="environment"><h2>Environment configuration</h2><div className="table-wrap"><table><thead><tr><th>Value</th><th>Used by</th><th>Purpose</th></tr></thead><tbody>
        <tr><td><code>DATABASE_URL</code></td><td>Backend</td><td>Server-side Neon/PostgreSQL connection</td></tr>
        <tr><td><code>AUTH0_DOMAIN</code></td><td>Frontend + backend</td><td>Auth0 tenant identity</td></tr>
        <tr><td><code>AUTH0_CLIENT_ID</code></td><td>Frontend</td><td>Single-page application identifier</td></tr>
        <tr><td><code>AUTH0_AUDIENCE</code></td><td>Frontend + backend</td><td>API audience, <code>https://api.tutormx.com</code></td></tr>
        <tr><td><code>API_BASE_URL</code></td><td>Frontend</td><td>Public Express API address</td></tr>
      </tbody></table></div><Callout title="Security boundary" tone="warning">The browser talks to Express. Express talks to Prisma and Neon. The browser must never receive a database connection string, Auth0 management secret or other service credential.</Callout></section>
      <section id="verification"><h2>Run the current full test gate</h2><Callout title="Current repository rule" tone="success">From the repository root, <code>npm run check</code> is the current release-style local gate. It runs Prisma generation, lint, backend type-checking, backend and frontend tests, production builds and the repository security check.</Callout><Code>{`npm ci\nnpm ci --prefix frontend\nnpm run generate\nnpm run check\nnpm run coverage`}</Code><div className="table-wrap"><table><thead><tr><th>Command</th><th>What it checks</th></tr></thead><tbody><tr><td><code>npm run check</code></td><td>Generate → lint → typecheck → backend/frontend tests → builds → security check</td></tr><tr><td><code>npm test</code></td><td>Backend and frontend automated tests</td></tr><tr><td><code>npm run coverage</code></td><td>Backend and frontend coverage reports</td></tr><tr><td><code>npm run security:check</code></td><td>Tracked-file secret and repository-safety checks</td></tr></tbody></table></div></section>
      <section id="local-smoke"><h2>Check your feature locally before handoff</h2><Code>{`git switch main\ngit pull origin main\ngit switch <your-issue-branch>\nnpm ci\nnpm ci --prefix frontend\nnpm run generate\nnpm run dev`}</Code><ul className="check-list"><li>Open <code>http://localhost:5173</code>; the API normally runs at <code>http://localhost:3000</code>.</li><li>Use the Student, Tutor or Organiser test account relevant to your issue.</li><li>Repeat the acceptance path: success, invalid/failure and one relevant empty/permission case.</li><li>Refresh and retry. Check loading, error and success states remain usable.</li><li>For protected flows, verify a different role cannot bypass the UI by typing a URL or changing a request.</li><li>Stop the dev servers, then run <code>npm run check</code> and <code>npm run coverage</code>.</li><li>Run <code>git status --short</code> and confirm only intended files changed.</li></ul><Callout title="Lecturer runner rule" tone="warning">If the lecturer-managed Gitea Actions runner is queued/offline, record it as an external infrastructure blocker. Local tests are still required. Never claim CI/Codecov is green when the remote job did not run.</Callout></section>
    </>,
  },
  "tech-stack": {
    title: "Tech Stack", label: "Tech stack", description: "The selected technologies, their responsibilities and why they fit the brief.", group: "Development", updated: "23 August 2026",
    content: <>
      <section id="stack-overview"><h2>Stack at a glance</h2><div className="stack-flow" aria-label="Tutor MX request flow"><div><small>Client</small><strong>React + Vite</strong><span>Responsive role dashboards</span></div><b aria-hidden="true">→</b><div><small>API</small><strong>Node + Express</strong><span>Team-written HTTP routes</span></div><b aria-hidden="true">→</b><div><small>Data</small><strong>Prisma + Neon</strong><span>PostgreSQL schema and queries</span></div></div></section>
      <section id="technology-decisions"><h2>Technology decisions</h2><div className="table-wrap"><table><thead><tr><th>Technology</th><th>Role</th><th>Motivation</th></tr></thead><tbody>
        <tr><td><strong>React + Vite</strong></td><td>Frontend</td><td>Component reuse, fast local development and a separate browser application.</td></tr>
        <tr><td><strong>Express</strong></td><td>Backend API</td><td>Keeps every endpoint and business rule visible and team-owned, satisfying the handwritten API requirement.</td></tr>
        <tr><td><strong>Prisma</strong></td><td>Data access</td><td>Typed server-side queries, explicit migrations and repeatable seed data.</td></tr>
        <tr><td><strong>Neon PostgreSQL</strong></td><td>Database</td><td>Managed relational hosting without exposing generated endpoints to the browser.</td></tr>
        <tr><td><strong>Auth0</strong></td><td>Identity</td><td>Established authentication for sign-up, sign-in, email verification and secure token handling.</td></tr>
        <tr><td><strong>Render</strong></td><td>Backend hosting</td><td>Hosts the Express API and supports environment-based deployment.</td></tr>
        <tr><td><strong>GitHub Pages</strong></td><td>Documentation</td><td>Public static hosting without requiring assessors to sign in.</td></tr>
        <tr><td><strong>Gitea</strong></td><td>Source of truth</td><td>Course repository, issues, branches and team integration history.</td></tr>
      </tbody></table></div></section>
      <section id="separation"><h2>Why the stack is non-monolithic</h2><p>The React client and Express API are separate applications. The client can be built and hosted independently, while the API owns validation, authorisation, business rules and all database access.</p><Callout title="Decision record" tone="success">The team compared Supabase-generated endpoints with a handwritten Express boundary and chose Express + Prisma + Neon to make the API design explicit and assessable.</Callout></section>
    </>,
  },
  "git-methodology": {
    title: "Git Methodology", label: "Git methodology", description: "The current main-only integration workflow used by all six members.", group: "Development", updated: "23 August 2026",
    content: <>
      <Callout title="Current policy" tone="success"><strong>main</strong> is the single shared source of truth. The older develop-to-main method is no longer used.</Callout>
      <section id="branch-flow"><h2>Branch flow</h2><ol className="steps">
        <li><span>1</span><div><strong>Pull main</strong><p>Begin every task from the latest approved integrated code.</p></div></li>
        <li><span>2</span><div><strong>Create your own branch</strong><p>Keep the branch limited to one member task or one reviewable outcome.</p></div></li>
        <li><span>3</span><div><strong>Implement and test locally</strong><p>Run the browser smoke check, then <code>npm run check</code> and relevant coverage before handoff.</p></div></li>
        <li><span>4</span><div><strong>Push and hand over</strong><p>Provide the issue ID, branch name, commands run, results, useful screenshots/API evidence, known limitations and required AI attribution.</p></div></li>
        <li><span>5</span><div><strong>Integration Lead integrates</strong><p>The Integration Lead reviews approved work, integrates it into Gitea main and reruns the affected regression/full gate.</p></div></li>
      </ol></section>
      <section id="branch-examples"><h2>Branch examples</h2><Code>{`git switch main\ngit pull origin main\ngit switch -c feature/tutor-availability\n\n# after implementing and testing\ngit add <changed-files>\ngit commit -m "feat: add tutor availability form"\ngit push -u origin feature/tutor-availability`}</Code></section>
      <section id="integration-rules"><h2>Integration rules</h2><ul><li>Do not build on an outdated branch when main has changed materially.</li><li>Do not mix unrelated member tasks in one handoff.</li><li>Do not commit secrets, generated build output or local environment files.</li><li>Record AI assistance using the course-required tool, model and purpose wording.</li><li>Gitea main remains authoritative; any GitHub deployment mirror must be updated deliberately after integration.</li></ul></section>
    </>,
  },
  "project-methodology": {
    title: "Project Methodology", label: "Project methodology", description: "Four assessed sprints, rotating ownership and evidence-led delivery.", group: "Development", updated: "23 August 2026",
    content: <>
      <section id="four-sprints"><h2>Four-sprint structure</h2><div className="sprint-grid">
        <article><span>01</span><strong>Foundations</strong><p>Repository, blockers, methodology, design and supporting requirements.</p><small>Due 25 Aug 2026</small></article>
        <article><span>02</span><strong>Strong base</strong><p>Core features, testing, reviews, API, feedback and documentation.</p><small>Due 15 Sep 2026</small></article>
        <article><span>03</span><strong>Near complete</strong><p>Most features working, qualitative review, performance and refinement.</p><small>Due 29 Sep 2026</small></article>
        <article><span>04</span><strong>Submission</strong><p>Stable database, API, application, integration and delivery practice.</p><small>Due 11 Oct 2026</small></article>
      </div></section>
      <section id="role-allocation"><h2>Six rotating member roles</h2><p>Before each sprint, the coordinator circulates a poll. Each team member selects one available Member 1–6 role. The allocation is preserved with the sprint plan so ownership stays visible and roles can rotate instead of becoming permanent silos.</p><div className="evidence-strip"><img src="evidence/role-selection.jpg" alt="Role selection poll used by the Tutor MX team" /><div><strong>Non-trivial evidence</strong><p>The role poll, sprint plan, assigned issues, commits and integration handoffs show that the method was actually used.</p></div></div></section>
      <section id="carry-forward"><h2>Carry-forward rule for Sprints 2–4</h2><Callout title="Do not repeat earlier sprints" tone="warning">Every later sprint starts from the latest approved Gitea <code>main</code>. Do not recreate Auth0 onboarding, core role routing, existing schema/API/UI foundations or manual tutor-ID workflows. Add only the new sprint scope and hardening.</Callout><div className="table-wrap"><table><thead><tr><th>Sprint</th><th>Builds on</th><th>New emphasis</th></tr></thead><tbody><tr><td>Sprint 1</td><td>Foundation</td><td>Automatic role onboarding, role workspaces, handwritten API, Prisma/Neon, initial UI and public demo</td></tr><tr><td>Sprint 2</td><td>Sprint 1</td><td>Real Student API, allocation writes, approvals/statuses and Basic hardening</td></tr><tr><td>Sprint 3</td><td>Sprints 1–2</td><td>Ranking, bulk/override, imports, reports, notifications/search and quality refinement</td></tr><tr><td>Sprint 4</td><td>Sprints 1–3</td><td>Claimed Advanced scope, conflicts/swaps/audit/recovery and final release resilience</td></tr></tbody></table></div><p>Every Member section in the current handbook points to pages 7–9 for tests/local verification/runner evidence and page 12 for the Global Definition of Done.</p></section>
      <section id="meeting-cadence"><h2>Working cadence</h2><ul><li>Aim for two meetings each week: one client or stakeholder touchpoint and one internal progress check.</li><li>Record attendance, decisions, actions, blockers and supporting proof.</li><li>Raise integration risks early, especially when work from several members touches the same files.</li><li>Close each sprint with acceptance evidence and a clear handoff into the next sprint.</li></ul></section>
    </>,
  },
  architecture: {
    title: "System Architecture", label: "System architecture", description: "The boundaries between the browser, identity provider, API and database.", group: "Architecture", updated: "23 August 2026",
    content: <>
      <section id="request-flow"><h2>Request flow</h2><div className="architecture-flow"><article><small>1 · Browser</small><strong>React client</strong><p>Displays the student, tutor or organiser experience.</p></article><span aria-hidden="true">→</span><article><small>2 · Identity</small><strong>Auth0</strong><p>Authenticates the user and issues an access token.</p></article><span aria-hidden="true">→</span><article><small>3 · Boundary</small><strong>Express API</strong><p>Validates the token, role and request.</p></article><span aria-hidden="true">→</span><article><small>4 · Data</small><strong>Prisma + Neon</strong><p>Executes server-side relational queries.</p></article></div></section>
      <section id="role-routing"><h2>Automatic role onboarding and direct routing</h2><ol><li>A new user chooses Student, Tutor or Organiser before Auth0.</li><li>Auth0 Universal Login handles Google or email/password identity and email verification.</li><li>On the first successful authentication, React calls <code>POST /api/auth/onboarding</code> with the selected role and bearer token.</li><li>Express verifies the Auth0 identity and applies the role policy; Prisma creates or links the matching Neon Profile.</li><li>On later sign-ins, React calls <code>GET /api/me</code> and opens the saved workspace directly: <code>/student</code>, <code>/tutor</code> or <code>/organiser</code>.</li></ol><Callout title="One role per Tutor MX account" tone="success">Normal onboarding is one-time. Use separate test accounts/emails for Student, Tutor and Organiser. Existing linked users do not choose a role again.</Callout></section>
      <section id="tutor-management-method"><h2>Organiser Tutor Management</h2><p>The normal organiser interface works with Tutor accounts that already registered through the Tutor self-service flow.</p><ul><li>Search for a tutor by name or email.</li><li>Select <strong>Edit</strong> to manage profile details and weekly-hour limit.</li><li>Manage marks and busy times from the selected Tutor record.</li><li>The UI uses the internal database Tutor record automatically.</li><li>The organiser never types, copies or needs to see an Auth0 subject/User ID.</li></ul><Callout title="Professional UI rule" tone="info">Technical Auth0/Neon implementation details belong in documentation, not in the normal organiser screen.</Callout></section>
      <section id="responsibilities"><h2>Responsibility boundaries</h2><div className="table-wrap"><table><thead><tr><th>Layer</th><th>Owns</th><th>Must not own</th></tr></thead><tbody>
        <tr><td>React client</td><td>Views, form state, accessible navigation</td><td>Database secrets or trusted role decisions</td></tr><tr><td>Auth0</td><td>Identity, credentials, token issuance</td><td>Tutor allocation business rules</td></tr><tr><td>Express API</td><td>Validation, authorisation, business logic, response shaping</td><td>Browser-only presentation</td></tr><tr><td>Prisma + Neon</td><td>Schema, constraints, migrations and persistent records</td><td>Direct browser access</td></tr>
      </tbody></table></div></section>
    </>,
  },
  requirements: {
    title: "Requirements & Roadmap", label: "Requirements & roadmap", description: "The course requirements translated into Tutor MX delivery responsibilities.", group: "Overview", updated: "23 August 2026",
    content: <>
      <section id="core-requirements"><h2>Course-wide requirements</h2><div className="requirement-grid">
        <article><span>01</span><strong>Version control</strong><p>Gitea main is the source of truth; members work on short-lived branches.</p><Status tone="green">In use</Status></article>
        <article><span>02</span><strong>Responsive & accessible</strong><p>Role dashboards and documentation must work on desktop and mobile.</p><Status tone="green">In progress</Status></article>
        <article><span>03</span><strong>CI/CD</strong><p>Local quality gates are working; remote Gitea Actions depend on the lecturer-managed runner.</p><Status tone="amber">Runner blocked</Status></article>
        <article><span>04</span><strong>Separated applications</strong><p>React frontend and Express backend have an explicit HTTP boundary.</p><Status tone="green">Implemented</Status></article>
        <article><span>05</span><strong>Handwritten API</strong><p>Express owns the endpoints and business logic; Prisma does not generate public routes.</p><Status tone="green">Implemented</Status></article>
        <article><span>06</span><strong>Authentication</strong><p>Auth0 handles identity; Express automatically creates/links the selected Tutor MX role/Profile and later sign-ins route directly via <code>/api/me</code>.</p><Status tone="green">Integrated</Status></article>
        <article><span>07</span><strong>External integration</strong><p>A safe server-side adapter contract exists; the approved service and final route still need evidence.</p><Status tone="amber">Follow-up</Status></article>
        <article><span>08</span><strong>Public documentation</strong><p>This site is public, version controlled and designed as non-trivial project documentation.</p><Status tone="green">Live</Status></article>
      </div></section>
      <section id="domain-scope"><h2>Tutor management scope</h2><ul><li>Allocate tutors to courses using marks, availability and weekly hour limits.</li><li>Allow students to volunteer for overflow work.</li><li>Support work logs, timesheets, excuses and organiser administration.</li><li>Keep student, tutor and organiser capabilities separated by role.</li></ul></section>
      <section id="roadmap"><h2>Milestone roadmap</h2><div className="table-wrap"><table><thead><tr><th>Milestone</th><th>Outcome</th><th>Evidence expected</th></tr></thead><tbody>
        <tr><td>Sprint 1</td><td>Project foundations and supporting requirements</td><td>Methodology, architecture, design, live site and initial implementation</td></tr>
        <tr><td>Sprint 2</td><td>Complete Basic journeys without rebuilding Sprint 1</td><td>Real Student API, allocation writes, approvals/statuses, regression and hardening</td></tr>
        <tr><td>Sprint 3</td><td>Intermediate features on the working Basic system</td><td>Ranking/bulk/import/report/notification/search plus performance, accessibility and feedback fixes</td></tr>
        <tr><td>Sprint 4 / Submission</td><td>Advanced scope, hardening and release</td><td>Conflicts/swaps/audit/recovery, full regression and proof that deployed code matches approved Gitea main</td></tr>
      </tbody></table></div></section>
    </>,
  },
  "work-tracker": {
    title: "Work Tracker", label: "Work tracker", description: "How planned work, evidence and integration handoffs stay traceable.", group: "Development", updated: "23 August 2026",
    content: <>
      <section id="workflow"><h2>Issue-to-integration workflow</h2><ol className="steps"><li><span>1</span><div><strong>Define the outcome</strong><p>Create or claim a task with an owner, dependencies and acceptance tests.</p></div></li><li><span>2</span><div><strong>Link the branch</strong><p>Keep one member branch tied to the reviewable task.</p></div></li><li><span>3</span><div><strong>Attach evidence</strong><p>Add test output, screenshots, API examples or other proof that matches each acceptance test.</p></div></li><li><span>4</span><div><strong>Handoff clearly</strong><p>Tell the group what changed, what passed and what is still limited.</p></div></li><li><span>5</span><div><strong>Update the record</strong><p>After integration, link the final commit and record the deployed behaviour where applicable.</p></div></li></ol></section>
      <section id="minimum-fields"><h2>Minimum task record</h2><div className="table-wrap"><table><thead><tr><th>Field</th><th>What it must show</th></tr></thead><tbody><tr><td>Owner</td><td>The member responsible for delivery and handoff</td></tr><tr><td>Acceptance tests</td><td>Observable conditions that define completion</td></tr><tr><td>Dependencies</td><td>Other members, routes, schema or configuration required</td></tr><tr><td>Evidence</td><td>Tests, screenshots, commands, logs, review or deployed behaviour</td></tr><tr><td>Status</td><td>Planned, active, review, integrated or blocked</td></tr><tr><td>Limitations</td><td>Known gaps that another task or sprint must address</td></tr></tbody></table></div></section>
      <Callout title="Assessment-friendly traceability" tone="success">The documentation should link decisions to tasks, tasks to code, code to tests and tests to visible behaviour. This is stronger than a list of completed features.</Callout>
    </>,
  },
  database: {
    title: "Database Documentation", label: "Database", description: "Relational design, constraints, migrations and safe data access.", group: "Architecture", updated: "23 August 2026",
    content: <>
      <section id="database-choice"><h2>Why Neon PostgreSQL</h2><p>The team selected managed PostgreSQL on Neon and kept all data access behind the handwritten Express API. This avoids exposing generated database endpoints to the browser and makes the assessed API boundary explicit.</p><div className="evidence-strip"><img src="evidence/database-decision-comparison.png" alt="Comparison used for the Tutor MX database decision" /><div><strong>Decision evidence</strong><p>The team compared the options, consulted the brief and agreed on Express + Prisma + Neon.</p></div></div></section>
      <section id="domain-model"><h2>Domain model</h2><div className="chip-list"><span>Profiles & roles</span><span>Courses</span><span>Marks</span><span>Availability slots</span><span>Weekly limits</span><span>Allocations</span><span>Work logs</span><span>Timesheets</span><span>Excuses</span><span>Overflow work</span><span>Volunteer claims</span></div></section>
      <section id="integrity"><h2>Integrity rules</h2><ul><li>Primary, foreign and compound ownership relationships keep records connected.</li><li>Role relationships distinguish organiser, tutor and student responsibilities.</li><li>Mark, time-period and hour values are constrained to valid ranges.</li><li>A student can claim an overflow item once, and only one accepted claim is allowed per item.</li><li>Timesheet, excuse, overflow and volunteer records follow controlled status transitions.</li><li>Indexes support dashboards, allocation candidates and open-work queries.</li></ul></section>
      <section id="database-operations"><h2>Migrations, seed and verification</h2><Code>{`npm run generate\nnpm run db:migrate\nnpm run db:seed\nnpm run db:verify`}</Code><p>Seed data uses reserved <code>*.example</code> addresses and deliberate eligibility, clash, hour-limit and overflow cases. Never reset a shared or production database.</p></section>
    </>,
  },
  api: {
    title: "API Documentation", label: "API", description: "The handwritten HTTP boundary between the React client and Tutor MX data.", group: "Architecture", updated: "23 August 2026",
    content: <>
      <section id="api-principles"><h2>API principles</h2><ul><li>Every browser request goes through an HTTP endpoint owned by the team.</li><li>Bearer tokens are validated before protected business logic runs.</li><li>Role and ownership checks happen server-side, never only in the interface.</li><li>Responses expose only the fields required by the authenticated user flow.</li><li>Errors use stable status codes and safe messages without leaking internal details.</li></ul></section>
      <section id="known-contracts"><h2>Documented contracts</h2><div className="table-wrap"><table><thead><tr><th>Contract</th><th>Purpose</th><th>Expected result</th></tr></thead><tbody><tr><td><code>GET /health</code></td><td>Process health</td><td>Confirms the service responds</td></tr><tr><td><code>GET /ready</code></td><td>Dependency readiness</td><td>Confirms required services are usable</td></tr><tr><td><code>GET /api/me</code></td><td>Current application user</td><td>Returns the safe profile and role used for routing</td></tr><tr><td>Allocation queries</td><td>Organiser workflows</td><td>Returns marks, clashes, used hours and stable reason codes</td></tr><tr><td>Open-work projection</td><td>Student overflow board</td><td>Returns only student-safe open work fields</td></tr></tbody></table></div></section>
      <section id="request-example"><h2>Authenticated request example</h2><Code>{`GET /api/me HTTP/1.1\nAuthorization: Bearer <access-token>\nAccept: application/json`}</Code><Callout title="Do not publish secrets" tone="warning">Documentation may show variable names, redacted tokens and example payloads. It must never include a real Auth0 secret, database URL or user token.</Callout></section>
      <section id="external-api"><h2>External service integration</h2><p>The server-side adapter handles timeouts, invalid JSON, rate limits, upstream outages and controlled fallback reasons. The final domain-specific service and route must be documented after stakeholder approval and implementation.</p></section>
    </>,
  },
  security: {
    title: "Authentication & Security", label: "Authentication & security", description: "Identity, role enforcement, secret handling and account lifecycle expectations.", group: "Architecture", updated: "23 August 2026",
    content: <>
      <section id="auth-flow"><h2>Auth0 flow</h2><ol><li>The user selects Student, Tutor or Organiser.</li><li>Auth0 Universal Login handles sign-up or sign-in.</li><li>Email verification protects the new account flow.</li><li>The client requests an access token for <code>https://api.tutormx.com</code>.</li><li>Express validates the JWT and resolves the Neon application profile.</li><li>The role router opens the matching dashboard without a second role-selection step.</li></ol></section>
      <section id="role-matrix"><h2>Role boundary</h2><div className="table-wrap"><table><thead><tr><th>Role</th><th>Primary access</th><th>Protected boundary</th></tr></thead><tbody><tr><td>Student</td><td>Overflow volunteering and student-safe work views</td><td>Cannot access tutor or organiser administration</td></tr><tr><td>Tutor</td><td>Availability, course marks, hours and tutor workflows</td><td>Cannot allocate other tutors unless authorised as organiser</td></tr><tr><td>Organiser</td><td>Allocation and administrative oversight</td><td>Requires organiser role from the application profile</td></tr></tbody></table></div></section>
      <section id="security-checklist"><h2>Security checklist</h2><ul className="check-list"><li>Keep <code>.env</code> files untracked and maintain safe placeholders in <code>.env.example</code>.</li><li>Rotate any Auth0 management secret or database URL that is ever exposed.</li><li>Validate audience, issuer, signature, expiry and role server-side.</li><li>Redact emails, meeting links, tokens and credentials from public evidence.</li><li>Run <code>npm run security:check</code> before integration.</li><li>Support sign-out, password reset and account deletion as required by the brief.</li></ul></section>
    </>,
  },
  testing: {
    title: "Testing Documentation", label: "Testing", description: "What the team tests, how checks are run and what the evidence currently proves.", group: "Quality & Evidence", updated: "23 August 2026",
    content: <>
      <section id="test-snapshot"><h2>Recorded integration snapshot</h2><div className="metric-grid"><article><strong>143 / 143</strong><span>Backend tests passed</span><small>23 Aug 2026 full local gate</small></article><article><strong>147 / 147</strong><span>Frontend tests passed</span><small>23 Aug 2026 full local gate</small></article><article><strong>0</strong><span>Secrets or build artifacts staged</span><small>Security and attribution gate</small></article></div><Callout title="What this proves" tone="success">This snapshot proves that the integrated code passed the recorded checks at that time. It does not automatically prove later commits, deployment health or complete coverage of every user flow.</Callout></section>
      <section id="test-layers"><h2>Test layers</h2><div className="table-wrap"><table><thead><tr><th>Layer</th><th>Focus</th><th>Examples</th></tr></thead><tbody><tr><td>Unit</td><td>Isolated rules and transformations</td><td>Eligibility, limits, status transitions, safe payload decoding</td></tr><tr><td>Component</td><td>Rendering and user interaction</td><td>Forms, confirmation dialogs, status messages, role dashboards</td></tr><tr><td>API integration</td><td>Routes, middleware and data behaviour</td><td>Authentication, role checks, errors and HTTP responses</td></tr><tr><td>Database</td><td>Migrations, constraints, seed and queries</td><td>Allocation candidates, clashes, hours and volunteer claims</td></tr><tr><td>Smoke</td><td>Deployed availability</td><td><code>/health</code> and <code>/ready</code></td></tr><tr><td>Manual acceptance</td><td>Complete user journey</td><td>Sign-up, verification, direct role dashboard and sign-out</td></tr></tbody></table></div></section>
      <section id="commands"><h2>Quality commands</h2><Code>{`npm run check\nnpm run coverage\nnpm run test:backend\nnpm run test:frontend\nnpm run db:verify\nnpm run security:check`}</Code><p><code>npm run check</code> is the current full local gate. The 23 August integration run passed 143 backend tests and 147 frontend tests, then completed the production builds and repository security check.</p></section>
      <section id="ci-status"><h2>CI and coverage status</h2><p>The team documented automated Gitea Actions and Codecov workflows. The course-managed runner is currently offline, so local test output is the available execution evidence until remote jobs can run. Record this honestly as a blocker rather than presenting a planned workflow as a completed run.</p><div className="evidence-strip"><img src="evidence/ci-blocker.jpg" alt="Team message recording the CI runner blocker" /><div><strong>Known blocker</strong><p>Remote execution is outside the team repository configuration while the lecturer-managed runner is unavailable.</p></div></div></section>
    </>,
  },
  deployment: {
    title: "Deployment & CI/CD", label: "Deployment & CI/CD", description: "How Tutor MX moves from the course repository to its live services.", group: "Quality & Evidence", updated: "23 August 2026",
    content: <>
      <section id="deployment-map"><h2>Deployment map</h2><div className="table-wrap"><table><thead><tr><th>Part</th><th>Platform</th><th>Source</th><th>Purpose</th></tr></thead><tbody><tr><td>Course repository</td><td>Gitea</td><td><code>main</code></td><td>Authoritative collaboration and integration history</td></tr><tr><td>Deployment mirror</td><td>GitHub</td><td>Copied after approved integration</td><td>Connects the live services to deployable source</td></tr><tr><td>Frontend</td><td>Cloudflare Pages</td><td>Deployment mirror</td><td>Public React application</td></tr><tr><td>Backend</td><td>Render</td><td>Deployment mirror <code>main</code></td><td>Public Express API</td></tr><tr><td>Database</td><td>Neon</td><td>Prisma migrations</td><td>Managed PostgreSQL persistence</td></tr><tr><td>Documentation</td><td>GitHub Pages</td><td>Documentation repository</td><td>Public assessment evidence</td></tr></tbody></table></div></section>
      <section id="release-order"><h2>Safe release order</h2><ol className="steps"><li><span>1</span><div><strong>Integrate in Gitea</strong><p>Review and integrate approved Member work into authoritative <code>main</code>.</p></div></li><li><span>2</span><div><strong>Run the full local gate</strong><p>Run <code>npm run check</code> and relevant coverage/database checks.</p></div></li><li><span>3</span><div><strong>Update the GitHub deployment mirror</strong><p>Sync only the approved Gitea main state to the GitHub deployment repository.</p></div></li><li><span>4</span><div><strong>Build a fresh frontend artifact</strong><p>From <code>frontend</code>, remove the old <code>dist</code> and run <code>npm run build</code>.</p></div></li><li><span>5</span><div><strong>Deploy manually to Cloudflare</strong><p>Workers & Pages → tutor-mx → Create deployment → Production → upload the fresh <code>frontend/dist</code> folder → Save and deploy.</p></div></li><li><span>6</span><div><strong>Smoke test production</strong><p>Open <code>tutor-mx.pages.dev</code>, hard refresh and run the affected role journey. Keep deployment evidence.</p></div></li></ol><Code>{`git switch main\ngit pull origin main\ncd frontend\nRemove-Item -Recurse -Force dist -ErrorAction SilentlyContinue\nnpm run build`}</Code><Callout title="Build-time environment rule" tone="warning"><code>VITE_*</code> values are embedded at build time. If production frontend values change, rebuild <code>dist</code> before uploading it.</Callout></section>
      <Callout title="Source-of-truth warning" tone="warning">A successful Render or Cloudflare deployment does not mean Gitea contains the same code. Update the deployment mirror only after the authoritative main branch is current.</Callout>
    </>,
  },
  "stakeholder-decisions": {
    title: "Stakeholder & Decision Log", label: "Stakeholder decisions", description: "Dated project decisions, their motivation and the evidence that supports them.", group: "Quality & Evidence", updated: "23 August 2026",
    content: <>
      <section id="decision-log"><h2>Key decisions</h2><div className="decision-list">
        <article><time>06 Aug 2026</time><div><strong>Team owns delivery</strong><p>The stakeholder expected the group to work like a small start-up: define its method, remain accountable and use tutor guidance without transferring ownership.</p><span>Evidence: stakeholder meeting attendance and outcome record</span></div></article>
        <article><time>08 Aug 2026</time><div><strong>Four sprints and six rotating roles</strong><p>The work was divided into assessed sprints, with a role-selection poll before every sprint to make ownership visible and fair.</p><span>Evidence: handbook, role poll and sprint planning discussion</span></div></article>
        <article><time>08 Aug 2026</time><div><strong>Express + Prisma + Neon</strong><p>The team chose a handwritten Express boundary over generated Supabase endpoints so the API design remains explicit.</p><span>Evidence: consultation, comparison and team agreement</span></div></article>
        <article><time>13 Aug 2026</time><div><strong>Main-only integration workflow</strong><p>Members pull main, work on their own branch, notify the group and hand off to the integration lead for merging.</p><span>Evidence: team discussion and updated handbook</span></div></article>
        <article><time>13 Aug 2026</time><div><strong>Local testing while CI is blocked</strong><p>The team documented the difference between local test evidence, a planned Actions workflow and Codecov reporting.</p><span>Evidence: handbook pages and CI blocker message</span></div></article>
        <article><time>23 Aug 2026</time><div><strong>Automatic self-service role onboarding</strong><p>New users select Student, Tutor or Organiser once, Auth0 handles identity, and Express/Prisma creates or links the matching Neon Profile. Existing users sign in once and go directly to their saved workspace.</p><span>Evidence: integrated auth/onboarding tests and updated handbook pages 4–5</span></div></article>
        <article><time>23 Aug 2026</time><div><strong>Registered-Tutor management</strong><p>Organisers search self-registered Tutor accounts by name/email and edit the internal database record; the normal UI no longer asks for an Auth0 subject/User ID.</p><span>Evidence: live Tutor Management UI and updated handbook page 6</span></div></article>
        <article><time>23 Aug 2026</time><div><strong>Standard local gate and manual Cloudflare release</strong><p>Members use the documented local browser smoke check plus <code>npm run check</code>. Approved Gitea main is synced to the GitHub mirror, rebuilt, and the fresh frontend/dist artifact is uploaded to Cloudflare Production.</p><span>Evidence: updated handbook pages 7–11 and recorded release runs</span></div></article>
      </div></section>
      <section id="decision-standard"><h2>Decision-record standard</h2><p>Every important architecture, security, methodology or scope decision should state: the date, participants or source, options considered, selected option, motivation, consequences, follow-up owner and links to implementation evidence.</p></section>
    </>,
  },
  "sprint-evidence": {
    title: "Sprint Evidence", label: "Sprint evidence", description: "Non-trivial evidence for planning, methodology, stakeholder interaction and implementation.", group: "Quality & Evidence", updated: "23 August 2026",
    content: <>
      <section id="evidence-gallery"><h2>Sprint 1 evidence gallery</h2><div className="evidence-gallery">
        <figure><a href="evidence/role-selection.jpg" target="_blank"><img src="evidence/role-selection.jpg" alt="Team role selection poll" /></a><figcaption><strong>Role allocation</strong><p>Shows the democratic Member 1–6 role-selection method being used.</p><span>Project methodology · Work tracker</span></figcaption></figure>
        <figure><a href="evidence/sprint-planning.jpg" target="_blank"><img src="evidence/sprint-planning.jpg" alt="Sprint planning discussion" /></a><figcaption><strong>Sprint planning</strong><p>Shows members being asked to review dependencies and select sprint roles.</p><span>Initial plan · Methodology</span></figcaption></figure>
        <figure><a href="evidence/git-methodology.jpg" target="_blank"><img src="evidence/git-methodology.jpg" alt="Git methodology team discussion" /></a><figcaption><strong>Git method</strong><p>Records the branch-and-integration method agreed by the group.</p><span>Version control · Git methodology</span></figcaption></figure>
        <figure><a href="evidence/database-decision.jpg" target="_blank"><img src="evidence/database-decision.jpg" alt="Database decision discussion" /></a><figcaption><strong>Database decision</strong><p>Shows the team comparing options before selecting the API/database boundary.</p><span>Tech stack · Stakeholder interaction</span></figcaption></figure>
        <figure><a href="evidence/neon-access.jpg" target="_blank"><img src="evidence/neon-access.jpg" alt="Neon access coordination" /></a><figcaption><strong>Neon onboarding</strong><p>Records shared access coordination and a genuine setup blocker.</p><span>Getting started · Interaction</span></figcaption></figure>
        <figure><a href="evidence/member6-handoff.jpg" target="_blank"><img src="evidence/member6-handoff.jpg" alt="Member 6 technical handoff" /></a><figcaption><strong>Technical handoff</strong><p>Communicates the branch, stack, schema, demo data and workflow to the team.</p><span>Implementation · Developer guide</span></figcaption></figure>
        <figure><a href="evidence/ci-blocker.jpg" target="_blank"><img src="evidence/ci-blocker.jpg" alt="CI runner blocker message" /></a><figcaption><strong>CI blocker</strong><p>Records that remote CI is blocked while local testing remains possible.</p><span>Risk management · Testing</span></figcaption></figure>
      </div></section>
      <section id="rubric-alignment"><h2>Sprint 1 rubric alignment</h2><div className="table-wrap"><table><thead><tr><th>Criterion</th><th>Weight</th><th>Evidence on this wiki</th></tr></thead><tbody><tr><td>Documentation site</td><td>10%</td><td>Wiki structure, non-trivial content, public documents and evidence</td></tr><tr><td>Getting started</td><td>5%</td><td>Development guide, requirements and quality commands</td></tr><tr><td>Work tracker</td><td>5%</td><td>Issue-to-integration process and evidence requirements</td></tr><tr><td>Git methodology</td><td>5%</td><td>Current main-only workflow and team discussion evidence</td></tr><tr><td>Project methodology</td><td>10%</td><td>Four sprints, six rotating roles and meeting cadence</td></tr><tr><td>Tech stack</td><td>5%</td><td>Full stack listing with responsibility and motivation</td></tr><tr><td>Stakeholder interaction</td><td>10%</td><td>Dated decision log and supporting proof</td></tr><tr><td>Initial design & plan</td><td>20%</td><td>Architecture, roadmap, domain model and sprint plan</td></tr><tr><td>Implementation</td><td>20%</td><td>Integrated stack, test snapshot, Auth0 and database evidence</td></tr></tbody></table></div></section>
    </>,
  },
  documents: {
    title: "Document Library", label: "Document library", description: "Official briefs, team planning records and technical decision documents.", group: "Reference", updated: "23 August 2026",
    content: <>
      <section id="available-documents"><h2>Available documents</h2><div className="document-grid">
        <a href="documents/project-brief.pdf" target="_blank"><span>PDF</span><div><strong>COMS3011A Project Brief</strong><small>Official requirements, milestones, dates and rubrics</small></div><b>Open ↗</b></a>
        <a href="documents/tutor-mx-sprint-handbook.pdf" target="_blank"><span>PDF</span><div><strong>Tutor MX Gitea Sprint Handbook — Updated 23 Aug 2026</strong><small>Current 46-page Sprint 1–4 guide: automatic Auth0 onboarding, Gitea main workflow, testing/local verification, registered-Tutor management and manual Cloudflare release</small></div><b>Open ↗</b></a>
        <a href="documents/ai-policy.pdf" target="_blank"><span>PDF</span><div><strong>COMS3011A AI Policy</strong><small>Required attribution and verification rules</small></div><b>Open ↗</b></a>
        <a href="documents/postgresql-express-decision.pdf" target="_blank"><span>PDF</span><div><strong>PostgreSQL & Express Decision</strong><small>Motivation for the handwritten API and database choice</small></div><b>Open ↗</b></a>
        <a href="documents/README.md" target="_blank"><span>MD</span><div><strong>Repository README</strong><small>Setup, checks, data workflow and handoff notes</small></div><b>Open ↗</b></a>
      </div></section>
      <Callout title="Current handbook" tone="success">The linked 23 August handbook supersedes the older 95-page edition. It uses Gitea main as the source of truth, removes develop-branch instructions and tells Sprints 2–4 to build on earlier integrated work instead of repeating it.</Callout>
    </>,
  },
  "third-party-code": {
    title: "Third-Party Code", label: "Third-party code", description: "External libraries and services used by Tutor MX, with purpose and justification.", group: "Reference", updated: "23 August 2026",
    content: <>
      <section id="dependencies"><h2>Primary dependencies</h2><div className="table-wrap"><table><thead><tr><th>Library or service</th><th>Purpose</th><th>Justification</th></tr></thead><tbody><tr><td>React</td><td>Frontend components and state</td><td>Reusable role dashboards and accessible interaction patterns</td></tr><tr><td>Vite</td><td>Frontend development and build</td><td>Fast feedback and optimised static output</td></tr><tr><td>Express</td><td>HTTP API</td><td>Minimal framework that keeps routes and middleware team-written</td></tr><tr><td>Prisma</td><td>ORM, migrations and typed queries</td><td>Explicit relational schema and repeatable database operations</td></tr><tr><td>Neon</td><td>Managed PostgreSQL</td><td>Hosted relational data without generated browser endpoints</td></tr><tr><td>Auth0 React SDK + JWT/JWKS validation</td><td>Authentication</td><td>Established identity provider and standards-based access tokens</td></tr><tr><td>Vitest / Testing Library</td><td>Frontend testing</td><td>User-focused component and hook tests</td></tr><tr><td>Node test tooling</td><td>Backend testing</td><td>API, service, migration and query verification</td></tr><tr><td>Render</td><td>Backend hosting</td><td>Environment-managed Node deployment</td></tr><tr><td>Cloudflare Pages</td><td>Frontend hosting</td><td>Fast static web deployment</td></tr></tbody></table></div></section>
      <section id="documentation-rule"><h2>Documentation rule</h2><p>For each new dependency, record its package and version, purpose, reason for choosing it, relevant licence, security implications and any fallback or removal plan. Third-party code does not remove the team&apos;s responsibility to validate behaviour.</p></section>
    </>,
  },
  "ai-attribution": {
    title: "AI Attribution", label: "AI attribution", description: "Transparent disclosure of AI assistance and the team&apos;s verification responsibility.", group: "Reference", updated: "23 August 2026",
    content: <>
      <section id="policy"><h2>Course policy</h2><p>AI use is encouraged when it is transparent, accurately attributed and human-reviewed. The group remains responsible for every claim, command, design and line of code that it submits.</p><ul><li>Record the tool, model and purpose.</li><li>Use an <code>Assisted-by</code> footer where the repository policy requires it.</li><li>Do not guess an undisclosed underlying model.</li><li>Verify generated work against the brief, source code and real test results.</li><li>Remove secrets and private data before prompting.</li></ul></section>
      <section id="canonical-wording"><h2>Canonical declarations</h2><div className="declaration"><strong>Qoder wording</strong><p>Qoder 1.23.0, Quest Agent mode, Auto tier. Qoder automatically routed requests to an underlying model that was not disclosed, so no specific provider model has been guessed.</p></div><div className="declaration"><strong>This documentation redesign</strong><p>ChatGPT [GPT-5.6 Sol] was used on 23 August 2026 to update the Sprint handbook alignment, testing/local-verification guidance, Auth0 onboarding documentation, deployment instructions and documentation website implementation. The Tutor MX team must review the result against the project brief and current repository before submission.</p></div></section>
    </>,
  },
  challenges: {
    title: "Challenges & Future Improvements", label: "Challenges & improvements", description: "Known constraints, how they were handled and the next documentation priorities.", group: "Reference", updated: "23 August 2026",
    content: <>
      <section id="challenges"><h2>Challenges encountered</h2><div className="decision-list"><article><time>CI</time><div><strong>Lecturer-managed runner offline</strong><p>Local tests, builds and security checks provide current evidence. Remote Actions and Codecov execution remain dependent on runner availability.</p></div></article><article><time>Deploy</time><div><strong>Two repository surfaces</strong><p>Gitea is authoritative, while live services deploy from a GitHub mirror. The team must deliberately keep the deployed commit aligned with approved main.</p></div></article><article><time>Auth</time><div><strong>Duplicate sign-in and role selection</strong><p>Self-service onboarding now links the selected role/Profile through the backend, and <code>GET /api/me</code> routes existing linked users directly to the correct dashboard after one Auth0 sign-in.</p></div></article><article><time>Team</time><div><strong>Parallel integration</strong><p>Six member branches can touch shared files. Focused handoffs and one integration owner reduce conflicting merges.</p></div></article></div></section>
      <section id="future"><h2>Future documentation priorities</h2><ul className="check-list"><li>Add issue and final commit links to each sprint evidence record.</li><li>Publish request and response examples for every completed API route.</li><li>Add the current ERD and migration history after schema review.</li><li>Record formal user-testing tasks, participants, results and integrated feedback.</li><li>Add deployment screenshots and smoke-test output for every release.</li><li>Keep third-party dependency and AI-attribution records current.</li></ul></section>
    </>,
  },
};

const groupOrder = ["Overview", "Development", "Architecture", "Quality & Evidence", "Reference"];
function pageHeadings(node: HTMLElement | null) { if (!node) return [] as { id: string; label: string }[]; return Array.from(node.querySelectorAll<HTMLElement>("section[id] > h2")).map((heading) => ({ id: heading.parentElement?.id || "", label: heading.textContent || "" })).filter((item) => item.id && item.label); }

export default function WikiClient() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [headings, setHeadings] = useState<{ id: string; label: string }[]>([]);
  const articleRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { const sync = () => { const slug = window.location.hash.slice(1).split("/")[0]; if (slug && pages[slug]) setActive(slug); }; sync(); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); setSearchOpen(false); setQuery(""); window.setTimeout(() => setHeadings(pageHeadings(articleRef.current)), 0); }, [active]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "/" && !(event.target instanceof HTMLInputElement)) { event.preventDefault(); setSearchOpen(true); window.setTimeout(() => searchRef.current?.focus(), 0); } if (event.key === "Escape") setSearchOpen(false); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, []);
  const page = pages[active] || pages.home;
  const grouped = useMemo(() => groupOrder.map((group) => ({ group, items: Object.entries(pages).filter(([, item]) => item.group === group) })), []);
  const results = Object.entries(pages).filter(([, item]) => `${item.title} ${item.description} ${item.group}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#home" aria-label="Tutor MX documentation home"><span className="brand-mark">TM</span><span><strong>Tutor MX</strong><small>Documentation</small></span></a><button className="search-trigger" type="button" onClick={() => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 0); }}><span>Search documentation</span><kbd>/</kbd></button><nav className="header-links" aria-label="External links"><a href="https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/" target="_blank" rel="noreferrer">Public site ↗</a><a className="repo-link" href="https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site" target="_blank" rel="noreferrer">Repository ↗</a></nav><button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button></header>
    <div className="site-grid"><aside className={`sidebar ${menuOpen ? "open" : ""}`}><nav aria-label="Documentation pages">{grouped.map(({ group, items }) => items.length > 0 && <div className="nav-group" key={group}><h2>{group}</h2>{items.map(([slug, item]) => <a key={slug} href={`#${slug}`} className={active === slug ? "active" : ""}>{item.label}</a>)}</div>)}</nav><div className="sidebar-foot"><span className="pulse" /><div><strong>Living documentation</strong><small>Updated throughout every sprint</small></div></div></aside>
      <main className="main-content"><article ref={articleRef} className="article"><div className="breadcrumbs"><a href="#home">Tutor MX</a><span>/</span><span>{page.group}</span><span>/</span><strong>{page.label}</strong></div><header className="article-header"><p className="kicker">{page.group}</p><h1>{page.title}</h1><p>{page.description}</p><div><Status tone="green">Maintained</Status><span>Last updated {page.updated}</span></div></header><div className="article-body">{page.content}</div><footer className="article-footer"><div><strong>Was this page useful?</strong><span>Keep evidence current when implementation changes.</span></div><a href="https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site" target="_blank" rel="noreferrer">View documentation source ↗</a></footer></article><aside className="toc" aria-label="On this page"><strong>On this page</strong>{headings.map((heading) => <a key={heading.id} href={`#${active}/${heading.id}`} onClick={(event) => { event.preventDefault(); document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" }); }}>{heading.label}</a>)}<span className="toc-rule" /><a href="#home">Back to home</a></aside></main>
    </div>
    {searchOpen && <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}><section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation"><div className="search-field"><span>⌕</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, topics and evidence..." /><kbd>ESC</kbd></div><div className="search-results">{results.map(([slug, item]) => <a key={slug} href={`#${slug}`}><span>{item.group}</span><strong>{item.title}</strong><small>{item.description}</small></a>)}{results.length === 0 && <p>No documentation pages match “{query}”.</p>}</div></section></div>}
  </div>;
}
