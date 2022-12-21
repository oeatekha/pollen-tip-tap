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



function filterValue(filter, filterList){
    // check if filter is in list
    for (let i = 0; i < filterList.length; i++) {
        if (filterList[i][0] === filter[0]) {
            return filterList[i][1]
        }
    }
    return null
}



function removeFilter(curFilter, filterList){
    // if the filter type is already in the list, we should replace it
    // if the filter type is not in the list, we should add it
    // imaging there is a type filter in the list we should check if the value is the same, if not add if so, replace
    for (let i = 0; i < filterList.length; i++) {
        if (filterList[i][0] === curFilter[0]) {
            filterList.splice(i, 1)
            return filterList
        }
    }
    return filterList
}

function resetFilter(){
    return []
}




export default function Filter() {




    const [filters, setFilters] = useState([])
    console.log(setFilters)
    let typeButton;
    let dateButton;
    let authorButton;
    let supportButton;

    function addFilter(curFilter){
        // if the filter type is already in the list, we should replace it
        // if the filter type is not in the list, we should add it
        // imaging there is a type filter in the list we should check if the value is the same, if not add if so, replace
        for (let i = 0; i < filters.length; i++) {
            if (filters[i][0] === curFilter[0]) {
                filters[i][1] = curFilter[1]
                setFilters(filters)
                renderFilterBar()
                return
            }
        }

        filters.push(curFilter)
        filters.push(["Author", "Omo"])
        setFilters(filters)
        console.log("filters is ", filters)
        renderFilterBar()
        return
    }

    function filterinList(fil, filters){
      for (let i = 0; i < filters.length; i++) {
          if (filters[i][0] === fil[0]) {
              return true
          }
      }
      return false
    }

    function renderFilterBar(){
      if(filterinList(["Type", ""], filters)) {
        let filtVal = filterValue(["Type", ""], filters)
        console.log("fltval is ", filtVal)
        typeButton = <Button className='border-gray-300 p-2 font-medium rounded-lg text-sm text-gray-300'>
         Type | {filtVal} </Button>;
        console.log("contains type filter")
     } else {
        typeButton = <div></div>
     }
    }

    renderFilterBar();


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
              
              <Menu.Item onClick = {() => setFilters('type')} >
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
              <Menu.Item onClick = {() => setFilters('date')}>
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
              <Menu.Item onClick = {() => setFilters('date')}>
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
              <Menu.Item onClick = {() => setFilters('support')}>
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
              <Menu.Item onClick = {() => addFilter(["Type", "Text"], filters)}> 
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
              <Menu.Item onClick = {() => setFilters([])}>
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

