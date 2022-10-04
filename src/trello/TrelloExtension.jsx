import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TrelloComponent from './TrelloComponent'

const TrelloExtension = Node.create({
  name: 'trello-component',

  group: 'block',

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'trello-component',
      },
    ]
  },

  addCommands() {
    return {
      showTrello: (range, options) => ({ chain, commands }) => {
        return chain().insertContent({
          type: this.name,
        }).createParagraphNear().run()
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['trello-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TrelloComponent)
  },
})

export default TrelloExtension