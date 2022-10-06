import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TrelloComponent from "./TrelloComponent";

const TrelloExtension = Node.create({
  name: "iframe",
  group: "block",
  priority: 5,

  atom: true,

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },


  addAttributes(){
    return {
      src: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      showTrello:
        (range, options) =>
        ({ chain, commands }) => {
          console.log(this.name);
          return chain()
            .insertContent({
              type: this.name,
            })
            .createParagraphNear()
            .run();
        },
    };
  },

  

  renderHTML({ HTMLAttributes }) {
    return ["div", this.options.HTMLAttributes, ["iframe", HTMLAttributes]];  },

  addNodeView() {
    return ReactNodeViewRenderer(TrelloComponent);
  },
});

export default TrelloExtension;
