"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useState, useCallback, useEffect, useRef } from "react";

interface InlineRichTextFieldProps {
  value: string;
  onChange: (html: string) => void;
  rows?: number;
  placeholder?: string;
}

interface LinkFormData {
  url: string;
  newTab: boolean;
  rel: string;
}

export default function InlineRichTextField({
  value,
  onChange,
  rows = 3,
  placeholder = "",
}: InlineRichTextFieldProps) {
  const [linkPopup, setLinkPopup] = useState(false);
  const [linkForm, setLinkForm] = useState<LinkFormData>({
    url: "",
    newTab: true,
    rel: "",
  });
  const popupRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "cms-inline-link" },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If editor is empty, return empty string
      if (html === "<p></p>") {
        onChange("");
      } else {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: "inline-rich-editor-content",
        style: `min-height: ${rows * 1.5}em`,
        "data-placeholder": placeholder,
      },
    },
  });

  // Sync external value changes (e.g., when parent resets content)
  useEffect(() => {
    if (!editor) return;
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }
    const currentHtml = editor.getHTML();
    if (currentHtml === "<p></p>" && !value) return;
    if (value !== currentHtml) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Close popup on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setLinkPopup(false);
      }
    }
    if (linkPopup) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [linkPopup]);

  // ── Link handlers ──────────────────────────────────────────────────

  const openLinkPopup = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      const attrs = editor.getAttributes("link");
      setLinkForm({
        url: attrs.href || "",
        newTab: attrs.target === "_blank",
        rel: attrs.rel || "",
      });
    } else {
      setLinkForm({ url: "", newTab: true, rel: "" });
    }
    setLinkPopup(true);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor || !linkForm.url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: linkForm.url,
        target: linkForm.newTab ? "_blank" : null,
        rel: linkForm.rel || null,
      })
      .run();

    setLinkPopup(false);
  }, [editor, linkForm]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkPopup(false);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="inline-rich-field-wrapper group/irt">
      {/* ── Mini Toolbar ─────────────────────────────────────────── */}
      <div className="inline-rich-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`irt-btn ${editor.isActive("bold") ? "irt-btn-active" : ""}`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`irt-btn ${editor.isActive("italic") ? "irt-btn-active" : ""}`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`irt-btn ${editor.isActive("underline") ? "irt-btn-active" : ""}`}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </button>

        <span className="irt-separator" />

        <button
          type="button"
          onClick={openLinkPopup}
          className={`irt-btn ${editor.isActive("link") ? "irt-btn-active" : ""}`}
          title="Insert/Edit Link (Ctrl+K)"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span className="ml-1 text-xs">Link</span>
        </button>

        {editor.isActive("link") && (
          <button
            type="button"
            onClick={removeLink}
            className="irt-btn text-red-400 hover:text-red-300"
            title="Remove Link"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Editor ────────────────────────────────────────────────── */}
      <EditorContent editor={editor} />

      {/* ── Link Popup ────────────────────────────────────────────── */}
      {linkPopup && (
        <div ref={popupRef} className="irt-link-popup">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">URL</label>
              <input
                type="url"
                value={linkForm.url}
                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                placeholder="https://www.adilayroofing.com/services/..."
                className="w-full px-3 py-1.5 text-sm bg-gray-800 border border-gray-600 rounded text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyLink();
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkForm.newTab}
                  onChange={(e) => setLinkForm({ ...linkForm, newTab: e.target.checked })}
                  className="rounded border-gray-600 bg-gray-800 text-red-500 focus:ring-red-500"
                />
                Open in new tab
              </label>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Rel attribute</label>
              <select
                value={linkForm.rel}
                onChange={(e) => setLinkForm({ ...linkForm, rel: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-gray-800 border border-gray-600 rounded text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">dofollow (default)</option>
                <option value="nofollow">nofollow</option>
                <option value="sponsored">sponsored</option>
                <option value="ugc">ugc</option>
                <option value="nofollow noopener noreferrer">nofollow noopener noreferrer</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={applyLink}
                disabled={!linkForm.url}
                className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-40 transition-colors"
              >
                Apply Link
              </button>
              {editor.isActive("link") && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 transition-colors"
                >
                  Remove
                </button>
              )}
              <button
                type="button"
                onClick={() => setLinkPopup(false)}
                className="px-3 py-1.5 text-xs font-medium text-gray-400 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
