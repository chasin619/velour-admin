"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Heading1, Heading2, AlignJustify } from "lucide-react";

interface TiptapProps {
  onChange: (content: string) => void;
  content: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onChange, content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary h-52",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar flex gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Heading2 className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <AlignJustify className="h-5 w-5" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
