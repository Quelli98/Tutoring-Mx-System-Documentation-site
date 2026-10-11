import { lazy, useEffect } from "react";

type Document = { html: string };
const loaders = import.meta.glob<Document>("./data/chapters/*.json", {
  import: "default",
});
const pages = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => {
    const name = path
      .split("/")
      .pop()!
      .replace(/\.json$/, "");
    return [
      name,
      lazy(async () => {
        const document = await load();
        return {
          default: function Chapter({ onReady }: { onReady: () => void }) {
            useEffect(onReady, [onReady]);
            return (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: document.html }}
              />
            );
          },
        };
      }),
    ];
  }),
);

export default function Markdown({
  name,
  onReady,
}: {
  name: string;
  onReady: () => void;
}) {
  const Page = pages[name];
  if (!Page)
    return (
      <p role="alert">
        This chapter is unavailable. Choose another page from the navigation.
      </p>
    );
  return <Page onReady={onReady} />;
}
