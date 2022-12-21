import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { filter } from '../filterUtil.js'
import { Button } from '@chakra-ui/react'
 

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// create a prop that will be passed from the button to the parent component on click
// create a state
// create a function that will set the state to the prop
// pass the function to the button
// pass the state to the parent component
// you have to reset the state to an empty string in the parent component once the state is passed to the parent component
 
// if the filters is an array of values, then you have to pass the array to the parent component, of the filter to be added
// f = [ [ ["t", "music"], [d], [s, 34], ] , [ ["t", "music"], [d], [s, 34], ]
// function addFilter(f){

let f = [ ["t", "Music"], ["d", "1212529"], ["author", "omo"]] //list of filters




class FilterObject {
  // filter object with every object: type, date, support, author
  dataType = null;
  date = null;
  support = null;
  author = null;

}

let filterObject = new FilterObject();
let filterObjectEmpty = new FilterObject();


export default function Filter() {
    

    const [filterObj, setFilterObj] = useState(filterObject)

    let typeButton = null;
    let dateButton = null;
    let authorButton = null;
    let supportButton = null;
    
    //console.log('we are rendering the filter')
    function updateFilter(type, value){
        let newFilters = filterObj;
        newFilters[type] = value;
        setFilterObj(newFilters);
        console.log("Im here in update filter", filterObj);
 
        if(type == "dataType") {
          console.log("data type is", value)
          if (filterObj[type] != null){
            console.log("contains type filter")
            typeButton = <Button className='border-gray-300 p-2 font-medium rounded-lg text-sm text-gray-300'>
            type | </Button>;
          }
          else{
            typeButton = null;
          }  
          console.log("typebutton is ", typeButton)
        }
        
    }
       





    return (
      // Filter List of the varuious filters, and the add filter button
      // so the filter list will be a list of filter in the form of a list
      // for every filter there will be a button that will remove the filter and update the filter

    
      <div className="relative pl-2 space-x-1 inline-block flex-row">
        <div className="inline-block">
          {typeButton}
        </div>
        <Menu as="div" className="relative rounded-lg inline-block text-left">

        <div>
          <Menu.Button className="inline-flex w-md justify-center rounded-md border border-transparent bg-white px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-200 focus:outline-none focus:text-gray-400 focus:bg-gray-50">
            + Add Filter   
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
              <p className="text-sm">Filters</p>
            </div>
            <div className="py-1">
              
              <Menu.Item onClick = {() => updateFilter("Author", "")} >
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
              <Menu.Item onClick = {() => updateFilter("Support", "")} >
                {({ active }) => (
                  // when active, set the state to the prop
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
              <Menu.Item onClick = {() => updateFilter("Date", "")}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Date
                  </a>
                )}
              </Menu.Item>
              <Menu.Item onClick = {() => updateFilter("dataType", "Image")}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Image
                  </a>
                )}
              </Menu.Item>
              <Menu.Item onClick = {() => updateFilter("dataType", "Link")}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Link
                  </a>
                )}
              </Menu.Item>
              <Menu.Item onClick = {() => updateFilter("dataType", "Text")}> 
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Text
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <form method="POST" action="#">
              <Menu.Item onClick = {() => setFilterObj((new FilterObject()))}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-red-100 text-red-900' : 'text-red-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Reset Filters
                  </a>
                )}
              </Menu.Item>
              </form>
            </div>

          </Menu.Items>
        </Transition>
        </Menu>
      </div>
      
        

   
  )
}

