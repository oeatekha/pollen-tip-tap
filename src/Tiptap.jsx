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
import thumb from "./icons/thumbnail.svg";
import tippy from "tippy.js";

import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
//import MyPopover from "./headlessui/embedPopups";


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
        console.log("un")
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
        placeholder: "Type `/` for command",
        includeChildren: true,
      }),

      ReactComponent,
      Collaboration.configure({
        document: ydoc,
      }),
      CustomDocument,
      DBlock,
      Iframe,
      Image.configure({
        HTMLAttributes: {
          class: "editor-img",
        },
      }),
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
  const [thumbnailUrl, setThumbnail] = useState('https://d2w9rnfcy7mm78.cloudfront.net/2574542/original_ccac026c65e509ce6c1e77b5af835a8c.jpg?1534712867?bc=1');
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement,{
    placement: "bottom-end",
    modifiers: [
      {name: "offset",
        options: {
          offset: [30, 0]
        }
      }
    ]
    
  });


  const addImage = useCallback(() => {
    
    const url = thumbnailUrl
    //const url = window.prompt('URL')
    console.log("hey")
    console.log(thumbnailUrl)

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

          {/* < button class="thumbnail" onClick={click}>< img src={thumb} /></button > */}
          
          
        
          <div className="flex-1 mb-96">

            <div className="embedThumb">
              <Popover >
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of the chevron icon. */
                  <> <Popover.Button ref={setReferenceElement} className="thumbnail">
                    <div><img src={thumb}/></div>     
                    </Popover.Button>
                    
                    <Popover.Panel 
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}

                    className="absolute left-1/2 z-10 mt-2 w-screen max-w-xs -translate-x-1/2 transform px-1 sm:px-0 lg:max-w-sm"> 
                      <div class="bg-white shadow-xl sm:rounded-md p-4 max-w-xs mx-auto" >
                        <p className= "py-1 text-sm	text-stone-800 text-left font-semibold">Embed Image</p>
                        <div class=" py-1 relative left-0">
                          <input value={thumbnailUrl} 
                            onChange={e => setThumbnail(e.target.value)} 
                            className= "bg-gray-100 block p-2  w-full left-0 sm:rounded-md focus:border-blue-400 placeholder-gray-400 border border-gray-200 focus:outline-none focus:bg-white text-left text-sm" 
                            type="text" 
                            placeholder ="Paste Image Url">
                          </input>
                        </div>
                        <button onClick={addImage}  className="mt-2 font-medium text-stone-800 text-sm w-full bg-gray-200 border-white rounded focus:text-stone-800 focus:bg-gray-200  hover:bg-gray-300">Embed Image</button>
                        <p className= "py-1 mt-1 text-sm	text-gray-500 text-center text-xs">Works with image urls and addresses</p>
                      </div> 
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>

            
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
