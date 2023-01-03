import React, { Suspense, useState, useEffect, useRef, useReducer } from "react";
import { Box, Button } from "grommet";
import {pBlock, gBlock, channel, equation} from './pBlock.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor,useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy} from "@dnd-kit/sortable";
import Example from "./components/sortDrop.jsx";
import Filter from "./components/filterDrop.jsx";
import InertiaDrop from "./components/inertiaDrop.jsx";
import SortableItem from "./SortableContent";
import { sorter } from "./filterUtil.js";
import AutosizeInput from  'react-18-input-autosize';
import Collapsible from "react-collapsible";
import {contentParser, isValidUrl} from "./stringParser.js";
import {database, storageIs} from "./firebase.js"
import {ref, uploadBytes, getStorage, getDownloadURL} from "firebase/storage";
import { doc, collection, setDoc, addDoc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import Microlink from '@microlink/react';
import { useDocument, useCollection, useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';

import { Tweet } from "react-twitter-widgets";
import { resolve } from "styled-jsx/css";


const mql = require('@microlink/mql')
const short = require('short-uuid'); 
const page_id = short.generate();
const channel_id = short.generate();
const doc_id = "5esffd4AhjWGIBFqn19U";
const chanRef = doc(database, "channels", doc_id);
const blocksRef = collection(chanRef, "blocks"); 
const MyApiKey = "lZkGxZYQxa4dswvVNDHE5aBgKMEiaKXia4coSoT7";
const userIs = "omoruyi";
const imgURL = "https://d2w9rnfcy7mm78.cloudfront.net/19541850/original_ad3f7a131f290137f4a6746890094553.jpg?1671757148?bc=0";
//const mainChannel = new channel(channel_id, editors,"Untitled Channel", userIs, imgURL);
// create a channel

const ChannelComponent = () => {
 
  async function getDocInfo() {
    const docRef = doc(database, "channels", "5esffd4AhjWGIBFqn19U");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setChannelDoc(docSnap.data());
      //await updateDoc(docRef, {lock: false});
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  function AddToDoc(block) {
    const [curBlock, setCurBlock] = useState(null);
    console.log("add to doc block: ", curBlock);
  
    useEffect(() => {
      async function fetchBlock() {
        const blockRequest = await block;
        setCurBlock(blockRequest);
        console.log("add to doc block 2: ", curBlock);

      }
      fetchBlock();
    }, []);
  
    useEffect(() => {
      async function setNewBlock() {
        if (curBlock != null) {
          console.log("block is here and we will string it: ", curBlock);
          const pBlockString = JSON.stringify(curBlock);
          // Get a reference to the Firestore document
          const docRef = doc(database, "channels", doc_id);
      
          // Retrieve the current data of the document
          const docSnap = await getDoc(docRef);
          console.log("docSnap: ", docSnap.data());
      
          // Update the document with the new block object
          await updateDoc(docRef, {
            blocks: [...docSnap.data().blocks, pBlockString]
          });
        }
      }
      setNewBlock();
    }, [curBlock]);
  }

  function AddToChannel(block) {
    console.log("addToChannel");
    const blockRef = useRef(block);
    const [curBlock, setCurBlock] = useState(null);
  
    useEffect(() => {
      async function fetchBlock() {
        const blockRequest = await block;
        setCurBlock(blockRequest);
        console.log("curBlock: ", curBlock);
      }
      fetchBlock();
    }, []);
  
    useEffect(() => {
      if (curBlock != null) {
        setCurChannel(curChannel => [...curChannel, curBlock]); // edit to update the channel object
      }
    }, [curBlock]);
  }
  
  async function createGblock(str_content, username){
    const type_str = contentParser(str_content);
    const blockId = short.generate();
    const blockIs = new gBlock(username, doc_id, type_str.type, type_str.str_input, blockId);
    console.log("gblocks content is ", blockIs.data.content)
    await blockIs.setMQL()
    return blockIs;
  }

  function AddToDocCollection(block) {
    const [curBlock, setCurBlock] = useState(null);
    console.log("add to doc block to collection: ", curBlock);
  
    useEffect(() => {
      async function fetchBlock() {
        const blockRequest = await block;
        setCurBlock(blockRequest);
      }
      fetchBlock();
    }, []);
  
    useEffect(() => {
      async function setNewBlock() {
        if (curBlock != null) {
          console.log("block is here and we will add it a subcollec: ", curBlock);

          const docRef1 = doc(database, "channels", doc_id);
          const docSnap = await getDoc(docRef1);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setChannelDoc(docSnap.data());
            //await updateDoc(docRef, {lock: false});
          }


          // Get a reference to the Firestore document
          const docRef = doc(database, "channels", doc_id);
          const subColRef = collection(docRef, "blocks"); 
          const subBlockRef = doc(subColRef, curBlock.data.unique_id);
      
          // Update the document with the new block object
          // await addDoc(subColRef, curBlock.data);
          await setDoc(subBlockRef, curBlock.data);
          // after the doc is added we need to update the channel object with a list of ids of the blocks
          await updateDoc(docRef, {blocks: [...docSnap.data().blocks, curBlock.data.unique_id]});
        }
      }
      setNewBlock();
    }, [curBlock]);
  }

  //let tempgBlock = createGblock("https://github.com/filecoin-project/devgrants/issues/706", "omo");
  //console.log(tempgBlock)
  //AddToDocCollection(tempgBlock);


  // We need to call the channel data from the database, and then set it to the channel object
  // We need to call the blocks data from the database, and then set it to the channel objec

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
    // to make work with c.hannel
    if (active.id !== over.id) {
      console.log("active id: ", active.id.unique_id);
      console.log("over id: ", over.id.unique_id);

      const swap_item1 = active.id.unique_id; // = "fewf232321"
      const swap_item2 = over.id.unique_id; // = "fqr3io23nr"
      
      // We need to swap the blocks in the channel document
      async function swapBlocks() {
        // Get a reference to the Firestore document
        const docRef = doc(database, "channels", doc_id);
        const docSnap = await getDoc(docRef);
        const blocks = docSnap.data().blocks;

        // Get the index of the blocks
        let active_index = blocks.indexOf(swap_item1);
        let over_index = blocks.indexOf(swap_item2);


        let swapped = arrayMove(blocks, active_index, over_index);
        console.log("original order: ", blocks);
        console.log("swapped: ", swapped);

        await updateDoc(docRef, {blocks: swapped});
      }

      swapBlocks();
    }
  };


  const [channelDoc, setChannelDoc] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  let [isInput, setisInput] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1"]);
  const [inputValue, setInput] = useState("Untitled Channel");
  const [curImg, setCurImg] = useState("https://d2w9rnfcy7mm78.cloudfront.net/16282437/original_dcabb93a23b54b11f7a09ee29fad2bb1.jpg?1651354853?bc=0");
  const [curChannel, setCurChannel] = useState([]); 


  // Use DocumentData Hook to get the channel data from the database
  
  const [chanDoc, setChanDoc] = useDocumentData(chanRef); //not even set, switch loading, and error
  const [chanBlocks, setChanBlocks] = useCollectionData(blocksRef);
  console.log("at beginning of render, chanDoc is ", chanDoc);

  function orderedBlocks() {
    // Use map to get the data of each block, given the id of the block
    if (chanDoc == null || chanBlocks == null) {
      return;
    }

    const blocks = chanDoc.blocks.map(id => chanBlocks.find(block => block.unique_id === id));
    console.log("sorted blocks are ", blocks);
    return blocks;
  }


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
    
    <Microlink url={"https://open.spotify.com/track/0BSPhsCKfwENstErymcD80?si=f6d0f0e3484c44c0"} apiKey={MyApiKey} media='iframe' size='large'/>
    <div class="h-10"></div>    
    <img className= "object-cover rounded-xl w-[352px] h-[352px]" src={imgURL}></img>
    <div class="h-10"></div>  

    <div class="h-10"></div>    
    <div class="max-h-[352px] max-w-[352px]">
    {/*}  <Tweet tweetId="1607152081122562049" options={{ height: "200" }} /> */}
    </div>
    <Microlink url={"https://www.are.na/block/19574481"} apiKey={MyApiKey} media='iframe' size='large'/>
    <div class="h-10"></div>

    {console.log("channelDoc: ", chanDoc)}
    {console.log("channelBlocks: ", chanBlocks)}
    {console.log(orderedBlocks())}




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
        
        {/* chanDoc.blocks */}
        {chanBlocks !== undefined ? (
          <SortableContext items={orderedBlocks()} strategy={rectSortingStrategy}> 
            {orderedBlocks().map((id) => (
              <SortableItem
                key={id.uniqueId}
                id={id}
                handle={true}
                value={id}
              />
            ))}
          </SortableContext>) : (<div>Loading</div>
        )}
      </Box>
    </DndContext>
  );
};

export default ChannelComponent;