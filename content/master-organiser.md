## An extra permission inside the Organiser workspace

A Master Organiser is an approved Organiser whose Auth0 token also carries `MASTER_ORGANIZER`. This is **not a fourth `Profile.role` and not a public registration option**. Organisers are lecturers. Students do not become Organisers through ordinary Student onboarding.

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
