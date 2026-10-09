## How Organiser security evolved across the four sprints

| Sprint | Relevant foundation or change | Consequence for the final Master Organiser workflow |
| --- | --- | --- |
| **Sprint 1** | Auth0 identity, Student/Tutor/Organiser role-specific navigation, protected API and linked `Profile`. | Establishes the trusted user and backend authorisation boundary. |
| **Sprint 2** | Hardened verification, role/ownership checks, sign-in/reset/deletion and Organiser workflow permissions. | A hidden menu alone is never sufficient authorisation. |
| **Sprint 3 (late stabilisation before Sprint 4)** | The project introduced pending lecturer applications and Master approval rather than allowing immediate Organiser access. | `OrganiserApplication` records review; the trusted account has an additional Auth0 capability. |
| **Sprint 4** | Production session/stale-target hardening and regression across new scheduling and administrative actions. | The existing approval workflow is preserved, not rebuilt as a new Sprint 4-only feature. |

The handbook treats Master Organiser as **already present before Sprint 4 development**. The sprint label here refers to late Sprint 3 stabilisation, not to a new Sprint 4 Member deliverable. [Full feature history](#features) · [Role security](#security).

## Organiser approval and its trusted Master permission

A Master Organiser is an approved Organiser whose Auth0 token also carries `MASTER_ORGANIZER`. This is **not a fourth `Profile.role`, not a separate database table, and not a public registration option**. [See how `Profile` and `OrganiserApplication` are stored](#database). Organisers are lecturers. Students do not become Organisers through ordinary Student onboarding.

| Stage | What the user sees | What the backend stores or checks |
| --- | --- | --- |
| Lecturer registers | Register as organiser, then Auth0 identity/email verification | Creates a `PENDING` OrganiserApplication; no new Student or Organiser Profile |
| Waiting | Status lookup says Pending | No Organiser role granted |
| Master signs in | Organiser applications in the Organiser sidebar | Requires approved Organiser profile plus Master claim |
| Master approves | Application changes to Approved | Calls Auth0 to grant ORGANISER; records decision and creates/links Profile |
| Master rejects | Rejected plus an optional review note where allowed | Records decision; does not create the applicant's Profile |
| Approved lecturer signs in | Normal Organiser workspace | A fresh token/profile check resolves approved access |

The same account cannot use organiser registration to silently change an existing Student/Tutor role. The current service checks identity/email uniqueness and rejects conflicting existing accounts. A compatibility path for a prior draft's Student row exists only inside approval; it is not the normal user registration flow.

## One-time trusted account setup

An authorised project administrator assigns `ORGANISER` and `MASTER_ORGANIZER` to the designated trusted lecturer in Auth0. The lecturer signs out and in again so the token contains the updated custom role claim. The Auth0 post-login role claim must use the same claim key configured in the API.

After bootstrap, ordinary lecturer applications should be reviewed inside Tutor MX. The team should not manually grant Organiser access to every applicant in the Auth0 dashboard.

## How to demonstrate this to the marker

1. Use a designated lecturer demo identity and choose Register as organiser.
2. Show Pending on the landing-page status check. Demonstrate that this applicant has no Organiser workspace yet.
3. Sign in as the trusted Master Organiser; open Organiser applications and approve or reject the demo application.
4. Sign in as the approved lecturer and show the Organiser workspace.
5. With a normal Organiser account, demonstrate that the Master queue request is rejected with 403.

Capture request status, safe UI result and the tested release SHA. Do not capture tokens or private applicant details. This is a verification procedure; the site does not claim it was executed during the documentation rebuild.

## Failure and consistency boundaries

The backend checks Master access even if somebody directly types the queue URL or sends curl. A missing menu alone is not proof of secure access control. Approval can fail if the application is already reviewed, email changed, identity is unverified or a provider is unavailable.

Auth0 role provisioning and the Neon transaction do not share a transaction manager. Test a failed database update after the external role grant, then reconcile state through a defined administrative recovery process. Preserve this limit in the final evidence rather than claiming the entire cross-provider operation is atomic.


## Final configuration evidence

The final Auth0 role-list screenshot retained in [Security & roles](#security/auth0-role-evidence-7-october-2026) shows `MASTER_ORGANIZER` alongside `ORGANISER`, `STUDENT` and `TUTOR`. The Master role description states that it can review and approve or reject Tutor MX organiser applications. Because the Auth0 dashboard requires administrator login, the documentation embeds the screenshot instead of sending the marker to a private tenant URL.
