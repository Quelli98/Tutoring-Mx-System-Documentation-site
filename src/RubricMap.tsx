import { useState } from "react";
import rubric from "./data/rubric.json";
import { asset } from "./ui";

const groups = [
  { id: "Database", label: "Database", weight: 10 },
  { id: "API", label: "API", weight: 25 },
  { id: "App", label: "Application", weight: 42 },
  { id: "Misc", label: "Engineering practice", weight: 23 },
];

export default function RubricMap() {
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");
  const matches = (r: (typeof rubric)[number]) =>
    (category === "ALL" || r.category === category) &&
    `${r.criterion} ${r.question} ${r.answer} ${r.evidence}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  const count = rubric.filter(matches).length;
  return (
    <section id="criterion-map" className="assessment">
      <div className="assessment-intro">
        <div>
          <span className="home-section-kicker">
            MILESTONE 4 · EVIDENCE INDEX
          </span>
          <h2>Every criterion. One clear trail.</h2>
          <p>
            20 written responses covering the full 100% rubric weight. Inspect
            the implementation, dated evidence and limits for each criterion.
          </p>
        </div>
        <a
          href={asset("documents/coms3011a-2026-official-brief.pdf#page=11")}
          target="_blank"
          rel="noreferrer"
        >
          Official rubric ↗
        </a>
      </div>
      <div className="rubric-summary" aria-label="Rubric category weights">
        {groups.map((g) => (
          <div key={g.id}>
            <strong>
              {g.weight}
              <span>%</span>
            </strong>
            <span>{g.label}</span>
          </div>
        ))}
      </div>
      <div className="assessment-controls">
        <div className="category-filters" aria-label="Filter rubric category">
          {[{ id: "ALL", label: "All criteria" }, ...groups].map((g) => (
            <button
              type="button"
              key={g.id}
              aria-pressed={category === g.id}
              onClick={() => setCategory(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <label className="wide-search">
          Find a criterion
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try accessibility, data or testing"
          />
        </label>
        <p className="result-count" aria-live="polite">
          Showing {count} of 20 criteria. These weights are not awarded marks.
        </p>
      </div>
      {groups.map((g) => (
        <section
          className="rubric-group"
          key={g.id}
          id={`rubric-${g.id.toLowerCase()}`}
          hidden={!rubric.some((r) => r.category === g.id && matches(r))}
        >
          <h2>
            {g.label} <span>{g.weight}% of the rubric</span>
          </h2>
          {rubric
            .filter((r) => r.category === g.id)
            .map((r) => (
              <article
                id={`criterion-${r.id}`}
                key={r.id}
                className="criterion-card"
                hidden={!matches(r)}
              >
                <div className="criterion-title">
                  <div>
                    <span className="criterion-index">
                      {String(rubric.indexOf(r) + 1).padStart(2, "0")} / 20
                    </span>
                    <h3>{r.criterion}</h3>
                  </div>
                  <span className="criterion-weight">{r.weight}%</span>
                </div>
                <p className="criterion-question">{r.question}</p>
                <p>{r.answer}</p>
                <div className="criterion-evidence">
                  <strong>Evidence</strong>
                  <p>{r.evidence}</p>
                  <div className="evidence-actions">
                    {r.evidenceLinks.map((link) => (
                      <a key={link.target} href={`#${link.target}`}>
                        {link.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </div>
                {r.limitation && (
                  <p className="criterion-limit">
                    <strong>Evidence boundary.</strong> {r.limitation}
                  </p>
                )}
              </article>
            ))}
        </section>
      ))}
      {!count && (
        <p className="empty-state">
          No criteria match.{" "}
          <button
            onClick={() => {
              setQuery("");
              setCategory("ALL");
            }}
          >
            Clear filters
          </button>
        </p>
      )}
      <p className="caption">
        Source: official COMS3011A brief, section 3.4, pages 11–12. See{" "}
        <a href="#milestone4/known-limitations">known limitations</a> and the{" "}
        <a href="#requirements">original scope mapping</a>.
      </p>
    </section>
  );
}
