export type Chapter = {
  title: string;
  label: string;
  summary: string;
  group: string;
  key?: string;
  legacyId?: string;
  archive?: boolean;
};
export const groups = [
  "Start here",
  "Understand Tutor MX",
  "Technical reference",
  "Sprint roadmaps",
  "Build & release",
  "Evidence & assessment",
];
export const chapters: Record<string, Chapter> = {
  home: {
    title: "Tutor MX — project documentation",
    label: "Overview",
    summary:
      "An organised public guide to the purpose, architecture, features, development journey and verification of Tutor MX.",
    group: groups[0],
  },
  "site-guide": {
    title: "About this documentation",
    label: "Purpose & how to use",
    summary:
      "Who this site is for, what it contains, and the fastest path to the evidence you need.",
    group: groups[0],
    key: "site-guide",
  },
  requirements: {
    title: "Requirements and scope",
    label: "Requirements & scope",
    summary:
      "The shared project requirements and Basic, Intermediate and Advanced scope mapped to implementation evidence.",
    group: groups[0],
    key: "requirements",
  },
  "report-guide": {
    title: "Reports and presentation evidence",
    label: "Reports & presentation",
    summary:
      "The separate group report, individual report, peer review and presentation requirements, with relevant evidence links.",
    group: groups[5],
    key: "report-guide",
  },
  features: {
    title: "Tutor MX features & user journeys",
    label: "Features & user journeys",
    summary:
      "A source-backed register of the end-to-end product, from Basic Tutor allocation to Advanced planning.",
    group: groups[1],
    key: "features",
  },
  architecture: {
    title: "System architecture",
    label: "System architecture",
    summary:
      "Four-sprint engineering evolution, application layers, trust boundaries, rationale and rubric evidence.",
    group: groups[1],
    key: "architecture",
  },
  frontend: {
    title: "Frontend application",
    label: "Frontend",
    summary:
      "Student, Tutor and Organiser interfaces, design principles and usability evidence across Sprints 1–4.",
    group: groups[1],
    key: "frontend",
  },
  backend: {
    title: "Backend & business rules",
    label: "Backend",
    summary:
      "Handwritten Express routes, role checks, domain services, transactions and safe errors.",
    group: groups[1],
    key: "backend",
  },
  "student-scheduling": {
    title: "How Tutor MX works — all user roles",
    label: "How Tutor MX works",
    summary:
      "One complete guide to Student, Tutor, Organiser and Master Organiser features introduced across Sprints 1–4.",
    group: groups[1],
    key: "student-scheduling",
  },
  api: {
    title: "External API & curl reference",
    label: "API & curl examples",
    summary:
      "Public API access, authenticated contracts and the full final-source route inventory.",
    group: groups[2],
    key: "api",
  },
  database: {
    title: "Database schema & dictionary",
    label: "Database & ER diagram",
    summary:
      "Complete schema across all four sprints, Master Organiser records, foreign keys, constraints and the ER diagram.",
    group: groups[2],
    key: "database",
  },
  diagrams: {
    title: "UML & system diagrams",
    label: "UML diagrams",
    summary:
      "Source-grounded architecture and workflow diagrams plus the database relationship diagram.",
    group: groups[2],
  },
  security: {
    title: "Authentication, security & roles",
    label: "Security & roles",
    summary:
      "Auth0 permissions, ownership checks, session and platform secrets boundaries.",
    group: groups[2],
    key: "security",
  },
  integration: {
    title: "External API integration",
    label: "Holiday integration",
    summary:
      "Why Tutor MX uses the South African public-holiday adapter and how it fails safely.",
    group: groups[2],
    key: "integration",
  },
  roadmap: {
    title: "Sprint 1–4 development roadmaps",
    label: "Roadmap overview",
    summary:
      "Four milestones, rubric traceability, acceptance scope and evolving delivery evidence.",
    group: groups[3],
    key: "roadmap",
  },
  sprint1: {
    title: "Sprint 1 roadmap",
    label: "Sprint 1 · Foundation",
    summary:
      "Milestone 1: project setup and integrated foundation, with all 10 rubric criteria linked to evidence.",
    group: groups[3],
    key: "sprint1",
  },
  sprint2: {
    title: "Sprint 2 roadmap",
    label: "Sprint 2 · Basic",
    summary:
      "Milestone 2: real end-to-end Basic journeys and all 10 rubric criteria.",
    group: groups[3],
    key: "sprint2",
  },
  sprint3: {
    title: "Sprint 3 roadmap",
    label: "Sprint 3 · Intermediate",
    summary:
      "Milestone 3: completed Intermediate features, quality and all 8 rubric criteria.",
    group: groups[3],
    key: "sprint3",
  },
  "sprint4-roadmap": {
    title: "Sprint 4 roadmap",
    label: "Sprint 4 · Advanced",
    summary:
      "Advanced release and all 20 whole-project final-submission assessment criteria.",
    group: groups[3],
    key: "sprint4-roadmap",
  },
  readme: {
    title: "README & development setup",
    label: "README & setup",
    summary:
      "Development instructions and current README, retaining the complete source README.",
    group: groups[4],
    key: "readme",
  },
  "git-methodology": {
    title: "Git branching, review & integration",
    label: "Git methodology",
    summary:
      "The team’s branch practice, integration order, review/CI gates and release workflow.",
    group: groups[4],
    key: "git-methodology",
  },
  process: {
    title: "Team process & methodology",
    label: "Team methodology",
    summary:
      "How the team voted on tasks, coordinated sprints and improved its integration workflow.",
    group: groups[4],
    key: "process",
  },
  testing: {
    title: "Testing, accessibility & performance",
    label: "Testing & performance",
    summary:
      "Quality gates, Codecov evidence, dated public measurements and limits on verification.",
    group: groups[4],
    key: "testing",
  },
  deployment: {
    title: "Hosting & deployment",
    label: "Deployment",
    summary:
      "Cloudflare Pages, Render, Auth0 and Neon environment and release boundaries.",
    group: groups[4],
    key: "deployment",
  },
  milestone4: {
    title: "Final submission rubric & evidence",
    label: "Final submission rubric",
    summary:
      "All 20 assessed criteria mapped to the existing technical documents and dated evidence.",
    group: groups[5],
    key: "milestone4",
  },
  sprint4: {
    title: "Final release record",
    label: "Final release evidence",
    summary:
      "Source-backed Sprint 4 implementation, merge history, deployment and CI/coverage evidence.",
    group: groups[5],
    key: "sprint4",
  },
  "stakeholder-decisions": {
    title: "Stakeholder engagement & decisions",
    label: "Stakeholder reviews",
    summary:
      "Dated stakeholder contact, requirements, engineering decisions and improvements.",
    group: groups[5],
    legacyId: "stakeholder-decisions",
  },
  "work-tracker": {
    title: "Work & issue tracking across Sprint 1–4",
    label: "Work tracker",
    summary:
      "All four Gitea project boards, original issue cards, acceptance specifications and retrospective handover evidence.",
    group: groups[5],
    key: "work-tracker",
  },
  "bug-tracker": {
    title: "Bug and regression tracking",
    label: "Bug tracker",
    summary:
      "32 Gitea bug issues across Sprints 1–4 and the pull requests that fixed them, each with what went wrong, how it was resolved and the evidence.",
    group: groups[5],
    key: "bug-tracker",
  },
  "third-party-code": {
    title: "Libraries & third-party services",
    label: "Third-party register",
    summary:
      "Motivation, responsibilities and risk boundaries for libraries and hosted services across Sprint 1–4.",
    group: groups[5],
    key: "third-party-code",
  },
  "user-feedback": {
    title: "User feedback & improvements",
    label: "User feedback",
    summary:
      "Google Forms user-testing results, participant comments and the improvements made in response.",
    group: groups[5],
    legacyId: "user-feedback",
    key: "feedback-status",
  },
  references: {
    title: "Sources, evidence & downloads",
    label: "Sources & downloads",
    summary:
      "Official briefs, historic handbooks, source inventory, diagrams, screenshots and verification files.",
    group: groups[5],
    key: "references",
  },
};
export const aliases: Record<string, string> = {
  "master-organiser": "student-scheduling",
  "getting-started": "readme",
  implementation: "features",
  "tech-stack": "architecture",
  "version-control": "git-methodology",
  "project-methodology": "process",
  error: "database",
  "home-history": "home",
  "sprint1-roadmap": "sprint1",
  "sprint3-roadmap": "sprint3",
  rubric: "sprint2",
  "initial-design-plan": "architecture",
  requirements: "requirements",
  "sprint-evidence": "references",
  "sprint-evidence-archive": "references",
  "standout-improvements": "features",
  "report-preparation": "report-guide",
  "project-evolution": "roadmap",
  documents: "references",
  "ai-attribution": "references",
  challenges: "process",
  "history-index": "references",
  changes: "sprint4",
  sprint4: "sprint4",
  "testing-history": "testing",
  "testing-archive": "testing",
  "stakeholder-decisions-archive": "stakeholder-decisions",
  "git-methodology-history": "git-methodology",
  "security-history": "security",
  "architecture-history": "architecture",
  "database-history": "database",
  "api-history": "api",
  "deployment-history": "deployment",
  "getting-started-history": "readme",
  "tech-stack-history": "architecture",
  "version-control-history": "git-methodology",
  "project-methodology-history": "process",
  "implementation-history": "features",
  "original-readme": "readme",
  "sprint2-evidence": "sprint2",
};

export function parseRoute(hash: string) {
  let value = hash.replace(/^#/, "");
  try {
    value = decodeURIComponent(value);
  } catch {
    /* Unknown hashes remain recoverable. */
  }
  const [id, anchor = ""] = value.split("/");
  if (id === "master-organiser")
    return {
      id: "student-scheduling",
      anchor:
        anchor || "master-organiser-approval-part-of-organiser-administration",
    };
  return {
    id: (Object.hasOwn(aliases, id) ? aliases[id] : id) || "home",
    anchor,
  };
}
