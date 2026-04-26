// Cloudinary URL helper. Maps a local-style asset path (e.g. "/images/foo.jpg")
// to a Cloudinary delivery URL with f_auto,q_auto so size/format is optimized
// per request.
//
// Folder layout on Cloudinary mirrors /public so that the existing 124+ paths
// in the codebase keep working unchanged: /images/foo.jpg →
// https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/<folder>/images/foo.jpg

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "adilayroofing";

const isAbsolute = (s: string) => /^https?:\/\//i.test(s) || s.startsWith("data:");

export function cldUrl(
  src: string,
  opts: { width?: number; quality?: number | "auto" } = {}
): string {
  if (!src) return src;
  if (isAbsolute(src)) return src;
  if (!CLOUD_NAME) return src; // graceful fallback during local dev w/o creds

  const path = src.startsWith("/") ? src.slice(1) : src;
  const transforms: string[] = ["f_auto", `q_${opts.quality ?? "auto"}`];
  if (opts.width) transforms.push(`w_${opts.width}`, "c_limit");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${FOLDER}/${path}`;
}

// next/image custom loader. Configured via next.config.ts → images.loaderFile.
// Receives { src, width, quality } and must return a single URL string.
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return cldUrl(src, { width, quality: quality ?? "auto" });
}
