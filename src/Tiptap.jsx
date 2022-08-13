import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import "./Tiptap.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "editor-child",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "editor-child",
          },
        },
      }),
      FloatingMenu,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
    ],
    content:
      "<h1>New Pollen Page</h1><p>Read Me: This is the place you can enter extra info about your page.</p> <hr> <p></p>",
    autofocus: "end",
    editable: true,
  });

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            // className={
            //   editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            // }
          >
            Heading
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .insertContent(
                  '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"/>'
                )
                .lift("image")
                .insertContent("<p></p>")
                .focus("end")
                .run()
            }
            // className={editor.isActive("image") ? "is-active" : ""}
          >
            Image
          </button>
        </FloatingMenu>
      )}{" "}
      <EditorContent editor={editor} />{" "}
    </>
  );
};

export default Tiptap;
