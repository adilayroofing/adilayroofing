"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import { useState, useCallback, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

interface LinkFormData {
  url: string;
  newTab: boolean;
  rel: string;
}

interface ImageFormData {
  src: string;
  alt: string;
}

// ─── Main Editor Component ───────────────────────────────────────────────────

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [showSource, setShowSource] = useState(false);
  const [sourceHtml, setSourceHtml] = useState(content);
  const [linkPopup, setLinkPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [linkForm, setLinkForm] = useState<LinkFormData>({ url: "", newTab: false, rel: "" });
  const [imageForm, setImageForm] = useState<ImageFormData>({ src: "", alt: "" });
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [linkBubble, setLinkBubble] = useState<{ x: number; y: number; href: string } | null>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link" },
      }),
      Image.configure({ inline: false, HTMLAttributes: { class: "editor-image" } }),
      Table.configure({ resizable: true, HTMLAttributes: { class: "editor-table" } }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setSourceHtml(html);
    },
    editorProps: {
      attributes: {
        class: "rich-editor-content",
      },
    },
  });

  // ─── Link Popup Handlers ─────────────────────────────────────────────────

  const openLinkPopup = useCallback(() => {
    if (!editor) return;

    // If cursor is on an existing link, pre-fill the form
    if (editor.isActive("link")) {
      const attrs = editor.getAttributes("link");
      setLinkForm({
        url: attrs.href || "",
        newTab: attrs.target === "_blank",
        rel: attrs.rel || "",
      });
    } else {
      setLinkForm({ url: "", newTab: false, rel: "" });
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
    editor.chain().focus().unsetLink().run();
    setLinkPopup(false);
  }, [editor]);

  // ─── Image Popup Handlers ────────────────────────────────────────────────

  const openImagePopup = useCallback(() => {
    setImageForm({ src: "", alt: "" });
    setImagePopup(true);
  }, []);

  const insertImage = useCallback(() => {
    if (!editor || !imageForm.src) return;
    editor.chain().focus().setImage({ src: imageForm.src, alt: imageForm.alt || "" }).run();
    setImagePopup(false);
  }, [editor, imageForm]);

  // ─── Source View ─────────────────────────────────────────────────────────

  const handleSourceChange = (html: string) => {
    setSourceHtml(html);
    if (editor) {
      editor.commands.setContent(html);
    }
    onChange(html);
  };

  const toggleSource = () => {
    if (showSource && editor) {
      // Switching back to visual — sync source to editor
      editor.commands.setContent(sourceHtml);
    } else if (!showSource && editor) {
      // Switching to source — sync editor to source
      setSourceHtml(editor.getHTML());
    }
    setShowSource(!showSource);
  };

  // ─── Track cursor on links for bubble ─────────────────────────────────

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      if (editor.isActive("link") && editorWrapperRef.current) {
        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from);
        const wrapperRect = editorWrapperRef.current.getBoundingClientRect();
        setLinkBubble({
          x: coords.left - wrapperRect.left,
          y: coords.bottom - wrapperRect.top + 6,
          href: editor.getAttributes("link").href || "",
        });
      } else {
        setLinkBubble(null);
      }
    };

    editor.on("selectionUpdate", handleTransaction);
    editor.on("transaction", handleTransaction);
    return () => {
      editor.off("selectionUpdate", handleTransaction);
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  // ─── Keyboard shortcut for link (Ctrl+K) ────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openLinkPopup();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openLinkPopup]);

  if (!editor) return null;

  return (
    <div className="border border-gray-600 rounded-xl overflow-hidden relative">
      {/* ─── Sticky Toolbar ─────────────────────────────────────────────── */}
      <div
        ref={toolbarRef}
        className="bg-gray-750 sticky top-0 z-20 border-b border-gray-600"
        style={{ background: "rgb(42, 46, 56)" }}
      >
        <div className="px-3 py-2 flex flex-wrap items-center gap-1">
          {/* Text Style */}
          <ToolbarBtn
            icon={<IconParagraph />}
            title="Normal text"
            active={!editor.isActive("heading")}
            onClick={() => editor.chain().focus().setParagraph().run()}
          />
          {([1, 2, 3, 4] as const).map((level) => (
            <ToolbarBtn
              key={level}
              icon={<span className="text-[11px] font-bold">H{level}</span>}
              title={`Heading ${level}`}
              active={editor.isActive("heading", { level })}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            />
          ))}

          <ToolbarDivider />

          {/* Formatting */}
          <ToolbarBtn
            icon={<IconBold />}
            title="Bold (Ctrl+B)"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarBtn
            icon={<IconItalic />}
            title="Italic (Ctrl+I)"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarBtn
            icon={<IconUnderline />}
            title="Underline (Ctrl+U)"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <ToolbarBtn
            icon={<IconStrikethrough />}
            title="Strikethrough"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarBtn
            icon={<IconBulletList />}
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarBtn
            icon={<IconOrderedList />}
            title="Numbered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolbarBtn
            icon={<IconBlockquote />}
            title="Blockquote"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />

          <ToolbarDivider />

          {/* Insert */}
          <ToolbarBtn
            icon={<IconLink />}
            title="Insert link (Ctrl+K)"
            active={editor.isActive("link")}
            onClick={openLinkPopup}
          />
          <ToolbarBtn
            icon={<IconImage />}
            title="Insert image"
            active={false}
            onClick={openImagePopup}
          />
          <ToolbarBtn
            icon={<IconTable />}
            title="Insert table"
            active={false}
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          />
          <ToolbarBtn
            icon={<IconHorizontalRule />}
            title="Horizontal line"
            active={false}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />

          <ToolbarDivider />

          {/* History */}
          <ToolbarBtn
            icon={<IconUndo />}
            title="Undo (Ctrl+Z)"
            active={false}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          />
          <ToolbarBtn
            icon={<IconRedo />}
            title="Redo (Ctrl+Shift+Z)"
            active={false}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          />

          <ToolbarDivider />

          {/* Source */}
          <ToolbarBtn
            icon={<IconCode />}
            title="View HTML source"
            active={showSource}
            onClick={toggleSource}
          />
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="px-3 pb-1.5 flex gap-3 text-[10px] text-gray-500">
          <span>⌘B Bold</span>
          <span>⌘I Italic</span>
          <span>⌘K Link</span>
          <span>⌘Z Undo</span>
        </div>
      </div>

      {/* ─── Editor / Source ─────────────────────────────────────────────── */}
      {showSource ? (
        <textarea
          value={sourceHtml}
          onChange={(e) => handleSourceChange(e.target.value)}
          className="w-full min-h-[500px] bg-gray-900 text-green-400 font-mono text-sm p-5 focus:outline-none resize-y"
          spellCheck={false}
        />
      ) : (
        <div ref={editorWrapperRef} className="relative bg-gray-850 min-h-[500px]" style={{ background: "rgb(30, 33, 41)" }}>
          <EditorContent editor={editor} />

          {/* Floating link bubble */}
          {linkBubble && (
            <div
              className="absolute z-30"
              style={{ left: linkBubble.x, top: linkBubble.y }}
            >
              <LinkBubble
                href={linkBubble.href}
                onEdit={openLinkPopup}
                onUnlink={() => { removeLink(); setLinkBubble(null); }}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── Link Popup Modal ────────────────────────────────────────────── */}
      {linkPopup && (
        <PopupOverlay onClose={() => setLinkPopup(false)}>
          <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-5 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <IconLink />
                {editor.isActive("link") ? "Edit Link" : "Insert Link"}
              </h3>
              <button
                onClick={() => setLinkPopup(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <IconClose />
              </button>
            </div>

            <div className="space-y-4">
              {/* URL */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">URL</label>
                <input
                  type="url"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                  placeholder="https://www.adilayroofing.com/services/..."
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && applyLink()}
                />
              </div>

              {/* Open in new tab */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Open in new tab</label>
                <ToggleSwitch
                  checked={linkForm.newTab}
                  onChange={(v) => setLinkForm({ ...linkForm, newTab: v })}
                />
              </div>

              {/* Rel attribute */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Link type</label>
                <div className="flex gap-2">
                  <RelButton
                    label="Dofollow"
                    active={linkForm.rel === "" || linkForm.rel === "dofollow"}
                    onClick={() => setLinkForm({ ...linkForm, rel: "" })}
                  />
                  <RelButton
                    label="Nofollow"
                    active={linkForm.rel === "nofollow"}
                    onClick={() => setLinkForm({ ...linkForm, rel: "nofollow" })}
                  />
                  <RelButton
                    label="Sponsored"
                    active={linkForm.rel === "sponsored"}
                    onClick={() => setLinkForm({ ...linkForm, rel: "sponsored" })}
                  />
                  <RelButton
                    label="UGC"
                    active={linkForm.rel === "ugc"}
                    onClick={() => setLinkForm({ ...linkForm, rel: "ugc" })}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={applyLink}
                  disabled={!linkForm.url}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {editor.isActive("link") ? "Update Link" : "Insert Link"}
                </button>
                {editor.isActive("link") && (
                  <button
                    onClick={removeLink}
                    className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-red-400 text-sm font-medium rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={() => setLinkPopup(false)}
                  className="px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </PopupOverlay>
      )}

      {/* ─── Image Popup Modal ───────────────────────────────────────────── */}
      {imagePopup && (
        <PopupOverlay onClose={() => setImagePopup(false)}>
          <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-5 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <IconImage />
                Insert Image
              </h3>
              <button
                onClick={() => setImagePopup(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <IconClose />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={imageForm.src}
                  onChange={(e) => setImageForm({ ...imageForm, src: e.target.value })}
                  placeholder="https://www.adilayroofing.com/images/..."
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Alt text <span className="text-gray-500">(important for SEO)</span>
                </label>
                <input
                  type="text"
                  value={imageForm.alt}
                  onChange={(e) => setImageForm({ ...imageForm, alt: e.target.value })}
                  placeholder="Describe the image for accessibility & SEO"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500"
                  onKeyDown={(e) => e.key === "Enter" && insertImage()}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={insertImage}
                  disabled={!imageForm.src}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Insert Image
                </button>
                <button
                  onClick={() => setImagePopup(false)}
                  className="px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </PopupOverlay>
      )}

      {/* ─── Editor Styles ───────────────────────────────────────────────── */}
      <style jsx global>{`
        .rich-editor-content {
          min-height: 500px;
          padding: 1.5rem;
        }
        .rich-editor-content .tiptap {
          outline: none;
          min-height: 460px;
        }

        /* Typography */
        .rich-editor-content h1 { font-size: 2rem; font-weight: 700; color: #fff; margin: 1.5rem 0 0.75rem; line-height: 1.2; }
        .rich-editor-content h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 1.25rem 0 0.5rem; line-height: 1.3; }
        .rich-editor-content h3 { font-size: 1.25rem; font-weight: 600; color: #e5e7eb; margin: 1rem 0 0.5rem; line-height: 1.4; }
        .rich-editor-content h4 { font-size: 1.1rem; font-weight: 600; color: #d1d5db; margin: 0.75rem 0 0.5rem; }
        .rich-editor-content h5 { font-size: 1rem; font-weight: 600; color: #d1d5db; margin: 0.75rem 0 0.5rem; }
        .rich-editor-content h6 { font-size: 0.9rem; font-weight: 600; color: #9ca3af; margin: 0.75rem 0 0.5rem; }
        .rich-editor-content p { color: #d1d5db; margin: 0.5rem 0; line-height: 1.7; font-size: 0.95rem; }
        .rich-editor-content strong { color: #fff; font-weight: 700; }
        .rich-editor-content em { font-style: italic; }
        .rich-editor-content s { text-decoration: line-through; color: #9ca3af; }

        /* Links */
        .rich-editor-content .editor-link,
        .rich-editor-content a {
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
        }
        .rich-editor-content a:hover { color: #93bbfd; }

        /* Lists */
        .rich-editor-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; color: #d1d5db; }
        .rich-editor-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; color: #d1d5db; }
        .rich-editor-content li { margin: 0.25rem 0; line-height: 1.6; }
        .rich-editor-content li p { margin: 0; display: inline; }

        /* Blockquote */
        .rich-editor-content blockquote {
          border-left: 4px solid #e43a27;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          background: rgba(228, 58, 39, 0.05);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .rich-editor-content blockquote p { color: #9ca3af; font-style: italic; }

        /* Images */
        .rich-editor-content .editor-image,
        .rich-editor-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
          border: 2px solid transparent;
          transition: border-color 0.15s;
        }
        .rich-editor-content img:hover,
        .rich-editor-content img.ProseMirror-selectednode {
          border-color: #e43a27;
        }

        /* Tables */
        .rich-editor-content .editor-table,
        .rich-editor-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .rich-editor-content th {
          background: rgba(75, 85, 99, 0.3);
          color: #fff;
          font-weight: 600;
          text-align: left;
          padding: 0.625rem 0.75rem;
          border: 1px solid #4b5563;
          font-size: 0.875rem;
        }
        .rich-editor-content td {
          color: #d1d5db;
          padding: 0.5rem 0.75rem;
          border: 1px solid #374151;
          font-size: 0.875rem;
        }

        /* Horizontal rule */
        .rich-editor-content hr {
          border: none;
          border-top: 1px solid #4b5563;
          margin: 1.5rem 0;
        }

        /* Code */
        .rich-editor-content code {
          background: rgba(75, 85, 99, 0.3);
          color: #fbbf24;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.85em;
        }
        .rich-editor-content pre {
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid #374151;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
        }
        .rich-editor-content pre code { background: none; padding: 0; color: #d1d5db; }

        /* Selection */
        .rich-editor-content .tiptap ::selection {
          background: rgba(228, 58, 39, 0.3);
        }

        /* Placeholder-like first p */
        .rich-editor-content .tiptap > p:first-child:empty::before {
          content: "Start writing your content here...";
          color: #6b7280;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Link Bubble (appears when clicking an existing link) ────────────────────

function LinkBubble({
  href,
  onEdit,
  onUnlink,
}: {
  href: string;
  onEdit: () => void;
  onUnlink: () => void;
}) {
  const displayUrl = href.length > 45 ? href.slice(0, 42) + "..." : href;

  return (
    <div className="flex items-center gap-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl px-2 py-1.5 text-sm">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 text-xs truncate max-w-[200px] px-1"
        title={href}
      >
        {displayUrl}
      </a>
      <div className="w-px h-4 bg-gray-600 mx-0.5" />
      <button
        onClick={onEdit}
        className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        title="Edit link"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button
        onClick={onUnlink}
        className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
        title="Remove link"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      </button>
    </div>
  );
}

// ─── Popup Overlay ───────────────────────────────────────────────────────────

function PopupOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 mx-4">{children}</div>
    </div>
  );
}

// ─── Toggle Switch ───────────────────────────────────────────────────────────

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-red-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Rel Button ──────────────────────────────────────────────────────────────

function RelButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
        active ? "bg-red-600/20 text-red-400 ring-1 ring-red-500/40" : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Toolbar Button ──────────────────────────────────────────────────────────

function ToolbarBtn({
  icon,
  title,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        disabled
          ? "text-gray-600 cursor-not-allowed"
          : active
          ? "bg-red-600 text-white shadow-sm"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-600/50 mx-1 self-center" />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SVG ICONS (kept small and clean)
// ═══════════════════════════════════════════════════════════════════════════════

const ic = "w-4 h-4"; // common icon class

function IconParagraph() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10V7m4 0V7a4 4 0 00-4-4H9a4 4 0 000 8h2" />
    </svg>
  );
}

function IconBold() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h7a4 4 0 012.702 6.952A4.5 4.5 0 0114.5 20H6V4zm3 7h4a1.5 1.5 0 000-3H9v3zm0 3v3h5.5a1.5 1.5 0 000-3H9z" />
    </svg>
  );
}

function IconItalic() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 4h8v2h-2.927l-4.146 12H14v2H6v-2h2.927l4.146-12H10V4z" />
    </svg>
  );
}

function IconUnderline() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5v6a5 5 0 0010 0V5h2v6a7 7 0 01-14 0V5h2zM5 19h14v2H5v-2z" />
    </svg>
  );
}

function IconStrikethrough() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.864-1.144v-2.57c1.522.832 3.08 1.248 4.674 1.248.922 0 1.636-.177 2.143-.53.506-.354.76-.837.76-1.45 0-.372-.089-.695-.267-.966H3v-2h18v2h-3.846zM7.556 11c-.14-.247-.209-.531-.209-.86 0-.853.392-1.646 1.175-2.378C9.306 7.03 10.548 6.5 12.25 6.5c1.522 0 2.995.345 4.42 1.035l-.97 2.18c-1.192-.592-2.362-.888-3.51-.888-.76 0-1.344.142-1.75.427-.406.284-.61.635-.61 1.053 0 .232.06.44.178.627l.007.01H7.556z" />
    </svg>
  );
}

function IconBulletList() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12" />
    </svg>
  );
}

function IconOrderedList() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 4h13v2H8V4zM5 3v3H4V4H3V3h2zM3 14v-1h3v4H3v-1h2v-.5H4v-1h1V14H3zM5 8.5H3v-1h2V7H3V6h3v3H4v.5h2v1H3v-1h2zM8 11h13v2H8v-2zM8 18h13v2H8v-2z" />
    </svg>
  );
}

function IconBlockquote() {
  return (
    <svg className={ic} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function IconTable() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
    </svg>
  );
}

function IconHorizontalRule() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18" />
    </svg>
  );
}

function IconUndo() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" />
    </svg>
  );
}

function IconRedo() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className={ic} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
