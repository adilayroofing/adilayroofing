interface ContentBlock {
  id: string;
  block_type: string;
  content: Record<string, unknown>;
  sort_order: number;
}

export default function ContentBlockRenderer({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="cms-content">
      {blocks
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((block) => (
          <ContentBlock key={block.id} block={block} />
        ))}
    </div>
  );
}

function ContentBlock({ block }: { block: ContentBlock }) {
  switch (block.block_type) {
    case "rich_text": {
      const html = (block.content as { html?: string }).html || "";
      return (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    case "heading": {
      const { text, level } = block.content as { text: string; level: number };
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return <Tag className="font-bold text-gray-900">{text}</Tag>;
    }
    case "image": {
      const { src, alt, caption } = block.content as {
        src: string;
        alt: string;
        caption?: string;
      };
      return (
        <figure className="my-6">
          <img src={src} alt={alt} className="rounded-lg w-full" />
          {caption && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "cta": {
      const { text, url, variant } = block.content as {
        text: string;
        url: string;
        variant?: string;
      };
      return (
        <div className="my-8 text-center">
          <a
            href={url}
            className={`inline-block px-8 py-3 font-semibold rounded-lg transition-colors ${
              variant === "secondary"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {text}
          </a>
        </div>
      );
    }
    case "faq": {
      const { items } = block.content as {
        items: { question: string; answer: string }[];
      };
      return (
        <div className="my-8 space-y-4">
          {items?.map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg">
              <summary className="px-4 py-3 font-medium cursor-pointer hover:bg-gray-50">
                {item.question}
              </summary>
              <div className="px-4 pb-3 text-gray-600">{item.answer}</div>
            </details>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}
