import React, { useRef, useState , useEffect } from "react";
import ChatBox from "../Components/ChatBox";
import ChatList from "../Components/ChatList";
import Sidebar from "../Components/Sidebar";

import { userChats } from "../api/ChatRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function Chat() {
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
        try{
            const { data } = await userChats(user._id);
            setChats(data);
        }catch (error) {
            console.log(error);
        }
        };
        getChats();
    }, [user._id]);

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET);
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
        });
    }, [user]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        })
    },[]);
    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };
    return(
        <div>
            <Sidebar />
            <div className=" ml-[17%] bg-[#e7edfa] h-screen flex justify-center items-center p-20">
                <div className="grid grid-cols-6 h-[780px] w-full">
                    <div className="col-span-2 bg-transparent space-y-5">
                        <div className="flex items-center h-20 pl-5 text-gray-400 text-3xl font-semibold rounded-tl-xl"> Chat </div>
                        <input type="text" placeholder="FIND A USER" className=" border-none outline-none px-5 py-3 text-xs h-12 shadow-lg bg-white text-gray-500 placeholder-gray-500  rounded-full w-5/6   " />
                        <div className="flex flex-col space-y-3">
                            {chats.map((chat,index) => (
                                <div onClick={() => setCurrentChat(chat) } key={index}>
                                    <ChatList data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
                                </div>
                            ))}
                        </div> 
                    </div>
                    
                    <div className="col-span-4 flex flex-col gap-4">
                        {
                            currentChat 
                            ? <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
                            : <div className="flex items-center justify-center bg-slate-100 text-gray-300 text-3xl h-[780px]"> Choose a chat to start conversation </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};