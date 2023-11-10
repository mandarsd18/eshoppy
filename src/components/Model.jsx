import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

const Model = ({name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow}) => {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
         <button
              type="button"
              onClick={openModal}
              className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold "
            >
              Buy Now
            </button>
          
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center mt-3">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl   text-left align-middle mt-11 shadow-xl transition-all bg-gray-50">

                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-3 md:py-8 mx-auto  lg:py-0">
                                          
                                            <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                                                <div className="p-3 md:p-6 space-y-4 md:space-y-6">

                                                    <form className="space-y-2 md:space-y-6" action="#">
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input  type="name" name="name" id="name" className=" border-2  border-gray-200 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 md:p-2.5 bg-gray-100" required 
                                                                placeholder='Enter Your name '
                                                                value={name}
                                                                onChange={(e)=>setName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input type="email" name="email" id="email" className=" border-2  border-gray-200 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 md:p-2.5 bg-gray-100" required placeholder='Enter your email id'
                                                                //  value={}
                                                                // onChange={(e)=>setName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input type="text" name="pincode" id="pincode" className=" border-2  border-gray-200 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 md:p-2.5 bg-gray-100" required placeholder='Enter your pincode'/>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input type="number" name="mobileNumber" id="mobileNumber" className=" border-2  border-gray-200 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 md:p-2.5 bg-gray-100"
                                                            placeholder='Enter your mobile number' required />
                                                        </div>

                                                    </form>
                                                    <button onClick={()=>{buyNow(); closeModal()}} type="button" className="focus:outline-none w-full text-white bg-violet-600 bg-indigo-500 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Order Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Model
