// Pollen Block Class
// Author =  User who created the block
// Type =  Datatype fo Content
// Created_At =  time it was created
// Created_At =  time it was created
// Updated_At =  time it was last updated
// Comments =  Collection of Blocks that are comments
// Annotations = Collection of Comment Blocks Pinned to the block.
// Thumbnail =  Image Displaying the Cover
// Supporters = Collection of Users who have voted on the block
// Connections = IDs of other parent collections
// Title = Title of the block
// Description = Description of the block
// Content = Content of the block
// Unique_ID = Unique ID of the block

import collect from "collect.js";
import { filter } from "./filterUtil";

export class equation {
    constructor(filters, oligarchy) {
        // arrays of filters and oligarchy
        this.filters = filters;
        this.oligarchy = oligarchy;
    }

    wSupport = 1; // weight of the support metric
    wComment = 1; // weight of the comment metric
    wConnection = 1; // weight of the connection metric
    wOligarchy = 1; // weight of the oligarchy, affect on support
    wCitizens = 1; // weight of the citizens, affect on support

    setWeights = (wSupport, wComment, wConnection, wOligarchy, wCitizens) => {
        // Set the weights of the equation 
        this.wSupport = wSupport;
        this.wComment = wComment;
        this.wConnection = wConnection;
        this.wOligarchy = wOligarchy;
        this.wCitizens = wCitizens;

        // Make sure the weights are between 0 and 1
        this.wSupport = Math.min(Math.max(wSupport, 0), 1);
        this.wComment = Math.min(Math.max(wComment, 0), 1);
        this.wConnection = Math.min(Math.max(wConnection, 0), 1);
        this.wCitizens = Math.min(Math.max(wCitizens, 0), 1);
        this.wOligarchy = Math.min(Math.max(wOligarchy, 0), 1);
    }

    computeInertia(block) {
        

        let oligarchyCount = 0;
        let supportCount = block.support.items.length;
        
        for (let i = 0; i < this.oligarchy.length; i++) {
            if (block.support.items.includes(this.oligarchy[i])) {
                oligarchyCount++;
            }
        }
        // Calculate Inertia Score
        let supportScore = this.wSupport * (oligarchyCount*this.wOligarchy + (supportCount - oligarchyCount) * this.wCitizens)
        let commentScore = this.wComment * block.comments.items.length;
        let connectionScore = this.wConnection * block.connections.items.length;
        let totalScore = supportScore + commentScore + connectionScore;
        return totalScore;
    }
}


export class pBlock {
  
    // To Construct a block, we utilize, the author, parent_id, type, and content
    constructor(author, parent_id, type, content, unique_id) {
        this.author = author;
        this.parent_id = parent_id;
        this.type = type;
        this.content = content;
        this.unique_id = unique_id;
        this.title = this.unique_id;
        this.thumbnail = this.setThumbnail(type);
    }
  
    created_at = Math.floor(Date.now() / 1000);
    updated_at = this.created_at; //setUpdatedAt()
    comments = collect([]); //addComment()
    annotations = collect([]); //addAnnotation()
    support = collect([]); //addSupport()
    connections = collect([]); //addConnection()
    description = ""; //metadata?
    inertia = 0; //inertia value
    

    // Set the Respective
    

    setThumbnail(type) {
      if (type === "image" || type === "link") {
        return this.content;
      } else {
        return null;
      }
    }

    setUpdatedAt() {
        this.updated_at = Math.floor(Date.now() / 1000);
      }

    setTitle(title) {
        this.setUpdatedAt();
        this.title = title;
    }

    setDescription(description) {
        this.setUpdatedAt();
        this.description = description;
    }

    setContent(content) {
        this.setUpdatedAt();
        this.content = content;
    }

   
    // Modifying Sub Collections in a  Block
    indexCollection(block, parent_collection) {

        // convert the collection to an array and find the index of the block
        let collection = parent_collection.items();
        const isBlock = (element) => element === block;
        var index = collection.findIndex(isBlock);
        return index;
      
    }

    popComment(block) {
        // given a block, pop it from the comment collection
        // utilize indexCollection() in collection function to return where the block is in the parent collection
        let index = this.indexCollection(block, this.comments);
        let parent_collection = this.comments.items;
        parent_collection.splice(index, 1);
        this.comments = collect(parent_collection);  
    }

    popAnnotation(block) {
        // given a block, pop it from the annotation collection
        // utilize indexCollection in collection function to return where the block is in the parent collection
        let index = this.indexCollection(block, this.annotations);
        let parent_collection = this.annotations.items;
        parent_collection.splice(index, 1);
        this.comments = collect(parent_collection);  
    }

    addComment(block) {
        // given a block, add it to the comment collection
        this.comments.push(block);
    }

    addAnnotation(block) {
        // given a block, add it to the annotation collection
        this.annotations.push(block);
    }
  }
  
 export class channel {
    constructor(parent_id, editors, unique_id, inertia_equation = null) {
      this.editors = editors;
      this.parent_id = parent_id;
      this.unique_id = unique_id;
      this.inertia_equation = inertia_equation;
      this.title = "Untitled Channel";
    }

    created_at = Math.floor(Date.now() / 1000);
    updated_at = this.created_at; 
    collaborators = collect([this.editors]);  
    connections = collect([]);
    content = collect([]); 
    blockCount = this.content.items.length;
    description = ""; 
    

    // Inertia Parameters
    
    inertia = null;
    inertia_upperPercentile = 0.25 - 0.2 * (Math.log10(1 + this.blockCount/20)) * 0.5;
    inertia_upperBound = (0.25 - 0.2 * (Math.log10(1 + this.blockCount/20)) * 0.5) * 4 + 1;
  
    setEquation = (equation) => {
        // Set the equation for the channel
        this.inertia_equation = equation;
    }

    getInertia() {
        let channel_temp = this.content.items;
        let f_x = this.inertia_equation;
        channel_temp.forEach(function(block, index) {
            this[index].inertia = f_x.computeInertia(block);
        }, channel_temp);
        
        // Sort the channel by inertia
        channel_temp = channel_temp.sort((a, b) => (a.inertia < b.inertia) ? 1 : -1); // high to low..
        channel_temp = collect(channel_temp.slice(0,this.inertia_upperBound)); // switch to collection
        
        return channel_temp;
        
    }

    setPercentile = (percentage) => {  
        // Set the percentile of the channel
        this.inertia_upperPercentile = Math.min(Math.max(percentage, 0.01), 0.99);
        this.inertia_upperBound = Math.floor(this.blockCount * this.inertia_upperPercentile);
    }

    setBound = (bound) => {
        // Set the bound of the channel
        this.inertia_upperBound = Math.min(Math.max(bound, 1), this.blockCount);
    }

    indexCollection(block, parent_collection) {
        // convert the collection to an array and find the index of the block
        let collection = parent_collection.items();
        const isBlock = (element) => element === block;
        var index = collection.findIndex(isBlock);
        return index;
    }

    addCollaborator(collaborator) {
        this.collaborators.push(collaborator);
    }
  
    addBlock(pBlock) {
      this.content.push(pBlock);
      this.blockCount = this.content.items.length;
    }
  
    addEditor(editor) {
      this.editors.push(editor);
    }

    popBlock(block) {
        // given a block, pop it from the comment collection
        // utilize indexCollection() in collection function to return where the block is in the parent collection
        let index = this.indexCollection(block, this.content);
        let parent_collection = this.content.items;
        parent_collection.splice(index, 1);
        this.content = collect(parent_collection);  
    }

    removeEditor(editor) {
        let index = this.indexCollection(editor, this.editors);
        let parent_collection = this.editors.items;
        parent_collection.splice(index, 1);
        this.editors = collect(parent_collection);
    }
  
    setInertia(inertia_funciton) {
        this.inertia_funciton = inertia_funciton;
    }
  
    setUpdatedAt() {
        this.updated_at = Math.floor(Date.now() / 1000);
    }

    setTitle(title) {
        this.setUpdatedAt();
        this.title = title;
    }

    setDescription(description) {
        this.setUpdatedAt();
        this.description = description;
    }
}