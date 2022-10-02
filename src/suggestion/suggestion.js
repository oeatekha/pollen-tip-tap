import { useAriaHidden } from "@chakra-ui/react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import Image from "@tiptap/extension-image";
import myModal from "./embeder.js";


import CommandsList from "./CommandsList.jsx";
import MyModal from "./embeder.js";

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
        command: 
        
        ({ editor, range }) => {
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
          const url = window.prompt('URL')
          //you need to call the general embedder here...and get a value from it... if no value cancel everything
          editor.chain().focus().setImage({ src: url }).run()
          editor.chain().focus().deleteRange(range).run();
        },
      },
      {
        title: "Arena",
        command: ({ editor, range }) => {
          console.log("het");
          MyModal();

          //MyModal(this.MyModal.setIsOpen);
          //const [vari, renderModal] = MyModal();
          
          //Why can't i open the modal here?
          //basically need to open a popup here
          editor.chain().focus().deleteRange(range).run();
          
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
