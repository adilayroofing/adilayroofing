interface BlogPostContentProps {
  htmlContent: string;
}

export default function BlogPostContent({ htmlContent }: BlogPostContentProps) {
  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
