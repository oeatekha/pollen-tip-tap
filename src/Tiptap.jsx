import "./Tiptap.css";

import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import DragHandle from "./DragHandle";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Commands from "./suggestion/commands";
import suggestion from "./suggestion/suggestion";

// import plainExtension from "./extension.ts";
import ReactComponent from "./Extension.js";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      //DragHandle,
      //   plainExtension,
      ReactComponent,
      Commands.configure({
        suggestion,
      }),
    ],
    
    content: `
    <h1>New Pollen Page</h1>
    <p>Read Me: This is the area you can enter extra info about your page.</p>
    <hr>
    <p></p>
    `,
    autofocus: "end",
    editable: true,
  });

  
  return (
    <>
      <EditorContent editor={editor} />{" "}
    </>
  );
};

export default Tiptap;
