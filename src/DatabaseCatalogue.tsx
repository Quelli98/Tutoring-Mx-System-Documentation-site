import { useState } from "react";
import schema from "./data/schema.json";
import { Badge } from "./ui";
import Diagram from "./Diagram";
const purposes: Record<string, string> = {
  Profile: "Application identity and one stored role.",
  OrganiserApplication:
    "Lecturer application before approval, plus decision evidence.",
  Notification: "Recipient-owned notifications and event deduplication.",
  Course: "Teaching unit, hourly rate and budget.",
  TutorMark: "One Tutor/course eligibility mark.",
  AcademicTerm: "Teaching bounds, publication and breaks.",
  TimeSlot:
    "Shared Student/Tutor schedule ownership, recurrence and deduplication.",
  OccurrenceException: "A change to one recurring occurrence.",
  TutorHourLimit: "Optional Tutor weekly work capacity.",
  Allocation: "Assigned Tutor staffing work and review context.",
  Timesheet: "Weekly Tutor work submission and decision.",
  TimesheetRevision: "Return/correction evidence.",
  TimesheetDeclaration: "Tutor submission acknowledgement.",
  TimesheetDispute: "Separate dispute and payroll-hold lifecycle.",
  WorkLog: "Actual work for an owned allocation/timesheet.",
  Excuse: "Tutor sickness request, decision and attendance history.",
  OverflowWork: "Unfilled work advertised to Students.",
  VolunteerClaim: "Student request and persisted outcome.",
  StaffingRequirement: "Course demand for coverage/shortage calculations.",
  ApiWriteReceipt: "Replay receipt for selected retry-safe writes.",
};
purposes.Scenario = "Draft allocation plan isolated from live staffing.";
purposes.ScenarioItem = "One draft assignment/lock inside a Scenario.";
purposes.ScenarioPresence =
  "Short-lived Organiser activity for collaborative planning.";
purposes.TutoringBooking =
  "Scheduling appointment between one Student and one Tutor.";
purposes.TutorSwap = "Tutor replacement request and decision workflow.";
purposes.BookingEvent = "Immutable booking history event.";
purposes.SwapEvent = "Immutable Tutor swap history event.";
purposes.StudentSickNote =
  "Student absence request and Organiser review for a booking.";
purposes.AuditEvent = "Redacted record of an important committed mutation.";
purposes.MutationReceipt = "Retry/idempotency receipt for mutation workflows.";
export default function DatabaseCatalogue() {
  const [q, setQ] = useState("");
  const models = schema.models.filter((m) =>
    `${m.name} ${m.fields.map((f) => f.name).join(" ")}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <>
      <section id="table-dictionary">
        <div className="section-top">
          <h2>Complete table dictionary</h2>
          <Badge>{schema.models.length} current models</Badge>
        </div>
        <p>
          Scalar fields are stored columns. Relation fields describe navigation
          and are shown separately. “?” means nullable/optional; “[]” means a
          collection.
        </p>
        <label className="wide-search">
          Find a table or column
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Profile, OrganiserApplication, tutorId…"
          />
        </label>
        <p className="result-count" aria-live="polite">
          {models.length} matching models
        </p>
        <div className="model-jumps">
          {models.map((m) => (
            <a key={m.name} href={`#database/model-${m.name.toLowerCase()}`}>
              {m.name}
            </a>
          ))}
        </div>
        {models.map((m) => (
          <details
            className="model"
            id={`model-${m.name.toLowerCase()}`}
            key={m.name}
          >
            <summary>
              <div>
                <strong>{m.name}</strong>
                <span>{purposes[m.name]}</span>
              </div>
              <Badge>
                {m.fields.filter((f) => !f.relation).length} columns
              </Badge>
            </summary>
            <div className="model-body">
              <div
                className="table-wrap"
                role="region"
                aria-label={`${m.name} columns`}
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Column</th>
                      <th>Prisma type</th>
                      <th>Null?</th>
                      <th>Key / storage / default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.fields
                      .filter((f) => !f.relation)
                      .map((f) => (
                        <tr key={f.name}>
                          <td>
                            <code>{f.name}</code>
                          </td>
                          <td>
                            <code>{f.type}</code>
                          </td>
                          <td>{f.type.endsWith("?") ? "Yes" : "No"}</td>
                          <td>
                            <code>{f.attributes || "—"}</code>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {m.constraints.length > 0 && (
                <>
                  <h3>Composite keys & indexes</h3>
                  <ul>
                    {m.constraints.map((c) => (
                      <li key={c}>
                        <code>{c}</code>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {m.fields.some((f) => f.relation) && (
                <>
                  <h3>Relations — not extra scalar columns</h3>
                  <div
                    className="table-wrap"
                    role="region"
                    aria-label={`${m.name} relationships`}
                    tabIndex={0}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>Relation</th>
                          <th>Target</th>
                          <th>Foreign key / behaviour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {m.fields
                          .filter((f) => f.relation)
                          .map((f) => (
                            <tr key={f.name}>
                              <td>
                                <code>{f.name}</code>
                              </td>
                              <td>
                                <code>{f.type}</code>
                              </td>
                              <td>
                                <code>
                                  {f.attributes ||
                                    "Reverse side of a declared relation"}
                                </code>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </details>
        ))}
        {!models.length && (
          <p className="empty-state">No matching model or column.</p>
        )}
      </section>
      <section id="enums">
        <h2>Stored enums</h2>
        <div
          className="table-wrap"
          role="region"
          aria-label="Schema enum values"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th>Enum</th>
                <th>Allowed values</th>
              </tr>
            </thead>
            <tbody>
              {schema.enums.map((e) => (
                <tr key={e.name}>
                  <td>
                    <code>{e.name}</code>
                  </td>
                  <td>
                    {e.values.map((v) => (
                      <Badge key={v}>{v}</Badge>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Diagram
        id="erd"
        title="Database relationship map"
        scope="current source"
        description="The ERD summarises the principal relationships between profiles, courses, tutor allocations, timetables, bookings and administrative workflow records. The complete table dictionary above documents the full schema."
        analysis="This diagram explains how Tutor MX stores one connected set of records for Student, Tutor and Organiser workflows rather than maintaining separate, inconsistent datasets for each screen. The Prisma relations and database constraints support record ownership, referential integrity and traceable updates across Sprints 1–4. This simplified diagram is an overview of the final source schema; it does not replace the complete 30-model dictionary or independently prove that every migration has been applied in production."
      />
      <section id="migrations">
        <h2>Versioned migrations</h2>
        <p>
          These {schema.migrations.length} directories are present in source.
          The production check on 11 October 2026 found all 30 applied, the
          latest on 7 October (see Production data above).
        </p>
        <details className="model">
          <summary>Show migration names</summary>
          <ol className="migration-list">
            {schema.migrations.map((m) => (
              <li key={m}>
                <code>{m}</code>
              </li>
            ))}
          </ol>
        </details>
      </section>
    </>
  );
}
