import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import React from "react";
import "./Component.css";

export default (props) => {
  return (
    <NodeViewWrapper className="react-component">
      <span className="drag-handle">::</span>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
