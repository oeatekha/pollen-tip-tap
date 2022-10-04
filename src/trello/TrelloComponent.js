import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react'
import { TrelloModal } from './TrelloModal'
import { MyModal } from '../suggestion/MyModal';

const TrelloComponent = ({node, editor, getPos, selected, deleteNode, updateAttributes}) => {
const [showTrelloModal, setShowTrelloModal] = useState(true)



  return (
    <NodeViewWrapper className="trello-component">
      <div>
          <div className="flex z-50">
              {MyModal}
              {/*{showTrelloModal? <TrelloModal showModal={showTrelloModal} toggleModal={showTrello} onClick={onClick}/> : null}*/}
          </div>
          <div>
              // TRELLO CARD CONTENT
          </div>
      </div>
    </NodeViewWrapper>
  );
};

export default TrelloComponent