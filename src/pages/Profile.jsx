import React from 'react'
import Sidebar from '../Components/Sidebar'
import ProfileCard from '../Components/ProfileCard'
import Feed from '../Components/Feed'
import About from '../Components/About'
 
export default function Profile() {
    return (
        <div className='flex h-screen bg-[#e7edfa]'>
            <Sidebar />
            <div className='bg-[#e7edfa] ml-[17%] w-full mr-[16%] h-fit flex flex-col items-center'>
                <ProfileCard />
                <Feed />
            </div>
            <div className='w-[16%] h-screen fixed right-0 bg-gray-100 pt-5'>
                <About />
            </div>
        </div>
    )
}
