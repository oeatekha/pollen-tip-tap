import "./dBlock.css";
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { useState } from "react";

export const DBlockNodeView = ({ editor }) => {
  return React.createElement(
    NodeViewWrapper,
    {
      as: "div",
      className: "flex gap-2 w-full my-4 drag-test",
      // add conditional classes for header....
    },
    React.createElement(
      "section",
      {
        // if (NodeViewContent:contains(<h1></h1>)){
        // },

        className: "flex mt-0 pt-[0px] relative top-2", 
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

        React.createElement(
          "a",
          { className: "handle" },
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="17"
            fill="none"
            viewBox="0 0 11 17"
          >
            {" "}
            <ellipse
              cx="2.79"
              cy="2.146"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
            <ellipse
              cx="2.79"
              cy="8.245"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
            <ellipse
              cx="2.79"
              cy="14.343"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
            <ellipse
              cx="9.154"
              cy="2.146"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
            <ellipse
              cx="9.154"
              cy="8.245"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
            <ellipse
              cx="9.154"
              cy="14.343"
              fill="#BFBFBF"
              rx="1.818"
              ry="1.742"
            ></ellipse>{" "}
          </svg>
        )
      )
    ),
    React.createElement(NodeViewContent, { className: "node-view-content" })
  );
};
