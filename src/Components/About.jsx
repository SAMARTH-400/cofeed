import React, { useEffect, useState } from "react";
import InfoModal from './InfoModal'
import moment from 'moment';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../api/UserRequests.js";

import { MdLocationOn } from 'react-icons/md'
import { MdCake } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { IoMdBriefcase } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io'
import { AiFillProfile } from 'react-icons/ai'

export default function About(){
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);
    const [modalOpened, setModalOpened] = useState(false);
    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) setProfileUser(user);
            else{
                console.log("fetching")
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log(profileUser)
            }
        };
        fetchProfileUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <div className='flex flex-col bg-white py-12 pl-5 text-2xl text-gray-400 w-[95%] relative shadow-lg h-fit mx-auto  '>
            <ul className=' flex flex-col space-y-7'>
                <li className='flex space-x-3'> 
                    <IoIosPerson />
                    <span className='text-gray-600 text-base font-bold '> Name</span>
                    <span className='text-gray-600 text-base'> {profileUser.firstname + " " + profileUser.lastname}</span>
                </li>
                <li className='flex space-x-3'> 
                    <MdLocationOn />
                    <span className='text-gray-600 text-base font-bold '> Lives in</span>
                    <span className='text-gray-600 text-base'> {profileUser.livesIn} </span>
                </li>
                <li className='flex space-x-3'> 
                    <MdCake />
                    <span className='text-gray-600 text-base font-bold '> Birthday</span>
                    <span className='text-gray-600 text-base'> {moment(profileUser.dob).format('DD MMMM')} </span>
                </li>
                <li className='flex space-x-3'> 
                    <AiFillProfile />
                    <span className='text-gray-600 text-base font-bold '> Relationship status </span>
                    <span className='text-gray-600 text-base'> {profileUser.relationship} </span>
                </li>
                <li className='flex space-x-3'> 
                    <FaGraduationCap />
                    <span className='text-gray-600 text-base font-bold '> Profession </span>
                    <span className='text-gray-600 text-base'> {profileUser.jobTitle} </span>
                </li>
                <li className='flex space-x-3'> 
                    <IoMdBriefcase /> 
                    <span className='text-gray-600 text-base font-bold  '> Works At </span>
                    <span className='text-gray-600 text-base'> {profileUser.worksAt} </span>
                </li>
            </ul>

            <div className="z-10 absolute -bottom-7 right-5">
                <div className="bg-[#667ed0] hover:bg-[#879fed] text-white font-medium py-2 px-3 rounded-full cursor-pointer h-14 w-14 pt-3 pl-[0.9rem]" onClick={() => setModalOpened(true)}>  
                    <span className="text-3xl"> <MdEdit /> </span>
                </div>
            </div>
            <InfoModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
        </div>
    )
}
