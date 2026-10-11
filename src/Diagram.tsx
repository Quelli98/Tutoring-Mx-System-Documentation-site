import { asset, Badge } from "./ui";
export default function Diagram({
  id,
  title,
  scope,
  description,
  analysis,
}: {
  id: string;
  title: string;
  scope: string;
  description: string;
  analysis: string;
}) {
  return (
    <section className="diagram-section" id={id}>
      <div className="section-top">
        <h2>{title}</h2>
        <Badge tone={scope.includes("target") ? "target" : "neutral"}>
          {scope}
        </Badge>
      </div>
      <p>
        <strong>Diagram interpretation.</strong> {description}
      </p>
      <a
        className="diagram-image"
        href={asset(`diagrams/${id}.svg`)}
        target="_blank"
        rel="noreferrer"
      >
        <img
          loading="lazy"
          src={asset(`diagrams/${id}.svg`)}
          alt={`${title}. ${description}`}
        />
      </a>
      <p>
        <strong>Engineering significance and evidence boundary.</strong>{" "}
        {analysis}
      </p>
      <div className="diagram-actions">
        <a href={asset(`diagrams/${id}.svg`)} target="_blank" rel="noreferrer">
          Open full size ↗
        </a>
        <a href={asset(`diagrams/${id}.svg`)} download>
          Download SVG
        </a>
      </div>
    </section>
  );
}
