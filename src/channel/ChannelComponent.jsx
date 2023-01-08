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
import {contentParser, isValidUrl, urlType} from "./stringParser.js";
import {database, storageIs} from "./firebase.js"
import {ref, uploadBytes, getStorage, getDownloadURL} from "firebase/storage";
import { doc, collection, setDoc, addDoc, DocumentReference, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useDocument, useCollection, useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import toast, { Toaster } from 'react-hot-toast';
import blockModal from "./blockModal.jsx";
import NiceModal from '@ebay/nice-modal-react';
import Microlink from '@microlink/react'



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

  function uploadFile(fileUpload) {
    // if the file is not there, then dont return
    if (fileUpload == null) {
      return;
    }

    // file ref should be the ref storageIs, files/short.generate() and the original file name
    console.log("File Nmae is ", fileUpload.name);
    const fileRef = ref(storageIs, `files/${short.generate()}`);
    //const fileRef = ref(storageIs, `files/${short.generate()}`);

    // Upload the file to Firebase Storage
    return uploadBytes(fileRef, fileUpload).then(snapshot => {
      // Wait for the upload to complete
      // alert("Uploaded a file!");
      return getDownloadURL(fileRef).then((url) => {
        console.log(url);
        return url;
      });
    });
  }

  // Function using toast to display the loading process of the file

  function handleTextUpload(text) {
    async function createBlock() {
      const load = toast.loading('Loading...');
      const blockIs = await createGblock(text, userIs);
      
      toast.dismiss(load);
      toast.success('Successfully Uploaded!');

      // Update the document with the new block parameters
      
      // if just text not a url, then set the type to text
      if (isValidUrl(text).type == "text") {
        blockIs.setTitle("");
        blockIs.setType("text");
      }

      console.log("block is ", blockIs);

      // Add the block to the channel, then add the block to the channel document      
      const docRef = doc(database, "channels", doc_id);
      const subColRef = collection(docRef, "blocks"); 
      const subBlockRef = doc(subColRef, blockIs.data.unique_id);
      let adding = toast.loading('Adding Block...');
      const docSnap = await getDoc(docRef);

      await setDoc(subBlockRef, blockIs.data);
      await updateDoc(docRef, {blocks: [...docSnap.data().blocks, blockIs.data.unique_id]});
      toast.dismiss(adding);
      toast.success('Block added!');
      setisInput("");
    }

    createBlock();
  }

  function handleFileUpload(file) {
    setFileUpload(file);
    async function createBlock() {

      // Upload content to firebase storage
      const fileType = urlType(file.type);
      const load = toast.loading('Loading...');
      const content = await uploadFile(file);
      const blockIs = await createGblock(content, userIs, true); // actually dont need the await but for good p
      toast.dismiss(load);
      toast.success('Successfully Uploaded!');

      // Update the document with the new block parameters
      blockIs.setTitle(file.name);
      blockIs.setType(fileType);
      console.log("block is ", blockIs);

      // Add the block to the channel, then add the block to the channel document      
      const docRef = doc(database, "channels", doc_id);
      const subColRef = collection(docRef, "blocks"); 
      const subBlockRef = doc(subColRef, blockIs.data.unique_id);
      let adding = toast.loading('Adding Block...');
      const docSnap = await getDoc(docRef);

      await setDoc(subBlockRef, blockIs.data);
      await updateDoc(docRef, {blocks: [...docSnap.data().blocks, blockIs.data.unique_id]});
      toast.dismiss(adding);
      toast.success('Block added!');
    }

    createBlock();
  }
  
  async function createGblock(str_content, username, upload=false){
    const type_str = contentParser(str_content);
    const blockId = short.generate();
    const blockIs = new gBlock(username, doc_id, type_str.type, type_str.str_input, blockId);
    console.log("gblocks content is ", blockIs.data.content)
    
    // dont run mql if...it is an image or supported-media type then just return, else run mql
    if(type_str.type != "text" && upload == false){
      await blockIs.setMQL()
    }
    return blockIs;
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
  const [fileUpload, setFileUpload] = useState(null);
  const [isInput, setisInput] = useState("");
  const [activeId, setActiveId] = useState(null);
  

  const [inputValue, setInput] = useState("Untitled Channel"); // inherit from channel
  const [chanDoc, chanLoading, chanError, chanSnapshot] = useDocumentData(chanRef); //not even set, switch loading, and error
  const [chanBlocks, blockLoading, blockError, blockSnapshot] = useCollectionData(blocksRef);
  const [editorList, setEditorList] = useState([]);

  //console.log("Content Parse is ", contentParser("https://firebasestorage.googleapis.com/v0/b/pollen-rich-media.appspot.com/o/files%2F000055700002.jpgdRkoxp61vPh8vRZjKqMJhz?alt=media&token=e357a4a8-bf38-4c19-8643-55d2002997a8"));
  // Set input value to channel name

  useEffect(() => {
    async function fetchChannel() {
      const channelRequest = await getDoc(chanRef);
      console.log("channel request is ", channelRequest.data().title)
      setEditorList(channelRequest.data().editors);
      
      setInput(channelRequest.data().title);
    }
    fetchChannel();
  }, []);

  useEffect(() => {
    if(inputValue != "Untitled Channel"){
      updateTitle(inputValue);
    }
  }, [inputValue]);

  function orderedBlocks() {
    // Use map to get the data of each block, given the id of the block
    if (chanDoc == null || chanBlocks == null) {
      return;
    }

    const blocks = chanDoc.blocks.map(id => chanBlocks.find(block => block.unique_id === id));
    console.log("sorted blocks are ", blocks);
    return blocks;
  }

  // Add support to block in channel document
  // given a username and a block, if the block is not already supported, add the username to the block's support array
  // given a username and a block, if the block is already supported, remove the username from the block's support array
  async function SupportBlock(user, unique_id){
    const blockRef = doc(database, "channels", doc_id);
    const subColRef = collection(blockRef, "blocks"); 
    const subBlockRef = doc(subColRef, unique_id);
    const blockSnap = await getDoc(subBlockRef);

    console.log(blockSnap);
    const blockData = blockSnap.data();
    // Fix from here dont use block snap.. just do whatever you did above with adding a block to a channel...
    console.log("Ran support block with user: ", user, " and block: ", blockData)

    if(blockData.support.includes(user)){
      // remove user from support array
      console.log("user is already in support array, removing user from support array");
      let supporters = blockData.support;
      const newSupport = supporters.filter(e => e !== user);
      await updateDoc(subBlockRef, {support: newSupport});
    } else {
      // add user to support array
      console.log("user is not in support array, adding user to support array");
      await updateDoc(subBlockRef, {support: [...blockData.support, user]});
    }
  }

  async function deleteBlock(unique_id){
    // Delete the block from the blocks collection
    // should it just be the author that can delete the block? or should it be the channel owner?


    const blockRef = doc(database, "channels", doc_id);
    const subColRef = collection(blockRef, "blocks"); 
    const subBlockRef = doc(subColRef, unique_id);
    const blockSnap = await getDoc(subBlockRef);

    console.log(blockSnap);
    const blockData = blockSnap.data();
    console.log("Ran delete block with block: ", blockData)

    // Delete the block from the channel document
    const docRef = doc(database, "channels", doc_id);
    const docSnap = await getDoc(docRef);
    const blocks = docSnap.data().blocks;
    
    // Remove the block from the array
    let newBlocks = blocks.filter(e => e !== unique_id);
    console.log("new blocks are ", newBlocks);

    // Update the channel document
    await updateDoc(docRef, {blocks: newBlocks});

    // Delete the block document
    toast.success("Block Deleted");
    await deleteDoc(subBlockRef);    
    
  }

  

  const AddToDocCollection = (block) => {
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
          const load = toast.loading('Loading...');
          await setDoc(subBlockRef, curBlock.data);
          // after the doc is added we need to update the channel object with a list of ids of the blocks
          await updateDoc(docRef, {blocks: [...docSnap.data().blocks, curBlock.data.unique_id]});
          toast.dismiss(load);
          toast.success('Block added!');
        }
      }
      setNewBlock();
    }, [curBlock]);
  }

  // AddToDocCollection(createGblock("https://github.com/fullstackreact/google-maps-react/issues/426", "eesha"));

  console.log(createGblock("https://open.spotify.com/track/1oERlssLrpssCAY6Yqqs6c?si=3c4dd83f983b4ad8", "eesha"));

  async function updateTitle(newTitle) {
    try{
      await updateDoc(chanRef, {title: newTitle});
    }
    catch (error) {
      console.log("error updating channel name: ", error);
    }
  }



  const showBlockModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show(blockModal, { data: 'Omoruyi' })
  };

  // let tempgBlock = createGblock("https://www.entropyplus.xyz/image/72901/", "eesha");
  // console.log(tempgBlock)
  // AddToDocCollection(tempgBlock);

  return (
    
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      className="container content-center mx-auto"
    >
    
    {/*<Microlink url={"https://open.spotify.com/track/0BSPhsCKfwENstErymcD80?si=f6d0f0e3484c44c0"} apiKey={MyApiKey} media='iframe' size='large'/>
    <div class="h-10"></div>    
    <div class="max-h-[352px] max-w-[352px]">
    {/*}  <Tweet tweetId="1607152081122562049" options={{ height: "200" }} /> *
    </div>
    <Microlink url={"https://www.are.na/block/19574481"} apiKey={MyApiKey} media='iframe' size='large'/>
  */}

      <Box className="ChannelContainer"
        flex={true}
        wrap={true}
        direction="row"
        margin="auto"
        style={{maxWidth: "754px", borderRadius: "13px"}}
      >

        <Toaster containerStyle={{position: 'relative', left: '50%', top: 20 }} reverseOrder={false} toastOptions={{className: "toast"}}/>
        <div class="content-left container items-center flex flex-wrap items-center justify-between w-[736px]  py-1">
          
        
            <div class="flex space-x-2 pt-2 mx-4">
              {/*Take in the value from the channel of the current title
              and update the title of the channel when the user is done typing
              */}
              
              <AutosizeInput
                class="flex space-x-4 pl-1 h-[30px] w-auto max-w-[140px] truncate resize-none font-medium font-size-small text-gray-400"
                autocomplete="off"
                placeholder="Untitled"
                name="form-field-name"
                value={inputValue}
                onChange={function(event) {
                  // update the title of the channel
                  setInput(event.target.value)
                  updateTitle(event.target.value)
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
        
        <Collapsible overflowWhenOpen='visible' transitionTime='100' trigger={<hr class="mx-[12px] py-1 w-[720px]"></hr>}>
          <div class="content-left container flex flex-wrap items-center justify-between w-[728px] mx-2 pb-1">
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
          <div className="AdditionBlock relative flex justify-center"
            style={{
              width: "352px",
              height: "352px",
              borderRadius: "5px",
              margin: "10px",
              backgroundColor: "#ECECEC",
              fontSize: "14px",
              alignContent: "center",
            }}
          >
            
            <textarea value={isInput} placeholder={"Start typing here or paste link..."} onChange={(e) => setisInput(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) handleTextUpload(isInput)}} className="BlockInput" id="message" style={{ width: "95%", padding: "12px", height: "95%", margin: "8.5px", fontSize: '16px', borderRadius: "3px" }} ></textarea>            {console.log("isInput: ", isInput)}
            <div className="absolute bottom-0 w-[312px] flex justify-between pb-5">

              <label htmlFor="myFile" className="items-center cursor-pointer bg-neutral-600 hover:bg-neutral-700 border-none shadow-md text-white font-medium py-1 px-2 rounded-md text-base m-0.5  flex justify-center">
                Upload File
              </label>
              <input id="myFile" style={{display: 'none'}} type="file" onChange={(event) => { handleFileUpload(event.target.files[0]); }}/>
              {console.log("fileUpload: ", fileUpload)}

              <button onClick={() => handleTextUpload(isInput)} className="bg-neutral-400 hover:bg-neutral-500 border-none shadow-md text-white font-medium py-1 px-2 rounded-md">
                +Add
              </button>
            </div>
          </div>
        </Box>
        
        {/* chanDoc.blocks */}
        {chanBlocks !== undefined ? (
          // I want to pass in the userID and the channelID to the sortable context

          <SortableContext items={orderedBlocks()} strategy={rectSortingStrategy}> 
            {orderedBlocks().map((id) => (
              <SortableItem
                key={id.unique_id}
                id={id}
                userIs={userIs}
                channelIs={doc_id}
                handle={true}
                editorList={editorList}
                value={id}
                SupportBlock={SupportBlock}
                deleteBlock={deleteBlock}
              />
            ))}
          </SortableContext>) : (<div>Loading</div>
        )}
      </Box>
    </DndContext>
  );
};

export default ChannelComponent;