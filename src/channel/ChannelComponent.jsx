import React, { useState } from "react";
import { Box, Button } from "grommet";
import {pBlock, channel, pBlockRender, equation} from './pBlock.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor,useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy} from "@dnd-kit/sortable";
import Example from "./components/sortDrop.jsx";
import Filter from "./components/filterDrop.jsx";
import InertiaDrop from "./components/inertiaDrop.jsx";
import SortableItem from "./SortableContent";
import AutosizeInput from  'react-18-input-autosize';
import Collapsible from "react-collapsible";
import {contentParser, isValidUrl} from "./stringParser.js";
const short = require('short-uuid'); 





const img1 = "https://d2w9rnfcy7mm78.cloudfront.net/16282437/original_dcabb93a23b54b11f7a09ee29fad2bb1.jpg?1651354853?bc=0";
const img2 = "https://d2w9rnfcy7mm78.cloudfront.net/11878907/original_df38a957301648022aaaf97ccb56e553.jpg?1620426154?bc=0";
const urlList = [img1, img2];


// Here the goal is to use the pBlock and the channel classes to populate the contents of sortableContent...
// 2. Use the Render of the channel to populate the sortableContent
// 3. Create a Channel That will store all the pBlocks, we will use the contents below to render the channel

const editors = ["omoruyi", "neb", "cedric"]
const channel_data = new channel("0001", editors, short.generate());
console.log("yoooo momsss")
let tempUrl = "google.com"
//console.log("tempUrl is ", isValidUrl(tempUrl))
console.log("Channel is ", channel_data);


const validUrl = require('valid-url');

console.log(contentParser(tempUrl));

// we should add a sub-type to the pBlock class, so that we can have different types of pBlocks
// and we can render them differently, + we dont have to rerender them..



const ChannelComponent = () => {

  let [isInput, setisInput] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1"]);
  const [urls, setUrls] = useState(urlList);
  const [inputValue, setInput] = useState("Untitled Channel");



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
      className="container content-center mx-auto"
    >
      
      <Box className="ChannelContainer"
        flex={true}
        wrap={true}
        direction="row"
        style={{maxWidth: "720px", borderRadius: "5px",}}
      >

        <div class="content-left container items-center flex flex-wrap items-center justify-between w-[664px] mx-2 py-1">
          
        
            <div class="flex space-x-2 pt-2 mx-2">
              <AutosizeInput
                class="flex space-x-4 pl-1 h-[30px] w-auto max-w-[140px] truncate resize-none font-medium text-gray-400"
                autocomplete="off"
                name="form-field-name"
                value={inputValue}
                onChange={function(event) {
                  setInput(event.target.value) 
                }}
              />         

              <div class="pt-1.5">
                <label class="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ml-2 text-xs font-medium text-gray-300 italic font-serif dark:text-gray-300">Inertia</span>
                  </label>
              </div>
            </div>  

            <div class="relative w-32 ">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2  pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-4 text-gray-500 focus:outline-none dark:text-gray-400" fill="rgb(156 163 175)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="search" autocomplete="off" id="simple-search" className= "channelSearch" class="bg-white focus:outline-0	text-gray-400 text-sm rounded-lg block w-full pl-10 p-1  dark:bg-white border-2 border-gray-50 dark:placeholder-gray-400 dark:text-gray-400 " placeholder="Search..." required/>
            </div>
            
            {/*Search Input*/}

        </div>
        
        <Collapsible overflowWhenOpen='visible' transitionTime='100' trigger={<hr class="py-1 mx-4 w-[654px]"></hr>}>
          <div class="content-left container flex flex-wrap items-center justify-between w-[665px] mx-2 pb-2">
              <div className="FilterBlock">
                {Example()}
                {Filter()}
              </div>
              <div className="InertiaBlock">
                {InertiaDrop()}
              </div>
          </div>
        </Collapsible>
        

        <Box>
          {/*Div FlexBox containing the example filter and inertia dropdown menus, the example and filter in a div and the inertia in another div at the end */}
            
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