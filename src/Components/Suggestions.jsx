import SuggestionModal from "./SuggestionModal";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../api/UserRequests"; 
import { useSelector } from "react-redux";
import UserCard from "./UserCard" ;

export default function Suggestions({location}) {
    const [modalOpened, setModalOpened] = useState(false);
    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
            setPersons(data);
        };
        fetchPersons();
    }, []);

    return (    
        <div className="rounded-xl flex flex-col scale-90 mt-7 overflow-y-scroll scrollbar-hide -mx-1">
            <div className="flex justify-between px-2 text-base font-semibold mb-10 ">
                <h3 className="" >Suggestions for you</h3>
                {!location ? ( <span className="font-medium text-purple-500  cursor-pointer self-center" onClick={() => setModalOpened(true)}>See All</span> ) : ("")}
            </div>
            {persons.map((person, id) => {
                if (person._id !== user._id) return <UserCard person={person} key={id} />;
                return <></>
            })}
            <SuggestionModal modalOpened={modalOpened} setModalOpened={setModalOpened} />  
        </div>
    )
}
