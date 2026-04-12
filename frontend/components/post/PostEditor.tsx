"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { ImagePlus } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export interface PostEditorRef {
  getText: () => string;
  getHTML: () => string;
  getPhoto: () => File | null;
}

interface PostEditorProps {
  placeholder?: string;
}

const PostEditor = forwardRef<PostEditorRef, PostEditorProps>(
  ({ placeholder = "Write something..." }, ref) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [isBold, setIsBold] = useState(false);
    const [isUnderlineActive, setIsUnderlineActive] = useState(false);

    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({ placeholder }),
      ],
      content: "",
      onSelectionUpdate: ({ editor }) => {
        setIsBold(editor.isActive("bold"));
        setIsUnderlineActive(editor.isActive("underline"));
      },
      onUpdate: ({ editor }) => {
        setIsBold(editor.isActive("bold"));
        setIsUnderlineActive(editor.isActive("underline"));
      },
      editorProps: {
        attributes: {
          class:
            "w-full bg-transparent text-white outline-none min-h-[150px] text-base focus:outline-none",
        },
      },
    });

    useImperativeHandle(ref, () => ({
      getText: () => editor?.getText() ?? "",
      getHTML: () => editor?.getHTML() ?? "",
      getPhoto: () => photo,
    }));

    return (
      <div className="w-full p-4 bg-secondary rounded-[30px]">
        <div className="bg-[#464646] w-full h-50 rounded-[20px] p-5 border border-white/5 flex flex-col overflow-scroll">
          <EditorContent editor={editor} />
        </div>

        <div className="flex items-center justify-between mt-4 px-4">
          <div className="flex gap-4 items-center text-white">
            <button
              onClick={() => document.getElementById("postEditorFileInput")?.click()}
              className="relative cursor-pointer"
            >
              <ImagePlus size={30} />
              {photo && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-light rounded-full border border-secondary" />
              )}
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                editor?.chain().focus().toggleBold().run();
                setIsBold(!isBold);
              }}
              className={`text-2xl transition-all cursor-pointer font-montagu ${isBold ? "font-bold" : "font-normal"}`}
            >
              B
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                editor?.chain().focus().toggleUnderline().run();
                setIsUnderlineActive(!isUnderlineActive);
              }}
              className={`underline transition-all cursor-pointer text-2xl font-montagu ${isUnderlineActive ? "font-bold" : "font-normal"}`}
            >
              U
            </button>
          </div>

          <input
            id="postEditorFileInput"
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) setPhoto(e.target.files[0]);
            }}
            accept="image/*"
            className="hidden"
          />

          {photo && (
            <div className="border border-green-light text-green-light text-sm px-3 py-1.5 rounded-[10px]">
              Photo added
            </div>
          )}
        </div>
      </div>
    );
  }
);

PostEditor.displayName = "PostEditor";
export default PostEditor;
