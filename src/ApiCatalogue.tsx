import { useState } from "react";
import endpoints from "./data/endpoints.json";
import { asset, Badge } from "./ui";
export default function ApiCatalogue() {
  const [q, setQ] = useState("");
  const [method, setMethod] = useState("ALL");
  const [role, setRole] = useState("ALL");
  const shown = endpoints.filter(
    (e) =>
      (method === "ALL" || e.method === method) &&
      (role === "ALL" || e.access === role) &&
      `${e.path} ${e.services.join(" ")} ${e.access}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <section id="catalogue">
      <div className="section-top">
        <h2>Complete endpoint catalogue</h2>
        <Badge>{endpoints.length} source-registered operations</Badge>
      </div>
      <p>
        Access, success codes and input observations are generated from route
        registrations. Field observations are not full required-body schemas.
        Expand a route for handler and validator references.
      </p>
      <div className="filter-bar">
        <label>
          Find an endpoint
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. dashboard, organiser, timesheet"
          />
        </label>
        <label>
          Method
          <select
            aria-label="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {["ALL", "GET", "POST", "PUT", "PATCH", "DELETE"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Access
          <select
            aria-label="Access"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {[
              "ALL",
              ...Array.from(new Set(endpoints.map((x) => x.access))),
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        Showing {shown.length} of {endpoints.length} operations
      </p>
      <div
        className="table-wrap"
        role="region"
        aria-label="API catalogue"
        tabIndex={0}
      >
        <table className="endpoint-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path and details</th>
              <th>Access</th>
              <th>Success</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((e) => (
              <tr key={e.id}>
                <td>
                  <span className={`method ${e.method.toLowerCase()}`}>
                    {e.method}
                  </span>
                </td>
                <td>
                  <details id={e.id}>
                    <summary>
                      <code>{e.path}</code>
                    </summary>
                    <div className="endpoint-detail">
                      <p>
                        <strong>Handler:</strong>{" "}
                        {e.services.join(", ") ||
                          "Inline route / current profile helper"}
                      </p>
                      {e.query.length > 0 && (
                        <p>
                          <strong>Direct query fields:</strong>{" "}
                          {e.query.join(", ")}
                        </p>
                      )}
                      {e.body.length > 0 && (
                        <p>
                          <strong>Direct body observations:</strong>{" "}
                          {e.body.join(", ")}
                        </p>
                      )}
                      {e.validators.length > 0 && (
                        <p>
                          <strong>Validators:</strong> {e.validators.join(", ")}
                        </p>
                      )}
                      {e.idempotency && (
                        <p>
                          Inspect the operation’s idempotency/write-receipt
                          contract.
                        </p>
                      )}
                      <p>
                        {e.access === "MASTER ORGANISER"
                          ? "Requires resolved Organiser access and the additional Auth0 Master privilege."
                          : e.access === "IDENTITY"
                            ? "Valid Auth0 identity; a Profile may not exist yet."
                            : e.access === "PUBLIC"
                              ? "No bearer token required; validation and configured limits still apply."
                              : "Role, ownership and workflow constraints still apply."}
                      </p>
                      <a
                        href={asset("downloads/api-routes.ts.txt")}
                        target="_blank"
                        rel="noreferrer"
                      >
                        src/app.ts · line {e.line}
                      </a>
                    </div>
                  </details>
                </td>
                <td>
                  <span className="access-label">{e.access}</span>
                </td>
                <td>
                  <code>{e.success.join(" / ")}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!shown.length && (
        <p className="empty-state">
          No operations match. Clear the query or choose ALL.
        </p>
      )}
    </section>
  );
}
