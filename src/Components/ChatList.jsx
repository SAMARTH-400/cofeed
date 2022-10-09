import React , { useState , useEffect } from 'react'
import { getUser } from "../api/UserRequests.js";
import { useDispatch } from "react-redux";

export default function ChatList( {data, currentUser, online} ) {
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=> {
        const userId = data.members.find((id)=>id!==currentUser)
        const getUserData = async ()=> {
            try{
                const {data} =await getUser(userId)
                setUserData(data)
                dispatch({type:"SAVE_USER", data:data})
            }catch(error){
                console.log(error)
            }
        }
        getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="py-3 px-4 item-start border-b text-gray-400 bg-white hover:text-[#726A95] hover:shadow-xl hover:scale-105 rounded-3xl w-5/6">
            <div className='flex'>
                {online ? <div className="bg-lime-300 rounded-full h-4 w-4 absolute "></div> : <div className="bg-red-600 rounded-full h-4 w-4 absolute"></div>}
                <img src={userData?.profilePicture? userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile2.png"}
                    alt="Profile"
                    className="followerImage w-14 h-14 rounded-full"
                />
                <div className='flex flex-col pl-5'>
                    <span className='text-lg font-medium'>{userData?.firstname} {userData?.lastname}</span>
                    <span className={`text-sm ${ online ? "text-[#51e200] " : "text-red-600 " }`}> {online ? "Online" : "Offline"} </span>
                </div>
            </div>
        </div>
  );
}
