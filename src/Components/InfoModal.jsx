import React, { useState , useRef } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../actions/UserAction";

export default function InfoModal( { modalOpened, setModalOpened, data } ) {
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const dispatch = useDispatch();
    const param = useParams();
    const imageRef = useRef();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);        
        dispatch(updateUser(param.id, data));
        setModalOpened(false);
    };
    return (
    <Modal overlayColor={ theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[5] }  overlayOpacity={0.55} overlayBlur={5} size="60%" opened={modalOpened} onClose={() => setModalOpened(false)}>   
        <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                </div>
          
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6"> 
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700"> First name </label>
                                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} autoComplete="given-name" className=" mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500  sm:text-sm h-9 pl-2" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700"> Last name </label>
                                            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} autoComplete="family-name" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-2"/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-2">
                                            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700"> Job Title </label>
                                            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-2" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-2">
                                            <label htmlFor="worksAt" className="block text-sm font-medium text-gray-700"> Works At </label>
                                            <input type="text" name="worksAt" value={formData.worksAt} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-2"/>
                                        </div>
                                        
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="livesIn" className="block text-sm font-medium text-gray-700"> City </label>
                                            <input type="text" name="livesIn" value={formData.livesIn} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-2" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2 mt-4">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700"> Date of Birth </label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-5" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2 mt-4">
                                            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700"> Relationship Status </label>
                                            <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-2 focus:border-indigo-500 sm:text-sm h-9 pl-2" />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex items-center">
                                        <input type="file" name="profileImage"ref={imageRef} className="hidden" />
                                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100"> <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg> </span>
                                        <button type="button" onClick={() => imageRef.current.click()} className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"> Change </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"> <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/> </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500" >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" type="file" className="sr-only" name="coverImage"/>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> Save </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
    )
}