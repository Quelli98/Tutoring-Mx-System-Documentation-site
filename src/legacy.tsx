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
    title: "User Feedback & Improvements",
    label: "User feedback",
    description: "Nine Google Forms submissions from 26 September to 2 October 2026, interpreted question by question with original response charts, the response PDF and an evidence-based improvement tracker.",
    group: "Quality & Evidence",
    updated: "11 October 2026",
    content: <>
      <Callout title="Nine survey submissions · 26 September–2 October 2026" tone="success">
        This updated evidence supersedes the earlier five-response snapshot. The original Google Forms charts and a downloadable export of all nine response rows are preserved below. Nine submissions do not necessarily mean nine distinct people: the export contains matching-looking entries, so we report <strong>responses</strong>, not independently verified unique testers.
      </Callout>

      <section id="feedback-form">
        <h2>Method and primary evidence</h2>
        <p>Participants tested Tutor MX through the Student, Tutor or multiple-interface experiences and completed a ten-question Google Forms questionnaire. Seven closed questions assessed coverage, ease of use, information discovery, design, navigation, problems and overall rating; the form also requested confidence using the site independently and invited open comments. The submission dates span <strong>26 September to 2 October 2026</strong>. Results are self-reported and are not a substitute for observed task-completion testing.</p>
        <p><a className="button-link" href="https://docs.google.com/forms/d/e/1FAIpQLSflTX2TOlhr3mCxU24kvfp_mMFjRLv8UaZkCO6bhqarL9mF2g/viewform" target="_blank" rel="noreferrer">Open the original feedback form ↗</a> <a className="button-link" href="documents/tutor-mx-user-feedback-nine-responses-2026-10-02.pdf" target="_blank" rel="noreferrer">View / download all 9 responses (PDF) ↗</a></p>
        <p className="feedback-method-note">The PDF is the supplied Google Sheets export of individual responses, not a newly invented dataset. Questions 1–6 and 8–10 are illustrated using the updated supplied screenshots. A separate updated screenshot for Question 7 was not supplied, so its distribution is taken from the PDF and is not shown as an original chart.</p>
        <details className="feedback-pdf-viewer"><summary>Preview the nine-response PDF in this page</summary><p>The original export is a wide spreadsheet condensed to one PDF page. Use the full-size link above to zoom into individual rows.</p><iframe src="documents/tutor-mx-user-feedback-nine-responses-2026-10-02.pdf#view=FitH" title="Original Tutor MX survey responses, nine submissions" loading="lazy" /></details>
      </section>

      <section id="feedback-snapshot"><h2>Summary of the nine-response sample</h2>
        <div className="metric-grid">
          <article><strong>9</strong><span>Form submissions</span><small>26 September–2 October; uniqueness not established.</small></article>
          <article><strong>88.9%</strong><span>Easy or very easy overall</span><small>8 of 9; 7 very easy and 1 easy.</small></article>
          <article><strong>88.9%</strong><span>Easy or very easy to find information</span><small>8 of 9, but 1 reported very difficult.</small></article>
          <article><strong>100%</strong><span>Positive design ratings</span><small>7 Excellent, 2 Good; no poor ratings.</small></article>
          <article><strong>77.8%</strong><span>No problems reported</span><small>7 of 9; 1 small problem and 1 uncompleted task.</small></article>
          <article><strong>4.67 / 5</strong><span>Mean overall product rating</span><small>7 rated 5, 1 rated 4 and 1 rated 3.</small></article>
        </div>
        <p className="feedback-method-note">These descriptive percentages use <strong>n = 9</strong> and round to one decimal place. The sample is small and not shown to be random or representative of all Tutor MX users.</p>
      </section>

      <section id="feedback-results"><h2>What the survey actually shows</h2>
        <div className="table-wrap"><table><thead><tr><th>Question</th><th>Distribution</th><th>Professional interpretation</th></tr></thead><tbody>
          <tr><td>Q1 · Interface tested</td><td>3 Tutor; 3 Student; 3 multiple; 0 Organiser-only</td><td>Useful role diversity, with no standalone Organiser rating.</td></tr>
          <tr><td>Q2 · Ease of use</td><td>7 very easy; 1 easy; 1 neutral</td><td>General usability is favourable, though not unanimously effortless.</td></tr>
          <tr><td>Q3 · Finding information</td><td>6 very easy; 2 easy; 1 very difficult</td><td>The main discoverability issue appears in one response and is reinforced by a written search complaint.</td></tr>
          <tr><td>Q4 · Appearance</td><td>7 excellent; 2 good</td><td>Uniformly favourable design opinions in this sample.</td></tr>
          <tr><td>Q5 · Controls/navigation</td><td>7 yes completely; 2 mostly</td><td>Controls generally made sense; discoverability still needs scrutiny.</td></tr>
          <tr><td>Q6 · Problems</td><td>7 none; 1 small; 1 unable to complete task</td><td>The incomplete task is a priority for reproduction, not a minor preference.</td></tr>
          <tr><td>Q7 · Independent use</td><td>8 yes; 1 probably</td><td>Most expressed confidence without guidance; not a measured assisted/unassisted task study.</td></tr>
          <tr><td>Q8 · Overall rating</td><td>7 five-star; 1 four-star; 1 three-star</td><td>Mean 4.67/5, with one comparatively lower score.</td></tr>
          <tr><td>Q9 · Positive comments</td><td>6 written responses</td><td>Ease of navigation, clarity of purpose and intuitive interface recur.</td></tr>
          <tr><td>Q10 · Improvement comments</td><td>9 form submissions; repeated/blank-like themes shown in source</td><td>Verification wording, search/discovery, Home icon and colour are explicit requests.</td></tr>
        </tbody></table></div>
      </section>

      <section id="feedback-evidence"><h2>Original charts and question-by-question analysis</h2>
        <p>Each chart below is from the updated Google Forms summary supplied for this documentation release. Open a chart to see it full-size. Captions explain both what the evidence supports and relevant limitations.</p>
        <div className="feedback-charts-grid">
        <figure key={"q1"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q1-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q1 original chart">
            <img src={`evidence/user-feedback-q1-2026-10-11.png`} alt={"Question 1: Interface coverage — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q1. Interface coverage</strong><span>Three submissions each tested Tutor, Student and more than one interface (33.3% apiece). None selected Organiser only. The sample therefore includes multiple interface perspectives but does not independently establish full Organiser workflow coverage.</span></figcaption>
        </figure>
        <figure key={"q2"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q2-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q2 original chart">
            <img src={`evidence/user-feedback-q2-2026-10-11.png`} alt={"Question 2: Overall ease of use — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q2. Overall ease of use</strong><span>Seven of nine rated the website “Very easy” (77.8%), one “Easy” (11.1%) and one neutral (11.1%). Eight of nine were positive; there is no difficult rating for general usability, but the neutral response merits attention.</span></figcaption>
        </figure>
        <figure key={"q3"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q3-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q3 original chart">
            <img src={`evidence/user-feedback-q3-2026-10-11.png`} alt={"Question 3: Finding information — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q3. Finding information</strong><span>Six of nine found information “Very easy” to locate (66.7%) and two “Easy” (22.2%). One respondent chose “Very difficult” (11.1%). This is the clearest navigation concern despite the otherwise strong usability ratings.</span></figcaption>
        </figure>
        <figure key={"q4"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q4-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q4 original chart">
            <img src={`evidence/user-feedback-q4-2026-10-11.png`} alt={"Question 4: Visual design — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q4. Visual design</strong><span>Seven respondents rated the appearance “Excellent” (77.8%) and two “Good” (22.2%). No negative design ratings were recorded. A request for more colour is a preference to evaluate, rather than evidence of widespread visual dissatisfaction.</span></figcaption>
        </figure>
        <figure key={"q5"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q5-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q5 original chart">
            <img src={`evidence/user-feedback-q5-2026-10-11.png`} alt={"Question 5: Buttons, menus and navigation — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q5. Buttons, menus and navigation</strong><span>Seven of nine said controls and navigation made complete sense (77.8%), and two chose “Mostly” (22.2%). Nobody selected the explicitly confusing or negative options, although the separate information-finding question identified one serious difficulty.</span></figcaption>
        </figure>
        <figure key={"q6"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q6-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q6 original chart">
            <img src={`evidence/user-feedback-q6-2026-10-11.png`} alt={"Question 6: Problems experienced — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q6. Problems experienced</strong><span>Seven respondents reported no problems (77.8%); one encountered a small problem (11.1%), and one could not complete the intended task (11.1%). The incomplete task must not be hidden by the favourable overall ratings. This chart was cropped from the supplied combined Q5/Q6 screenshot.</span></figcaption>
        </figure>
        <figure key={"q8"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q8-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q8 original chart">
            <img src={`evidence/user-feedback-q8-2026-10-11.png`} alt={"Question 8: Overall product rating — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q8. Overall product rating</strong><span>Seven participants gave Tutor MX 5/5 (77.8%), one gave 4/5 and one 3/5 (11.1% each). The mean rating is 4.67/5. This is positive feedback from a small sample, not a measured success rate for all workflows.</span></figcaption>
        </figure>
        <figure key={"q9"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q9-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q9 original chart">
            <img src={`evidence/user-feedback-q9-2026-10-11.png`} alt={"Question 9: What participants liked — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q9. What participants liked</strong><span>Six written responses were recorded. Comments repeatedly mention intuitive layout, ease of use and navigation, and a clearly explained purpose (tutor allocation, timesheets and overflow work). These are qualitative themes rather than votes from all nine respondents.</span></figcaption>
        </figure>
        <figure key={"q10"} className="feedback-chart-card">
          <a href={`evidence/user-feedback-q10-2026-10-11.png`} target="_blank" rel="noreferrer" aria-label="Open Q10 original chart">
            <img src={`evidence/user-feedback-q10-2026-10-11.png`} alt={"Question 10: Suggestions for improvement — nine-response Google Forms results"} loading="lazy" />
          </a>
          <figcaption><strong>Q10. Suggestions for improvement</strong><span>Responses identify three actionable themes: clarify the post-verification “Try again” wording, improve the findability/usefulness of search, and consider clearer navigation cues such as a Home icon. One participant requested more colour; other replies expressed satisfaction or made no request. Not all suggestions are confirmed as implemented.</span></figcaption>
        </figure>
        </div>
        <p><a href="evidence/user-feedback-q5-q6-original-2026-10-11.png" target="_blank" rel="noreferrer">View the unmodified combined Q5/Q6 screenshot ↗</a>. The Q5 and Q6 images displayed separately above are legibility crops of this screenshot, not additional survey responses.</p>
        <h3>Q7. Would users feel comfortable using the site independently?</h3>
        <p>The supplied <a href="documents/tutor-mx-user-feedback-nine-responses-2026-10-02.pdf" target="_blank" rel="noreferrer">response PDF</a> records <strong>8 “Yes” and 1 “Probably”</strong> (88.9% definitely comfortable; 11.1% probably comfortable). No “No” response appears. The PDF is the direct evidence for this distribution because no updated Q7 chart image was provided.</p>
      </section>

      <section id="feedback-comments"><h2>Qualitative feedback and decisions</h2>
        <p>Respondents highlighted an interface they found intuitive, a clear explanation of Tutor MX’s purpose and straightforward navigation. The important counterexample is one participant who struggled to find information, could not complete their task and suggested improvements to search and navigation cues. Positive aggregate scores do not invalidate that report.</p>
        <div className="table-wrap"><table><thead><tr><th>Reported feedback</th><th>Evaluation</th><th>Action or recommendation</th><th>Evidence status</th></tr></thead><tbody>
          <tr><td>Post-verification action labelled “Try again” could look like a signup failure.</td><td>Clear wording and recovery concern.</td><td>Earlier project documentation records changing the next action to “Sign in”. Check the deployed build to confirm the experience.</td><td><Status tone="green">Previously documented change</Status></td></tr>
          <tr><td>“There is a search bar but I was unable to find what I was looking for” and request for a Home icon.</td><td>Potential high-impact findability failure; Q3 and Q6 corroborate difficulty for one respondent.</td><td>Reproduce with a defined Student search task; check indexing, empty results, role filtering, visible Home navigation and keyboard usability. Retest after any fix.</td><td><Status tone="amber">Follow-up needed; not verified fixed</Status></td></tr>
          <tr><td>“Add more color”.</td><td>Subjective design preference despite 9 of 9 positive design ratings.</td><td>Consider restrained, accessible accent colour after contrast testing; do not treat as a confirmed usability defect.</td><td><Status>Design suggestion; not verified implemented</Status></td></tr>
          <tr><td>Responses such as “Everything was on point”, “Everything looked good”, and “N/A”.</td><td>Positive or no actionable request.</td><td>No fix is inferred or claimed from these responses.</td><td><Status>No change requested</Status></td></tr>
        </tbody></table></div>
      </section>

      <section id="feedback-integration"><h2>Feedback-to-improvement traceability</h2>
        <p>For assessment purposes the evidence chain is <strong>survey response → observed issue → triage decision → verified change/retest</strong>. The earlier verification-wording edit is already documented; the newer search and navigation feedback is recorded as an outstanding follow-up, not presented as completed work. The survey does not establish that a participant was observed completing tasks on the final 11 October release.</p>
        <ol>
          <li><strong>Already recorded:</strong> verification prompt wording changed from “Try again” to “Sign in” in prior project records; the current PDF preserves the reason for this improvement.</li>
          <li><strong>Priority to investigate:</strong> reproduce the reported search/discovery failure and failed task for the relevant Student flow, capture expected/actual results and create or link a Gitea issue.</li>
          <li><strong>Optional polish:</strong> assess Home icon visibility and a restrained colour adjustment without weakening accessibility.</li>
          <li><strong>Missing evidence:</strong> no post-fix usability retest or final-release stakeholder sign-off accompanies these nine responses; do not claim either.</li>
        </ol>
      </section>

      <section id="feedback-rubric-link"><h2>Assessment evidence and limitations</h2>
        <div className="definition-grid">
          <article><strong>User feedback</strong><p>Nine original survey submissions, a dated raw-response PDF, question-level distributions, eight supplied screenshot panels (Q5/Q6 separately cropped) and explicit identification of the missing updated Q7 image.</p></article>
          <article><strong>Product improvement</strong><p>The verification wording change is reported as an earlier documented improvement. The search and Home-navigation requests are genuine, actionable feedback but cannot be marked complete without a linked fix and retest.</p></article>
        </div>
        <p className="feedback-method-note">The Google Form asked which interface was tested, not for a Git commit or release SHA. This record cannot establish which exact application build each submission tested. Direct primary evidence: <a href="documents/tutor-mx-user-feedback-nine-responses-2026-10-02.pdf" target="_blank" rel="noreferrer">nine-row response PDF</a> and the images above.</p>
      </section>
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
