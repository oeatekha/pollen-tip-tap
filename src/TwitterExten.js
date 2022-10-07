import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import TrelloComponent from "./trello/TweetComponent";

const TwitterExtension = Node.create({
  name: "twitter-component",

  group: "block",
  priority: 10,
  atom: true,

  parseHTML() {
    return [
      {
        tag: "twitter-component",
      },
    ];
  },

  addCommands() {
    return {
      showTweet:
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
    return ["twitter-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TrelloComponent);
  },
});

export default TwitterExtension;