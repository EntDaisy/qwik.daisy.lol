import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <title>{head.title}</title>

      {head.meta.map((m) => <meta key={m.key} {...m} />)}
      {head.links.map((l) => <link key={l.key} {...l} />)}
      {head.styles.map((s) => (
        // rome-ignore lint/security/noDangerouslySetInnerHtml:
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
