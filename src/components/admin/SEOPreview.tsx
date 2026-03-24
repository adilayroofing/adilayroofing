"use client";

export default function SEOPreview({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const displayTitle = title || "Page Title";
  const displayDesc = description || "Page description will appear here...";
  const displayUrl = url || "https://www.adilayroofing.com";

  return (
    <div className="bg-white rounded-lg p-4 max-w-xl">
      <p className="text-sm text-gray-500 mb-1 truncate">{displayUrl}</p>
      <h3 className="text-lg text-blue-700 hover:underline cursor-pointer leading-snug truncate">
        {displayTitle.length > 60 ? displayTitle.slice(0, 60) + "..." : displayTitle}
      </h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {displayDesc.length > 160 ? displayDesc.slice(0, 160) + "..." : displayDesc}
      </p>
    </div>
  );
}
