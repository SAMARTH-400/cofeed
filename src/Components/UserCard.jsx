import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser , unfollowUser } from "../actions/UserAction";

export default function UserCard({person}) {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();

    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
    );

    const handleFollow = () => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
        window.location.reload();
    };
    return(
        <div className="flex justify-between items-center mb-5 ">
            <div className="flex space-x-2">
                <img src={ person.profilePicture ? person.profilePicture : publicFolder + "defaultProfile2.png"} alt="profile" className="h-12 w-12 rounded-[50%]"/>
                <div className="flex flex-col items-start justify-center  ">
                    <span className="font-medium text-gray-600  ">{person.firstname +" " + person.lastname}</span>
                    <span className="font-medium text-gray-400 ">@{person.username}</span>
                </div>
            </div>
            <button className={ following ? "bg-gray-300  hover:bg-slate-300 text-gray-500  font-medium py-2 px-6 rounded-lg text-[13px]" : "bg-[rgb(169,116,255)] hover:bg-purple-500 text-white font-medium py-2 px-8 rounded-lg text-[13px]"} onClick={handleFollow}> {following ? "Unfollow" : "Follow"} </button>
        </div>
    )
}
