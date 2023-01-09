import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog, Transition } from '@headlessui/react';
import React from "react";
import { useState, useEffect, Fragment} from "react";
import { CheckIcon } from '@heroicons/react/20/solid';
import Microlink from '@microlink/react'
import mql from '@microlink/mql';

const MicorApiKey = 'lZkGxZYQxa4dswvVNDHE5aBgKMEiaKXia4coSoT7';
const MyApiKey = MicorApiKey;

const url = 'https://github.com/afshinea/stanford-cs-229-machine-learning/blob/master/en/refresher-probabilities-statistics.pdf'




function timeSince(date) {
    const elapsed = Math.floor(((Math.floor(Date.now() / 1000)) - date));
  
    var msPerMinute = 60;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
  
  
      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' seconds ago';   
      }
  
      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }
  
      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }
  
      else if (elapsed < msPerMonth) {
          return  + Math.round(elapsed/msPerDay) + ' days ago';   
      }
  
      else if (elapsed < msPerYear) {
          return + Math.round(elapsed/msPerMonth) + ' months ago';   
      }
  
      else {
          return  + Math.round(elapsed/msPerYear ) + ' years ago';   
      }
  
}



export default NiceModal.create(({ data }) => {
  // Use a hook to manage the modal state
  const modal = useModal();
  const [open, setOpen] = useState(true)
  const [isInput, setisInput] = useState("");


  function blockContent(type, content) {

    if (type == "link") {
      return (
          <img src={data.thumbnail} loading="lazy" className= "ModalImage border-2 border-neutral-100 object-scale-down -z-50 rounded-sm w-[100%] h-[100%]" alt="image"/> 
      );
    }
    else if (type == "spotify") {
        return (

            <div className='h-[352px]' dangerouslySetInnerHTML={{ __html: data.iframe}} />
          );
      }
    else if(type == "image") {
      return (
        <img src={content} loading="lazy" className= "ModalImage object-scale-down -z-50 rounded-sm w-[100%] h-[100%]" alt="image"/> 
      );
    }
    else if(type == "video") {
      return (
        <Microlink url={content}  size='large' apiKey={MyApiKey} lazy/>
      );
    }
    else if(type == "text") {
      return (
        <div className="ModalMedia pt-14 ">
          <p className="text-sm max-h-[240px] text-left text-ellipsis overflow-hidden ... ">{content}</p>
        </div>
      );
    }
    // for files no fetch data, just render the link...
    else if(type == "supported-media") {
      return (
          <Microlink url={content} apiKey={MyApiKey} fetchData='false' size='large' className='top-[50%]' />
      );
  }
}

  async function getLinkData() {
    const { MQLdata } = await mql('https://www.youtube.com/watch?v=9bZkp7q19f0', { apiKey: MyApiKey, data: { title: true, description: true, image: true, url: true, publisher: true, date: true, logo: true, video: true}})
    
    console.log(MQLdata)
    //mql.render(MQLdata)

    return ( 
      MQLdata == null && 
      <Microlink apiKey={MyApiKey} fetchData={false} url={data.content} setData={MQLdata}/>) 
      || (MQLdata != null && <Microlink apiKey={MyApiKey} fetchData={false} url={data.content} setData={MQLdata}/>)
    }


  return (
    <div>
        
      
        <Transition.Root show={modal.visible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={modal.hide}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-x-hidden overflow-y-scroll rounded-sm bg-white px-4 pt-12 pb-4 text-left shadow-xl transition-all lg:my-8 lg:w-full max-w-[1040px] max-h-[840px] sm:px-40">
                            <div>
                                
                                <div className='m-auto mb-4'>
                                  {blockContent(data.type, data.content)}
                                </div>
                                
                                

                                <div className="BlockInfo">
                                    <div className='titleIs static'>
                                        <div className='inline-flex static ...'>
                                            <p className='w-[787px] static text-neutral-400 font-semibold text-sm'>{data.title}</p>
                                            
                                        </div>
                                    </div>
                                    <div className='authorIs static'>
                                            <div className='inline-flex ...'>
                                                <p className='w-[787px] static text-neutral-400 text-sm'>Contributed by @{data.author}</p>
                                            </div>
                                        </div>
                                    <div className='updatedIs static'>
                                        <div className='inline-flex ...'>
                                            <p className='w-[787px] static text-neutral-400 text-sm'>Last Updated {timeSince(data.updated_at)}</p>
                                        </div>
                                    </div>
                                    <hr className='my-2'></hr>
                                    
                                    {data.description &&
                                        <div className='descriptionIs static'>
                                            <div className='inline-flex ...'>
                                                <p className='truncate inline-block italic text-sm max-w-[720px] text-neutral-400 font-regular'>{data.description}</p>
                                            </div>
                                        </div>
                                    }
                                </div>

                            
                            </div>
                            <textarea value={isInput} placeholder={"Start typing here or paste link..."} onChange={(e) => setisInput(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) console.log(isInput)}} className="BlockInput" id="message" style={{ width: "100%", padding: "12px", height: "120px", marginTop: "24px", fontSize: '16px', borderRadius: "9px", outlineStyle: 'solid', outlineWidth: 'thin', outlineColor: "#BFBFBF" }} ></textarea>
                            <div className="absolute bottom-0 w-full flex justify-between pb-16 pl-[756px]">
                                
                            </div>

                            <div className="mt-2 sm:mt-2">

                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
    </Transition.Root>

    </div >  );
}
);


