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
import { SpotifyEmbed } from "spotify-embed";


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
            .insertContent(`<iframe border=0 frameborder=0 height=250 width=550 align=center
            src="https://twitframe.com/show?url=https://twitter.com/HipCityReg/status/1577784692773986307"></iframe>`)
            .run();
        },
      },
      {
        title: "URL",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .clearNodes()
            .unsetAllMarks()
            .insertContent('<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 71.9424%; padding-top: 120px;"><a href="https://on.substack.com/p/grow-series-19-category-pirates" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fsubstack.com%2Finbox%2Fpost%2F76471687&key=2190685cae7654feb31dfcaed23397d2"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>')
            .run();
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
