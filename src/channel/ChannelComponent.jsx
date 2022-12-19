import React, { useState } from "react";
import { Box, Button } from "grommet";
import {pBlock, channel, equation} from './pBlock.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor,useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy} from "@dnd-kit/sortable";
import Example from "./components/filterDrop.jsx";
import SortableItem from "./SortableContent";
const short = require('short-uuid'); 

const img1 = "https://d2w9rnfcy7mm78.cloudfront.net/16282437/original_dcabb93a23b54b11f7a09ee29fad2bb1.jpg?1651354853?bc=0";
const img2 = "https://d2w9rnfcy7mm78.cloudfront.net/11878907/original_df38a957301648022aaaf97ccb56e553.jpg?1620426154?bc=0";
const urlList = [img1, img2];


// Here the goal is to use the pBlock and the channel classes to populate the contents of sortableContent...
// 1. Create a Channel That will store all the pBlocks, we will use the contents below to render the channel
// 2. Use the Render of the channel to populate the sortableContent
// 3. Create a Channel That will store all the pBlocks, we will use the contents below to render the channel

const editors = ["omoruyi", "neb", "cedric"]
const channel_data = new channel("0001", editors, short.generate());
console.log("Channel is ", channel_data);


function isValidUrl(str) {
  if(!str.includes(" ") && str.includes(".")) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(str);
  }
    // chnge ot return the paragraph, or a string indicatign the type it has...
    // add a checker to see what we do witit 
    return false
}
function contentParse(str){
  const parentType = isValidUrl(str);
  // if parent type p then this if contians spotify it is that, youtube it is that, etc. 
}

const ChannelComponent = () => {

  let [isInput, setisInput] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1"]);
  const [urls, setUrls] = useState(urlList);

  


  function resetAndrender(){
    renderContent();
    setisInput("");
  } 
  function renderContent(){
    const urltemp = "https://www.regextester.com/93652";
    console.log("Hi there");
    console.log(isValidUrl(urltemp));
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        console.log(items);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (

    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      
      <Box className="ChannelContainer"
        flex={true}
        wrap={true}
        direction="row"
        style={{maxWidth: "720px", borderRadius: "5px",}}
      >
        <Box>
          {Example("test", ["test", "test2", "test3"])}
          <button>HEUUUU</button>
          {" "}
          <div className="AdditionBlock"
            style={{
              width: "320px",
              height: "320px",
              //padding:"10px",
              borderRadius: "5px",
              backgroundColor: "#f7f7f7",
              margin: "10px",
              padding: "0px",
            }}
          >
            <textarea value={isInput} onChange={(e) => setisInput(e.target.value)} className="BlockInput" id="message" style={{ width: "90%", margin: "10px" }} ></textarea>
            <p></p>
            <Button style={{ fontWeight:"500", left: "50px",  textAlign: "center", fontSize: "14px" }}>
              +Add Block
            </Button>
          </div>
        </Box>
        {console.log(isValidUrl("youtub.com"))}

        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem
              key={id}
              id={id}
              handle={true}
              value={id}
              urls={urlList}
            />
          ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default ChannelComponent;