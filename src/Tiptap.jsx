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
        if (node.type.name === "paragraph") {
          return "ReadME file contains information about the other files in a directory or archive of software. Use Readme on Pollen to include a relevant description";
        }
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
        if (node.type.name === "heading") {
          return "ReadME file contains information about the other files in a directory or archive of software. Use Readme on Pollen to include a relevant description";
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
        placeholder: ({ node }) => {
          if (node.type.name === "dBlock+") {
            return 'enter "/" to use a command';
          }
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
      {/* <EditorContent editor={titled} />
      {""}
      <EditorContent editor={readMe} />
      {""} */}
      <EditorContent editor={editor} />{" "}
    </>
  );
};

export default Tiptap;
