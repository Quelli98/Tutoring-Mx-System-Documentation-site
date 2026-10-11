# User feedback and Codecov evidence update — 11 October 2026

This documentation-only patch does not change Tutor MX application behaviour.

## Survey
- Supersedes the earlier five-submission feedback summary with nine form submissions dated 26 September–2 October 2026.
- Adds eight supplied Google Forms screenshot panels, with the combined Q5/Q6 panel preserved and legibility crops used on the feedback page.
- Q7 is summarised from the supplied raw-response PDF (8 Yes, 1 Probably); an updated Q7 screenshot was not supplied.
- Adds the original nine-response PDF in both `documents/` (source archive) and `public/documents/` (deployed download).
- Describes the positive results alongside an uncompleted task and a search-discoverability complaint; **no unverified bug fix or post-release retest is claimed**.
- Highlights that the raw survey includes matching-looking submissions and does not prove nine unique individuals or a specific application commit.

## Coverage
- Adds three original supplied Codecov screenshots at `public/evidence/codecov-*-latest-2026-10-11.png`.
- Reports 80.87% frontend, 85.42% backend, 82.93% combined for Codecov mirror `main` commit `6b528a3`.
- Identifies low-coverage files/directories with tracked/covered/missed/partial counts and retains 7 October snapshot separately.

## Deployment
- Keep all other historical site evidence and Git history intact.
- Run `npm ci`, `npm run validate` and `npm run build` using the existing GitHub Pages workflow.
- Do not mark survey suggestions implemented without a source change and retest.
