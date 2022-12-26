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
import { initializeApp, } from "firebase/app";
import {storageIs} from "./firebase.js"
import firebase from "firebase/app";
import "firebase/storage";
import {ref, uploadBytes, getStorage, getDownloadURL} from "firebase/storage";
import Microlink from '@microlink/react';
import { Tweet } from "react-twitter-widgets";


const mql = require('@microlink/mql')
const short = require('short-uuid'); 
const channel_id = short.generate();
const MyApiKey = "lZkGxZYQxa4dswvVNDHE5aBgKMEiaKXia4coSoT7";
const userIs = "omoruyi";
const imgURL = "https://d2w9rnfcy7mm78.cloudfront.net/19541850/original_ad3f7a131f290137f4a6746890094553.jpg?1671757148?bc=0";



// Here the goal is to use the pBlock and the channel classes to populate the contents of sortableContent...
// 2. Use the Render of the channel to populate the sortableContent
// 3. Create a Channel That will store all the pBlocks, we will use the contents below to render the channel


const ChannelComponent = () => {

  const [imageUpload, setImageUpload] = useState(null);

  function uploadFile(file) {
    // if the file is not there, then dont return
    if (imageUpload == null) {
      return;
    }

    const fileRef = ref(storageIs, `files/${short.generate()}`);

    // Upload the file to Firebase Storage
    return uploadBytes(fileRef, imageUpload).then(snapshot => {
      // Wait for the upload to complete
      alert("Uploaded a file!");
      getDownloadURL(fileRef).then((url) => {
        console.log(url);
        setCurImg(url);
        return url;
      });
    });
  }

  function uploadFromURL(urlName) {
    // Generate a unique file name for the file
    const fileIs = ref(storageIs, `files/${short.generate()}`);

    // Fetch the file from the URL
    return fetch(urlName)
      .then(response => response.blob())
      .then(fileBlob => {
        // Upload the file to Firebase Storage
        return uploadBytes(fileIs, fileBlob);
    
      })
      .then(snapshot => {
        // Wait for the upload to complete
        alert("Uploaded from URL!");
        console.log(getDownloadURL(fileIs));
        return getDownloadURL(fileIs).then((url) => {
          console.log(url);
          setCurImg(url); //probably dont need this one...
          return url;
        });
      });
  }

  function createPblock(str_content, username){
    const type_str = contentParser(str_content);
    const blockId = short.generate();
    const blockIs = new pBlock(username, channel_id, type_str.type, type_str.str_input, blockId);
    //(author, parent_id, type, content, unique_id)
    console.log("blockIs is ", blockIs);
    return blockIs;
  }

  function blockContent(blockIs) {
    let type = blockIs.type;
    let content = blockIs.content;
    let author = blockIs.author;
    
    if (type == "link") {
      return (
        <div className="blockContent">
          <Microlink url={content} media='screenshot' size='large' api-key={MyApiKey} lazy/>
        </div>
      );
    }
    else if (type == "spotify") {
      return (
        <div className="blockContent">
          <Microlink url={content} api-key={MyApiKey} media='iframe' size='large' lazy/>
        </div>
        );
    }
    else if(type == "image") {
      return (
        <img src={content} loading="lazy" className= "object-cover rounded-xl w-[352px] h-[352px]" alt="image"/> 
      );
    }
    else if(type == "youtube") {
      return (
        <Microlink url={content}  size='large' api-key={MyApiKey} lazy/>
      );
    }
    // for files no fetch data, just render the link...
    else if(type == "file") {
      return (
        <div className="blockContent">
          <Microlink url={content} api-key={MyApiKey} fetchData='false' size='large' lazy/>
        </div>
      );
  }
}
  
  let arenaBlock = createPblock("https://styled-components.com/", userIs);
  let [isInput, setisInput] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1"]);
  const [urls, setUrls] = useState(urlList);
  const [inputValue, setInput] = useState("Untitled Channel");
  const [curImg, setCurImg] = useState("https://d2w9rnfcy7mm78.cloudfront.net/16282437/original_dcabb93a23b54b11f7a09ee29fad2bb1.jpg?1651354853?bc=0");


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
      <input 
    type="file" 
    onChange={(event) => { setImageUpload(event.target.files[0]);
    
    }}/>
    <button onClick={uploadFile}>Upload</button>
    
    <Microlink url={"https://open.spotify.com/track/0BSPhsCKfwENstErymcD80?si=f6d0f0e3484c44c0"} api-key={MyApiKey} media='iframe' size='large'/>
    <div class="h-10"></div>    
    <img className= "object-cover rounded-xl w-[352px] h-[352px]" src={imgURL}></img>
    <div class="h-10"></div>    
    {blockContent(arenaBlock)}
    <div class="h-10"></div>    
    <div class="max-h-[352px] max-w-[352px]">
    {/*}  <Tweet tweetId="1607152081122562049" options={{ height: "200" }} /> */}
    </div>
    <Microlink url={"https://www.youtube.com/watch?v=sDRoi4sffkA&ab_channel=AnimeBallsDeep"} api-key={MyApiKey} media='iframe' size='large'/>
    <div class="h-10"></div>

    <button onClick={() => {uploadFromURL("https://images.weserv.nl/?url=https%3A%2F%2Fiad.microlink.io%2F5cHGxyT3sh654wjScYN4Km0k4wxjbBeTmcD_1hX1udxs6Ca147uCDwYOYe_4kXeq3OCKIv3pFlONICjI0tPEyg.png&l=9&af&il&n=-1")}}>Upload from URL</button>



      <Box className="ChannelContainer"
        flex={true}
        wrap={true}
        direction="row"
        style={{maxWidth: "720px", borderRadius: "5px"}}
      >

        <div class="content-left container items-center flex flex-wrap items-center justify-between w-[664px] mx-2 py-1">
          
        
            <div class="flex space-x-2 pt-2 mx-2">
              <AutosizeInput
                class="flex space-x-4 pl-1 h-[30px] w-auto max-w-[140px] truncate resize-none font-medium font-size-small text-gray-400"
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
          <div class="content-left container flex flex-wrap items-center justify-between w-[665px] mx-2 pb-1">
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