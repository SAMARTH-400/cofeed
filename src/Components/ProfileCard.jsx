import React from "react";
import { useSelector } from "react-redux";


export default function ProfileCard() {
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state)=>state.postReducer.posts)
    const userPosts = posts.filter( (post)=>post.userId === user._id)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="flex flex-col relative w-[95%] mt-5">
            <div className="relative flex flex-col justify-center items-center ">
                <img src={ user.coverPicture  ? user.coverPicture   : serverPublic + "sam3.jpg"} alt="CoverImage"  className="w-full h-80 object-cover "/>
                {user.profilePicture ?
                    <img src={user.profilePicture} alt="ProfileImage" className="w-32 h-32 absolute -bottom-16 left-24 rounded-full"  />: 
                    <div className="rounded-full absolute -bottom-16 left-24  p-10 hi"> <img src={serverPublic + "defaultProfile3.png"} alt="ProfileImage" className="w-16 h-16"  /> </div>
                }
                <div className=" text-white absolute bottom-3 left-64  flex flex-col z-10">    
                    <span className="text-2xl font-medium"> {user.firstname} {user.lastname} </span>
                    <span className="text-sm"> {user.livesIn}</span>
                </div>
            </div>
            <div className="bg-white pl-72 flex py-3"> 
                <div className="flex flex-col border-r-2 pr-20" >
                    <span className="flex text-xl font-bold justify-center">{user.followers.length}</span>
                    <span className="text-lg text-gray-400 font-medium">followers</span>
                 </div>
                <div className="flex flex-col border-r-2 px-20" >
                    <span className="flex text-xl font-bold justify-center">{user.following.length}</span>
                    <span className="text-lg text-gray-400 font-medium">following</span>
                </div>
                <div className="flex flex-col px-20" >
                    <span className="flex text-xl font-bold justify-center">{userPosts.length}</span>
                    <span className="text-lg text-gray-400 font-medium">posts</span>
                </div>
            </div>
        </div>
    )
}
