import Link from "next/link";
import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  MutableRefObject,
} from "react";

export const Block = (props) => {
  const block = props.block;
  
  const hasImage = block.image !== undefined && block.image !== null;
  const [hovered, setHovered] = useState(false);

  // console.log(props.blockHeight);
  let displayText = "";
  if (!hasImage) {
    // console.log("🟡 no image", block);
    if (block.base_class === "Channel") {
      displayText = block.title;
    } else {
      // console.log("🟢 got here");
      displayText = block.content;
    }
  }

  const blockClicked = () => {
    console.log(block.image.square.url);
    //const endPos = props.getPos()
    
    // props.editor.commands.insertContentAt(1, '<p></p>', {
    //     updateSelection: true,
    //     parseOptions: {
    //       preserveWhitespace: 'full',
    //   }
    // });

    //props.editor.commands.insertContent(`<p></p> <img src=${block.image.square.url} >`);
    //props.editor.commands.insertContent(`\n`);
    //props.editor.commands.clearNodes();
    
    
    props.editor.commands.insertContent(`\u00A0<img src=${block.image.square.url}>\u00A0`);
    props.editor.commands.selectNodeBackward();
    props.editor.commands.deleteSelection();
    props.editor.commands.createParagraphNear();
    
    

    

    
    //props.editor.commands.insertContentAt(`<p > </p>`);
  };

  return (
    <div
      className="overflow-scroll m-px border-2 relative z-0"
      style={{ height: props.blockHeight, width: props.blockHeight }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => blockClicked()}
    >
      {hasImage ? (
        // ⭐️ IMAGE
        <div className="h-full bg-black">
          <img className="w-full h-full " src={block.image.square.url} />
        </div>
      ) : (
        // ⭐️ TEXT
        <div
          className={
            "h-full w-full p-2 " +
            (block.base_class === "Channel"
              ? "bg-emerald-100 flex items-center justify-center"
              : "bg-white")
          }
        >
          {displayText}
        </div>
      )}

      {/* ⭐️ OVERLAY */}
      {hovered && (
        <div>
          <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-white cursor-pointer bg-opacity-50">
            <div className="text-white text-4xl font-extrabold">+</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Block;
