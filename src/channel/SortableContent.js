import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";

function Icon() {
  return (
    <svg
      width="11"
      height="20"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="1.81818"
        cy="1.74242"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
      <ellipse
        cx="1.81818"
        cy="8.22729"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
      <ellipse
        cx="1.81818"
        cy="14.7122"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
      <ellipse
        cx="8.4549"
        cy="1.74242"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
      <ellipse
        cx="8.4549"
        cy="8.22729"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
      <ellipse
        cx="8.4549"
        cy="14.7122"
        rx="1.81818"
        ry="1.74242"
        fill="#BFBFBF"
      />
    </svg>
  );
}

const SortableContent = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

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
        <div
        //   style={{
        //     overflow: "hidden",
        //     //minWidth: "30px",
        //     borderRadius: "5px",
        //     //minHeight: "20px",
        //     width: "320px",
        //     height: "320px",
        //     backgroundcolor: "lightgrey",
        //     margin: "1px"
        //   }}
        >
          {/* <img
            //class="center"
            height="100%"
            width="100%"
            //object-fit="contain",
            object-fit="fit"
            src={props.urls[props.value]}
            //src="https://d2w9rnfcy7mm78.cloudfront.net/5634523/original_033f2605b8c2b7aed1f090c7ea798251.jpg?1575338188?bc=0"
            alt="alternatetext"
          /> */}

          
        </div>


        <div className="BlockContainer">
        <button
          className="ChannelDragHandle"
          style={{
            textAlign: "center",
            cursor: "pointer",
            //padding: "7px",
            position: "relative",
            
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            border: "1px solid transparent",
            //borderRadius: "1px",
            height: "35px",
            width: "25px",
            
          }}
          zIndex="10"
          {...listeners}
          {...attributes}
        >
          {Icon()}
          {/* Add in the z to be placed at 10 for the drag handle + add div to contain
          the img or microlink div...think it may just have to be through a styled microlink component...
          */}
        </button>
        </div>
       
      </Box>
    </div>
  );
};

export default SortableContent;