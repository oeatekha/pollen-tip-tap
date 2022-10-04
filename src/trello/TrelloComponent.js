import React, { useEffect, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { TrelloModal } from "./TrelloModal";
import Image from "@tiptap/extension-image";
import Tiptap from "../Tiptap";

const TrelloComponent = ({
  node,
  editor,
  getPos,
  selected,
  deleteNode,
  updateAttributes,
}) => {
  const [showTrelloModal, setShowTrelloModal] = useState(true);
  const [showTrello, setShowTrello] = useState(true);
  // const url =
  //   "https://pbs.twimg.com/media/FeLQ_XuXEB8r0CF?format=jpg&name=large";
  const [url, setUrl] = useState("");
  const [toggleContent, settoggelContent] = useState(false);

  /*
  Think this onClick we change states and return the TrelloModal internal content
  So basically within the trello modal we can pull a state and set it open to one of our global variables...
  that represents the url and straight up place the url below....
  But at first I have been running into a bug that prevents me from having multiple state returns


  */

  return (
    <NodeViewWrapper className="trello-component">
      <div>
        <div className="flex z-50">
          {showTrelloModal? <TrelloModal setIsOpen={showTrelloModal} editor={editor} updateUrl={setUrl} setmodalCreated={settoggelContent}/> :  null}
          {/*{showTrelloModal? <TrelloModal showModal={showTrelloModal} toggleModal={showTrello} onClick={onClick}/> : null}*/}
        </div>

        {toggleContent? <img
          class="thumbnail-image ProseMirror-selectednode"
          src={"https://pbs.twimg.com/media/FeLQ_XuXEB8r0CF?format=jpg&name=large"}
          contenteditable="false"
          draggable="true"
        ></img> : null}

        {console.log("toggleModal is ", toggleContent)}
    
      </div>
    </NodeViewWrapper>

    //maybe its annoying but this could work??
  );
};

export default TrelloComponent;
