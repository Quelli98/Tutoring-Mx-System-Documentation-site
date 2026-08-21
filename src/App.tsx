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
    updated: "21 August 2026",
    content: <>
      <section className="lead-panel" id="project-overview">
        <div><p className="kicker">COMS3011A · Tutor Management System</p><h2>One place for the project, the process and the proof.</h2><p>Tutor MX helps organisers allocate tutors to courses using marks, availability and weekly hour limits. It also supports student overflow volunteering, timesheets, excuses and the administrative work around tutoring.</p></div>
        <div className="release-card"><span>Current milestone</span><strong>Sprint 1</strong><p>Foundations, architecture and initial implementation</p><div><Status tone="green">Public docs</Status><Status>Living record</Status></div></div>
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
        <tr><th>Authentication</th><td>Auth0 Universal Login and role routing</td><td><Status tone="green">Configured</Status></td></tr>
        <tr><th>Quality snapshot</th><td>80 backend tests + 31 frontend tests passed on 14 Aug 2026</td><td><Status>Recorded</Status></td></tr>
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
    title: "Development Guide", label: "Development guide", description: "Set up Tutor MX locally and verify a clean development environment.", group: "Development", updated: "21 August 2026",
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
      <section id="verification"><h2>Verify before handoff</h2><Code>{`npm test\nnpm run coverage\nnpm run lint\nnpm run typecheck\nnpm run build\nnpm run security:check`}</Code><p>Attach the relevant output to the issue or handoff. A passing local result is useful evidence while the lecturer-managed remote runner remains unavailable.</p></section>
    </>,
  },
  "tech-stack": {
    title: "Tech Stack", label: "Tech stack", description: "The selected technologies, their responsibilities and why they fit the brief.", group: "Development", updated: "21 August 2026",
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
    title: "Git Methodology", label: "Git methodology", description: "The current main-only integration workflow used by all six members.", group: "Development", updated: "21 August 2026",
    content: <>
      <Callout title="Current policy" tone="success"><strong>main</strong> is the single shared source of truth. The older develop-to-main method is no longer used.</Callout>
      <section id="branch-flow"><h2>Branch flow</h2><ol className="steps">
        <li><span>1</span><div><strong>Pull main</strong><p>Begin every task from the latest approved integrated code.</p></div></li>
        <li><span>2</span><div><strong>Create your own branch</strong><p>Keep the branch limited to one member task or one reviewable outcome.</p></div></li>
        <li><span>3</span><div><strong>Implement and test</strong><p>Run the checks relevant to your change and keep evidence.</p></div></li>
        <li><span>4</span><div><strong>Notify the group</strong><p>Provide the branch name, completed acceptance tests, changed areas and known limitations.</p></div></li>
        <li><span>5</span><div><strong>Integration lead merges</strong><p>The integration owner reviews dependencies and merges approved work into main.</p></div></li>
      </ol></section>
      <section id="branch-examples"><h2>Branch examples</h2><Code>{`git switch main\ngit pull origin main\ngit switch -c feature/tutor-availability\n\n# after implementing and testing\ngit add <changed-files>\ngit commit -m "feat: add tutor availability form"\ngit push -u origin feature/tutor-availability`}</Code></section>
      <section id="integration-rules"><h2>Integration rules</h2><ul><li>Do not build on an outdated branch when main has changed materially.</li><li>Do not mix unrelated member tasks in one handoff.</li><li>Do not commit secrets, generated build output or local environment files.</li><li>Record AI assistance using the course-required tool, model and purpose wording.</li><li>Gitea main remains authoritative; any GitHub deployment mirror must be updated deliberately after integration.</li></ul></section>
    </>,
  },
  "project-methodology": {
    title: "Project Methodology", label: "Project methodology", description: "Four assessed sprints, rotating ownership and evidence-led delivery.", group: "Development", updated: "21 August 2026",
    content: <>
      <section id="four-sprints"><h2>Four-sprint structure</h2><div className="sprint-grid">
        <article><span>01</span><strong>Foundations</strong><p>Repository, blockers, methodology, design and supporting requirements.</p><small>Due 25 Aug 2026</small></article>
        <article><span>02</span><strong>Strong base</strong><p>Core features, testing, reviews, API, feedback and documentation.</p><small>Due 15 Sep 2026</small></article>
        <article><span>03</span><strong>Near complete</strong><p>Most features working, qualitative review, performance and refinement.</p><small>Due 29 Sep 2026</small></article>
        <article><span>04</span><strong>Submission</strong><p>Stable database, API, application, integration and delivery practice.</p><small>Due 11 Oct 2026</small></article>
      </div></section>
      <section id="role-allocation"><h2>Six rotating member roles</h2><p>Before each sprint, the coordinator circulates a poll. Each team member selects one available Member 1–6 role. The allocation is preserved with the sprint plan so ownership stays visible and roles can rotate instead of becoming permanent silos.</p><div className="evidence-strip"><img src="evidence/role-selection.jpg" alt="Role selection poll used by the Tutor MX team" /><div><strong>Non-trivial evidence</strong><p>The role poll, sprint plan, assigned issues, commits and integration handoffs show that the method was actually used.</p></div></div></section>
      <section id="meeting-cadence"><h2>Working cadence</h2><ul><li>Aim for two meetings each week: one client or stakeholder touchpoint and one internal progress check.</li><li>Record attendance, decisions, actions, blockers and supporting proof.</li><li>Raise integration risks early, especially when work from several members touches the same files.</li><li>Close each sprint with acceptance evidence and a clear handoff into the next sprint.</li></ul></section>
    </>,
  },
  architecture: {
    title: "System Architecture", label: "System architecture", description: "The boundaries between the browser, identity provider, API and database.", group: "Architecture", updated: "21 August 2026",
    content: <>
      <section id="request-flow"><h2>Request flow</h2><div className="architecture-flow"><article><small>1 · Browser</small><strong>React client</strong><p>Displays the student, tutor or organiser experience.</p></article><span aria-hidden="true">→</span><article><small>2 · Identity</small><strong>Auth0</strong><p>Authenticates the user and issues an access token.</p></article><span aria-hidden="true">→</span><article><small>3 · Boundary</small><strong>Express API</strong><p>Validates the token, role and request.</p></article><span aria-hidden="true">→</span><article><small>4 · Data</small><strong>Prisma + Neon</strong><p>Executes server-side relational queries.</p></article></div></section>
      <section id="role-routing"><h2>Authentication and role routing</h2><ol><li>The user chooses Student, Tutor or Organiser before authentication.</li><li>Auth0 Universal Login handles sign-up, sign-in and email verification.</li><li>The frontend sends the Auth0 bearer token to the handwritten API.</li><li><code>GET /api/me</code> resolves the application profile and role.</li><li>The role router sends the user directly to the correct dashboard.</li></ol><Callout title="Self-service onboarding" tone="success">A new sign-in creates or resolves the application profile without requiring a team member to manually add every account to Neon.</Callout></section>
      <section id="responsibilities"><h2>Responsibility boundaries</h2><div className="table-wrap"><table><thead><tr><th>Layer</th><th>Owns</th><th>Must not own</th></tr></thead><tbody>
        <tr><td>React client</td><td>Views, form state, accessible navigation</td><td>Database secrets or trusted role decisions</td></tr><tr><td>Auth0</td><td>Identity, credentials, token issuance</td><td>Tutor allocation business rules</td></tr><tr><td>Express API</td><td>Validation, authorisation, business logic, response shaping</td><td>Browser-only presentation</td></tr><tr><td>Prisma + Neon</td><td>Schema, constraints, migrations and persistent records</td><td>Direct browser access</td></tr>
      </tbody></table></div></section>
    </>,
  },
  requirements: {
    title: "Requirements & Roadmap", label: "Requirements & roadmap", description: "The course requirements translated into Tutor MX delivery responsibilities.", group: "Overview", updated: "21 August 2026",
    content: <>
      <section id="core-requirements"><h2>Course-wide requirements</h2><div className="requirement-grid">
        <article><span>01</span><strong>Version control</strong><p>Gitea main is the source of truth; members work on short-lived branches.</p><Status tone="green">In use</Status></article>
        <article><span>02</span><strong>Responsive & accessible</strong><p>Role dashboards and documentation must work on desktop and mobile.</p><Status tone="green">In progress</Status></article>
        <article><span>03</span><strong>CI/CD</strong><p>Local quality gates are working; remote Gitea Actions depend on the lecturer-managed runner.</p><Status tone="amber">Runner blocked</Status></article>
        <article><span>04</span><strong>Separated applications</strong><p>React frontend and Express backend have an explicit HTTP boundary.</p><Status tone="green">Implemented</Status></article>
        <article><span>05</span><strong>Handwritten API</strong><p>Express owns the endpoints and business logic; Prisma does not generate public routes.</p><Status tone="green">Implemented</Status></article>
        <article><span>06</span><strong>Authentication</strong><p>Auth0 handles identity, while the application API resolves roles and profiles.</p><Status tone="green">Configured</Status></article>
        <article><span>07</span><strong>External integration</strong><p>A safe server-side adapter contract exists; the approved service and final route still need evidence.</p><Status tone="amber">Follow-up</Status></article>
        <article><span>08</span><strong>Public documentation</strong><p>This site is public, version controlled and designed as non-trivial project documentation.</p><Status tone="green">Live</Status></article>
      </div></section>
      <section id="domain-scope"><h2>Tutor management scope</h2><ul><li>Allocate tutors to courses using marks, availability and weekly hour limits.</li><li>Allow students to volunteer for overflow work.</li><li>Support work logs, timesheets, excuses and organiser administration.</li><li>Keep student, tutor and organiser capabilities separated by role.</li></ul></section>
      <section id="roadmap"><h2>Milestone roadmap</h2><div className="table-wrap"><table><thead><tr><th>Milestone</th><th>Outcome</th><th>Evidence expected</th></tr></thead><tbody>
        <tr><td>Sprint 1</td><td>Project foundations and supporting requirements</td><td>Methodology, architecture, design, live site and initial implementation</td></tr>
        <tr><td>Sprint 2</td><td>Strong functional base</td><td>Core features, API, automated tests, reviews, database and third-party docs</td></tr>
        <tr><td>Sprint 3</td><td>Near-complete product</td><td>User feedback, performance, refinement and complete documentation</td></tr>
        <tr><td>Submission</td><td>Stable end-to-end system</td><td>Database, API, app, integration, testing and delivery evidence</td></tr>
      </tbody></table></div></section>
    </>,
  },
  "work-tracker": {
    title: "Work Tracker", label: "Work tracker", description: "How planned work, evidence and integration handoffs stay traceable.", group: "Development", updated: "21 August 2026",
    content: <>
      <section id="workflow"><h2>Issue-to-integration workflow</h2><ol className="steps"><li><span>1</span><div><strong>Define the outcome</strong><p>Create or claim a task with an owner, dependencies and acceptance tests.</p></div></li><li><span>2</span><div><strong>Link the branch</strong><p>Keep one member branch tied to the reviewable task.</p></div></li><li><span>3</span><div><strong>Attach evidence</strong><p>Add test output, screenshots, API examples or other proof that matches each acceptance test.</p></div></li><li><span>4</span><div><strong>Handoff clearly</strong><p>Tell the group what changed, what passed and what is still limited.</p></div></li><li><span>5</span><div><strong>Update the record</strong><p>After integration, link the final commit and record the deployed behaviour where applicable.</p></div></li></ol></section>
      <section id="minimum-fields"><h2>Minimum task record</h2><div className="table-wrap"><table><thead><tr><th>Field</th><th>What it must show</th></tr></thead><tbody><tr><td>Owner</td><td>The member responsible for delivery and handoff</td></tr><tr><td>Acceptance tests</td><td>Observable conditions that define completion</td></tr><tr><td>Dependencies</td><td>Other members, routes, schema or configuration required</td></tr><tr><td>Evidence</td><td>Tests, screenshots, commands, logs, review or deployed behaviour</td></tr><tr><td>Status</td><td>Planned, active, review, integrated or blocked</td></tr><tr><td>Limitations</td><td>Known gaps that another task or sprint must address</td></tr></tbody></table></div></section>
      <Callout title="Assessment-friendly traceability" tone="success">The documentation should link decisions to tasks, tasks to code, code to tests and tests to visible behaviour. This is stronger than a list of completed features.</Callout>
    </>,
  },
  database: {
    title: "Database Documentation", label: "Database", description: "Relational design, constraints, migrations and safe data access.", group: "Architecture", updated: "21 August 2026",
    content: <>
      <section id="database-choice"><h2>Why Neon PostgreSQL</h2><p>The team selected managed PostgreSQL on Neon and kept all data access behind the handwritten Express API. This avoids exposing generated database endpoints to the browser and makes the assessed API boundary explicit.</p><div className="evidence-strip"><img src="evidence/database-decision-comparison.png" alt="Comparison used for the Tutor MX database decision" /><div><strong>Decision evidence</strong><p>The team compared the options, consulted the brief and agreed on Express + Prisma + Neon.</p></div></div></section>
      <section id="domain-model"><h2>Domain model</h2><div className="chip-list"><span>Profiles & roles</span><span>Courses</span><span>Marks</span><span>Availability slots</span><span>Weekly limits</span><span>Allocations</span><span>Work logs</span><span>Timesheets</span><span>Excuses</span><span>Overflow work</span><span>Volunteer claims</span></div></section>
      <section id="integrity"><h2>Integrity rules</h2><ul><li>Primary, foreign and compound ownership relationships keep records connected.</li><li>Role relationships distinguish organiser, tutor and student responsibilities.</li><li>Mark, time-period and hour values are constrained to valid ranges.</li><li>A student can claim an overflow item once, and only one accepted claim is allowed per item.</li><li>Timesheet, excuse, overflow and volunteer records follow controlled status transitions.</li><li>Indexes support dashboards, allocation candidates and open-work queries.</li></ul></section>
      <section id="database-operations"><h2>Migrations, seed and verification</h2><Code>{`npm run generate\nnpm run db:migrate\nnpm run db:seed\nnpm run db:verify`}</Code><p>Seed data uses reserved <code>*.example</code> addresses and deliberate eligibility, clash, hour-limit and overflow cases. Never reset a shared or production database.</p></section>
    </>,
  },
  api: {
    title: "API Documentation", label: "API", description: "The handwritten HTTP boundary between the React client and Tutor MX data.", group: "Architecture", updated: "21 August 2026",
    content: <>
      <section id="api-principles"><h2>API principles</h2><ul><li>Every browser request goes through an HTTP endpoint owned by the team.</li><li>Bearer tokens are validated before protected business logic runs.</li><li>Role and ownership checks happen server-side, never only in the interface.</li><li>Responses expose only the fields required by the authenticated user flow.</li><li>Errors use stable status codes and safe messages without leaking internal details.</li></ul></section>
      <section id="known-contracts"><h2>Documented contracts</h2><div className="table-wrap"><table><thead><tr><th>Contract</th><th>Purpose</th><th>Expected result</th></tr></thead><tbody><tr><td><code>GET /health</code></td><td>Process health</td><td>Confirms the service responds</td></tr><tr><td><code>GET /ready</code></td><td>Dependency readiness</td><td>Confirms required services are usable</td></tr><tr><td><code>GET /api/me</code></td><td>Current application user</td><td>Returns the safe profile and role used for routing</td></tr><tr><td>Allocation queries</td><td>Organiser workflows</td><td>Returns marks, clashes, used hours and stable reason codes</td></tr><tr><td>Open-work projection</td><td>Student overflow board</td><td>Returns only student-safe open work fields</td></tr></tbody></table></div></section>
      <section id="request-example"><h2>Authenticated request example</h2><Code>{`GET /api/me HTTP/1.1\nAuthorization: Bearer <access-token>\nAccept: application/json`}</Code><Callout title="Do not publish secrets" tone="warning">Documentation may show variable names, redacted tokens and example payloads. It must never include a real Auth0 secret, database URL or user token.</Callout></section>
      <section id="external-api"><h2>External service integration</h2><p>The server-side adapter handles timeouts, invalid JSON, rate limits, upstream outages and controlled fallback reasons. The final domain-specific service and route must be documented after stakeholder approval and implementation.</p></section>
    </>,
  },
  security: {
    title: "Authentication & Security", label: "Authentication & security", description: "Identity, role enforcement, secret handling and account lifecycle expectations.", group: "Architecture", updated: "21 August 2026",
    content: <>
      <section id="auth-flow"><h2>Auth0 flow</h2><ol><li>The user selects Student, Tutor or Organiser.</li><li>Auth0 Universal Login handles sign-up or sign-in.</li><li>Email verification protects the new account flow.</li><li>The client requests an access token for <code>https://api.tutormx.com</code>.</li><li>Express validates the JWT and resolves the Neon application profile.</li><li>The role router opens the matching dashboard without a second role-selection step.</li></ol></section>
      <section id="role-matrix"><h2>Role boundary</h2><div className="table-wrap"><table><thead><tr><th>Role</th><th>Primary access</th><th>Protected boundary</th></tr></thead><tbody><tr><td>Student</td><td>Overflow volunteering and student-safe work views</td><td>Cannot access tutor or organiser administration</td></tr><tr><td>Tutor</td><td>Availability, course marks, hours and tutor workflows</td><td>Cannot allocate other tutors unless authorised as organiser</td></tr><tr><td>Organiser</td><td>Allocation and administrative oversight</td><td>Requires organiser role from the application profile</td></tr></tbody></table></div></section>
      <section id="security-checklist"><h2>Security checklist</h2><ul className="check-list"><li>Keep <code>.env</code> files untracked and maintain safe placeholders in <code>.env.example</code>.</li><li>Rotate any Auth0 management secret or database URL that is ever exposed.</li><li>Validate audience, issuer, signature, expiry and role server-side.</li><li>Redact emails, meeting links, tokens and credentials from public evidence.</li><li>Run <code>npm run security:check</code> before integration.</li><li>Support sign-out, password reset and account deletion as required by the brief.</li></ul></section>
    </>,
  },
  testing: {
    title: "Testing Documentation", label: "Testing", description: "What the team tests, how checks are run and what the evidence currently proves.", group: "Quality & Evidence", updated: "21 August 2026",
    content: <>
      <section id="test-snapshot"><h2>Recorded integration snapshot</h2><div className="metric-grid"><article><strong>80 / 80</strong><span>Backend tests passed</span><small>14 Aug 2026 integration run</small></article><article><strong>31 / 31</strong><span>Frontend tests passed</span><small>14 Aug 2026 integration run</small></article><article><strong>0</strong><span>Secrets or build artifacts staged</span><small>Security and attribution gate</small></article></div><Callout title="What this proves" tone="success">This snapshot proves that the integrated code passed the recorded checks at that time. It does not automatically prove later commits, deployment health or complete coverage of every user flow.</Callout></section>
      <section id="test-layers"><h2>Test layers</h2><div className="table-wrap"><table><thead><tr><th>Layer</th><th>Focus</th><th>Examples</th></tr></thead><tbody><tr><td>Unit</td><td>Isolated rules and transformations</td><td>Eligibility, limits, status transitions, safe payload decoding</td></tr><tr><td>Component</td><td>Rendering and user interaction</td><td>Forms, confirmation dialogs, status messages, role dashboards</td></tr><tr><td>API integration</td><td>Routes, middleware and data behaviour</td><td>Authentication, role checks, errors and HTTP responses</td></tr><tr><td>Database</td><td>Migrations, constraints, seed and queries</td><td>Allocation candidates, clashes, hours and volunteer claims</td></tr><tr><td>Smoke</td><td>Deployed availability</td><td><code>/health</code> and <code>/ready</code></td></tr><tr><td>Manual acceptance</td><td>Complete user journey</td><td>Sign-up, verification, direct role dashboard and sign-out</td></tr></tbody></table></div></section>
      <section id="commands"><h2>Quality commands</h2><Code>{`npm test\nnpm run coverage\nnpm run db:verify\nnpm run lint\nnpm run typecheck\nnpm run build\nnpm run security:check`}</Code></section>
      <section id="ci-status"><h2>CI and coverage status</h2><p>The team documented automated Gitea Actions and Codecov workflows. The course-managed runner is currently offline, so local test output is the available execution evidence until remote jobs can run. Record this honestly as a blocker rather than presenting a planned workflow as a completed run.</p><div className="evidence-strip"><img src="evidence/ci-blocker.jpg" alt="Team message recording the CI runner blocker" /><div><strong>Known blocker</strong><p>Remote execution is outside the team repository configuration while the lecturer-managed runner is unavailable.</p></div></div></section>
    </>,
  },
  deployment: {
    title: "Deployment & CI/CD", label: "Deployment & CI/CD", description: "How Tutor MX moves from the course repository to its live services.", group: "Quality & Evidence", updated: "21 August 2026",
    content: <>
      <section id="deployment-map"><h2>Deployment map</h2><div className="table-wrap"><table><thead><tr><th>Part</th><th>Platform</th><th>Source</th><th>Purpose</th></tr></thead><tbody><tr><td>Course repository</td><td>Gitea</td><td><code>main</code></td><td>Authoritative collaboration and integration history</td></tr><tr><td>Deployment mirror</td><td>GitHub</td><td>Copied after approved integration</td><td>Connects the live services to deployable source</td></tr><tr><td>Frontend</td><td>Cloudflare Pages</td><td>Deployment mirror</td><td>Public React application</td></tr><tr><td>Backend</td><td>Render</td><td>Deployment mirror <code>main</code></td><td>Public Express API</td></tr><tr><td>Database</td><td>Neon</td><td>Prisma migrations</td><td>Managed PostgreSQL persistence</td></tr><tr><td>Documentation</td><td>GitHub Pages</td><td>Documentation repository</td><td>Public assessment evidence</td></tr></tbody></table></div></section>
      <section id="release-order"><h2>Safe release order</h2><ol className="steps"><li><span>1</span><div><strong>Integrate in Gitea</strong><p>Review and merge the member branch into the authoritative main branch.</p></div></li><li><span>2</span><div><strong>Run local quality gates</strong><p>Confirm tests, lint, types, build and security checks.</p></div></li><li><span>3</span><div><strong>Update the deployment mirror</strong><p>Copy the approved Gitea main state to the GitHub deployment repository.</p></div></li><li><span>4</span><div><strong>Redeploy and smoke test</strong><p>Verify the application plus backend health and readiness endpoints.</p></div></li><li><span>5</span><div><strong>Record evidence</strong><p>Keep the commit, deployment result and screenshots with the sprint record.</p></div></li></ol></section>
      <Callout title="Source-of-truth warning" tone="warning">A successful Render or Cloudflare deployment does not mean Gitea contains the same code. Update the deployment mirror only after the authoritative main branch is current.</Callout>
    </>,
  },
  "stakeholder-decisions": {
    title: "Stakeholder & Decision Log", label: "Stakeholder decisions", description: "Dated project decisions, their motivation and the evidence that supports them.", group: "Quality & Evidence", updated: "21 August 2026",
    content: <>
      <section id="decision-log"><h2>Key decisions</h2><div className="decision-list">
        <article><time>06 Aug 2026</time><div><strong>Team owns delivery</strong><p>The stakeholder expected the group to work like a small start-up: define its method, remain accountable and use tutor guidance without transferring ownership.</p><span>Evidence: stakeholder meeting attendance and outcome record</span></div></article>
        <article><time>08 Aug 2026</time><div><strong>Four sprints and six rotating roles</strong><p>The work was divided into assessed sprints, with a role-selection poll before every sprint to make ownership visible and fair.</p><span>Evidence: handbook, role poll and sprint planning discussion</span></div></article>
        <article><time>08 Aug 2026</time><div><strong>Express + Prisma + Neon</strong><p>The team chose a handwritten Express boundary over generated Supabase endpoints so the API design remains explicit.</p><span>Evidence: consultation, comparison and team agreement</span></div></article>
        <article><time>13 Aug 2026</time><div><strong>Main-only integration workflow</strong><p>Members pull main, work on their own branch, notify the group and hand off to the integration lead for merging.</p><span>Evidence: team discussion and updated handbook</span></div></article>
        <article><time>13 Aug 2026</time><div><strong>Local testing while CI is blocked</strong><p>The team documented the difference between local test evidence, a planned Actions workflow and Codecov reporting.</p><span>Evidence: handbook pages and CI blocker message</span></div></article>
      </div></section>
      <section id="decision-standard"><h2>Decision-record standard</h2><p>Every important architecture, security, methodology or scope decision should state: the date, participants or source, options considered, selected option, motivation, consequences, follow-up owner and links to implementation evidence.</p></section>
    </>,
  },
  "sprint-evidence": {
    title: "Sprint Evidence", label: "Sprint evidence", description: "Non-trivial evidence for planning, methodology, stakeholder interaction and implementation.", group: "Quality & Evidence", updated: "21 August 2026",
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
    title: "Document Library", label: "Document library", description: "Official briefs, team planning records and technical decision documents.", group: "Reference", updated: "21 August 2026",
    content: <>
      <section id="available-documents"><h2>Available documents</h2><div className="document-grid">
        <a href="documents/project-brief.pdf" target="_blank"><span>PDF</span><div><strong>COMS3011A Project Brief</strong><small>Official requirements, milestones, dates and rubrics</small></div><b>Open ↗</b></a>
        <a href="documents/tutor-mx-sprint-handbook.pdf" target="_blank"><span>PDF</span><div><strong>Tutor MX Sprint Handbook</strong><small>Four sprints, roles, workflows, architecture and handoffs</small></div><b>Open ↗</b></a>
        <a href="documents/ai-policy.pdf" target="_blank"><span>PDF</span><div><strong>COMS3011A AI Policy</strong><small>Required attribution and verification rules</small></div><b>Open ↗</b></a>
        <a href="documents/postgresql-express-decision.pdf" target="_blank"><span>PDF</span><div><strong>PostgreSQL & Express Decision</strong><small>Motivation for the handwritten API and database choice</small></div><b>Open ↗</b></a>
        <a href="documents/README.md" target="_blank"><span>MD</span><div><strong>Repository README</strong><small>Setup, checks, data workflow and handoff notes</small></div><b>Open ↗</b></a>
      </div></section>
      <Callout title="Document control" tone="warning">A document records the state and decisions known when it was written. Update or supersede instructions that no longer match the current main branch, especially the older develop-branch method.</Callout>
    </>,
  },
  "third-party-code": {
    title: "Third-Party Code", label: "Third-party code", description: "External libraries and services used by Tutor MX, with purpose and justification.", group: "Reference", updated: "21 August 2026",
    content: <>
      <section id="dependencies"><h2>Primary dependencies</h2><div className="table-wrap"><table><thead><tr><th>Library or service</th><th>Purpose</th><th>Justification</th></tr></thead><tbody><tr><td>React</td><td>Frontend components and state</td><td>Reusable role dashboards and accessible interaction patterns</td></tr><tr><td>Vite</td><td>Frontend development and build</td><td>Fast feedback and optimised static output</td></tr><tr><td>Express</td><td>HTTP API</td><td>Minimal framework that keeps routes and middleware team-written</td></tr><tr><td>Prisma</td><td>ORM, migrations and typed queries</td><td>Explicit relational schema and repeatable database operations</td></tr><tr><td>Neon</td><td>Managed PostgreSQL</td><td>Hosted relational data without generated browser endpoints</td></tr><tr><td>Auth0 React SDK + JWT/JWKS validation</td><td>Authentication</td><td>Established identity provider and standards-based access tokens</td></tr><tr><td>Vitest / Testing Library</td><td>Frontend testing</td><td>User-focused component and hook tests</td></tr><tr><td>Node test tooling</td><td>Backend testing</td><td>API, service, migration and query verification</td></tr><tr><td>Render</td><td>Backend hosting</td><td>Environment-managed Node deployment</td></tr><tr><td>Cloudflare Pages</td><td>Frontend hosting</td><td>Fast static web deployment</td></tr></tbody></table></div></section>
      <section id="documentation-rule"><h2>Documentation rule</h2><p>For each new dependency, record its package and version, purpose, reason for choosing it, relevant licence, security implications and any fallback or removal plan. Third-party code does not remove the team&apos;s responsibility to validate behaviour.</p></section>
    </>,
  },
  "ai-attribution": {
    title: "AI Attribution", label: "AI attribution", description: "Transparent disclosure of AI assistance and the team&apos;s verification responsibility.", group: "Reference", updated: "21 August 2026",
    content: <>
      <section id="policy"><h2>Course policy</h2><p>AI use is encouraged when it is transparent, accurately attributed and human-reviewed. The group remains responsible for every claim, command, design and line of code that it submits.</p><ul><li>Record the tool, model and purpose.</li><li>Use an <code>Assisted-by</code> footer where the repository policy requires it.</li><li>Do not guess an undisclosed underlying model.</li><li>Verify generated work against the brief, source code and real test results.</li><li>Remove secrets and private data before prompting.</li></ul></section>
      <section id="canonical-wording"><h2>Canonical declarations</h2><div className="declaration"><strong>Qoder wording</strong><p>Qoder 1.23.0, Quest Agent mode, Auto tier. Qoder automatically routed requests to an underlying model that was not disclosed, so no specific provider model has been guessed.</p></div><div className="declaration"><strong>This documentation redesign</strong><p>ChatGPT Work using Codex (GPT-5.6) was used for documentation restructuring, copy editing and website implementation on 21 August 2026. The Tutor MX team must review the result against the project brief and current repository before submission.</p></div></section>
    </>,
  },
  challenges: {
    title: "Challenges & Future Improvements", label: "Challenges & improvements", description: "Known constraints, how they were handled and the next documentation priorities.", group: "Reference", updated: "21 August 2026",
    content: <>
      <section id="challenges"><h2>Challenges encountered</h2><div className="decision-list"><article><time>CI</time><div><strong>Lecturer-managed runner offline</strong><p>Local tests, builds and security checks provide current evidence. Remote Actions and Codecov execution remain dependent on runner availability.</p></div></article><article><time>Deploy</time><div><strong>Two repository surfaces</strong><p>Gitea is authoritative, while live services deploy from a GitHub mirror. The team must deliberately keep the deployed commit aligned with approved main.</p></div></article><article><time>Auth</time><div><strong>Duplicate sign-in and role selection</strong><p>Self-service onboarding and <code>GET /api/me</code> were introduced so users can reach the correct dashboard directly after Auth0 sign-in.</p></div></article><article><time>Team</time><div><strong>Parallel integration</strong><p>Six member branches can touch shared files. Focused handoffs and one integration owner reduce conflicting merges.</p></div></article></div></section>
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
