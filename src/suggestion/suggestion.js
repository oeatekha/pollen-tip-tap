import { useAriaHidden } from "@chakra-ui/react";
import { ReactRenderer } from "@tiptap/react";
import { useEffect, useState, Fragment } from "react";

import tippy from "tippy.js";
import Image from "@tiptap/extension-image";
import myModal from "./embeder.js";

import CommandsList from "./CommandsList.jsx";
import MyModal from "./MyModal";

import { Popover, Tab, Dialog, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import Script from "next/script";
import { TrelloExtension } from "../trello/TrelloExtension";
import TwitterExten from "../TwitterExten.js";
import { SpotifyEmbed } from "spotify-embed";
import { Tweet } from "react-twitter-widgets";


export const getSpotifyIFrameSrc = (urlString) => {
  const { pathname } = new URL(urlString);
  const type = pathname.split('/')[1].toLowerCase();

  const podcastTypes = ['episode', 'show'];
  if (podcastTypes.includes(type)) {
    return urlString.replace(type, `embed-podcast/${type}`);
  }

  return urlString.replace(type, `embed/${type}`);
};







export default {
  items: ({ query }) => {
    return [
      {
        title: "Text",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
      },
      {
        title: "Heading",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      // {
      //   title: "Bold",
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).setMark("bold").run();
      //   },
      // },
      // {
      //   title: "Italic",
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).setMark("italic").run();
      //   },
      // },
      {
        title: "Image",
        command: ({ editor, range }) => {
          const url = window.prompt("Please Paste in a URL of an Image.");
          if (url == ""){
            editor.chain().focus().run();
          }
          else{
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setImage({ src: url })
            .run();
          }
        },
      },
      {
        title: "Spotify",
        
        command: ({ editor, range }) => {
          const url =  getSpotifyIFrameSrc(window.prompt(""));
          
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .clearNodes()
            .unsetAllMarks()
            .insertContent(`<iframe class="spotify" style="border-radius:12px" src="${url}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
            .run();
          
      },
    },

      {
        title: "Video",
        command: ({ editor, range }) => {},
      },
      {
        title: "Twitter",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .clearNodes()
            .unsetAllMarks()
            .insertContent(`<blockquote class="twitter-tweet" data-dnt="true" align="center"><p lang="en" dir="ltr">My cofounder had the gall to be sick today so I took him behind the Salesforce WeWork and broke his kneecaps</p>— Aman (@_amankishore) <a href="https://twitter.com/_amankishore/status/1578110872341209089?ref_src=twsrc%5Etfw">October 6, 2022</a></blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`)
            .run();
        },
      },
      {
        title: "URL",
        command: ({ editor, range }) => {
          console.log("url clicked")
        
          editor.chain().focus().deleteRange(range).clearNodes().unsetAllMarks().run();
          editor.commands.showTweet(range)

            

        },
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);
  },

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        component = new ReactRenderer(CommandsList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }
        //noScroll();
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });

        //document.body.style.overflow = "auto";
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
