## One complete system, four milestone roadmaps

All product and engineering chapters document the **progression from Sprint 1 to Sprint 4**, with each feature labelled by its sprint of introduction and later development. The [Sprint 1](#sprint1), [Sprint 2](#sprint2), [Sprint 3](#sprint3) and [Sprint 4](#sprint4-roadmap) roadmaps link original user stories, acceptance requirements and rubric evidence to these maintained explanations. [Complete feature register](#features) · [Gitea issue boards](#work-tracker).

# About this documentation website

## Purpose

This is the public engineering documentation and assessment-evidence companion to **Tutor MX**, the University of the Witwatersrand COMS3011A Tutor Management System (Team 6). It is intended to help someone understand, verify, maintain and evaluate the application without needing access to the team's private database or a developer account.

It is **not the login screen of the tutoring application**: [Open the Tutor MX application](https://tutor-mx.pages.dev) to use the product. Here, readers can inspect the project problem, requirements, architecture, the separately deployed frontend/backend, API contracts, data models, user journeys, decision history, testing, deployment and four-sprint rubric evidence.

## Who should read which pages?

| Reader | Start with | Why |
| --- | --- | --- |
| Lecturer or marker | [Four-sprint roadmap](#roadmap) · [Final assessment rubric](#milestone4) | Find requirements and follow direct links to implementation and evidence. |
| New developer | [System architecture](#architecture) · [README and setup](#readme) | Understand what runs where, install dependencies and follow the safe working method. |
| API integrator | [Public API and curl](#api) · [Security](#security) | Learn what anonymous requests can do, how protected operations authenticate and where schemas are documented. |
| Database maintainer | [Database dictionary](#database) · [Backend](#backend) | Inspect tables, relationships, migrations, role ownership and server-only database access. |
| Stakeholder | [Feature register](#features) · [Project decisions](#stakeholder-decisions) | See how the product answers the original tutor-allocation problem and what has changed. |

## Key product terms

- **Student:** can view open overflow/volunteer requests and the shared personal timetable/booking features implemented in the final system.
- **Tutor:** owns availability, allocations, work logs and timesheets, and may participate in swaps and tutoring bookings.
- **Organiser:** administers staffing, course/Tutor records, approvals, reporting and Advanced allocation planning.
- **Master Organiser:** a privileged existing Organiser who approves/rejects lecturer Organiser applications; **not** a public fourth role.
- **Scenario:** a draft allocation plan. Comparison and explicit publish are separate steps; a proposal never automatically becomes a live allocation.

## Documentation principles

- One **canonical technical chapter** per subject. Earlier plans and unique evidence have been consolidated into the relevant roadmap, engineering and source chapters, rather than repeated in an archive menu.
- One **roadmap per milestone**, each pointing to rubric criteria, delivery history, features and test evidence.
- Source-derived facts, measured results, past plans and untested assumptions are kept separate, with dates where relevant.
- The architecture and diagrams must explain the actual system. Private credentials, personal records and unredacted protected endpoints are never published.

## Reading order for a first visit

[Overview](#home) → [Features](#features) → [Architecture](#architecture) → [Sprint roadmaps](#roadmap) → [API](#api) → [Database](#database) → [Testing](#testing) → [Sources](#references).

## Status and feedback

The code-backed technical chapters reflect the supplied final 7 October 2026 source and existing evidence; historical sprint materials are explicitly dated. Five earlier user-feedback responses have been retained. The **new final-release user feedback round** is the section awaiting completion: [User feedback](#user-feedback).
