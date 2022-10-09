import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../actions/UploadAction";

export default function Upload () {
    const desc = useRef();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const { user } = useSelector((state) => state.authReducer.authData);
    // handle Image Change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };
    const imageRef = useRef();
    const handleUpload = (e) => {
        e.preventDefault();
        console.log("hii sam"); 
        
        const data = new FormData();
        data.append("userId", user._id);          //
        data.append("desc", desc.current.value);  //    
        if(image) {
            const fileName = Date.now() + image.name;
            data.append("image", image, fileName);  //
        }
        try{
            dispatch(uploadPost(data));
        }catch (err) {
            console.log(err);
        }
        resetShare();
    };
    // Reset Post Share
    const resetShare = () => {
        setImage(null);
        desc.current.value = "";
    };
    return (
        <div className="pb-4 justify-center bg-white w-[95%]">
            <div className="flex-row pt-6 space-y-7 ">
                <div className="flex pl-44 ">
                    <input type="text" placeholder="What's happening?" required ref={desc} className=" border-none outline-none bg-gray-200 rounded-3xl px-5 py-3 text-sm w-5/6 h-12 shadow-lg" />
                    <button className="button bg-[rgb(169,116,255)] text-white text-sm font-semibold rounded-4xl ml-5 px-6" onClick={handleUpload}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                <div className="flex space-x-12 pr-30 justify-center font-normal text-gray-500">
                    
                    <div onClick={() => imageRef.current.click()} className="flex space-x-2 cursor-pointer ml-5 hover:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                        <span> Photo </span>
                    </div>

                    <div onClick={() => imageRef.current.click()} className="flex space-x-2 cursor-pointer hover:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg> 
                        <span> Video </span>
                    </div>

                    <div onClick={() => imageRef.current.click()} className="flex space-x-2 cursor-pointer hover:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        <span> Location </span>
                    </div>

                    <div onClick={() => imageRef.current.click()} className="flex space-x-2 cursor-pointer hover:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                        <span> Schedule </span>
                    </div>
                </div>
                <div style={{ display: "none" }}>
                    <input type="file" ref={imageRef} onChange={onImageChange} />
                </div>
                {image && (
                    <div className="relative flex justify-center">
                        <span className="absolute right-16 top-2 cursor-pointer text-white" onClick={() => setImage(null)} > 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                        <img src={URL.createObjectURL(image)} alt="preview" className="w-[90%] max-h-80 object-cover"/>
                    </div>
                )}
            </div>
            </div>
    );
};


