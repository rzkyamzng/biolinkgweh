"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[180px] p-3 border border-slate-700 rounded-lg bg-slate-900/50 text-white",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-2 p-2 border border-slate-700 rounded-t-lg bg-slate-800/80">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm rounded ${editor.isActive("bold") ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300"}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm rounded ${editor.isActive("italic") ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300"}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 text-sm rounded ${editor.isActive("bulletList") ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300"}`}
        >
          List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
