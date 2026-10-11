import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import meta from "./data/source-meta.json";
import checks from "./data/live-checks.json";

import { groups, chapters, parseRoute } from "./navigation";
import { asset, Badge } from "./ui";
import Diagram from "./Diagram";
import Markdown from "./Markdown";
import ContentBoundary from "./ContentBoundary";
const ApiCatalogue = lazy(() => import("./ApiCatalogue"));
const DatabaseCatalogue = lazy(() => import("./DatabaseCatalogue"));
const RubricMap = lazy(() => import("./RubricMap"));
const LegacyContent = lazy(() => import("./LegacyContent"));
const OriginalReadme = lazy(() => import("./OriginalReadme"));
const diagramData = [
  [
    "component",
    "Component diagram",
    "four-sprint implemented architecture",
    "This diagram groups the React interface, role-aware API contracts, domain services and persistence by responsibility. The Sprint 1 separation of frontend/authentication/HTTP/database remains intact while Sprints 2–4 add workflow services. Arrows show software dependencies, not direct database access from the browser.",
    "The component split demonstrates a non-monolithic frontend/backend and how the handwritten API acts as the required boundary. Read alongside the API inventory and domain service explanation.",
  ],
  [
    "deployment",
    "Deployment diagram",
    "final deployed topology",
    "This diagram distinguishes where each part executes: Cloudflare delivers React static assets, Render runs the Express process, Auth0 authenticates users, and Prisma accesses Neon PostgreSQL. The documentation site is a separate static publication. Browser and server boundaries explain why secrets belong on Render, not in Vite variables.",
    "The hosted frontend/API addresses and /health /ready evidence support deployment availability. The diagram is architecture evidence, not a performance benchmark or proof of production row counts.",
  ],
  [
    "composite",
    "Composite structure diagram",
    "shared schedule architecture",
    "The shared scheduling component contains TimeSlot ownership, recurrence/academic-term interpretation, exception expansion and busy-interval logic. Sprint 3 built on the Tutor calendar; Sprint 4 generalised ownership for Students rather than introducing a second timetable model.",
    "Reuse is a design decision that keeps allocations and Student booking checks consistent. The diagram describes collaboration within a component, not another separately deployed microservice.",
  ],
  [
    "use-case",
    "Use case diagram",
    "role functions across Sprint 1–4",
    "The actors identify Student, Tutor and Organiser journeys, with Master Organiser shown as a privileged Organiser. Sprint 1 establishes role access; Sprint 2 completes volunteering/timesheets/allocations; Sprint 3 extends operations; Sprint 4 adds booking, swaps, scenarios and audit. Actor connections express intended permissions.",
    "The role/use-case view maps requirements to user-facing features. A use-case connection is not itself a test result; the source-backed feature register and role tests show implementation.",
  ],
  [
    "activity",
    "Activity diagram",
    "booking and conflict path",
    "The activity flow follows Student selection of a mutually free slot, submission, server-side revalidation and the decision between confirmed booking or controlled conflict. A successful booking updates both schedules and preserves history. This is the Sprint 4 extension of availability and clash rules established earlier.",
    "Decision diamonds explain where domain logic, concurrency protection and user feedback interact. The negative branch is essential because an old UI availability result is not permission to double-book.",
  ],
  [
    "state-machine",
    "State machine diagram",
    "lecturer approval lifecycle",
    "The application begins Pending after lecturer registration; an authorised Master Organiser may approve or reject. A recorded terminal decision remains in history. Approval changes both the Auth0 Organiser capability and the linked Neon Profile after protected checks.",
    "The diagram explains legal business states, not four stored role types: Master Organiser is an extra permission. Provider and database updates are separate operations and need failure/retry handling.",
  ],
  [
    "sequence",
    "Sequence diagram",
    "cross-service Organiser approval",
    "The sequence places browser, Express, Auth0 Management API and Neon in call order: register pending application, review by a privileged Organiser, grant role and save decision/profile. Message order makes the cross-provider boundary visible.",
    "A happy-path sequence must not be mistaken for an atomic transaction spanning Auth0 and Neon. Provider failures, stale competing reviews and retries belong in security/API regression tests.",
  ],
  [
    "timing",
    "Timing diagram",
    "booking and sickness event order",
    "This diagram aligns appointment status, Student sick request and busy-time state. Confirmed booking occupies both calendars; an advance-approved sickness request may release active time as Excused, while after-start approval remains as Skipped history.",
    "The horizontal axis represents logical event order and state changes, not measured response time. It supports the booking/attendance rule explanation, not an API speed claim.",
  ],
] as const;

function LiveChecks() {
  return (
    <div
      className="table-wrap"
      role="region"
      aria-label="Dated service checks"
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            <th>Request</th>
            <th>Observed</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          {checks.map((c) => (
            <tr key={c.url}>
              <td>
                <a href={c.url} target="_blank" rel="noreferrer">
                  <code>
                    {new URL(c.url).hostname}
                    {new URL(c.url).pathname}
                  </code>
                </a>
                <small>{c.date}</small>
              </td>
              <td>
                <Badge
                  tone={
                    c.status === 200
                      ? "verified"
                      : c.status === 401
                        ? "neutral"
                        : "attention"
                  }
                >
                  {c.status}{" "}
                  {c.status === 200
                    ? "OK"
                    : c.status === 401
                      ? "Expected"
                      : "Blocked"}
                </Badge>
              </td>
              <td>{c.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="hero-content">
          <div className="hero-overline">
            <span className="hero-dot" /> WITS · COMS3011A · TEAM 6
          </div>
          <h1 id="welcome-title">
            A better way to manage tutoring.
            <br />
            <em>Documented from idea to release.</em>
          </h1>
          <p className="hero-lead">
            Tutor MX connects organisers, tutors and students in one secure
            system for staffing courses, managing availability, assigning work
            and keeping tutoring administration on track. This site explains how
            the application works, why it was designed this way and how the team
            built and verified it across four sprints.
          </p>
          <div className="hero-actions">
            <a className="button hero-primary" href="#site-guide">
              Explore the documentation <span aria-hidden="true">↗</span>
            </a>
            <a className="hero-secondary" href="#roadmap">
              Explore the four-sprint roadmap <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-context">
            <span>Engineering reference</span>
            <span>Course rubric traceability</span>
            <span>Source-linked evidence</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Tutor MX system components">
          <div className="hero-visual-caption">HOW TUTOR MX CONNECTS</div>
          <div className="hero-roles">
            <span>Student</span>
            <span>Tutor</span>
            <span>Organiser</span>
          </div>
          <div className="hero-connector" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-architecture">
            <div>
              <strong>React + Vite</strong>
              <small>Browser interface · Cloudflare Pages</small>
            </div>
            <div>
              <strong>Node.js + Express</strong>
              <small>Handwritten API · Render</small>
            </div>
            <div>
              <strong>PostgreSQL + Prisma</strong>
              <small>Application data · Neon</small>
            </div>
          </div>
          <div className="hero-auth">
            Auth0 secures identity and role access
          </div>
        </div>
      </section>
      <div className="hero-stats" aria-label="Documentation coverage">
        {[
          [4, "documented sprints"],
          [meta.routes, "API operations"],
          [meta.models, "Prisma models"],
          [9, "system & UML diagrams"],
        ].map(([n, t]) => (
          <div key={t}>
            <strong>{n}</strong>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <section className="home-section" id="welcome-purpose">
        <div className="home-section-heading">
          <span className="home-section-kicker">THE PURPOSE</span>
          <h2>Everything needed to understand and evaluate the system.</h2>
          <p>
            More than a feature list, this is a public record of the software
            architecture, engineering choices, quality evidence and delivery
            history. It gives developers a technical reference and lecturers a
            route from every assessed requirement to the supporting work.
          </p>
        </div>
        <div className="purpose-columns">
          <article>
            <div className="purpose-icon" aria-hidden="true">
              01
            </div>
            <h3>Understand the product</h3>
            <p>
              The original school problem, role journeys, allocation
              eligibility, timetable workflows and Advanced planning features.
            </p>
            <a href="#features">Explore product features →</a>
          </article>
          <article>
            <div className="purpose-icon" aria-hidden="true">
              02
            </div>
            <h3>Explore the engineering</h3>
            <p>
              Frontend/backend architecture, public HTTP API, data dictionary,
              security rules and deployed infrastructure.
            </p>
            <a href="#architecture">Explore the architecture →</a>
          </article>
          <article>
            <div className="purpose-icon" aria-hidden="true">
              03
            </div>
            <h3>Verify the delivery</h3>
            <p>
              Four sprint roadmaps, rubric matrices, team methodology, tests,
              stakeholder evidence and dated release artefacts.
            </p>
            <a href="#roadmap">View sprint roadmaps →</a>
          </article>
        </div>
      </section>
      <section className="home-section" id="welcome-navigation">
        <div className="home-section-heading">
          <span className="home-section-kicker">DOCUMENTATION LIBRARY</span>
          <h2>Choose a starting point</h2>
          <p>
            Each subject has one primary chapter. The four-sprint history and
            source evidence are integrated into these maintained chapters, so
            earlier plans remain distinguishable from the final implementation.
          </p>
        </div>
        <div className="entry-grid">
          {[
            [
              "site-guide",
              "Start here",
              "How to use this site",
              "Purpose, intended audiences and a guided reading order.",
            ],
            [
              "features",
              "Product",
              "Features & user journeys",
              "Student, Tutor, Organiser and Master Organiser workflows.",
            ],
            [
              "architecture",
              "Engineering",
              "System architecture",
              "Frontend, API, database and security boundaries.",
            ],
            [
              "roadmap",
              "Delivery",
              "Sprint 1–4 roadmaps",
              "All four milestone rubrics and acceptance evidence.",
            ],
            [
              "api",
              "Integration",
              "External API reference",
              "Curl, security contracts and the registered route explorer.",
            ],
            [
              "milestone4",
              "Assessment",
              "Final submission evidence",
              "The entire Milestone 4 rubric and its evidence links.",
            ],
          ].map(([id, tag, t, d]) => (
            <a href={`#${id}`} className="entry-card" key={id}>
              <div className="entry-top">
                <span>{tag}</span>
                <span aria-hidden="true" className="entry-arrow">
                  ↗
                </span>
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="home-section" id="welcome-roadmap">
        <div className="home-section-heading">
          <span className="home-section-kicker">PROJECT JOURNEY</span>
          <h2>Four milestones. One evolving product.</h2>
          <p>
            Each sprint adds new capabilities without erasing the decisions and
            evidence of earlier work.
          </p>
        </div>
        <div className="journey-row">
          {[
            [
              "sprint1",
              "01",
              "Foundation",
              "3–25 Aug",
              "Identity, architecture and baseline workspaces",
            ],
            [
              "sprint2",
              "02",
              "Basic workflows",
              "26 Aug–15 Sep",
              "Real allocations, approvals and persistence",
            ],
            [
              "sprint3",
              "03",
              "Intermediate",
              "16–29 Sep",
              "Ranking, reports, import and operational quality",
            ],
            [
              "sprint4-roadmap",
              "04",
              "Advanced & release",
              "30 Sep–11 Oct",
              "Shared bookings, scenarios, audit and proposals",
            ],
          ].map(([id, n, t, date, description]) => (
            <a href={`#${id}`} className="journey-step" key={id}>
              <span className="journey-index">{n}</span>
              <small>{date}</small>
              <strong>{t}</strong>
              <span className="journey-desc">{description}</span>
              <span className="journey-go" aria-hidden="true">
                View roadmap →
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="home-section" id="welcome-proof">
        <div className="home-section-heading">
          <span className="home-section-kicker">ASSURANCE</span>
          <h2>Evidence you can inspect</h2>
        </div>
        <div className="proof-grid">
          <div>
            <h3>Implementation, not just a plan</h3>
            <p>
              The documented final code includes 120 registered HTTP operations,
              30 Prisma models and the final Advanced features. The
              source-derived implementation record is distinct from historical
              plans and tests.
            </p>
            <a href="#sprint4">Read the release record →</a>
          </div>
          <div>
            <h3>Quality with dated results</h3>
            <p>
              1,466 backend and 847 frontend automated tests pass on the final
              code, with 85.42% backend and 80.87% frontend line coverage on
              Codecov. Coverage snapshots, public service checks and responsive
              captures each carry their date and scope.
            </p>
            <a href="#testing">Explore testing evidence →</a>
          </div>
        </div>
      </section>
      <section className="home-section" id="welcome-service">
        <div className="section-top">
          <h2>Public API service checks</h2>
          <span className="subtle">
            Dated observations — not continuous uptime monitoring
          </span>
        </div>
        <LiveChecks />
      </section>
    </>
  );
}

function Gallery() {
  return (
    <section id="platform-evidence">
      <h2>Additional final release evidence</h2>
      <p className="caption">
        Private identities are blurred where necessary. Gitea/Neon/Auth0
        administration itself requires team access, so public verification links
        are listed in the chapter and the relevant private-console facts are
        preserved as screenshots.
      </p>
      <div className="evidence-gallery">
        {[
          [
            "sprint4-gitea-actions-reviewed-member6-2026-10-07.png",
            "Reviewed Member 6 Gitea Actions run",
            "Green ci.yml run on 2f62311 immediately before it was merged into final main 361954e.",
          ],
          [
            "sprint4-live-landing-desktop-2026-10-07.png",
            "Live Tutor MX desktop landing page",
            "Public production landing page with Student, Tutor and Organiser entry paths.",
          ],
          [
            "sprint4-responsive-tutor-redacted-2026-10-07.png",
            "Tutor workspace on the live site",
            "Current Tutor dashboard at the captured responsive width; the account identity is blurred for public documentation.",
          ],
          [
            "sprint4-responsive-organiser-redacted-2026-10-07.png",
            "Organiser workspace on the live site",
            "Current Organiser dashboard and quick actions; the account identity is blurred for public documentation.",
          ],
        ].map(([f, t, c]) => (
          <figure key={f}>
            <a href={asset("evidence/" + f)} target="_blank" rel="noreferrer">
              <img loading="lazy" src={asset("evidence/" + f)} alt={t} />
            </a>
            <figcaption>
              <strong>{t}</strong>
              <span>{c}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
function Resources() {
  return (
    <section id="downloads">
      <h2>Evidence & verification downloads</h2>
      <div className="download-list">
        {[
          [
            "database-evidence.sql",
            "Read-only database queries",
            "Exact table counts, role totals and completed migration status.",
          ],
          [
            "check-api.ps1",
            "PowerShell API checker",
            "Public probes plus optional authorised role reads; no response bodies printed.",
          ],
          [
            "tutor-mx-readonly.postman_collection.json",
            "GET-only Postman collection",
            "Empty local token variable; no writes.",
          ],
          [
            "openapi.json",
            "OpenAPI 3 specification",
            "All 120 operations, with request and response schemas for the main workflows.",
          ],
          [
            "endpoint-inventory.json",
            "Source route inventory",
            "Methods, paths, guards, handler and validator references.",
          ],
          ["schema.prisma", "Current Prisma schema", "30 models and 14 enums."],
          [
            "technical-source-evidence.zip",
            "7 October technical source evidence",
            "Captured at 361954e; later final-audit and Codecov records are dated separately.",
          ],
          [
            "sprint4-final-git-log.txt",
            "7 October Sprint 4 Git log",
            "Recorded main and Member merge history at the 7 October source snapshot.",
          ],
        ].map(([f, t, d]) => (
          <a key={f} href={asset("downloads/" + f)} download>
            <div>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [headings, setHeadings] = useState<{ id: string; label: string }[]>([]);
  const [ready, setReady] = useState(0);
  const lastChapter = useRef(route.id);
  const article = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const page = Object.hasOwn(chapters, route.id)
    ? chapters[route.id]
    : undefined;
  const onLegacyReady = useCallback(() => setReady((x) => x + 1), []);
  const [searchDocs, setSearchDocs] = useState<
    Record<string, { text: string }>
  >({});
  const [searchLoading, setSearchLoading] = useState(false);
  const results = useMemo(
    () =>
      Object.entries(chapters)
        .filter(([, p]) =>
          `${p.title} ${p.summary} ${searchDocs[p.key || p.legacyId || ""]?.text || ""}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 25),
    [query, searchDocs],
  );
  function openSearch() {
    if (!Object.keys(searchDocs).length) {
      setSearchLoading(true);
      import("./data/content-index.json")
        .then((m) => setSearchDocs(m.default))
        .catch(() => setSearchDocs({}))
        .finally(() => setSearchLoading(false));
    }
    dialog.current?.showModal();
    setTimeout(() => input.current?.focus(), 0);
  }
  useEffect(() => {
    const sync = () => {
      setRoute(parseRoute(location.hash));
      setMenu(false);
      dialog.current?.close();
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest(
        "input,textarea,select,[contenteditable]",
      );
      if (
        (e.key === "/" && !typing) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        dialog.current?.close();
        if (document.activeElement?.closest("#sidebar"))
          document.querySelector<HTMLButtonElement>(".mobile-toggle")?.focus();
        setMenu(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (lastChapter.current !== route.id) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
      lastChapter.current = route.id;
    }
    document.title = `${page?.title || "Page not found"} | Tutor MX`;
    const nodes = Array.from(
      article.current?.querySelectorAll<HTMLElement>("h2") || [],
    );
    const found = nodes
      .map((n) => {
        let id = n.id || n.closest("section[id]")?.id || "";
        if (!id) {
          id =
            n.textContent
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/-$/, "") || "";
          n.id = id;
        }
        return { id, label: n.textContent || "" };
      })
      .filter((x) => x.id);
    setHeadings(found);
    const timer = window.setTimeout(() => {
      if (route.anchor) {
        const target = document.getElementById(route.anchor);
        if (target) {
          let n: HTMLElement | null = target;
          while (n) {
            if (n instanceof HTMLDetailsElement) n.open = true;
            n = n.parentElement;
          }
          target.scrollIntoView({ block: "start" });
        }
      } else window.scrollTo({ top: 0 });
    }, 40);
    article.current?.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
      if (pre.querySelector("button")) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "copy-button";
      b.textContent = "Copy";
      b.setAttribute("aria-label", "Copy code block");
      b.onclick = async () => {
        try {
          await navigator.clipboard.writeText(
            pre.querySelector("code")?.textContent || "",
          );
          b.textContent = "Copied";
        } catch {
          b.textContent = "Select to copy";
        }
        setTimeout(() => (b.textContent = "Copy"), 1800);
      };
      pre.prepend(b);
    });
    return () => clearTimeout(timer);
  }, [route.id, route.anchor, page, ready]);
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            TM
          </span>
          <div>
            <strong>Tutor MX</strong>
            <span>Engineering documentation</span>
          </div>
        </a>
        <button className="global-search" onClick={openSearch}>
          <span>Search documentation</span>
          <kbd>Ctrl / ⌘ K</kbd>
        </button>
        <nav className="toplinks" aria-label="Product links">
          <a href="https://tutor-mx.pages.dev" target="_blank" rel="noreferrer">
            Open application ↗
          </a>
          <a
            href="https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site"
            target="_blank"
            rel="noreferrer"
          >
            Docs GitHub ↗
          </a>
        </nav>
        <button
          className="mobile-toggle"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="sidebar"
        >
          {menu ? "Close" : "Menu"}
        </button>
      </header>
      {menu && (
        <button
          className="menu-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="workspace">
        <aside id="sidebar" className={`sidebar ${menu ? "is-open" : ""}`}>
          <div className="sidebar-caption">
            PROJECT HANDBOOK<span>COMS3011A · TEAM 6</span>
          </div>
          <nav aria-label="Documentation navigation">
            {groups.map((g) => (
              <details
                className="nav-group nav-accordion"
                key={g}
                open={g === page?.group || g === groups[0]}
              >
                <summary>{g}</summary>
                <div className="nav-subpages">
                  {Object.entries(chapters)
                    .filter(([, p]) => p.group === g)
                    .map(([id, p]) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        aria-current={id === route.id ? "page" : undefined}
                        onClick={() => setMenu(false)}
                      >
                        {p.label}
                        {id === "api" && <small>{meta.routes}</small>}
                        {id === "database" && <small>{meta.models}</small>}
                      </a>
                    ))}
                </div>
              </details>
            ))}
          </nav>
          <div className="sidebar-note">
            <strong>One project · four sprints</strong>
            <p>
              Documentation reviewed: 11 Oct 2026.
              <br />
              Roadmaps: Sprints 1–4.
              <br />
              Historical evidence integrated into the subject chapters.
            </p>
          </div>
        </aside>
        <main id="main-content" tabIndex={-1} className="main-content">
          <article ref={article} className="article">
            {route.id !== "home" && (
              <div className="breadcrumbs">
                <a href="#home">Documentation</a>
                <span>/</span>
                <span>{page?.group || "Navigation"}</span>
              </div>
            )}
            <header
              className={`article-header ${route.id === "home" ? "home-header" : ""}`}
            >
              <div className="eyebrow">
                TUTOR MX · TECHNICAL DOCUMENTATION{" "}
                <span>UPDATED 11 OCT 2026</span>
              </div>
              <h1>{page?.title || "Page not found"}</h1>
              <p>
                {page?.summary ||
                  "Use the navigation or search to find a chapter."}
              </p>
            </header>
            <div className="article-body" key={route.id}>
              <ContentBoundary key={route.id}>
                <Suspense
                  fallback={
                    <p className="chapter-loading" role="status">
                      Loading chapter…
                    </p>
                  }
                >
                  {route.id === "home" && <Home />}
                  {["api", "database", "milestone4"].includes(route.id) && (
                    <div className="quicklinks">
                      {route.id === "api" ? (
                        <>
                          <a href="#api/1-first-external-test-no-sign-in-needed">
                            Public curl checks
                          </a>
                          <a href="#api/4-read-only-examples-for-each-tutor-mx-role">
                            Examples by role
                          </a>
                          <a href="#api/5-request-and-response-examples-for-the-main-workflows">
                            Request & response examples
                          </a>
                          <a href="#api/catalogue">Browse 120 operations</a>
                          <a href={asset("api-reference.html")} target="_blank" rel="noreferrer">
                            Interactive API reference ↗
                          </a>
                        </>
                      ) : route.id === "database" ? (
                        <>
                          <a href="#database/2-entity-relationship-diagram-erd-how-the-records-connect">
                            ER diagram
                          </a>
                          <a href="#database/table-dictionary">
                            Browse 30 models
                          </a>
                          <a href="#database/model-profile">Profile</a>
                          <a href="#database/migrations">Migrations</a>
                        </>
                      ) : (
                        <>
                          <a href="#milestone4/criterion-map">
                            All 20 criteria
                          </a>
                          <a href="#milestone4/known-limitations">
                            Known limitations
                          </a>
                        </>
                      )}
                    </div>
                  )}
                  {route.id === "milestone4" && <RubricMap />}
                  {page?.key && (
                    <Markdown name={page.key} onReady={onLegacyReady} />
                  )}{" "}
                  {route.id === "api" && <ApiCatalogue />}
                  {route.id === "database" && <DatabaseCatalogue />}
                  {route.id === "deployment" && <Gallery />}
                  {route.id === "references" && <Resources />}
                  {route.id === "diagrams" && (
                    <>
                      <div className="note">
                        <strong>Read the scope label on each diagram.</strong>
                        <p>
                          The diagrams are based on the final Sprint 4 source.
                          Historical diagrams remain separately labelled where
                          applicable. Event order is not a performance
                          measurement. All diagrams are downloadable vector
                          SVGs.
                        </p>
                      </div>
                      <div className="model-jumps">
                        {diagramData.map((d) => (
                          <a key={d[0]} href={`#diagrams/${d[0]}`}>
                            {d[1]}
                          </a>
                        ))}
                      </div>
                      {diagramData.map(
                        ([id, title, scope, description, analysis]) => (
                          <Diagram
                            key={id}
                            {...{ id, title, scope, description, analysis }}
                          />
                        ),
                      )}
                    </>
                  )}
                  {route.id === "readme" && (
                    <details className="readme-original" id="full-readme">
                      <summary>Read the complete original README</summary>
                      <div className="note">
                        <strong>Original source wording retained</strong>
                        <p>
                          Use the correction table above where historical
                          statements differ from current code.
                        </p>
                      </div>
                      <Suspense fallback={<p>Loading original README…</p>}>
                        <OriginalReadme onReady={onLegacyReady} />
                      </Suspense>
                    </details>
                  )}
                  {page?.legacyId && (
                    <Suspense
                      fallback={
                        <p role="status">Loading retained project evidence…</p>
                      }
                    >
                      <LegacyContent
                        id={page.legacyId}
                        onReady={onLegacyReady}
                      />
                    </Suspense>
                  )}
                  {!page && (
                    <a className="button" href="#home">
                      Return to overview
                    </a>
                  )}
                </Suspense>
              </ContentBoundary>
            </div>
            <footer className="article-footer">
              <span>Tutor MX · COMS3011A · Team 6</span>
              <a href="#references">Sources & evidence</a>
              <a href="#references/ai-declaration">AI declaration</a>
              <button onClick={() => window.print()}>Print this chapter</button>
            </footer>
          </article>
          <aside className="on-this-page" aria-label="On this page">
            <strong>ON THIS PAGE</strong>
            {headings.map((h, i) => (
              <a href={`#${route.id}/${h.id}`} key={h.id + "-" + i}>
                {h.label}
              </a>
            ))}
            <div className="toc-end">
              <a href="#roadmap">Four-sprint roadmap</a>
              <a href="#milestone4">Final rubric map</a>
              <a
                href={asset(
                  "documents/tutor-mx-handbook-30-september-2026.pdf",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Updated handbook PDF ↗
              </a>
            </div>
          </aside>
        </main>
      </div>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-label="Search documentation"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="search-dialog-head">
          <label htmlFor="documentation-search">Search the documentation</label>
          <button
            aria-label="Close search"
            onClick={() => dialog.current?.close()}
          >
            Close
          </button>
        </div>
        <input
          id="documentation-search"
          ref={input}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try ‘curl’, ‘Master’ or ‘main branch’"
        />
        <div className="search-results" aria-live="polite">
          <p className="search-count">
            {searchLoading
              ? "Loading full-text search…"
              : `${results.length} matching chapters`}
          </p>
          {results.map(([id, p]) => (
            <a href={`#${id}`} key={id} onClick={() => dialog.current?.close()}>
              <span>{p.group}</span>
              <strong>{p.title}</strong>
              <small>{p.summary}</small>
            </a>
          ))}
          {!results.length && <p>No chapters match “{query}”.</p>}
        </div>
      </dialog>
    </div>
  );
}
