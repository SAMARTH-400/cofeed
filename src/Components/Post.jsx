/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState , useEffect } from "react";
import { likePost } from "../api/PostsRequests";
import { getUser } from "../api/UserRequests";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { MdModeComment } from 'react-icons/md'

const Post = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [Uploader, setUploader] = useState(null);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);
    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
    };
    useEffect(() => {
        const fetchUploader = async () => {
            const a = await getUser(data.userId);
            setUploader(a.data);
        };
        fetchUploader();
    },[]);
    return(
    <div className="bg-white flex flex-col mt-5 shadow-xl space-y-7 px-16 pt-7 pb-3 w-full">
        <div className="flex justify-between">
            <div className="flex space-x-2">
                <img src={Uploader?.profilePicture ? Uploader.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile2.png" } alt="" className="w-10 h-10 rounded-full" />
                <p className="place-self-center font-semibold text-gray-600  "> {Uploader?.firstname} {Uploader?.lastname} </p>
            </div>
            <p className="text-gray-400 text-sm self-center font-medium">{format(data.createdAt)}</p>
        </div>
        <img src={data.image ? data.image : ""} alt="" className="w-[100%] max-h-96 mb-5 object-cover" /> 
        <div className="">
            <div className="flex space-x-5 mb-3">
                <div className="flex space-x-1">
                    <div className={`cursor-pointer ${liked ? 'text-purple-500' : 'text-gray-300   '}`} onClick={handleLike}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"> <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /> </svg>
                    </div>
                    <span className='text-sm text-slate-400 font-semibold place-self-center'> {likes} Likes </span>                 
                </div>
                <div className="flex space-x-1">
                    <div className='cursor-pointer text-gray-300 place-self-center text-3xl ' >
                        <MdModeComment />
                    </div>
                    <span className='text-sm text-slate-400 font-semibold place-self-center pl-0.5'> 0 Comments </span>                 
                </div>
            </div>  
            <div>
                <span className="font-semibold text-lg "> <b>{data.name} </b> </span>
                <span className=" font-medium   " >{data.desc}</span>
            </div>
        </div>
    </div>
  );
};

export default Post;