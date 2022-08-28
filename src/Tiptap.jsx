import "./Tiptap.css";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";

import ReactComponent from "./Extension.js";


import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import Commands from "./suggestion/commands";
import suggestion from "./suggestion/suggestion";


import { DBlock } from "./dBlock/dBlock.ts";
import Document from "@tiptap/extension-document";



const CustomDocument = Document.extend({
  content: "dBlock+",
});

// import plainExtension from "./extension.ts";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      
      StarterKit.configure({
        document: false,
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
      //DragHandle,
      //   plainExtension,
      Commands.configure({
        suggestion,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
      ReactComponent,
      CustomDocument,
      DBlock,
      

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
