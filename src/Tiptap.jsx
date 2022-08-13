import "./Tiptap.css";

import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

// import plainExtension from "./extension.ts";
import ReactComponent from "./Extension.js";

const Tiptap = () => {
  const editor = useEditor({
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
      //   plainExtension,
      ReactComponent,
    ],
    content: `
    <h1>New Pollen Page</h1>
    <p>Read Me: This is the place you can enter extra info about your page.</p>
    <hr>
    <p></p>
    `,
    autofocus: "end",
    editable: true,
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (!url) {
      url = "";
    }
    editor
      .chain()
      .insertContent(`<img src="${url}"/>`)
      .lift("image")
      .insertContent("<p></p>")
      .focus("end")
      .run();
  };

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
            onClick={() => addImage()}
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
