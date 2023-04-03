import { addMessage, getMessages } from "../api/MessageRequests";
import React, { useEffect, useState, useRef } from "react";
import { getUser } from "../api/UserRequests";
import { format } from "timeago.js";
//import InputEmoji from "react-input-emoji"
import { IoIosSend } from "react-icons/io";
import { ImAttachment } from "react-icons/im" 
import { FaRegSmile } from "react-icons/fa"

export default function ChatBox( { chat, currentUser, setSendMessage,  receivedMessage } ){
    const [userData, setUserData] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser]);
    
    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const { data } = await getMessages(chat._id);
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
        };
        if (chat !== null) fetchMessages();
    }, [chat]);

    // Always scroll to last Message
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    // Send Message
    const handleSend = async(e)=> {
        e.preventDefault()
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id)=>id!==currentUser);
        // send message to socket server
        setSendMessage({...message, receiverId})
        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }catch{
            console.log("error")
        }
    }
    // Receive Message from parent component
    useEffect(()=> {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[receivedMessage])
    
    const scroll = useRef();
    const imageRef = useRef();
    return (
        <div className="flex flex-col space-y-3">
            {/* chat-header */}
            <div className="flex flex-col p-4 bg-[#9181db] rounded-[2rem] ">
                <div className="flex space-x-3 text-white">
                    <img src={ userData?.profilePicture ? userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="Profile"
                        className="followerImage w-16 h-16 rounded-full"
                    />
                    <div className="font-medium flex flex-col">
                        <span> {userData?.firstname} {userData?.lastname} </span>
                        <span className="text-xs text-[#4a475b] ">{userData?.livesIn }</span>
                    </div>
                </div>
            </div>
            {/* chat-body */}
            <div className="flex flex-col overflow-y-scroll h-[555px] scrollbar-hide pl-5 pr-5 py-3 bg-slate-100 rounded-[1.5rem]">
                {messages.map((message,index) => (
                    <div className={`flex flex-col mb-4 ${message.senderId === currentUser ? 'self-end items-end' : ''}` } key={{index}}>
                        <div ref={scroll} className= {`p-3 w-fit break-all max-w-2xl   mb-1 rounded-2xl ${message.senderId === currentUser ? 'bg-indigo-400 rounded-br-none text-white ' : ' bg-[#d1def8] text-gray-700 rounded-bl-none'} `} >
                            {message.text}
                        </div>
                        <p className={`text-xs ml-1 text-gray-400 ${message.senderId === currentUser ? ' place-self-end content-end' : 'place-self-start'}` }>{format(message.createdAt)}</p>
                    </div>
                ))}
            </div>
            {/* chat-sender */}
            <div className="flex justify-between space-x-3 items-center p-5 bg-white rounded-[2rem]">
                <input type="text" placeholder="TYPE A  MESSAGE" className=" border-none outline-none bg-gray-200 rounded-3xl px-5 py-3 text-xs w-5/6 h-12 shadow-lg" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} />
                <FaRegSmile className="text-gray-300 h-8 w-8 cursor-pointer"/>
                <ImAttachment className="text-gray-300 h-7 w-7 mr-2 cursor-pointer " onClick={() => imageRef.current.click()} />
                <button onClick = {handleSend} className="button rounded-full hi py-2.5 px-2.5 ">
                    <IoIosSend className="text-white h-6 w-6 relative right-0.5 "/>
                </button>
                <input type="file" ref={imageRef} className='hidden' />
            </div>{" "}
        </div>
    );
};

