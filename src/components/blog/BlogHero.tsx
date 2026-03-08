import { getCategoryLabel } from "@/data/blogCategories";

interface BlogHeroProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogHero({
  title,
  author,
  date,
  readTime,
  category,
}: BlogHeroProps) {
  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <section className="bg-brand-dark">
      <div className="section-padding pb-10 md:pb-16">
        <div className="container-narrow mx-auto text-center">
          <span className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 md:mb-6">
            {getCategoryLabel(category)}
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight max-w-4xl mx-auto">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-white/60">
            <span>By {author}</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <time dateTime={date}>{formattedDate}</time>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
