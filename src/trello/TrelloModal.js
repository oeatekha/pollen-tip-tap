import { useAriaHidden } from "@chakra-ui/react";
import { Editor, EditorContent, ReactRenderer } from "@tiptap/react";
import { useEffect, useState, Fragment } from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";
import Image from "@tiptap/extension-image";
import tippy from "tippy.js";
import { usePopper } from "react-popper";

// I think we have to do it in here... onclick

export const TrelloModal = (props) => {
  let [isOpen, setIsOpen] = useState(true);
  let [urlIs, seturlIs] = useState("");

  let [showTrello, setTrelloModal] = useState(true);
  let [showTrelloModal, setshowTrelloModal] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function embedLink() {
    console.log(urlIs);
    props.updateUrl(urlIs);
    setIsOpen(false);
    // props.editor.commands.insertContentAt("<p>Hello world</p>");
    props.editor.commands.createParagraphNear();
    props.editor.commands.focus("end");
    props.editor.commands.insertContentAt("<p>Hello world</p>");
  }

  return (
    //maybe return a render and a string....

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    value={urlIs}
                    onChange={(e) => seturlIs(e.target.value)}
                    className="bg-neutral-100  block p-1 pl-2 pr-2 w-full left-0 sm:rounded-md focus:border-blue-400 placeholder-neutral-400 border border-neutral-200 focus:outline-none focus:bg-white text-left text-sm"
                    type="text"
                    placeholder="Paste URL"
                  ></input>
                  <p className="mt-2 text-xs text-center text-neutral-500">
                    Embed a link using a URL.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-600 w-full px-2 py-1 text-xs font-medium text-white hover:bg-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={embedLink}
                  >
                    Embed Link
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-white w-full px-2 py-1 text-xs font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                    //On Click I want to insert the content... having some problems can you take a look
                    //onClick={props.editor.commands.insertContent(<h2>yerr</h2>)}
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
  );
};
