import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { Tweet } from 'react-twitter-widgets'

import Component from './Component.jsx'

export default Node.create({
  name: 'Tweet',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      Id: {
        default: 0,
      },
    }
  },

  addCommands() {
    return {
      showNode:
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

  parseHTML() {
    return [
      {
        tag: 'Tweet',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['Tweet', mergeAttributes(HTMLAttributes)]
    // {Id}
  },

  addNodeView() {
    return ReactNodeViewRenderer(
        console.log("adding view"),
        <NodeViewWrapper className="react-component">
            <span className="label">React Component</span>
            <div className="content">
            <button onClick={console.log("increase")}>
                This button has been clicked times.
            </button>
            </div>
        </NodeViewWrapper>)
  },
})

