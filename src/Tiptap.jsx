import "./Tiptap.css";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";

import ReactComponent from "./Extension.js";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import Commands from "./suggestion/commands";
import suggestion from "./suggestion/suggestion";

import { DBlock } from "./dBlock/dBlock.ts";
import Document from "@tiptap/extension-document";

const CustomDocument = Document.extend({
  content: "dBlock+",
});

const ParagraphDocument = Document.extend({
  content: "paragraph",
});

const HeaderDocument = Document.extend({
  content: "heading", // You can't use heading block* breaks it....
});

const titled = new Editor({
  extensions: [
    HeaderDocument,
    Heading,
    Text,
    History,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Untitled";
        }
        // if (node.type.name === "paragraph") {
        //   return "ReadME file contains information about the other files in a directory or archive of software. Use Readme on Pollen to include a relevant description";
        // }
      },
    }),
  ],
});

const readMe = new Editor({
  extensions: [
    ParagraphDocument,
    Paragraph,
    Text,
    History,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "paragraph") {
          return "Tell us about what you are thinking about.";
        }
      },
    }),
  ],
});

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
        placeholder: "Type '/' to insert a block",
        includeChildren: true,
      }),

      ReactComponent,
      CustomDocument,
      DBlock,
    ],

   
    autofocus: "end",
    editable: true,
  });

  return (
    <>
      <EditorContent editor={titled} />
      <EditorContent editor={readMe} />
      <br></br>
      <hr></hr>
      <br></br>
      <EditorContent editor={editor} />{" "}
    </>
  );
};

export default Tiptap;
