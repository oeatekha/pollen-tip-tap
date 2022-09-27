import "./Tiptap.css";

import { useEditor, EditorContent, Editor, getMarkType } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "next/link";
import Dropcursor from "@tiptap/extension-dropcursor";

import { useEffect, useState } from "react";

import ReactComponent from "./Extension.js";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";

import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { Color } from "@tiptap/extension-color";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React, { useCallback } from 'react'

import Commands from "./suggestion/commands";
import suggestion from "./suggestion/suggestion";

import { DBlock } from "./dBlock/dBlock.ts";
import Document from "@tiptap/extension-document";
import MenuContent from "./MenuContent.js";
import Iframe from "./iframe.ts";

const ydoc = new Y.Doc();

const CustomDocument = Document.extend({
  content: "dBlock+",
});

const ParagraphDocument = Document.extend({
  content: "paragraph",
});

const HeaderDocument = Document.extend({
  content: ("heading"),
  //content: "image", // You can't use heading block* breaks it....
});

// Create Document that can only contain image content
// Then Create an editor that extends to this custom document and only extends to teh image extention using tiptap
const Thumbnail = Document.extend({
  content: "image",
});

const thumbnailImage = new Editor({

  extensions: [Text, Thumbnail, Image.configure({
    HTMLAttributes: {
      class: "thumbnail-image",
    },
  })],
});






const titled = new Editor({
  
  className: "titled",
  extensions: [
    HeaderDocument,
    Image,
    Heading,
    Text,   
    History,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Untitled Page";
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
    Paragraph.configure({
      HTMLAttributes: {
        class: 'my-custom-paragraph',
      },
    }),
    Text,
    History,

    // Color.configure({
    //   color
    // }),

    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "paragraph") {
          return "Tell us more....";
        }
      },
    }),

    //set color correctly for the description portion....
  ],
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
        dropcursor: false,
        heading: {
          HTMLAttributes: {
            class: "editor-child",
          },
          Dropcursor: {
            width: 10,
            color: "skyblue",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "editor-child",
          },
        },
      }),

      Commands.configure({
        suggestion,
      }),
      Placeholder.configure({
        placeholder: "Type `/` for commands",
        includeChildren: true,
      }),

      ReactComponent,
      Collaboration.configure({
        document: ydoc,
      }),
      CustomDocument,
      DBlock,
      Iframe,
      Image,
      Dropcursor.configure({
        width: 3,
        color: "skyblue",
      }),
    ],
  //   content: `
  //   <img src="https://d2w9rnfcy7mm78.cloudfront.net/14322969/original_abba8876ad86fe087b7260a49e88b9ce.jpg?1639239206?bc=0" />
  // `,

    autofocus: "end",
    editable: true,
  });

  const [menuClicked, setMenuClicked] = useState(false);

  const addImage = useCallback(() => {
    const url = window.prompt('URL')
  
    if (url) {
      thumbnailImage.chain().focus().setImage({ src: url }).run()
    }
  }, [thumbnailImage])
  
  if (!thumbnailImage) {
    return null
  }

  return (
    <>
      <div className="flex w-screen overflow-hidden h-screen">
        {/* EDITOR SECTION */}
        <div className="w-full overflow-auto">
          <div className="p-4 menu sticky top-0 flex justify-between" style={{marginBottom: "6rem"}}> 
            
            <Link href="/">Pollen</Link>
            <div
              className="hover:cursor-pointer hover:decoration-solid" style={{ fontSize: "14px"}}
             
              onClick={() => setMenuClicked(!menuClicked)}
            >
              Toolbar
            </div>
          </div>
          <button onClick={addImage}>setImage</button>

          <div className="flex-1 mb-96">
            
            <EditorContent editor={thumbnailImage} />
            <EditorContent editor={titled} />
            <EditorContent editor={readMe}/>
            <br></br>
            <hr></hr>

            <EditorContent editor={editor} />
          </div>
        </div>

        {/* MENU SECTION */}
        {menuClicked && <MenuContent editor={editor} />}
      </div>
    </>
  );
};

export default Tiptap;
