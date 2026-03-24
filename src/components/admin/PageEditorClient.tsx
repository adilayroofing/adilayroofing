"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import SEOPreview from "./SEOPreview";
import RichTextEditor from "./RichTextEditor";
import StructuredServiceEditor, { type ServiceContent } from "./StructuredServiceEditor";
import StructuredLocationEditor, { type LocationContent } from "./StructuredLocationEditor";
import { getServiceBySlug } from "@/data/services";
import { getLocationBySlug } from "@/data/locations";

interface PageData {
  id: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  custom_head_tags: string | null;
  status: string;
}

interface ContentBlock {
  id: string;
  block_type: string;
  content: Record<string, unknown>;
  sort_order: number;
}

export default function PageEditorClient({
  page,
  contentBlocks,
  userRole,
  userEmail,
}: {
  page: PageData | null;
  contentBlocks: ContentBlock[];
  userRole: string;
  userEmail: string;
}) {
  const router = useRouter();
  const isNew = !page;

  const [tab, setTab] = useState<"seo" | "content">("seo");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // SEO fields
  const [slug, setSlug] = useState(page?.slug || "");
  const [metaTitle, setMetaTitle] = useState(page?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(page?.meta_description || "");
  const [canonicalUrl, setCanonicalUrl] = useState(page?.canonical_url || "");
  const [ogTitle, setOgTitle] = useState(page?.og_title || "");
  const [ogDescription, setOgDescription] = useState(page?.og_description || "");
  const [ogImage, setOgImage] = useState(page?.og_image || "");
  const [customHeadTags, setCustomHeadTags] = useState(page?.custom_head_tags || "");
  const [status, setStatus] = useState(page?.status || "draft");

  // Detect page type from slug
  const isServicePage = slug.startsWith("/services/") && slug !== "/services";
  const isLocationPage = slug.startsWith("/service-areas/") && slug !== "/service-areas";

  // Find structured content block or rich_text block
  const structuredBlock = contentBlocks.find(
    (b) => b.block_type === "structured_service" || b.block_type === "structured_location"
  );
  const richTextBlock = contentBlocks.find((b) => b.block_type === "rich_text");

  // Content — rich text (for blog/static pages)
  const [editorContent, setEditorContent] = useState(
    richTextBlock?.content
      ? (richTextBlock.content as { html?: string }).html || ""
      : ""
  );

  // Content — structured service (pre-fill from CMS or hardcoded data)
  const [serviceContent, setServiceContent] = useState<ServiceContent>(() => {
    if (structuredBlock?.block_type === "structured_service") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        heroDescription: (c.heroDescription as string) || "",
        benefits: (c.benefits as string[]) || [],
        features: (c.features as string[]) || [],
        faq: (c.faq as { question: string; answer: string }[]) || [],
      };
    }
    // Pre-fill from hardcoded service data if no CMS block exists yet
    if (isServicePage) {
      const serviceSlug = slug.replace("/services/", "");
      const hardcoded = getServiceBySlug(serviceSlug);
      if (hardcoded) {
        return {
          heroDescription: hardcoded.heroDescription,
          benefits: [...hardcoded.benefits],
          features: [...hardcoded.features],
          faq: hardcoded.faq.map((f) => ({ ...f })),
        };
      }
    }
    return { heroDescription: "", benefits: [], features: [], faq: [] };
  });

  // Content — structured location (pre-fill from CMS or hardcoded data)
  const [locationContent, setLocationContent] = useState<LocationContent>(() => {
    if (structuredBlock?.block_type === "structured_location") {
      const c = structuredBlock.content as Record<string, unknown>;
      return {
        intro: (c.intro as string) || "",
        localContext: (c.localContext as string) || "",
        neighborhoods: (c.neighborhoods as string[]) || [],
        zipCodes: (c.zipCodes as string[]) || [],
        faq: (c.faq as { question: string; answer: string }[]) || [],
      };
    }
    // Pre-fill from hardcoded location data if no CMS block exists yet
    if (isLocationPage) {
      const locationSlug = slug.replace("/service-areas/", "");
      const hardcoded = getLocationBySlug(locationSlug);
      if (hardcoded) {
        return {
          intro: hardcoded.intro,
          localContext: hardcoded.localContext,
          neighborhoods: [...hardcoded.neighborhoods],
          zipCodes: [...hardcoded.zipCodes],
          faq: hardcoded.faq.map((f) => ({ ...f })),
        };
      }
    }
    return { intro: "", localContext: "", neighborhoods: [], zipCodes: [], faq: [] };
  });

  const canonicalValid =
    !canonicalUrl || canonicalUrl.startsWith("https://www.adilayroofing.com");

  async function handleSave(asPending: boolean) {
    setSaving(true);
    setMessage(null);

    const supabase = createClient();

    const pageData = {
      slug,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      canonical_url: canonicalUrl || null,
      og_title: ogTitle || null,
      og_description: ogDescription || null,
      og_image: ogImage || null,
      custom_head_tags: customHeadTags || null,
      status,
      updated_by: userEmail,
    };

    try {
      // Determine content to save based on page type
      const contentPayload = isServicePage
        ? { blockType: "structured_service" as const, data: serviceContent }
        : isLocationPage
          ? { blockType: "structured_location" as const, data: locationContent }
          : { blockType: "rich_text" as const, data: { html: editorContent } };

      if (asPending) {
        // Editor submits for review
        const { error } = await supabase.from("pending_changes").insert({
          table_name: "pages",
          record_id: page?.id || "00000000-0000-0000-0000-000000000000",
          change_type: isNew ? "create" : "update",
          old_value: page || null,
          new_value: { ...pageData, content_block_type: contentPayload.blockType, content_data: contentPayload.data },
          submitted_by: userEmail,
          status: "pending",
        });
        if (error) throw error;

        // Log activity
        await supabase.from("activity_log").insert({
          user_email: userEmail,
          action: `Submitted ${isNew ? "new page" : "edit"} for review: ${slug}`,
          details: { slug, change_type: isNew ? "create" : "update" },
        });

        setMessage({ type: "success", text: "Changes submitted for review!" });
      } else {
        // Admin saves directly
        if (isNew) {
          const { data: newPage, error } = await supabase
            .from("pages")
            .insert(pageData)
            .select()
            .single();
          if (error) throw error;

          // Save content block
          await supabase.from("content_blocks").insert({
            page_id: newPage.id,
            block_type: contentPayload.blockType,
            content: contentPayload.data,
            sort_order: 0,
          });

          await supabase.from("activity_log").insert({
            user_email: userEmail,
            action: `Created page: ${slug}`,
            details: { slug, page_id: newPage.id },
          });

          router.push(`/admin/pages/${newPage.id}`);
          router.refresh();
        } else {
          const { error } = await supabase
            .from("pages")
            .update(pageData)
            .eq("id", page.id);
          if (error) throw error;

          // Update or create content block
          const existingBlock = structuredBlock || richTextBlock;
          if (existingBlock) {
            await supabase
              .from("content_blocks")
              .update({ block_type: contentPayload.blockType, content: contentPayload.data })
              .eq("id", existingBlock.id);
          } else {
            await supabase.from("content_blocks").insert({
              page_id: page.id,
              block_type: contentPayload.blockType,
              content: contentPayload.data,
              sort_order: 0,
            });
          }

          await supabase.from("activity_log").insert({
            user_email: userEmail,
            action: `Updated page: ${slug}`,
            details: { slug, page_id: page.id },
          });

          setMessage({ type: "success", text: "Page saved!" });
          router.refresh();
        }
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? "New Page" : "Edit Page"}
          </h1>
          {!isNew && <p className="text-gray-400 text-sm mt-1">{page.slug}</p>}
        </div>
        <div className="flex gap-2">
          {userRole === "editor" ? (
            <button
              onClick={() => handleSave(true)}
              disabled={saving || !slug}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {saving ? "Submitting..." : "Submit for Review"}
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !slug}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {saving ? "Saving..." : "Save Directly"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("seo")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "seo"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          SEO Fields
        </button>
        <button
          onClick={() => setTab("content")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "content"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Content
        </button>
      </div>

      {/* SEO Tab */}
      {tab === "seo" && (
        <div className="space-y-6">
          {/* Slug */}
          <Field label="Page Slug" required>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="/services/roof-replacement"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Path like /services/roof-replacement or /blog/my-post
            </p>
          </Field>

          {/* Meta Title */}
          <Field label="Meta Title" count={metaTitle.length} warnAt={60}>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Page Title | Adilay Roofing"
              className="input-field"
            />
          </Field>

          {/* Meta Description */}
          <Field label="Meta Description" count={metaDescription.length} warnAt={160}>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="A compelling description of this page..."
              rows={3}
              className="input-field resize-y"
            />
          </Field>

          {/* Canonical URL */}
          <Field label="Canonical URL">
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://www.adilayroofing.com/services/roof-replacement"
              className={`input-field ${!canonicalValid ? "!border-red-500" : ""}`}
            />
            {!canonicalValid && (
              <p className="text-xs text-red-400 mt-1">
                Must start with https://www.adilayroofing.com
              </p>
            )}
          </Field>

          {/* OG fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="OG Title">
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Open Graph title"
                className="input-field"
              />
            </Field>
            <Field label="OG Image URL">
              <input
                type="url"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://..."
                className="input-field"
              />
            </Field>
          </div>

          <Field label="OG Description">
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Open Graph description"
              rows={2}
              className="input-field resize-y"
            />
          </Field>

          {/* Custom Head Tags */}
          <Field label="Custom Head Tags">
            <textarea
              value={customHeadTags}
              onChange={(e) => setCustomHeadTags(e.target.value)}
              placeholder='<script type="application/ld+json">...</script>'
              rows={5}
              className="input-field font-mono text-sm resize-y"
            />
            <p className="text-xs text-gray-500 mt-1">
              Raw HTML injected into the page {"<head>"} (schema markup, hreflang, etc.)
            </p>
          </Field>

          {/* Status */}
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          {/* Google Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Search Preview
            </label>
            <SEOPreview
              title={metaTitle}
              description={metaDescription}
              url={canonicalUrl || `https://www.adilayroofing.com${slug}`}
            />
          </div>
        </div>
      )}

      {/* Content Tab */}
      {tab === "content" && (
        <div>
          {isServicePage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the service page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredServiceEditor content={serviceContent} onChange={setServiceContent} />
            </>
          ) : isLocationPage ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Edit the location page content below. Each section maps to a styled section on the live site.
              </p>
              <StructuredLocationEditor content={locationContent} onChange={setLocationContent} />
            </>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Rich text content for this page. Supports headings, links, images, tables, and raw HTML.
              </p>
              <RichTextEditor content={editorContent} onChange={setEditorContent} />
            </>
          )}
        </div>
      )}

      {/* Global styles for input fields */}
      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 1rem;
          background: rgb(31 41 55);
          border: 1px solid rgb(75 85 99);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .input-field:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px rgb(220 38 38);
        }
        .input-field::placeholder {
          color: rgb(107 114 128);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  count,
  warnAt,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  count?: number;
  warnAt?: number;
}) {
  const overLimit = count !== undefined && warnAt !== undefined && count > warnAt;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {count !== undefined && warnAt !== undefined && (
          <span
            className={`text-xs ${
              overLimit ? "text-amber-400" : "text-gray-500"
            }`}
          >
            {count}/{warnAt}
            {overLimit && " (over recommended)"}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
