## Personal retrospective bug and regression register — Sprints 1–4

The following **32 retrospective issue drafts** reproduce the descriptions prepared for the integration lead's personal Gitea bug records. They include application defects, CI/test failures and deployment-process incidents; **they are not a claim that 32 issues have been filed, independently verified or closed**. The identifiers S1-01 through S4-06 are *documentation reference numbers*, not Gitea issue numbers. Check each actual Gitea record for its assignee, original discovery date, supporting commits/tests and current open/closed status. A red CI job alone is not proof of a distinct product bug.

**Primary live evidence:** [View all Gitea issues](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=all) · **[View closed Gitea issues](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=closed)** · [View open Gitea issues](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=open) · [Gitea Sprint 1–4 boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects)

**Recording convention:** These issues were written up retrospectively on 11 October 2026. A record belongs in Done/Closed only after the actual fix and its verification can be confirmed on Gitea. Several entries explicitly note evidence still to be checked. Historic sprint assignment follows the work discussed during that period, but should be corrected if the original Gitea board attributes it elsewhere.

## Sprint 1 — Initial integration and authentication (5 issue drafts)

### S1-01 — Auth0 login succeeds but user cannot access Tutor MX

**[Sprint 1][Bug] Auth0 login succeeds but Tutor MX displays Access unavailable**

**Labels:** bug, retrospective

**Description**

During initial integration, users could successfully authenticate through Auth0 but were unable to access their assigned Tutor MX workspace because the corresponding Neon profile or role mapping did not match the authenticated identity.

**Expected:** Successfully onboarded users should be directed to the correct Student, Tutor or Organiser workspace.

**Actual:** Authentication succeeded, but the application displayed “Access unavailable” or did not grant the expected role access.

**Resolution:** Investigated the Auth0 identity, role assignments and corresponding Neon user profile. Corrected account/role matching and improved the onboarding integration.

**Verification:** Review the August Auth0 onboarding changes and relevant authentication regression tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered around 16–23 August 2026. The original investigation predates this issue record.

### S1-02 — StudentOverflow import causes a build failure

**[Sprint 1][Bug] Case-sensitive StudentOverflow import causes build failure**

**Labels:** bug, retrospective

**Description**

During frontend integration, a module import used a filename or path whose letter casing did not match the actual file. This created a compatibility problem when building in a case-sensitive environment.

**Expected:** Frontend imports should resolve consistently on Windows and Linux, allowing the production build to complete.

**Actual:** The relevant StudentOverflow module could not be resolved correctly in the affected build environment.

**Resolution:** Corrected the import path and filename casing to match the source file.

**Verification:** Check the changes around 17 August and attach a subsequent successful frontend build. Confirm the original import mismatch from Git history.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around 17 August 2026. The original failing build reference still needs to be attached.

### S1-03 — Student workflow not properly connected to authenticated API

**[Sprint 1][Bug] Student workflow uses incomplete authenticated API integration**

**Labels:** bug, retrospective

**Description**

During Member 3 frontend integration, parts of the Student workflow relied on mock API behaviour or incomplete authentication integration. The implementation also required safer tutor identity handling.

**Expected:** Student requests should use the real Express backend API, with the required Auth0 bearer token and validated identifiers.

**Actual:** Some frontend operations were not correctly connected to authenticated backend requests, preventing reliable end-to-end operation.

**Resolution:** Integrated the Student workflow with the shared API layer and corrected token and identifier handling.

**Verification:** Review the Member 3 integration changes from approximately 16 August and their frontend/backend tests. Confirm which defects were fixed before the first release.

**Retrospective note:** Formally recorded on 11 October 2026. Discovered during Sprint 1 integration. This record should describe the defects actually observed, rather than treating planned feature implementation as a bug.

### S1-04 — Backend PATCH requests fail during integration

**[Sprint 1][Bug] Backend PATCH requests affected by CORS and validation handling**

**Labels:** bug, retrospective

**Description**

During initial frontend/backend integration, the API required corrections to PATCH request handling and tutor-email validation.

**Expected:** Valid PATCH requests from the approved frontend origin should reach the relevant endpoint and be validated consistently.

**Actual:** The existing CORS/validation configuration did not correctly support some update requests.

**Resolution:** Updated API CORS handling and the associated request validation.

**Verification:** Review backend changes around 15 August and attach the relevant integration or request-validation tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally identified during Sprint 1 integration; exact affected endpoint and failed-request evidence require confirmation.

### S1-05 — Cloudflare displays an outdated version of Tutor MX

**[Sprint 1][Bug] Cloudflare production site displays outdated frontend after Gitea update**

**Labels:** bug, retrospective

**Description**

The latest frontend had been integrated into the official Gitea repository, but the deployed website continued showing an older interface, including the previous “Secure role entry” screen.

**Expected:** The public Tutor MX website should reflect the approved release code.

**Actual:** Gitea contained newer code, but Cloudflare was deploying from a separate GitHub repository that had not been synchronised.

**Resolution:** Identified the Gitea-to-GitHub deployment mirror as the source of the version mismatch, synchronised the deployment code and redeployed the frontend.

**Verification:** Review Gitea commit `890a5b4`, the GitHub deployment mirror and the successful Cloudflare deployment on 23 August.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated and corrected around 23 August 2026.

## Sprint 2 — Allocation, timesheets, CI and deployment (12 issue drafts)

Some Sprint 2 fixes were completed during the Sprint 2–3 transition. Assign them to their original development board if that is how your group tracks carry-over bugs.

### S2-01 — Student overflow API requests fail

**[Sprint 2][Bug] Student overflow requests fail because Auth0 access token is missing**

**Labels:** bug, retrospective

**Description**

During StudentOverflow integration, a frontend API call incorrectly used the token-getter function rather than obtaining and supplying the actual Auth0 access token.

**Expected:** Authenticated students should be able to retrieve and submit eligible overflow requests through the protected API.

**Actual:** Requests did not consistently contain the required bearer token, causing the authenticated workflow to fail.

**Resolution:** Corrected the StudentOverflow API integration using the shared `useApiToken` mechanism and added relevant tests.

**Verification:** Review the StudentOverflow authentication fix around 14 September 2026. The focused validation reported 31 passing tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered during Sprint 2 integration.

### S2-02 — Ineligible tutors can still be selected for allocation

**[Sprint 2][Bug] Tutor allocation allows selection of candidates who fail eligibility checks**

**Labels:** bug, retrospective

**Description**

During allocation testing, eligibility checks for marks, availability and workload capacity were not consistently represented in the candidate selection interface.

**Expected:** Tutors who fail required eligibility checks must not be selectable, and organisers should see the reason for their exclusion.

**Actual:** Candidate availability and eligibility information could be misleading, and failed candidates were not consistently prevented from being selected.

**Resolution:** Improved the candidate eligibility handling, clarified the separate checks and disabled selection where eligibility requirements failed.

**Verification:** Review the allocation frontend/backend fixes and regression tests discussed around 15–16 September.

**Retrospective note:** Formally recorded on 11 October 2026. Originally identified during Sprint 2 allocation integration and testing.

### S2-03 — Tutor allocation clash information is incomplete

**[Sprint 2][Bug] Tutor allocation conflict information does not clearly explain scheduling clashes**

**Labels:** bug, retrospective

**Description**

During allocation integration, candidate clash information was incomplete or inconsistently represented, including missing `clashDetails` information.

**Expected:** When a tutor is unavailable, the organiser should receive a clear explanation of the conflicting schedule or capacity restriction.

**Actual:** The candidate evaluation could indicate an availability failure without providing enough detail to understand the conflict.

**Resolution:** Corrected the candidate clash-detail handling and improved the display of failed allocation checks.

**Verification:** Review the candidate eligibility and `clashDetails` integration work from mid-September, including its frontend/backend tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered during allocation workflow testing.

### S2-04 — Saved allocation incorrectly conflicts with itself

**[Sprint 2][Bug] Saved tutor allocation incorrectly appears as a scheduling conflict**

**Labels:** bug, retrospective

**Description**

A tutor could pass allocation eligibility checks and be assigned successfully, but after the allocation was saved and refreshed, that same tutor appeared to fail availability.

**Expected:** A saved allocation should not conflict with itself. Genuine conflicts with other allocations must still be detected.

**Actual:** The refresh operation omitted the saved allocation identifier, causing the confirmed allocation to be counted as its own conflicting booking.

**Resolution:** Preserved the saved allocation ID and supplied `excludeAllocationId` during refreshed eligibility checks.

**Verification:** Commit `6633c5d`, branch `fix/allocation-post-save-self-conflict`, 16 September 2026. Associated validation reported 465 backend and 271 frontend tests passing.

**Retrospective note:** Formally recorded on 11 October 2026. Fixed on 16 September as part of Sprint 2 allocation follow-up work.

### S2-05 — Timesheet status becomes stale after updates

**[Sprint 2][Bug] Timesheet approval and return status does not refresh correctly**

**Labels:** bug, retrospective

**Description**

During timesheet workflow testing, cached or stale state could prevent the interface from immediately reflecting the latest timesheet approval, return or revision information.

**Expected:** Timesheet status and associated actions should represent the current backend state following approval, submission or return.

**Actual:** The displayed timesheet state could remain outdated after an operation, confusing tutors or organisers.

**Resolution:** Corrected status refresh and cache invalidation behaviour in the affected timesheet workflows.

**Verification:** Review the timesheet state/cache fixes from the Sprint 2 period and their regression tests. Attach the particular fixing commit before closing.

**Retrospective note:** Formally recorded on 11 October 2026. The exact original occurrence date needs confirmation from Git history.

### S2-06 — Tutors can log hours before sessions finish

**[Sprint 2][Bug] Tutor work logs can be created before the scheduled session ends**

**Labels:** bug, retrospective

**Description**

During tutor timesheet testing, the application needed to prevent work logs from being created before a tutoring session had actually finished.

**Expected:** Work logs should become available only after the corresponding confirmed tutoring occurrence has ended.

**Actual:** The previous handling did not consistently enforce the completed-session restriction, particularly when considering recurring occurrences.

**Resolution:** Strengthened the frontend and backend checks so work-log creation is restricted until the specific session occurrence has ended.

**Verification:** Review the fix associated with commit `02e8bc3` and the related work-log validation around 16 September 2026.

**Retrospective note:** Formally recorded on 11 October 2026. Originally identified during tutor workflow testing.

### S2-07 — Student approval and status workflow is inconsistent

**[Sprint 2][Bug] Student request approval and status workflow is inconsistent**

**Labels:** bug, retrospective

**Description**

During integration testing, the Student request approval/status workflow required corrections to ensure that the appropriate outcome and updated state were shown after processing.

**Expected:** Following an organiser or tutor decision, the Student interface should accurately display the latest request outcome.

**Actual:** The integration did not reliably reflect the expected outcome or status across the connected workflows.

**Resolution:** Corrected the Student outcome/status handling as part of the wider Sprint 2 integration fixes.

**Verification:** Inspect the Student request integration changes and regression tests from 15–16 September. Confirm the exact affected transition before creating this issue.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated during Sprint 2 workflow testing.

### S2-08 — PostgreSQL database fails during Gitea CI

**[Sprint 2][Bug] Gitea CI PostgreSQL service fails readiness and authentication checks**

**Labels:** bug, retrospective

**Description**

During Sprint 2 API integration, the PostgreSQL service in Gitea Actions repeatedly failed to become usable. Some runs failed while setting up the database, while others reported password authentication failures for the `tutor_mx` database user.

**Expected:** CI should start an isolated PostgreSQL instance, authenticate successfully, run Prisma migrations and execute the API integration tests.

**Actual:** Database setup failed before the intended migration/API smoke checks could complete.

**Resolution:** Iteratively corrected PostgreSQL health checks, startup configuration, data-directory isolation, service addressing and authentication setup.

**Verification:** PR #33 and the September CI repair commits, including `7d5bd25`, `0c6d13f`, `e6c872c` and subsequent fixes. Attach the first verified passing migration/API smoke run.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around 11–14 September 2026. Multiple failed Actions runs should be linked to this issue rather than recorded as separate identical bugs.

### S2-09 — API smoke test fails because of CI networking

**[Sprint 2][Bug] Gitea API smoke tests fail due to runner networking and port configuration**

**Labels:** bug, retrospective

**Description**

The Sprint 2 CI pipeline encountered problems reaching the application API during integration smoke testing. Debugging involved service-host addressing, shared-runner networking, port availability and local proxy behaviour.

**Expected:** The CI smoke job should connect to the application on its configured address and execute health and API checks.

**Actual:** Requests failed or could not reach the expected service even when unrelated quality checks were passing.

**Resolution:** Improved runner-independent API smoke setup, service addressing and local port/network configuration.

**Verification:** Review the CI history from September, particularly commits `fef316b`, `0c33f04`, `0c6d13f` and `14f9499`, alongside the successful smoke-test run.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered in September during Sprint 2 integration. Keep this separate from database authentication only where the logs establish a distinct root cause.

### S2-10 — Codecov integration produces failed CI runs

**[Sprint 2][Bug] Codecov authentication and upload configuration causes CI failures**

**Labels:** bug, retrospective

**Description**

During the Sprint 2 integration process, coverage reporting encountered CI authentication and token-availability problems that produced failed workflow runs.

**Expected:** Backend and frontend coverage reports should be uploaded successfully by the configured CI pipeline without exposing credentials.

**Actual:** Some coverage-related workflow steps failed because the available token/authentication configuration was not suitable for the runner.

**Resolution:** Updated Codecov authentication handling and CI configuration, using the supported credential or OIDC mechanism where applicable.

**Verification:** Review commit `3aa2d94` and the related Gitea Actions/Codecov upload logs. Confirm the final successful upload before closing.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered during Sprint 2 CI integration. Do not include actual secret values in the issue.

### S2-11 — StudentOverflow tests time out in CI

**[Sprint 2][Bug] StudentOverflow integration tests exceed CI timeout**

**Labels:** bug, retrospective

**Description**

The StudentOverflow integration tests were unstable under the CI environment's timing and execution constraints.

**Expected:** StudentOverflow regression tests should finish consistently within the configured timeout.

**Actual:** One or more test runs exceeded the allowed timeout, producing failed CI results.

**Resolution:** Stabilised test timing and asynchronous behaviour and adjusted the relevant test configuration.

**Verification:** Review the StudentOverflow stabilisation work at commit `560b070` and the subsequent passing CI run associated with the Sprint 2 integration.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around September 2026.

### S2-12 — Deployment mirror rejects the latest release

**[Sprint 2][Bug] GitHub deployment mirror rejects Gitea main synchronization**

**Labels:** bug, retrospective

**Description**

After integrating the Sprint 2 work into the official Gitea main branch, synchronisation with the GitHub deployment mirror encountered a non-fast-forward rejection because the two branches had diverged.

**Expected:** The approved Gitea release should be mirrored to GitHub without losing commits or overwriting unrelated history.

**Actual:** The deployment mirror rejected the push and could not immediately receive the latest approved release.

**Resolution:** Investigated the diverged branch history and used a history-preserving synchronisation approach instead of force-pushing.

**Verification:** Review the deployment mirror integration history following Gitea merge commit `f91c5b3` and the later successful release synchronisation.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered around 14 September 2026. This is a deployment-process defect rather than a frontend feature bug.

## Sprint 3 — Timetable, recurrence, authentication and integration (9 issue drafts)

### S3-01 — Production uses outdated Auth0 configuration

**[Sprint 3][Bug] Production login used outdated Auth0 configuration**

**Labels:** bug, retrospective

**Description**

The production frontend contained an outdated Auth0 Client ID, causing a mismatch with the intended authentication configuration.

**Expected:** Production uses the current Auth0 Client ID.

**Actual:** The built frontend still contained the previous Client ID.

**Resolution:** Corrected the production environment configuration, cleared conflicting environment overrides, rebuilt the frontend and prepared redeployment.

**Verification:** Review the frontend production build checks from 14 September 2026, confirming that the new Client ID was included and the previous Client ID was absent. Attach the successful deployment evidence.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around 14 September 2026. Although shown here under Sprint 3, the original date falls at the end of the documented Sprint 2 window. Use the sprint board that your team assigned this work to.

### S3-02 — Shared timetable causes calendar rendering problems

**[Sprint 3][Bug] Shared timetable calendar experiences repeated rendering or refresh problems**

**Labels:** bug, retrospective

**Description**

During integration of the shared timetable, calendar rendering and refresh-state management required corrections to prevent repeated updates and unstable interface behaviour.

**Expected:** Timetable changes should trigger a controlled refresh while leaving the calendar responsive and preserving existing data.

**Actual:** The integrated calendar encountered rendering/refresh problems that required corrective changes.

**Resolution:** Corrected refresh dependencies and calendar state handling. Added regression coverage for timetable rendering and refresh behaviour.

**Verification:** Review the September timetable integration fixes and commit `dac70b0`, associated with PR #78. Confirm the exact render-loop regression in the changed files and tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated during Sprint 3 integration, around 26–27 September.

### S3-03 — Timetable refresh discards unsaved manual input

**[Sprint 3][Bug] Timetable refresh resets unsaved manual-entry form data**

**Labels:** bug, retrospective

**Description**

During shared timetable integration, refreshing timetable data could cause the AvailabilityForm component to remount, risking loss of the user's unfinished manual-entry data.

**Expected:** Background timetable refreshes should update calendar data without discarding an unfinished Class or Unavailable entry.

**Actual:** Refresh-state handling interfered with the manual-entry component's state.

**Resolution:** Adjusted `scheduleVersion`/`refreshVersion` refresh handling so timetable updates no longer unnecessarily remount the AvailabilityForm.

**Verification:** Review commit `0edeebf`, the associated refresh-state regression tests and the later passing Sprint 3 test suite.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around 26–27 September 2026.

### S3-04 — Academic terms fail to update correctly

**[Sprint 3][Bug] Academic-term updates are not consistently reflected in timetable management**

**Labels:** bug, retrospective

**Description**

During the shared timetable and academic-term integration, term-management state and updates required corrections so the calendar, timetable and associated term data remained consistent.

**Expected:** Academic-term creation or updates should persist and be correctly reflected wherever term data is used.

**Actual:** Academic-term update behaviour and its interaction with timetable refreshes were not fully consistent.

**Resolution:** Corrected academic-term update and refresh handling and added related integration/regression coverage.

**Verification:** Review the academic-term fixes included in the September CI/timetable stabilisation changes, including PR #78. Attach the specific test demonstrating the original failure.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated around 26–27 September 2026. This is separate from Sprint 4 term-button navigation defects.

### S3-05 — Fortnightly recurring timetable entries lack complete support

**[Sprint 3][Bug] Fortnightly timetable recurrence is not consistently supported across database and application**

**Labels:** bug, retrospective

**Description**

The shared timetable supported recurring entries, but fortnightly scheduling required additional database and application consistency work.

**Expected:** Once, Weekly and Fortnightly schedules should persist correctly and generate occurrences according to the selected academic term and recurrence pattern.

**Actual:** Fortnightly support was incomplete across the integrated scheduling and persistence layers.

**Resolution:** Added/updated recurrence handling and the database migration `20261004000000_support_fortnightly_schedule`, with relevant tests.

**Verification:** Commit `dac70b0`, PR #78, merge commit `5b426af`, and the later passing timetable regression tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally identified during Sprint 3 timetable integration around 24–27 September.

### S3-06 — Imported timetable entries require duplicate protection

**[Sprint 3][Bug] Timetable import requires duplicate and idempotency safeguards**

**Labels:** bug, retrospective

**Description**

During integration of CSV/ICS timetable importing, duplicate detection and repeat-import behaviour required additional handling to prevent duplicate scheduling data.

**Expected:** Re-importing previously processed timetable entries should not silently create duplicate records.

**Actual:** The import integration required corrections to duplicate identification, term-aware behaviour and repeat-import handling.

**Resolution:** Implemented or strengthened duplicate detection and idempotent import behaviour, including preview/commit validation.

**Verification:** Review the timetable import service and tests from the September shared-timetable integration. Confirm an actual pre-fix duplicate case before creating this as a historical bug.

**Retrospective note:** Formally recorded on 11 October 2026. This is a candidate retrospective defect; the historical failing import and exact original date still require verification.

### S3-07 — Timetable coverage tests become unstable

**[Sprint 3][Bug] Timetable coverage tests experience worker and timeout instability**

**Labels:** bug, retrospective

**Description**

During integration testing, the expanded timetable frontend test suite encountered worker/timeout stability problems under the available execution environment.

**Expected:** Timetable test suites should run reliably without unnecessary timeouts or worker-related failures.

**Actual:** The test environment needed further configuration to complete the expanded coverage workload consistently.

**Resolution:** Adjusted frontend coverage workers, timeouts and CI execution limits, and strengthened the associated tests.

**Verification:** Review commit `0edeebf`, commit `dac70b0` and PR #78. Local validation reported 1,171 passing backend and 749 passing frontend tests on 27 September.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered around 26–27 September 2026. Confirm the final Gitea Actions result separately from local testing.

### S3-08 — Withdrawing from a tutoring opportunity leaves stale data

**[Sprint 3][Bug] Student request and available work data do not refresh consistently after withdrawal**

**Labels:** bug, retrospective

**Description**

During the Student workflow integration, withdrawing from an opportunity required the displayed work and request lists to refresh together.

**Expected:** When a student withdraws, the updated application/request status and available opportunities should be reflected consistently.

**Actual:** The affected interface could show stale information after withdrawal.

**Resolution:** Corrected the refresh logic for the relevant work and request lists.

**Verification:** Review the Sprint 3 integration change titled `fix(integration): refresh both work and requests after withdrawal`, visible in the Gitea Actions history.

**Retrospective note:** Formally recorded on 11 October 2026. Originally corrected during Sprint 3, approximately September 2026.

### S3-09 — Overflow shortage model permits incorrect opportunity generation

**[Sprint 3][Bug] Overflow shortage model generates incorrect opportunities for tutor slots**

**Labels:** bug, retrospective

**Description**

During the Sprint 3 overflow integration, shortage-model logic required correction to ensure that opportunities corresponded properly to available tutor slots.

**Expected:** The system should generate the correct number of opportunities for the relevant tutor slots without duplication.

**Actual:** The shortage calculation did not correctly enforce one opportunity per tutor slot.

**Resolution:** Corrected the shortage model and its opportunity-generation logic.

**Verification:** Review the Gitea Actions entry `fix(overflow): correct shortage model to create one opportunity per tutor slot` and the associated tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered during Sprint 3 overflow integration.

## Sprint 4 — Final functional fixes, regression testing and release (6 issue drafts)

### S4-01 — Expired sessions remain open

**[Sprint 4][Bug] Expired tutoring sessions remain open after their scheduled end time**

**Labels:** bug, retrospective

**Description**

During final testing, tutoring sessions did not consistently transition out of the Open state once the scheduled session time had expired.

**Expected:** Sessions should automatically transition from Open to Closed when their scheduled end condition is met.

**Actual:** Expired sessions could remain marked as Open.

**Resolution:** Corrected the session-expiry handling and added regression testing.

**Verification:** Commit `9107313`, titled `fix: session expiry, login persistence, term actions and budget layout`, around 29–30 September 2026.

**Retrospective note:** Formally recorded on 11 October 2026. Originally identified during Sprint 4 final testing.

### S4-02 — Page refresh does not preserve login state

**[Sprint 4][Bug] Authenticated user session does not persist correctly after page refresh**

**Labels:** bug, retrospective

**Description**

During Sprint 4 acceptance testing, the application's login persistence required correction when an authenticated user refreshed the page.

**Expected:** A valid authenticated session should survive a normal page refresh and restore the appropriate role workspace.

**Actual:** Refresh handling did not reliably preserve or restore the expected login state.

**Resolution:** Corrected Auth0 startup/session restoration integration and associated application state handling.

**Verification:** Commit `9107313` and the related authentication regression tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally investigated on 29 September 2026.

### S4-03 — Large organiser budget values break the layout

**[Sprint 4][Bug] Organiser course budget layout overflows when displaying large monetary values**

**Labels:** bug, retrospective

**Description**

The organiser course/staffing management interface did not correctly accommodate some larger Rand budget values.

**Expected:** Budget values should remain readable and properly aligned, including values exceeding five digits.

**Actual:** Large budget amounts caused layout overflow or misalignment in the organiser interface.

**Resolution:** Updated the affected staffing/budget layout and styling to accommodate larger values.

**Verification:** Commit `9107313`, including changes to organiser/staffing interface styling and tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally reported and investigated on 29 September 2026.

### S4-04 — Academic term buttons do not perform the intended action

**[Sprint 4][Bug] Academic-term management buttons fail to navigate or populate forms correctly**

**Labels:** bug, retrospective

**Description**

During Sprint 4 final testing, academic-term management controls did not consistently navigate to the correct form or populate the selected term for editing.

**Expected:** Edit, Configure and existing-term controls should open the appropriate view and prepopulate it with the correct term data.

**Actual:** Some controls did not perform their intended navigation or data-population action.

**Resolution:** Corrected the button handlers and selected-term form state. Added targeted regression testing.

**Verification:** Commit `9107313` and the associated AcademicTermManagement frontend tests.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered around 29 September 2026.

### S4-05 — Sick-note conflict alert does not receive focus

**[Sprint 4][Bug] Student sick-note conflict notification fails keyboard-focus regression test**

**Labels:** bug, retrospective

**Description**

During the final frontend CI audit, the sick-note test suite exposed a focus-management regression or timing problem involving the conflict notification.

**Expected:** When a conflict notice is shown, its alert should receive the expected keyboard focus, and the accessibility test should reliably verify this.

**Actual:** The failing test found focus on the document body instead of the expected alert element.

**Resolution:** Updated the relevant focus assertion/timing so the test waits for the ConflictNotice alert focus correctly.

**Verification:** Fix commit `c5237c0`, merged into Gitea main as `6b528a3` on 11 October 2026. The failing test was `StudentSickNotes.test.jsx`; 846 other frontend tests had passed in that run. Attach the subsequent passing CI run.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered during the final release CI audit on the same date.

### S4-06 — Allocation proposal explanation test returns no assignments

**[Sprint 4][Bug] Allocation proposal explanation regression test returns zero assignments unexpectedly**

**Labels:** bug, retrospective

**Description**

During final Member 6 integration, the proposal-service regression suite failed because the test expected one proposal assignment but received zero.

**Expected:** The test fixture should exercise an uncovered staffing requirement and verify the intended proposal explanation behaviour.

**Actual:** The fixture's manually assigned COMS1 item already satisfied the tested requirement, making the expectation inconsistent with its input data.

**Resolution:** Identified the fixture inconsistency and proposed changing the uncovered requirement to a separate course such as COMS2, preserving the intended test scenario without changing correct production behaviour.

**Verification:** `proposal-service.test.ts`, approximately line 474, from the 7 October integration attempt. Confirm the corrected fixture and successful rerun before marking resolved.

**Retrospective note:** Formally recorded on 11 October 2026. Originally encountered on 7 October 2026. This is a test-fixture defect, not confirmed evidence of a production allocation algorithm defect.

## Additional records worth checking before submission

These were also part of the integration work, but should not automatically be added as application bugs:

| Incident | Recommended treatment |
| --- | --- |
| Gitea access token or expired stored credentials prevented pushes | Record as a development-process incident if the tracker includes tooling blockers. |
| Gitea runner offline or jobs stuck in queue | Record as a CI infrastructure incident only if there was a genuine runner fault. |
| Sprint 4 merges caused conflicts in multiple frontend/backend files | Record integration risk and resolution in the report, not a software bug unless a regression resulted. |
| OneDrive or `/MIR` file copying damaged the local Git repository | Document as an integration-process challenge. |
| README or documentation failed to match the final release | Track in documentation issues, not application defect counts. |
| Sprint 4 Member 6 or frontend coverage runs initially failed | Check whether those failures correspond to S4-05 or S4-06 before creating another issue. |

**Draft counts:** Sprint 1 = 5, Sprint 2 = 12, Sprint 3 = 9, Sprint 4 = 6; **32 candidate records** in total. Consult [closed Gitea issues](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=closed) for actual resolutions and proof; do not interpret this draft count as a closed-issue total.


---

## Existing defect-management process and cross-sprint evidence

## Defect management throughout Sprints 1–4

Defects and regressions are managed using the **same Gitea issue tracker** as feature work, with CI failures and acceptance testing used as additional discovery channels. [Project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) record issue state and ownership; [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) records automated build/test outcomes. These are different evidence sources: a completed card records workflow status, whereas a completed CI run shows the tests executed for a particular commit.

The Sprint 2 and final rubric evaluate whether a bug tracker is **actively used**, not just described. Our approach connects reproduction, severity, owner, change, review, regression and release impact. A screenshot of the board does not establish zero remaining defects, and a failed CI job should not be labelled a product bug until the failure is diagnosed.

## Examples of issues and regressions across all sprints

| Stage | Recorded problem area | Corrective action / lesson | Retest to preserve |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Early role-route/identity and prototype-to-API contract risks during parallel UI, auth and API setup. | Establish automatic onboarding, protected role routes, own-Tutor data and shared error contracts. These are handbook acceptance categories; individual resolved bug IDs were not independently supplied. | Fresh and returning sign-in, unverified email, wrong-role route, Tutor own-data tests. |
| **Sprint 2 — Basic** | Organiser integration failure during 15 September stability pass. | Failing change was **reverted rather than shipped**; retest course deletion, timetable/candidate response and timesheet state. | Combined organiser flow after reverted merge. |
| **Sprint 2 → 3 stabilisation** | `clashDetails` returned by data query but omitted by response mapper. | Map the missing field so the candidate frontend receives the expected contract. | Valid and conflicting candidate responses, optional recurrence fields. |
| **Sprint 2 → 3 stabilisation** | A just-saved allocation displayed as conflicting with itself. | Pass `excludeAllocationId` when refreshing saved allocation candidates; continue blocking genuine overlaps. | Create/edit followed by immediate refresh and independent competing clash. |
| **Sprint 2 → 3 stabilisation** | Marks and calendar failed together due to coupled UI loading; Tutor capacity ownership was unclear. | Independent fetches; Tutor-owned unavailable time/capacity and Organiser read-only view. | Missing timetable still shows valid marks; cross-role ownership remains protected. |
| **Sprint 3 — Intermediate** | Greater risk from import duplicates, reminder retries, concurrent bulk writes and timesheet correction states. | Added scoped API permission, transaction, idempotency and race protections under Sprint 3 Member 5; actual failed test/issue references must be checked in the board. | Retry same payload, duplicate import, stale decision and state-transition tests. |
| **Sprint 4 — Advanced** | Stale scenarios, competing bookings, swap decisions, stale search links and sick-note approvals become cross-user integrity risks. | Version/conflict rechecks, server-side availability validation, audit/restore and role-based ownership. A regression matrix is retained with final test evidence. | Two-browser booking race, stale version, scenario publish, audit rollback and booking/sick-note history. |

The explicitly dated corrections above are from the handbook's post-Sprint 2 stabilisation record (p. 29). Sprint 1 and later Sprint 3/4 rows identify documented risk/test areas where unique Gitea defect IDs were not provided; they must **not** be counted as individual closed defect records.

## Reproducible bug record and workflow

| Field in Gitea issue | Information retained | Value to the process |
| --- | --- | --- |
| Identification | Issue title/ID, discoverer, date, sprint and affected role | Repeated reports can be linked to one defect. |
| Reproduction | Starting account and permissions, environment, ordered steps, expected vs actual result | Allows a reviewer to reproduce the fault rather than guessing. |
| Severity | Critical security/data loss; major blocked core journey; moderate workaround; minor cosmetic | Helps decide whether integration/release is blocked. |
| Root cause and fix | Focused branch, PR/review, relevant test, commit SHA | Associates the resolution with actual source. |
| Regression | Automated or manual retest outcome on *integrated main*, plus completed Actions/Codecov links | Prevents a branch-only fix from being mistaken for a released fix. |

**Decision flow:** discover → record and reproduce → prioritise → assign owner → fix on an appropriate branch → reviewer retests → Integration Lead merges → combined regression and CI → close with evidence. Critical security/data-integrity or major blocking defects stop release pending resolution or a formally recorded decision. A CI runner queued for another group is **not** a failed test; completion status is checked before reporting results.

## Quality evidence and known limits

- [Original issues and project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) — operational source; login may be needed.
- [Gitea Actions workflow history](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) — per-commit CI outcomes, separate from bug issues.
- [Testing and performance](#testing) — measured results and changed-feature regression matrix.
- [Git methodology](#git-methodology) — review/merge order, including the Sprint 1–2 retrospective.

A complete current unresolved-bug total cannot be asserted without a timestamped issue export. This document supplies the tracking method and documented examples; it does not invent issue numbers, fixes or zero-defect statistics.
