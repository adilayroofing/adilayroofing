export interface BlogCategory {
  slug: string;
  label: string;
}

export const blogCategories: BlogCategory[] = [
  { slug: "cost-guide", label: "Cost Guide" },
  { slug: "roof-replacement", label: "Roof Replacement" },
  { slug: "roof-repair", label: "Roof Repair" },
  { slug: "flat-roofing", label: "Flat Roofing" },
  { slug: "shingle-roofing", label: "Shingle Roofing" },
  { slug: "siding", label: "Siding" },
  { slug: "windows", label: "Windows" },
  { slug: "general-roofing", label: "General Roofing" },
  { slug: "home-improvement", label: "Home Improvement" },
  { slug: "seasonal-maintenance", label: "Seasonal Maintenance" },
  { slug: "local-seo", label: "Local Guide" },
  { slug: "insurance", label: "Insurance & Claims" },
  { slug: "comparison", label: "Comparison" },
];

export function getCategoryLabel(slug: string): string {
  return blogCategories.find((c) => c.slug === slug)?.label ?? slug;
}
