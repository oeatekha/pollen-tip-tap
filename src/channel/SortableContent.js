import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";
import blockHandle from './blockHandle.svg'

function handle() {
  return (
    <img src={blockHandle}></img>
  );
}

const SortableContent = (props) => {
  const {attributes, listeners, setNodeRef,transform, transition, isDragging } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "320px",
    height: "320px",
    borderRadius: "5px",
    backgroundColor: "#transparent",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.8 : 1
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Box>
        <div></div>
        <div className="BlockContainer">
        <button
          className="ChannelDragHandle"
          style={{
            textAlign: "center",
            cursor: "pointer",
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            border: "1px solid transparent",
            height: "35px",
            width: "25px", 
          }}
          zIndex="10"
          {...listeners}
          {...attributes}
        >
          {handle()}
          {props.value.title}
        </button>
        </div>
       
      </Box>
    </div>
  );
};

export default SortableContent;