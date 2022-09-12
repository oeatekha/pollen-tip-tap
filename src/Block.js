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

  return (
    <div
      className="overflow-scroll m-px border-2 relative z-0"
      style={{ height: props.blockHeight, width: props.blockHeight }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasImage ? (
        // ⭐️ IMAGE
        <div className="h-full bg-black">
          <img className="w-full h-full " src={block.image.square.url} />{" "}
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
          <div className="absolute top-0 left-0 w-full flex justify-between p-2 z-10">
            <div
              // onClick={() => upvoteClicked(block.id)}
              className="hover: cursor-pointer"
            >
              ⬆
            </div>
            <div
              onClick={() => props.selectedClicked(block.id)}
              className="hover: cursor-pointer"
            >
              📌
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-between p-2">
            <div className="bg-white p-1 px-2 rounded-xl ">{props.upvotes}</div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Block;
