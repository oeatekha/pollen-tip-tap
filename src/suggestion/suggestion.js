import { useAriaHidden } from "@chakra-ui/react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import CommandsList from "./CommandsList.jsx";

function noScroll(){
  window.scrollTo(0,0);
  console.log("pause scorlling");
}

function startScroll(){
  window.scroll();
}


export default {
  items: ({ query }) => {
    return [
      {
        title: "Text",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("paragraph")
            .run();
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
          editor.chain().focus().deleteRange(range).setMark("italic").run();
        },
      },
      {
        title: "Arena",
        command: ({ editor, range }) => {
        },
      },
      {
        title: "Video",
        command: ({ editor, range }) => {
        },
      },
      {
        title: "Music",
        command: ({ editor, range }) => {
        },
      },
      {
        title: "URL",
        command: ({ editor, range }) => {
        },
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new ReactRenderer(CommandsList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }
        //noScroll();
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start"
        });

        //document.body.style.overflow = "auto";

      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
