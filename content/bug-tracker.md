## Defect management throughout Sprints 1–4

During development, bugs were reported and fixed through **pull requests**, each describing the fault, its root cause, the fix and the tests run. On 11 October 2026 we also recorded **32 of these bugs as Gitea issues** ([#106](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/106)–[#137](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/137)) with the `bug` label, so every defect has its own tracker record. They were written up retrospectively, after the fixes: each one gives when the bug was originally found, what happened, how it was resolved and the commits or pull requests that fixed it. Feature work lives on the [project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects), and [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) records the build and test result for each commit.

## Gitea bug issues — Sprints 1–4

Sprint 1: 5 · Sprint 2: 12 · Sprint 3: 9 · Sprint 4: 6 · **32 issues**, all closed. [View all closed issues on Gitea](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=closed).

| Issue | Ref | Bug | Evidence of the fix |
| --- | --- | --- | --- |
| [#106](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/106) | S1-01 | Auth0 login succeeds but user cannot access Tutor MX | August Auth0 onboarding changes and authentication regression tests |
| [#107](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/107) | S1-02 | StudentOverflow import causes a build failure | Import path and filename casing fix around 17 August 2026 |
| [#109](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/109) | S1-03 | Student workflow not properly connected to authenticated API † | Member 3 integration changes around 16 August 2026 and their frontend/backend tests |
| [#108](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/108) | S1-04 | Backend PATCH requests fail during integration | Backend CORS and request-validation changes around 15 August 2026 |
| [#110](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/110) | S1-05 | Cloudflare displays an outdated version of Tutor MX | Gitea commit `890a5b4` and the Cloudflare redeployment on 23 August 2026 |
| [#111](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/111) | S2-01 | Student overflow API requests fail | Pull request [#45](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/45) (14 September 2026) |
| [#112](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/112) | S2-02 | Ineligible tutors can still be selected for allocation | Pull requests [#50](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/50) and [#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52) (16 September 2026), which separate the eligibility checks and keep failed Tutors non-selectable |
| [#114](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/114) | S2-03 | Tutor allocation clash information is incomplete | Pull request [#51](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/51) (16 September 2026), which restored `clashDetails` in the candidate response |
| [#117](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/117) | S2-04 | Saved allocation incorrectly conflicts with itself | Pull request [#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52), commit `6633c5d` (16 September 2026) |
| [#119](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/119) | S2-05 | Timesheet status becomes stale after updates | Pull request [#47](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/47) (15 September 2026), which stopped cached (304) status responses |
| [#121](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/121) | S2-06 | Tutors can log hours before sessions finish | Commit `02e8bc3` and the work-log validation around 16 September 2026 |
| [#123](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/123) | S2-07 | Student approval and status workflow is inconsistent † | Student request integration changes around 15–16 September 2026 |
| [#125](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/125) | S2-08 | PostgreSQL database fails during Gitea CI | Pull request [#33](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/33) and CI repair commits `7d5bd25`, `0c6d13f` and `e6c872c` |
| [#127](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/127) | S2-09 | API smoke test fails because of CI networking | CI commits `fef316b`, `0c33f04`, `0c6d13f` and `14f9499` |
| [#129](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/129) | S2-10 | Codecov integration produces failed CI runs | Commit `3aa2d94` |
| [#131](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/131) | S2-11 | StudentOverflow tests time out in CI | Commit `560b070` |
| [#132](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/132) | S2-12 | Deployment mirror rejects the latest release | History-preserving synchronisation after Gitea merge commit `f91c5b3` |
| [#113](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/113) | S3-01 | Production uses outdated Auth0 configuration | Frontend production build check on 14 September 2026 confirming the new Auth0 client ID |
| [#115](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/115) | S3-02 | Shared timetable causes calendar rendering problems | Commit `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78), with timetable rendering and refresh tests |
| [#116](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/116) | S3-03 | Timetable refresh discards unsaved manual input | Commit `0edeebf` and its refresh-state regression tests |
| [#118](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/118) | S3-04 | Academic terms fail to update correctly | Academic-term fixes in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78) |
| [#120](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/120) | S3-05 | Fortnightly recurring timetable entries lack complete support | Commit `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78), including migration `20261004000000_support_fortnightly_schedule` |
| [#122](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/122) | S3-06 | Imported timetable entries require duplicate protection † | Timetable import service and its duplicate-protection tests |
| [#124](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/124) | S3-07 | Timetable coverage tests become unstable | Commits `0edeebf` and `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78) |
| [#126](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/126) | S3-08 | Withdrawing from a tutoring opportunity leaves stale data | Commit `23b1067` (24 September 2026) |
| [#128](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/128) | S3-09 | Overflow shortage model permits incorrect opportunity generation | Commit `0b39020` (24 September 2026) |
| [#130](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/130) | S4-01 | Expired sessions remain open | Commit `9107313` (29–30 September 2026) with regression tests |
| [#133](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/133) | S4-02 | Page refresh does not preserve login state | Commit `9107313` and its authentication regression tests |
| [#134](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/134) | S4-03 | Large organiser budget values break the layout | Commit `9107313`, including organiser and staffing layout changes and tests |
| [#135](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/135) | S4-04 | Academic term buttons do not perform the intended action | Commit `9107313` and the AcademicTermManagement tests |
| [#137](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/137) | S4-05 | Sick-note conflict alert does not receive focus | Commit `c5237c0`, merged into `main` as `6b528a3` on 11 October 2026 (`StudentSickNotes.test.jsx`) |
| [#136](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/136) | S4-06 | Allocation proposal explanation test returns no assignments | The fixture in `proposal-service.test.ts` now uses a separate course (`COMS2`) for the uncovered requirement |

† The original failure behind these three records was not confirmed when they were written up; they are kept because the related fix exists.

### Issue details

### Sprint 1 — initial integration and authentication (5 issues)

#### S1-01 — Auth0 login succeeds but user cannot access Tutor MX

**Gitea issue:** [#106](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/106) · **Found:** around 16–23 August 2026 · **Recorded:** 11 October 2026

During initial integration, users could successfully authenticate through Auth0 but were unable to access their assigned Tutor MX workspace because the corresponding Neon profile or role mapping did not match the authenticated identity.

**Expected:** Successfully onboarded users should be directed to the correct Student, Tutor or Organiser workspace.

**Actual:** Authentication succeeded, but the application displayed “Access unavailable” or did not grant the expected role access.

**Resolution:** Investigated the Auth0 identity, role assignments and corresponding Neon user profile. Corrected account/role matching and improved the onboarding integration.

**Evidence:** August Auth0 onboarding changes and authentication regression tests.

#### S1-02 — StudentOverflow import causes a build failure

**Gitea issue:** [#107](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/107) · **Found:** around 17 August 2026 · **Recorded:** 11 October 2026

During frontend integration, a module import used a filename or path whose letter casing did not match the actual file. This created a compatibility problem when building in a case-sensitive environment.

**Expected:** Frontend imports should resolve consistently on Windows and Linux, allowing the production build to complete.

**Actual:** The relevant StudentOverflow module could not be resolved correctly in the affected build environment.

**Resolution:** Corrected the import path and filename casing to match the source file.

**Evidence:** Import path and filename casing fix around 17 August 2026.

#### S1-03 — Student workflow not properly connected to authenticated API

**Gitea issue:** [#109](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/109) · **Found:** Sprint 1 integration · **Recorded:** 11 October 2026

During Member 3 frontend integration, parts of the Student workflow relied on mock API behaviour or incomplete authentication integration. The implementation also required safer tutor identity handling.

**Expected:** Student requests should use the real Express backend API, with the required Auth0 bearer token and validated identifiers.

**Actual:** Some frontend operations were not correctly connected to authenticated backend requests, preventing reliable end-to-end operation.

**Resolution:** Integrated the Student workflow with the shared API layer and corrected token and identifier handling.

**Evidence:** Member 3 integration changes around 16 August 2026 and their frontend/backend tests.

**Note:** the original failure was not confirmed when this record was written; it is kept because the related fix exists.

#### S1-04 — Backend PATCH requests fail during integration

**Gitea issue:** [#108](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/108) · **Found:** Sprint 1 integration · **Recorded:** 11 October 2026

During initial frontend/backend integration, the API required corrections to PATCH request handling and tutor-email validation.

**Expected:** Valid PATCH requests from the approved frontend origin should reach the relevant endpoint and be validated consistently.

**Actual:** The existing CORS/validation configuration did not correctly support some update requests.

**Resolution:** Updated API CORS handling and the associated request validation.

**Evidence:** Backend CORS and request-validation changes around 15 August 2026.

#### S1-05 — Cloudflare displays an outdated version of Tutor MX

**Gitea issue:** [#110](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/110) · **Found:** around 23 August 2026 · **Recorded:** 11 October 2026

The latest frontend had been integrated into the official Gitea repository, but the deployed website continued showing an older interface, including the previous “Secure role entry” screen.

**Expected:** The public Tutor MX website should reflect the approved release code.

**Actual:** Gitea contained newer code, but Cloudflare was deploying from a separate GitHub repository that had not been synchronised.

**Resolution:** Identified the Gitea-to-GitHub deployment mirror as the source of the version mismatch, synchronised the deployment code and redeployed the frontend.

**Evidence:** Gitea commit `890a5b4` and the Cloudflare redeployment on 23 August 2026.

### Sprint 2 — allocation, timesheets, CI and deployment (12 issues)

#### S2-01 — Student overflow API requests fail

**Gitea issue:** [#111](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/111) · **Found:** Sprint 2 integration · **Recorded:** 11 October 2026

During StudentOverflow integration, a frontend API call incorrectly used the token-getter function rather than obtaining and supplying the actual Auth0 access token.

**Expected:** Authenticated students should be able to retrieve and submit eligible overflow requests through the protected API.

**Actual:** Requests did not consistently contain the required bearer token, causing the authenticated workflow to fail.

**Resolution:** Corrected the StudentOverflow API integration using the shared `useApiToken` mechanism and added relevant tests.

**Evidence:** Pull request [#45](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/45) (14 September 2026); 31 focused tests passing.

#### S2-02 — Ineligible tutors can still be selected for allocation

**Gitea issue:** [#112](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/112) · **Found:** Sprint 2 allocation testing · **Recorded:** 11 October 2026

During allocation testing, eligibility checks for marks, availability and workload capacity were not consistently represented in the candidate selection interface.

**Expected:** Tutors who fail required eligibility checks must not be selectable, and organisers should see the reason for their exclusion.

**Actual:** Candidate availability and eligibility information could be misleading, and failed candidates were not consistently prevented from being selected.

**Resolution:** Improved the candidate eligibility handling, clarified the separate checks and disabled selection where eligibility requirements failed.

**Evidence:** Pull requests [#50](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/50) and [#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52) (16 September 2026), which separate the eligibility checks and keep failed Tutors non-selectable.

#### S2-03 — Tutor allocation clash information is incomplete

**Gitea issue:** [#114](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/114) · **Found:** Sprint 2 allocation testing · **Recorded:** 11 October 2026

During allocation integration, candidate clash information was incomplete or inconsistently represented, including missing `clashDetails` information.

**Expected:** When a tutor is unavailable, the organiser should receive a clear explanation of the conflicting schedule or capacity restriction.

**Actual:** The candidate evaluation could indicate an availability failure without providing enough detail to understand the conflict.

**Resolution:** Corrected the candidate clash-detail handling and improved the display of failed allocation checks.

**Evidence:** Pull request [#51](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/51) (16 September 2026), which restored `clashDetails` in the candidate response.

#### S2-04 — Saved allocation incorrectly conflicts with itself

**Gitea issue:** [#117](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/117) · **Found:** Sprint 2 (fixed 16 September 2026) · **Recorded:** 11 October 2026

A tutor could pass allocation eligibility checks and be assigned successfully, but after the allocation was saved and refreshed, that same tutor appeared to fail availability.

**Expected:** A saved allocation should not conflict with itself. Genuine conflicts with other allocations must still be detected.

**Actual:** The refresh operation omitted the saved allocation identifier, causing the confirmed allocation to be counted as its own conflicting booking.

**Resolution:** Preserved the saved allocation ID and supplied `excludeAllocationId` during refreshed eligibility checks.

**Evidence:** Pull request [#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52), commit `6633c5d` (16 September 2026); 465 backend and 271 frontend tests passing.

#### S2-05 — Timesheet status becomes stale after updates

**Gitea issue:** [#119](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/119) · **Found:** Sprint 2 · **Recorded:** 11 October 2026

During timesheet workflow testing, cached or stale state could prevent the interface from immediately reflecting the latest timesheet approval, return or revision information.

**Expected:** Timesheet status and associated actions should represent the current backend state following approval, submission or return.

**Actual:** The displayed timesheet state could remain outdated after an operation, confusing tutors or organisers.

**Resolution:** Corrected status refresh and cache invalidation behaviour in the affected timesheet workflows.

**Evidence:** Pull request [#47](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/47) (15 September 2026), which stopped cached (304) status responses.

#### S2-06 — Tutors can log hours before sessions finish

**Gitea issue:** [#121](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/121) · **Found:** Sprint 2 Tutor workflow testing · **Recorded:** 11 October 2026

During tutor timesheet testing, the application needed to prevent work logs from being created before a tutoring session had actually finished.

**Expected:** Work logs should become available only after the corresponding confirmed tutoring occurrence has ended.

**Actual:** The previous handling did not consistently enforce the completed-session restriction, particularly when considering recurring occurrences.

**Resolution:** Strengthened the frontend and backend checks so work-log creation is restricted until the specific session occurrence has ended.

**Evidence:** Commit `02e8bc3` and the work-log validation around 16 September 2026.

#### S2-07 — Student approval and status workflow is inconsistent

**Gitea issue:** [#123](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/123) · **Found:** Sprint 2 workflow testing · **Recorded:** 11 October 2026

During integration testing, the Student request approval/status workflow required corrections to ensure that the appropriate outcome and updated state were shown after processing.

**Expected:** Following an organiser or tutor decision, the Student interface should accurately display the latest request outcome.

**Actual:** The integration did not reliably reflect the expected outcome or status across the connected workflows.

**Resolution:** Corrected the Student outcome/status handling as part of the wider Sprint 2 integration fixes.

**Evidence:** Student request integration changes around 15–16 September 2026.

**Note:** the original failure was not confirmed when this record was written; it is kept because the related fix exists.

#### S2-08 — PostgreSQL database fails during Gitea CI

**Gitea issue:** [#125](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/125) · **Found:** around 11–14 September 2026 · **Recorded:** 11 October 2026

During Sprint 2 API integration, the PostgreSQL service in Gitea Actions repeatedly failed to become usable. Some runs failed while setting up the database, while others reported password authentication failures for the `tutor_mx` database user.

**Expected:** CI should start an isolated PostgreSQL instance, authenticate successfully, run Prisma migrations and execute the API integration tests.

**Actual:** Database setup failed before the intended migration/API smoke checks could complete.

**Resolution:** Iteratively corrected PostgreSQL health checks, startup configuration, data-directory isolation, service addressing and authentication setup.

**Evidence:** Pull request [#33](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/33) and CI repair commits `7d5bd25`, `0c6d13f` and `e6c872c`.

#### S2-09 — API smoke test fails because of CI networking

**Gitea issue:** [#127](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/127) · **Found:** September 2026, Sprint 2 integration · **Recorded:** 11 October 2026

The Sprint 2 CI pipeline encountered problems reaching the application API during integration smoke testing. Debugging involved service-host addressing, shared-runner networking, port availability and local proxy behaviour.

**Expected:** The CI smoke job should connect to the application on its configured address and execute health and API checks.

**Actual:** Requests failed or could not reach the expected service even when unrelated quality checks were passing.

**Resolution:** Improved runner-independent API smoke setup, service addressing and local port/network configuration.

**Evidence:** CI commits `fef316b`, `0c33f04`, `0c6d13f` and `14f9499`.

#### S2-10 — Codecov integration produces failed CI runs

**Gitea issue:** [#129](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/129) · **Found:** Sprint 2 CI integration · **Recorded:** 11 October 2026

During the Sprint 2 integration process, coverage reporting encountered CI authentication and token-availability problems that produced failed workflow runs.

**Expected:** Backend and frontend coverage reports should be uploaded successfully by the configured CI pipeline without exposing credentials.

**Actual:** Some coverage-related workflow steps failed because the available token/authentication configuration was not suitable for the runner.

**Resolution:** Updated Codecov authentication handling and CI configuration, using the supported credential or OIDC mechanism where applicable.

**Evidence:** Commit `3aa2d94`; Codecov now receives coverage for both codebases ([Testing](#testing)).

#### S2-11 — StudentOverflow tests time out in CI

**Gitea issue:** [#131](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/131) · **Found:** September 2026 · **Recorded:** 11 October 2026

The StudentOverflow integration tests were unstable under the CI environment's timing and execution constraints.

**Expected:** StudentOverflow regression tests should finish consistently within the configured timeout.

**Actual:** One or more test runs exceeded the allowed timeout, producing failed CI results.

**Resolution:** Stabilised test timing and asynchronous behaviour and adjusted the relevant test configuration.

**Evidence:** Commit `560b070`.

#### S2-12 — Deployment mirror rejects the latest release

**Gitea issue:** [#132](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/132) · **Found:** around 14 September 2026 · **Recorded:** 11 October 2026

After integrating the Sprint 2 work into the official Gitea main branch, synchronisation with the GitHub deployment mirror encountered a non-fast-forward rejection because the two branches had diverged.

**Expected:** The approved Gitea release should be mirrored to GitHub without losing commits or overwriting unrelated history.

**Actual:** The deployment mirror rejected the push and could not immediately receive the latest approved release.

**Resolution:** Investigated the diverged branch history and used a history-preserving synchronisation approach instead of force-pushing.

**Evidence:** History-preserving synchronisation after Gitea merge commit `f91c5b3`.

### Sprint 3 — timetable, recurrence, authentication and integration (9 issues)

#### S3-01 — Production uses outdated Auth0 configuration

**Gitea issue:** [#113](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/113) · **Found:** around 14 September 2026 · **Recorded:** 11 October 2026

The production frontend contained an outdated Auth0 Client ID, causing a mismatch with the intended authentication configuration.

**Expected:** Production uses the current Auth0 Client ID.

**Actual:** The built frontend still contained the previous Client ID.

**Resolution:** Corrected the production environment configuration, cleared conflicting environment overrides, rebuilt the frontend and prepared redeployment.

**Evidence:** Frontend production build check on 14 September 2026 confirming the new Auth0 client ID.

#### S3-02 — Shared timetable causes calendar rendering problems

**Gitea issue:** [#115](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/115) · **Found:** around 26–27 September 2026 · **Recorded:** 11 October 2026

During integration of the shared timetable, calendar rendering and refresh-state management required corrections to prevent repeated updates and unstable interface behaviour.

**Expected:** Timetable changes should trigger a controlled refresh while leaving the calendar responsive and preserving existing data.

**Actual:** The integrated calendar encountered rendering/refresh problems that required corrective changes.

**Resolution:** Corrected refresh dependencies and calendar state handling. Added regression coverage for timetable rendering and refresh behaviour.

**Evidence:** Commit `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78), with timetable rendering and refresh tests.

#### S3-03 — Timetable refresh discards unsaved manual input

**Gitea issue:** [#116](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/116) · **Found:** around 26–27 September 2026 · **Recorded:** 11 October 2026

During shared timetable integration, refreshing timetable data could cause the AvailabilityForm component to remount, risking loss of the user's unfinished manual-entry data.

**Expected:** Background timetable refreshes should update calendar data without discarding an unfinished Class or Unavailable entry.

**Actual:** Refresh-state handling interfered with the manual-entry component's state.

**Resolution:** Adjusted `scheduleVersion`/`refreshVersion` refresh handling so timetable updates no longer unnecessarily remount the AvailabilityForm.

**Evidence:** Commit `0edeebf` and its refresh-state regression tests.

#### S3-04 — Academic terms fail to update correctly

**Gitea issue:** [#118](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/118) · **Found:** around 26–27 September 2026 · **Recorded:** 11 October 2026

During the shared timetable and academic-term integration, term-management state and updates required corrections so the calendar, timetable and associated term data remained consistent.

**Expected:** Academic-term creation or updates should persist and be correctly reflected wherever term data is used.

**Actual:** Academic-term update behaviour and its interaction with timetable refreshes were not fully consistent.

**Resolution:** Corrected academic-term update and refresh handling and added related integration/regression coverage.

**Evidence:** Academic-term fixes in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78).

#### S3-05 — Fortnightly recurring timetable entries lack complete support

**Gitea issue:** [#120](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/120) · **Found:** around 24–27 September 2026 · **Recorded:** 11 October 2026

The shared timetable supported recurring entries, but fortnightly scheduling required additional database and application consistency work.

**Expected:** Once, Weekly and Fortnightly schedules should persist correctly and generate occurrences according to the selected academic term and recurrence pattern.

**Actual:** Fortnightly support was incomplete across the integrated scheduling and persistence layers.

**Resolution:** Added/updated recurrence handling and the database migration `20261004000000_support_fortnightly_schedule`, with relevant tests.

**Evidence:** Commit `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78), including migration `20261004000000_support_fortnightly_schedule`.

#### S3-06 — Imported timetable entries require duplicate protection

**Gitea issue:** [#122](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/122) · **Found:** Sprint 3 (date not confirmed) · **Recorded:** 11 October 2026

During integration of CSV/ICS timetable importing, duplicate detection and repeat-import behaviour required additional handling to prevent duplicate scheduling data.

**Expected:** Re-importing previously processed timetable entries should not silently create duplicate records.

**Actual:** The import integration required corrections to duplicate identification, term-aware behaviour and repeat-import handling.

**Resolution:** Implemented or strengthened duplicate detection and idempotent import behaviour, including preview/commit validation.

**Evidence:** Timetable import service and its duplicate-protection tests.

**Note:** the original failure was not confirmed when this record was written; it is kept because the related fix exists.

#### S3-07 — Timetable coverage tests become unstable

**Gitea issue:** [#124](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/124) · **Found:** around 26–27 September 2026 · **Recorded:** 11 October 2026

During integration testing, the expanded timetable frontend test suite encountered worker/timeout stability problems under the available execution environment.

**Expected:** Timetable test suites should run reliably without unnecessary timeouts or worker-related failures.

**Actual:** The test environment needed further configuration to complete the expanded coverage workload consistently.

**Resolution:** Adjusted frontend coverage workers, timeouts and CI execution limits, and strengthened the associated tests.

**Evidence:** Commits `0edeebf` and `dac70b0` in pull request [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78); 1,171 backend and 749 frontend tests passing locally on 27 September 2026.

#### S3-08 — Withdrawing from a tutoring opportunity leaves stale data

**Gitea issue:** [#126](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/126) · **Found:** Sprint 3, September 2026 · **Recorded:** 11 October 2026

During the Student workflow integration, withdrawing from an opportunity required the displayed work and request lists to refresh together.

**Expected:** When a student withdraws, the updated application/request status and available opportunities should be reflected consistently.

**Actual:** The affected interface could show stale information after withdrawal.

**Resolution:** Corrected the refresh logic for the relevant work and request lists.

**Evidence:** Commit `23b1067` (24 September 2026).

#### S3-09 — Overflow shortage model permits incorrect opportunity generation

**Gitea issue:** [#128](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/128) · **Found:** Sprint 3 overflow integration · **Recorded:** 11 October 2026

During the Sprint 3 overflow integration, shortage-model logic required correction to ensure that opportunities corresponded properly to available tutor slots.

**Expected:** The system should generate the correct number of opportunities for the relevant tutor slots without duplication.

**Actual:** The shortage calculation did not correctly enforce one opportunity per tutor slot.

**Resolution:** Corrected the shortage model and its opportunity-generation logic.

**Evidence:** Commit `0b39020` (24 September 2026).

### Sprint 4 — final fixes, regression testing and release (6 issues)

#### S4-01 — Expired sessions remain open

**Gitea issue:** [#130](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/130) · **Found:** Sprint 4 final testing · **Recorded:** 11 October 2026

During final testing, tutoring sessions did not consistently transition out of the Open state once the scheduled session time had expired.

**Expected:** Sessions should automatically transition from Open to Closed when their scheduled end condition is met.

**Actual:** Expired sessions could remain marked as Open.

**Resolution:** Corrected the session-expiry handling and added regression testing.

**Evidence:** Commit `9107313` (29–30 September 2026) with regression tests.

#### S4-02 — Page refresh does not preserve login state

**Gitea issue:** [#133](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/133) · **Found:** 29 September 2026 · **Recorded:** 11 October 2026

During Sprint 4 acceptance testing, the application's login persistence required correction when an authenticated user refreshed the page.

**Expected:** A valid authenticated session should survive a normal page refresh and restore the appropriate role workspace.

**Actual:** Refresh handling did not reliably preserve or restore the expected login state.

**Resolution:** Corrected Auth0 startup/session restoration integration and associated application state handling.

**Evidence:** Commit `9107313` and its authentication regression tests.

#### S4-03 — Large organiser budget values break the layout

**Gitea issue:** [#134](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/134) · **Found:** 29 September 2026 · **Recorded:** 11 October 2026

The organiser course/staffing management interface did not correctly accommodate some larger Rand budget values.

**Expected:** Budget values should remain readable and properly aligned, including values exceeding five digits.

**Actual:** Large budget amounts caused layout overflow or misalignment in the organiser interface.

**Resolution:** Updated the affected staffing/budget layout and styling to accommodate larger values.

**Evidence:** Commit `9107313`, including organiser and staffing layout changes and tests.

#### S4-04 — Academic term buttons do not perform the intended action

**Gitea issue:** [#135](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/135) · **Found:** around 29 September 2026 · **Recorded:** 11 October 2026

During Sprint 4 final testing, academic-term management controls did not consistently navigate to the correct form or populate the selected term for editing.

**Expected:** Edit, Configure and existing-term controls should open the appropriate view and prepopulate it with the correct term data.

**Actual:** Some controls did not perform their intended navigation or data-population action.

**Resolution:** Corrected the button handlers and selected-term form state. Added targeted regression testing.

**Evidence:** Commit `9107313` and the AcademicTermManagement tests.

#### S4-05 — Sick-note conflict alert does not receive focus

**Gitea issue:** [#137](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/137) · **Found:** 11 October 2026, final release CI check · **Recorded:** 11 October 2026

During the final frontend CI audit, the sick-note test suite exposed a focus-management regression or timing problem involving the conflict notification.

**Expected:** When a conflict notice is shown, its alert should receive the expected keyboard focus, and the accessibility test should reliably verify this.

**Actual:** The failing test found focus on the document body instead of the expected alert element.

**Resolution:** Updated the relevant focus assertion/timing so the test waits for the ConflictNotice alert focus correctly.

**Evidence:** Commit `c5237c0`, merged into `main` as `6b528a3` on 11 October 2026 (`StudentSickNotes.test.jsx`).

#### S4-06 — Allocation proposal explanation test returns no assignments

**Gitea issue:** [#136](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/136) · **Found:** 7 October 2026 · **Recorded:** 11 October 2026

During final Member 6 integration, the proposal-service regression suite failed because the test expected one proposal assignment but received zero.

**Expected:** The test fixture should exercise an uncovered staffing requirement and verify the intended proposal explanation behaviour.

**Actual:** The fixture's manually assigned COMS1 item already satisfied the tested requirement, making the expectation inconsistent with its input data.

**Resolution:** Identified the fixture inconsistency and proposed changing the uncovered requirement to a separate course such as COMS2, preserving the intended test scenario without changing correct production behaviour.

**Evidence:** The fixture in `proposal-service.test.ts` now uses a separate course (`COMS2`) for the uncovered requirement.

## Bug fixes recorded in Gitea pull requests

| Pull request | Merged | Defect | Fix and regression check |
| --- | --- | --- | --- |
| [#45](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/45) | 14 Sep | Student work, volunteer-request and public-holiday calls were wired to the wrong function instead of the Auth0 token getter. | Passed the raw token getter to those calls. |
| [#47](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/47) | 15 Sep | Found in smoke testing: after an Organiser decision, timesheet and excuse status kept showing cached (304) responses, and saving to a locked timesheet showed a generic error. | Added `cache: 'no-store'` to the authenticated fetch wrapper and a specific locked-timesheet message; 242 of 242 tests passing. |
| [#48](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/48) | 15 Sep | Sprint 2 stabilisation: timetable clashes mishandled weekly recurrence and touching times, allocation rules differed between the candidate, create and edit flows, and resubmitted timesheets kept a stale `submittedAt`. | Fixed each, with new regression and database tests (446 backend and 236 frontend tests passing). |
| [#49](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/49) | 16 Sep | Found after deployment: Organisers controlled Tutors' schedules and weekly capacity, and mark, timetable and capacity rules were mixed together. | Moved schedule and capacity to the Tutor, made the Organiser view read-only and separated the three eligibility rules. |
| [#50](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/50) | 16 Sep | Production: the Organiser's tutor-detail page failed when marks and schedule loaded together, TutorMark was not visible, and Monday-morning sessions were wrongly rejected. | Loaded marks and schedule independently and fixed the Monday regression (457 backend and 266 frontend tests passing). |
| [#51](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/51) | 16 Sep | Production "Candidates unavailable" error on the allocation board: the API response dropped `clashDetails`, so the frontend rejected valid responses. | Included `clashDetails` in the response and added a regression test for the production scenario. |
| [#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52) | 16 Sep | A Tutor was allocated successfully, then immediately appeared to fail availability because the new allocation was checked against itself. | Excluded the saved allocation from its own clash check while still blocking genuine conflicts; regression test added. |
| [#62](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/62) | 23 Sep | The backend CI job failed on merge commit `ff10eee` because parallel tests exhausted the shared runner. | Ran test files sequentially and raised the setup timeout for PGlite; 743 backend tests passing. |
| [#78](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/78) | 27 Sep | Unstable CI runs, plus errors in shared weekly schedules, availability time slots and academic-term validation. | Stabilised the CI workflow, corrected schedule and time-slot handling and added fortnightly schedules with a migration; 1,920 of 1,920 tests passing. |
| [#104](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/104) | 10 Oct | The final audit found eight defects, including non-atomic proposal generation (a late failure could leave a partial draft), manual proposal changes drifting from their audit reasons, stale strategy comparisons being saved, lost rejection reasons for unfilled requirements, broken proposal navigation and mismatched excused-history totals. | Repaired each with a regression test; all three CI jobs passed on the merge commit. |

## Problem areas by sprint

| Stage | Problem area | Corrective action / lesson | Retest to preserve |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Role-route, identity and prototype-to-API contract risks during parallel UI, auth and API setup. | Automatic onboarding, protected role routes, own-Tutor data and shared error contracts. | Fresh and returning sign-in, unverified email, wrong-role route, Tutor own-data tests. |
| **Sprint 2 — Basic** | Organiser integration failure during the 15 September stability pass. | The failing change was **reverted rather than shipped**, then course deletion, timetable/candidate responses and timesheet state were retested ([#48](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/48)). | Combined Organiser flow after the reverted merge. |
| **Sprint 2 → 3 stabilisation** | `clashDetails` returned by the query but dropped by the response mapper ([#51](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/51)). | Map the missing field so the candidate frontend receives the expected contract. | Valid and conflicting candidate responses, optional recurrence fields. |
| **Sprint 2 → 3 stabilisation** | A just-saved allocation shown as conflicting with itself ([#52](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/52)). | Pass `excludeAllocationId` when refreshing saved allocation candidates; keep blocking genuine overlaps. | Create/edit followed by an immediate refresh, plus an independent competing clash. |
| **Sprint 2 → 3 stabilisation** | Marks and calendar failed together because of coupled UI loading; Tutor capacity ownership was unclear ([#49](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/49), [#50](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/50)). | Independent fetches; Tutor-owned unavailable time and capacity with a read-only Organiser view. | A missing timetable still shows valid marks; cross-role ownership stays protected. |
| **Sprint 3 — Intermediate** | Import duplicates, reminder retries, concurrent bulk writes and timesheet correction states; CI resource exhaustion ([#62](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/62)). | Scoped API permissions, transactions, idempotency and race protection under Sprint 3 Member 5. | Retry with the same payload, duplicate import, stale decision and state-transition tests. |
| **Sprint 4 — Advanced** | Stale scenarios, competing bookings, swap decisions, stale search links and sick-note approvals as cross-user integrity risks; final-audit proposal defects ([#104](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/104)). | Version/conflict rechecks, server-side availability validation, audit/restore and role-based ownership. | Two-browser booking race, stale version, scenario publish, audit rollback and booking/sick-note history. |

The dated Sprint 2 → 3 corrections also appear in the handbook's post-Sprint 2 stabilisation record (p. 29).

## Reproducible bug record and workflow

| Field in the Gitea record | Information retained | Value to the process |
| --- | --- | --- |
| Identification | Title/ID, discoverer, date, sprint and affected role | Repeated reports can be linked to one defect. |
| Reproduction | Starting account and permissions, environment, ordered steps, expected vs actual result | Allows a reviewer to reproduce the fault rather than guessing. |
| Severity | Critical security/data loss; major blocked core journey; moderate workaround; minor cosmetic | Helps decide whether integration/release is blocked. |
| Root cause and fix | Focused branch, PR/review, relevant test, commit SHA | Associates the resolution with actual source. |
| Regression | Automated or manual retest outcome on *integrated main*, plus completed Actions/Codecov links | Prevents a branch-only fix from being mistaken for a released fix. |

**Decision flow:** discover → record and reproduce → prioritise → assign owner → fix on an appropriate branch → reviewer retests → Integration Lead merges → combined regression and CI → close with evidence. Critical security/data-integrity or major blocking defects stop release pending resolution or a formally recorded decision. A CI runner queued for another group is **not** a failed test; completion status is checked before reporting results.

## Quality evidence

- [Closed bug issues](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues?type=all&state=closed) — the 32 bug records ([#106](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/106)–[#137](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/issues/137)).
- [Pull requests](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls?state=closed) — each fix with its description, review and tests; login may be needed.
- [Original issues and project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) — feature work and ownership.
- [Gitea Actions workflow history](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) — per-commit CI outcomes.
- [Testing and performance](#testing) — measured results and changed-feature regression matrix.
- [Git methodology](#git-methodology) — review/merge order, including the Sprint 1–2 retrospective.
