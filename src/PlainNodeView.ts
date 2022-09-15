import { NodeView } from "prosemirror-view";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { Editor } from "@tiptap/core";
import { css } from "@stitches/core";

const dragStyle = css({
  background: "blue",
  width: "48px",
  height: "48px",
  color: "white",
});

export class PlainNodeView implements NodeView {
  dom: HTMLElement;
  constructor() {
    this.dom = document.createElement("div");
    this.dom.style.padding = "100px";
    this.dom.style.border = "";
    const handle = document.createElement("div");
    handle.innerHTML = "Plain";
    handle.className = dragStyle();
    this.dom.appendChild(handle);
  }
}
