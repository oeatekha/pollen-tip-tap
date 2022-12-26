import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
// import filterUtil from a folder above
import { sorter } from '../filterUtil.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// create a prop that will be passed from the button to the parent component on click
// create a state
// create a function that will set the state to the prop
// pass the function to the button
// pass the state to the parent component
// you have to reset the state to an empty string in the parent component once the state is passed to the parent component




export default function Example() {
    const [sortIs, setSortIs] = useState('')
    const [nameIs, setNameIs] = useState('')
    console.log(sortIs)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-md justify-center rounded-2xl border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-200 focus:outline-none focus:text-gray-800 focus:bg-gray-50">
          Sort | {sortIs}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Sort Methods</p>
          </div>
          <div className="py-1">
            
            <Menu.Item onClick = {() => setSortIs('Author')} >
              {({ active }) => (
                // when active, set the state to the prop
                <a
                
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Author
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {() => setSortIs('Newest')}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Newest
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {() => setSortIs('Recently Updated')}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Recently Updated
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {() => setSortIs('Support')}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {() => setSortIs('Type')}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Type
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <form method="POST" action="#">
            <Menu.Item onClick = {() => setSortIs('')}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-red-100 text-red-900' : 'text-red-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Clear Sort
                </a>
              )}
            </Menu.Item>
    
            </form>
          </div>

        </Menu.Items>
      </Transition>
    </Menu>
   
  )
}