import type { ReactNode } from "react";
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

export const legacyPages: Record<string, Page> = {
"user-feedback": {
    title: "Sprint 3 User Feedback",
    label: "User feedback",
    description: "Sprint 3 user-feedback evidence from five responses: role coverage, usability ratings, written comments, the feedback-to-improvement chain and the original Google Forms summary screenshots.",
    group: "Quality & Evidence",
    updated: "28 September 2026",
    content: <>
      <Callout title="Five user-test responses recorded" tone="success">The current Google Forms round contains five responses. The original response-summary screenshots are retained below as evidence. Feedback was reviewed individually: where a tester suggested a concrete improvement, the team recorded the action taken; where no improvement was suggested, no improvement was made.</Callout>

      <section id="feedback-form"><h2>Feedback form</h2><p>The Sprint 3 feedback form asks testers which Tutor MX interface they used and then records ease of use, navigation, visual design, menu/button clarity, problems encountered, confidence using the system without assistance, an overall 1–5 rating, positive comments and suggested improvements.</p><p><a className="button-link" href="https://docs.google.com/forms/d/e/1FAIpQLSflTX2TOlhr3mCxU24kvfp_mMFjRLv8UaZkCO6bhqarL9mF2g/viewform" target="_blank" rel="noreferrer">Open the live Tutor MX feedback form ↗</a></p></section>

      <section id="feedback-snapshot"><h2>Current feedback snapshot · 5 responses</h2><div className="metric-grid">
        <article><strong>100%</strong><span>Very easy to use</span><small>5 of 5 respondents selected “Very easy”.</small></article>
        <article><strong>80%</strong><span>Very easy to find content</span><small>4 of 5 selected “Very easy”; 1 selected “Easy”.</small></article>
        <article><strong>80%</strong><span>Excellent design</span><small>4 of 5 rated the look and design “Excellent”; 1 rated it “Good”.</small></article>
      </div><div className="metric-grid" style={{marginTop:"10px"}}>
        <article><strong>80%</strong><span>Navigation completely clear</span><small>4 of 5 selected “Yes, completely”; 1 selected “Mostly”.</small></article>
        <article><strong>100%</strong><span>No problems</span><small>All 5 respondents reported no problems while using the website.</small></article>
        <article><strong>100%</strong><span>Comfortable independently</span><small>All 5 said they would be comfortable using Tutor MX without someone explaining it.</small></article>
      </div><div className="metric-grid" style={{marginTop:"10px"}}>
        <article><strong>4.8 / 5</strong><span>Overall rating</span><small>Four respondents rated Tutor MX 5/5 and one rated it 4/5.</small></article>
        <article><strong>40%</strong><span>More than one interface</span><small>2 of 5 tested more than one version; 2 tested Tutor and 1 tested Student.</small></article>
        <article><strong>0%</strong><span>Organiser-only responses</span><small>No respondent selected Organiser as their only tested version in this round.</small></article>
      </div><p style={{marginTop:"14px",fontSize:"13px",color:"var(--muted)"}}>This is a small Sprint 3 user-testing sample and is presented as project evidence, not as a statistically representative survey of all Tutor MX users.</p></section>

      <section id="feedback-results"><h2>Google Form results register</h2><div className="table-wrap"><table><thead><tr><th>Round / date</th><th>Responses</th><th>Interfaces represented</th><th>Key results</th><th>Evidence</th></tr></thead><tbody>
        <tr><td>Round 1 · updated 28 Sep 2026</td><td>5</td><td>Tutor 40% · Student 20% · More than one 40% · Organiser-only 0%</td><td>Ease 100% Very easy · Finding content 80% Very easy / 20% Easy · Design 80% Excellent / 20% Good · No problems 100% · Independent use 100% Yes · Overall mean 4.8/5</td><td><a href="https://docs.google.com/spreadsheets/d/11913IP63epVuWvKYWXq1jbnluh7zMOeRHdFDKxauVuI/edit?usp=sharing" target="_blank" rel="noreferrer">Google Sheets results ↗</a> · <Status tone="green">Screenshots retained below</Status></td></tr>
      </tbody></table></div></section>

      <section id="feedback-comments"><h2>Written feedback and improvement decisions</h2><p>The visible positive comments emphasise the look and feel, intuitive interface and ease of navigation. The improvement responses contain one concrete wording suggestion; the other visible responses state that everything was on point, there was nothing to add, or everything looked good. In accordance with the project evidence rule, no change is claimed where no improvement was requested.</p><div className="table-wrap"><table><thead><tr><th>Feedback</th><th>Decision</th><th>Improvement made</th><th>Status / evidence</th></tr></thead><tbody>
        <tr><td>“Maybe don&apos;t use ‘Try again’ after the verification email is sent, it implies something went wrong when trying to create an account.”</td><td>Accepted. The wording could make a successful verification step sound like a failure.</td><td>Changed the post-verification action from <strong>Try again</strong> to <strong>Sign in</strong>.</td><td><Status tone="green">DONE</Status> · feedback screenshot Q10 and Sprint 3 application change.</td></tr>
        <tr><td>“Everything was on point.”</td><td>No improvement requested.</td><td><strong>No improvement was made.</strong></td><td><Status>NO CHANGE REQUIRED</Status></td></tr>
        <tr><td>“N/A”</td><td>No improvement requested.</td><td><strong>No improvement was made.</strong></td><td><Status>NO CHANGE REQUIRED</Status></td></tr>
        <tr><td>“Everything looked good”</td><td>No improvement requested.</td><td><strong>No improvement was made.</strong></td><td><Status>NO CHANGE REQUIRED</Status></td></tr>
      </tbody></table></div></section>

      <section id="feedback-evidence"><h2>Original Google Forms evidence</h2><p>These are the supplied response-summary screenshots. Keeping the original charts alongside the written summary makes the documentation auditable and avoids replacing the source evidence with reconstructed charts.</p><div className="rubric-source-grid">
        {[
          ["user-feedback-q1-2026-09-28.png","Q1 · Version of the website tested"],
          ["user-feedback-q2-2026-09-28.png","Q2 · Ease of use"],
          ["user-feedback-q3-2026-09-28.png","Q3 · Ease of finding information"],
          ["user-feedback-q4-2026-09-28.png","Q4 · Overall look and design"],
          ["user-feedback-q5-2026-09-28.png","Q5 · Buttons, menus and navigation"],
          ["user-feedback-q6-2026-09-28.png","Q6 · Problems experienced"],
          ["user-feedback-q7-2026-09-28.png","Q7 · Independent-use confidence"],
          ["user-feedback-q8-2026-09-28.png","Q8 · Overall Tutor MX rating"],
          ["user-feedback-q9-2026-09-28.png","Q9 · What users liked most"],
          ["user-feedback-q10-2026-09-28.png","Q10 · Improvements suggested"],
        ].map(([file,label]) => <a key={file} href={`evidence/${file}`} target="_blank" rel="noreferrer"><img src={`evidence/${file}`} alt={label} /><span>{label} ↗</span></a>)}
      </div></section>

      <section id="feedback-integration"><h2>Feedback → Improvement tracker</h2><p>The feedback chain is recorded as <strong>response → evaluation → decision → change (when needed)</strong>. A positive response or a response containing no improvement request is not converted into an artificial change.</p><div className="table-wrap"><table><thead><tr><th>Finding</th><th>Evaluation</th><th>Action</th><th>Status</th></tr></thead><tbody>
        <tr><td>Verification screen used “Try again” after a verification email had been sent.</td><td>Actionable clarity issue.</td><td>Replace “Try again” with “Sign in”.</td><td><Status tone="green">Implemented</Status></td></tr>
        <tr><td>Remaining visible improvement responses did not request a change.</td><td>No actionable improvement identified.</td><td>No improvement made.</td><td><Status>Closed — no change</Status></td></tr>
      </tbody></table></div>
      <div className="improvement-card" style={{marginTop:"24px",padding:"22px 24px",border:"1px solid var(--line)",borderRadius:"10px",background:"linear-gradient(145deg,#f4f9ff,#f8fcfa)"}}>
        <h3 style={{margin:"0 0 16px",color:"var(--navy)",fontSize:"18px"}}>Improvement 1 — Verification email wording</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"16px",alignItems:"center",marginBottom:"18px"}}>
          <div style={{padding:"16px",border:"1px solid #e0c9c9",borderRadius:"8px",background:"#fff5f5"}}><small style={{display:"block",color:"#a4423a",fontSize:"10px",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"6px"}}>Before</small><span style={{fontSize:"16px",fontWeight:700,color:"var(--navy)"}}>Try again</span></div>
          <span style={{fontSize:"22px",color:"var(--blue)",fontWeight:800}}>→</span>
          <div style={{padding:"16px",border:"1px solid #b8e1d2",borderRadius:"8px",background:"var(--green-soft)"}}><small style={{display:"block",color:"var(--green)",fontSize:"10px",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"6px"}}>After</small><span style={{fontSize:"16px",fontWeight:700,color:"var(--navy)"}}>Sign in</span></div>
        </div>
        <p><strong>Reason:</strong> The tester correctly identified that “Try again” can imply a failed action. “Sign in” describes the intended next step after the verification email has been sent.</p>
        <Status tone="green">IMPLEMENTED</Status>
      </div></section>

      <section id="feedback-rubric-link"><h2>Rubric evidence</h2><div className="definition-grid"><article><strong>User Feedback — 10%</strong><p>Five real responses are documented with the original Google Forms charts, quantitative results, written comments and interface coverage. The evidence records both positive results and the one visible actionable improvement suggestion without inventing missing feedback.</p></article><article><strong>Improvement — 5%</strong><p>The actionable verification wording feedback was evaluated and implemented as “Try again” → “Sign in”. Responses that did not suggest an improvement are explicitly recorded as requiring no change, so the improvement table reflects what the users actually requested.</p></article></div></section>
    </>,
  },
"stakeholder-decisions": {
    title: "Tutor MX Reviews, Decisions & User Feedback",
    label: "Reviews & feedback",
    description: "Project-wide stakeholder interactions, group decisions and representative-user feedback process across the Tutor MX lifecycle, without claiming sessions that were not performed.",
    group: "Tutor MX System",
    updated: "18 September 2026",
    content: <>
      <p>This page is the project-wide review and feedback record for Tutor MX. It keeps only interactions that were actually recorded, documents how group decisions changed the product or process, and preserves the representative-user feedback method without presenting an unperformed session as evidence.</p>
      <section id="review-register"><h2>Review and decision register</h2><div className="table-wrap"><table><thead><tr><th>Date</th><th>Interaction</th><th>Input evaluated</th><th>Integrated response</th><th>Evidence</th></tr></thead><tbody><tr><td>6 Aug</td><td>Stakeholder/project oversight meeting</td><td>The team should work like a small start-up: define its method, own delivery and keep progress visible.</td><td>Four-sprint ownership, issue handoffs, Definition of Done and a public evidence site.</td><td><a href="evidence/stakeholder-meeting-attendance-redacted.png" target="_blank">Attendance record ↗</a></td></tr><tr><td>18 Aug</td><td>Client/tutor requirements review</td><td>Project requirements and documentation expectations were discussed; a reference documentation wiki was shared.</td><td>The site was reorganised around rubric evidence, technical decisions and review navigation.</td><td><a href="evidence/client-requirements-meeting-2026-08-18.png" target="_blank">Follow-up record ↗</a></td></tr><tr><td>21 Aug</td><td>Internal progress checkpoint</td><td>Blockers and missing documentation evidence were reviewed.</td><td>Testing, decision, methodology and blocker evidence were made explicit rather than implied.</td><td><a href="evidence/daily-scrum-2026-08-21.png" target="_blank">Meeting record ↗</a></td></tr><tr><td>11 Sep</td><td>Sprint retrospective</td><td>The Sprint 2 parallel/integration process was not working well enough for the team.</td><td>Sprints 3-4 move to strict Member order 1→6 so each person starts from an accepted main baseline.</td><td><a href="evidence/scrum-meeting-2026-09-11.png" target="_blank">Attendance report ↗</a></td></tr><tr><td>18 Sep</td><td>Group roadmap and report-readiness review</td><td>The group identified duplicated future work, vague Member responsibilities and Integration Lead duties incorrectly sitting inside Member 6&apos;s workload.</td><td>The handbook was audited against current main and the project brief; one branch per Member was confirmed, Integration Lead work was separated, Member 6 received genuine feature work, and the Command Centre/explainability features were distributed across Sprints 3-4.</td><td><a href="#project-evolution">Sprint 1-4 evolution record →</a></td></tr></tbody></table></div></section>
      <section id="feedback-loop"><h2>Formal feedback loop</h2><ol className="steps"><li><span>1</span><div><strong>Prepare</strong><p>Select the Student, Tutor or Organiser scenario, task success criteria and neutral questions before the session.</p></div></li><li><span>2</span><div><strong>Observe</strong><p>Ask the participant to think aloud; record completion, errors, time/effort and exact comments without coaching.</p></div></li><li><span>3</span><div><strong>Collect</strong><p>Use one consistent form with a 1-5 ease rating, confidence rating, open comments and consent/privacy note.</p></div></li><li><span>4</span><div><strong>Evaluate</strong><p>Group findings by frequency, journey impact and severity. Separate defects from preferences and new scope.</p></div></li><li><span>5</span><div><strong>Decide</strong><p>Accept, defer or reject each finding with a reason, owner and linked Gitea issue.</p></div></li><li><span>6</span><div><strong>Integrate and retest</strong><p>Link the fix/commit, repeat the task with the original or equivalent representative user and record the outcome.</p></div></li></ol></section>
      <section id="user-test-scenarios"><h2>Representative-user scenarios</h2><div className="table-wrap"><table><thead><tr><th>Role</th><th>Unprompted task</th><th>Observe</th><th>Success evidence</th></tr></thead><tbody><tr><td><strong>Student</strong></td><td>Find suitable open work, volunteer once and understand the resulting status.</td><td>Eligibility comprehension, confirmation, duplicate prevention, empty/error recovery.</td><td>Task result, completion notes, rating, comments and linked changes.</td></tr><tr><td><strong>Tutor</strong></td><td>Check assignments/hours, record work, submit a timesheet and interpret a returned/approved status.</td><td>Ownership confidence, form errors, terminology and next-action clarity.</td><td>Task result, completion notes, rating, comments and linked changes.</td></tr><tr><td><strong>Organiser</strong></td><td>Edit a registered Tutor/course, make a valid allocation and decide a pending workflow item.</td><td>Rule explanations, stale-state handling, decision confidence and recovery.</td><td>Task result, completion notes, rating, comments and linked changes.</td></tr></tbody></table></div></section>
      <section id="feedback-record"><h2>Required feedback record</h2><div className="definition-grid"><article><strong>Session</strong><p>Date, build/commit, environment, facilitator and anonymised participant role.</p></article><article><strong>Tasks</strong><p>Scenario, expected outcome, completion result, assistance needed and observed friction.</p></article><article><strong>Feedback</strong><p>1-5 ratings, exact short comments, privacy/consent note and supporting evidence.</p></article><article><strong>Integration</strong><p>Decision, reason, severity, Gitea link, owner, fix commit and retest result.</p></article></div><Callout title="Privacy" tone="info">Use participant codes rather than names. Do not publish emails, login details, meeting links, access tokens or other personal information.</Callout></section>
      <section id="feedback-evidence"><h2>Feedback record format</h2><p>If a future representative-user or stakeholder session is held, the team can use the retained template below to capture it consistently. No empty or retrospective form is presented as evidence for any sprint.</p><ul className="check-list"><li>Record the date, build/commit, participant role and task scenario.</li><li>Capture task completion, observed friction and concise participant comments with privacy controls.</li><li>Evaluate findings as defects, preferences or new scope and record the decision.</li><li>When a change is made, link the implementation and retest result.</li></ul><p><a href="documents/sprint2-evidence-templates.md" target="_blank">Open the reusable stakeholder and user-test templates ↗</a></p></section>
    </>,
  }
};
