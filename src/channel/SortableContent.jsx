import React from "react";
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";
import blockHandle from './blockHandle.svg'
import blockDrop from "./components/blockDrop";
import { auto } from "@popperjs/core";
import Microlink from '@microlink/react'
import { useModal } from "@ebay/nice-modal-react";
import NiceModal from "@ebay/nice-modal-react";
import blockModal from "./blockModal";

const mql = require('@microlink/mql')
const MicorApiKey = 'lZkGxZYQxa4dswvVNDHE5aBgKMEiaKXia4coSoT7';
const MyApiKey = MicorApiKey;

function handle() {
  return (
    <img src={blockHandle}></img>
  );
}



function timeSince(date) {
  const elapsed = Math.floor(((Math.floor(Date.now() / 1000)) - date));

  var msPerMinute = 60;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;


    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return  + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return  + Math.round(elapsed/msPerYear ) + ' years ago';   
    }

}




const SortableContent = (props) => {
  const {attributes, listeners, setNodeRef,transform, transition, isDragging } = useSortable({ id: props.id });
  const [isHovered, setIsHovered] = useState(false);
  const [hasSupported, setHasSupported] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  const showBlockModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show(blockModal, { data: props.value })
  };

  function blockContent(type, content) {

    if (type == "link") {
      return (
        <div className="blockContent">
          <Microlink url={content} media='screenshot' size='large' apiKey={MyApiKey} lazy/>
        </div>
      );
    }
    else if (type == "spotify") {
      return (
        
          <Microlink url={content} apiKey={MyApiKey} media='iframe' size='large' lazy className="-z-50"/>
        
        );
    }
    else if(type == "image") {
      return (
        <img src={content} loading="lazy" className= "object-cover -z-50 rounded-xl w-[352px] h-[352px]" alt="image"/> 
      );
    }
    else if(type == "video") {
      return (
        <Microlink url={content}  size='large' apiKey={MyApiKey} lazy/>
      );
    }
    else if(type == "text") {
      return (
        <div className="blockContent p-8 pt-14 ">
          <p className="text-sm max-h-[240px] text-left text-ellipsis overflow-hidden ... ">{content}</p>
        </div>
      );
    }
    // for files no fetch data, just render the link...
    else if(type == "supported-media") {
      return (
        <div className="blockContent -z-50">
          <Microlink url={content} apiKey={MyApiKey} fetchData='false' size='large' lazy/>
        </div>
      );
  }
}

  function canUserEdit() {

    console.log("user is ", props.userIs)
    if (props.value.author == props.userIs) {
      console.log("user is matches author")
      setCanEdit(true);
    }
    else if (props.editorList.includes(props.userIs)) {
      setCanEdit(true);
    }
    else{
      setCanEdit(false);
    }
  };

  function supporterCheck() {
    if (props.value.support.includes(props.userIs)) {
      console.log("user is ", props.userIs);
      setHasSupported(true);
    }
    
    else{
      setHasSupported(false);
    }
  }

  useEffect(() => {
    supporterCheck();
    //console.log("has supported is ", hasSupported, props.id);
  }, [props.value.support]);

  useEffect(() => {
    canUserEdit();
    //console.log("has supported is ", hasSupported, props.id);
  }, [props.userIs]);




  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "352px",
    height: "352px",
    borderRadius: "5px",
    backgroundColor: "#transparent",
    margin: "10px",
    marginBottom: "50px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.8 : 1
  };

  function showTitle() {
    if (props.value.title.length > 0) {
      if (props.value.type != "text" && props.value.type != "video" && props.value.type != "spotify") {
        return (
          <div 
          className="BlockName"
          style={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            // marginBottom: "10px", change later 
            color: "#AFAFAF",
            fontSize: "12px",
            width: "fit-content",
            paddingInline: "25px",
            height: "30px",
            maxHeight: "30px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "600",
            zIndex: "10",
            left: "50%",
            transform: "translate(-50%, 0%)",
            top: "275px",
            
          }}>
              <p style={{maxWidth: "250px",overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{props.value.title.substr(0,25)}</p>
          </div>
        );
      }
      // return a title if there is one...
      // also check the type of block and see if we even display the title...
    }
  }


  function handleClick() {

    // trigger dropdown here
    if (!isDragging) {
      console.log("clicked");
      console.log("clicked Guys");
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Box>
      
      

        <div className="BlockContainer flex-col justify-start relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button className="modalButton absolute z-10" onClick={showBlockModal}>Block Modal</button>

          <div className="blockContent  -z-1 absolute">
            {blockContent(props.value.type, props.value.content)}
          </div>
          <div className="flex-row items-center justify-center gap-4  bg-transparent max-w-[200px]">
              <div className="BlockQuickMenu relative top-2 left-[207px] flex-row items-center gap-4 space-x-1 bg-transparent">
                {/*<button class="flex-row justify-center items-center px-2 py-0.5 bg-gray-100/80 font-medium border-transparent text-md	text-neutral-400 rounded-md" className={`${isHovered ? "" : "invisible"}`}>🔗</button>*/}
                {/*If already in list set SupportBlock background to darker gray */}
                <button onClick={() => props.SupportBlock(props.userIs, props.value.unique_id)} class={`flex-row justify-center items-center px-2 py-0.5 bg-neutral-${hasSupported ? "100" : "900"} font-medium border-transparent text-md text-neutral-400 rounded-md hover:bg-neutral-200 active:bg-blue-700 focus:bg-blue-700/80 focus:outline-none focus:ring focus:ring-blue-300`}>+ {props.value.support.length}</button>
                {blockDrop(props.deleteBlock, props.value.unique_id, canEdit)}
              </div>
              <button
                className={`ChannelDragHandle ${isHovered ? "" : "invisible"}`}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  left: "3%",
                  position: "absolute",
                  top: "3%",
                  border: "1px solid transparent",
                  height: "35px",
                  width: "25px",
                  zIndex: 5,
                  margin: auto,
                }}
                {...listeners}
                {...attributes}
              >
                {handle()}
              </button> 
          </div>
          {showTitle()}

        </div>
      </Box>
      
      
      <p style={{fontSize: "12px", fontWeight: "600", color: "#BFBFBF", maxWidth: "350px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingTop: "4px"}}>Contributed by @{props.value.author}</p> {/*should be button linking to the author in future... */}
      <p style={{fontSize: "12px", fontWeight: "400", color: "#BFBFBF", maxWidth: "350px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>Added {timeSince(props.value.created_at)}</p> {/*should be button linking to the author in future... */}
      
      

    </div>
    

  );
};

export default SortableContent;