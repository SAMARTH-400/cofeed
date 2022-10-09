/* eslint-disable react-hooks/exhaustive-deps */
import Post from "../Components/Post";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../actions/PostsAction";


export default function Feed() {
    const params = useParams()
    const dispatch = useDispatch();
    let { posts, loading } = useSelector((state) => state.postReducer);
    const { user } = useSelector((state) => state.authReducer.authData);
    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    },[]);
    
    if(!posts) return 'No Posts';
    if(params.id) posts = posts.filter((post)=> post.userId===params.id)
    return (
        <div className="flex flex-col place-items-center w-[95%] scroll-smooth"> 
            { loading ? "Fetching posts...." : posts.map((post, id) => <Post data={post} key={id} />) }
        </div>
    );
}



