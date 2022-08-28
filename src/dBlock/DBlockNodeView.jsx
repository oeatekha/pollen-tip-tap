import "./dBlock.css";
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
export const DBlockNodeView = ({ editor }) => {
  return React.createElement(
    NodeViewWrapper,
    { as: "div", className: "flex gap-2 items-center w-full my-4" },
    React.createElement(
      "section",
      {
        className: "flex mt-0 pt-[0px]",
        "aria-label": "left-menu",
        contentEditable: "false",
        suppresscontenteditablewarning: "true",

        
      },
      React.createElement(
        "div",
        {
          className: "handle-container",
          contentEditable: false,
          draggable: true,
          "data-drag-handle": true,
        },
        React.createElement("div", { className: "handle" }, "::")
      )
    ),
    React.createElement(NodeViewContent, { className: "node-view-content" })
  );
};
