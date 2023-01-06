import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
// import filterUtil from a folder above
import { sorter } from '../filterUtil.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// create a prop that is passed from the parent component to the button on click
// the prop -> function(block_id) -> onClick delete block
// deleteBlock(block_id) -> delete block
// created in the parent component (ChannelComponent.jsx)
// passed into SortableContent.jsx as a prop, basically a block.
// Once passed in we have a function that will delete the block from the database... 
// Pass the deleteBlock(block_id) function the button. Delete Block
// Parent -> SortableContent.jsx -> ChannelComponent -> blockDrop.jsx -> button





export default function blockDrop(delete_fx, unique_id, canUserEdit) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex-row justify-center items-center px-1 py-0.5 bg-gray-100/80 font-black border-transparent text-md text-neutral-400 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:text-gray-800 text-neutral-400 focus:bg-gray-50">⋮</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Settings</p>
          </div>
          <div className="py-1">
            

            <Menu.Item onClick = {() => console.log("Copy Block Link")}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Copy Block
                </a>
              )}
            </Menu.Item>
        </div>
        {canUserEdit &&
          <div className="py-1">
            <form method="POST" action="#">
            <Menu.Item onClick = {() => delete_fx(unique_id)}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-red-100 text-red-900' : 'text-red-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Delete Block
                </a>
              )}
            </Menu.Item>
    
            </form>
          </div>
          }


        </Menu.Items>
      </Transition>
    </Menu>
   
  )
}