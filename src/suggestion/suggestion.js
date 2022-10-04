import { useAriaHidden } from "@chakra-ui/react";
import { ReactRenderer } from "@tiptap/react";
import { useEffect, useState, Fragment } from "react";

import tippy from "tippy.js";

import CommandsList from "./CommandsList.jsx";
import Image from "@tiptap/extension-image";
import MyModal from "./MyModal"

import { Popover, Tab, Dialog, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import Script from "next/script";
import {TrelloExtension} from "../trello/TrelloExtension";


export const MyDialog = () => {

  return (
    <Dialog open={true} onClose={() => false}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => (false)}>Deactivate</button>
        <button onClick={() => (false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  )
}

function MyTabs ({toggleModal}) {
  
  console.log("set true")

  return (
    toggleModal = true
  )
}

function ModalMy() {
    // let [isOpen, setIsOpen] = 
  
    // function closeModal() {
    //   setIsOpen(false)
    // }
  
    // function openModal() {
    //   setIsOpen(true)
    // }
  
    
    return (
        window.prompt("fuduge"),
      <>
        {/*
        <div className="fixed inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-sm bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Open dialog
          </button>
        </div>
        */}
        
          <Transition appear show={true} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={console.log("here 1")} >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-neutral-600 bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-2 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xs transform overflow-hidden text-center rounded-md bg-white p-2 pl-4 pr-4 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Embed Link
                    </Dialog.Title>
                    <div className="mt-2">
                    <input 

                                    className= "bg-neutral-100  block p-1 pl-2 pr-2 w-full left-0 sm:rounded-md focus:border-blue-400 placeholder-neutral-400 border border-neutral-200 focus:outline-none focus:bg-white text-left text-sm" 
                                    type="text" 
                                    placeholder ="Paste URL">
                                </input>
                      <p className="mt-2 text-xs text-center text-neutral-500">
                        Embed a link using a URL.
                      </p>
                    </div>
  
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-neutral-600 w-full px-2 py-1 text-xs font-medium text-white hover:bg-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={console.log("here 2")}
                      >
                        Embed Link
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-white w-full px-2 py-1 text-xs font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={console.log("here 3")}
                      >
                        Cancel
                      </button>
                      
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        
      </>
    )
  }
  

function noScroll(){
  window.scrollTo(0,0);
  console.log("pause scorlling");
}

function startScroll(){
  window.scroll();
}







export default {
  items: ({ query }) => {
    return [
      {
        title: "Text",
        command: 
        
        ({ editor, range }) => {
        
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("paragraph")
            .run();
        },
      },
      {
        title: "Heading",
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      // {
      //   title: "Bold",
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).setMark("bold").run();
      //   },
      // },
      // {
      //   title: "Italic",
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).setMark("italic").run();
      //   },
      // },
      {
        title: "Image",
        command: ({ editor, range }) => {
          const url =  window.prompt('');
          editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
        },
      },
      {
        title: "Trello",
        subtitle: "Create or embed card",
        isIntegration: true,
        command: ({ editor, range }) => {

          editor.chain().focus().deleteRange(range).clearNodes().unsetAllMarks().run()
          editor.commands.showTrello(editor, range); //here i think we can extract something if the functionr return a value
        
        }
      },
  
      {
        title: "Video",
        command: ({ editor, range }) => {
        },
      },
      {
        title: "Music",
        command: ({ editor, range }) => {
        },
      },
      {
        title: "URL",
        command: ({ editor, range }) => {
        },
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        
        component = new ReactRenderer(CommandsList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }
        //noScroll();
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: (component.element ),
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start"
        });

        //document.body.style.overflow = "auto";

      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
      

    }
  },
}
