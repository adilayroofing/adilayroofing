/**
 * SafeHTML — renders bodySection HTML content with sanitization.
 *
 * Inline:  <a> <strong> <em> <b> <i> <u> <br> <span>
 * Block:   <p> <ul> <ol> <li> <h2> <h3> <h4> <h5> <h6>
 * Attrs:   href/target/rel on <a> only
 *
 * Block-level list and heading tags were previously stripped, which silently
 * collapsed every bullet list and sub-heading in services.ts /
 * serviceBodySections.ts / locations.ts into run-on prose — the "wall of
 * text" problem the May 26 audit surfaced.
 */

const ALLOWED_TAGS = new Set([
  "a",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "br",
  "p",
  "span",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel"]),
  // img src is restricted to site-internal /images/ paths in the attribute
  // filter below — external URLs are stripped.
  img: new Set(["src", "alt", "loading", "width", "height"]),
};

function sanitizeHtml(html: string): string {
  // If no HTML tags at all, return as-is (backward compat for plain text)
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return html;
  }

  // Remove script/style tags entirely
  let clean = html.replace(/<(script|style|iframe|object|embed|form|input|button)[^>]*>[\s\S]*?<\/\1>/gi, "");
  clean = clean.replace(/<(script|style|iframe|object|embed|form|input|button)[^>]*\/?>/gi, "");

  // Process tags: keep allowed, strip others (keep inner text)
  clean = clean.replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)?\/?>/gi, (match, tag, attrs) => {
    const tagLower = tag.toLowerCase();

    // Closing tag
    if (match.startsWith("</")) {
      return ALLOWED_TAGS.has(tagLower) ? `</${tagLower}>` : "";
    }

    if (!ALLOWED_TAGS.has(tagLower)) return "";

    // Self-closing tag
    if (tagLower === "br") return "<br />";

    // Filter attributes
    const allowedAttrSet = ALLOWED_ATTRS[tagLower];
    if (!allowedAttrSet || !attrs) return `<${tagLower}>`;

    const safeAttrs: string[] = [];
    const attrRegex = /([a-z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/gi;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";
      if (allowedAttrSet.has(attrName)) {
        // Block javascript: protocol in href
        if (attrName === "href" && /^\s*javascript:/i.test(attrValue)) continue;
        // img src must be a site-internal /images/ path
        if (tagLower === "img" && attrName === "src" && !/^\/images\//.test(attrValue)) continue;
        safeAttrs.push(`${attrName}="${attrValue}"`);
      }
    }

    // An <img> whose src was stripped renders nothing useful — drop it.
    if (tagLower === "img" && !safeAttrs.some((a) => a.startsWith('src="'))) return "";

    return safeAttrs.length > 0
      ? `<${tagLower} ${safeAttrs.join(" ")}>`
      : `<${tagLower}>`;
  });

  return clean;
}

interface SafeHTMLProps {
  html: string;
  className?: string;
  as?: "div" | "span" | "p";
}

export default function SafeHTML({ html, className, as: Tag = "div" }: SafeHTMLProps) {
  if (!html) return null;

  // If it's plain text with no HTML, render as text node
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return <Tag className={className}>{html}</Tag>;
  }

  const sanitized = sanitizeHtml(html);

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
