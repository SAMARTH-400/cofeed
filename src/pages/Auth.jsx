import React, { useState } from "react";
import { logIn, signUp } from "../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const initialState = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: "",
    };
    const loading = useSelector((state) => state.authReducer.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [data, setData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [confirmPass, setConfirmPass] = useState(true);

    const resetForm = () => {
        setData(initialState);
        setConfirmPass(confirmPass);
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const changeForm = () =>{
        resetForm();
        setIsSignUp((prev) => !prev); 
        setConfirmPass(true);                       
    };
    const handleSubmit = (e) => {
        setConfirmPass(true);
        e.preventDefault();
        if(isSignUp)   data.password === data.confirmpass ? dispatch(signUp(data, navigate)) : setConfirmPass(false);
        else    dispatch(logIn(data, navigate));
    };
    
    return(
    <div>
        <div className="flex justify-center items-center lg:backgroung ">
            <div className="w-full h-full lg:h-auto lg:w-[45%] xl:w-[35%] 2xl:w-[30%] bg-white rounded-md lg:shadow-xl ">
                    <div className="flex items-center h-10  w-32 relative px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 text-2xl font-bold text-purple-500 ">
                        <h3>{isSignUp ? "REGISTER" : "LOGIN"}</h3>
                    </div>
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 ">
                    <div className="mt-12">
                        <form onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="mb-5">
                                    <div className="flex justify-between">
                                        <div className="text-sm font-bold text-gray-400 tracking-wide">First Name</div>
                                        <div className="text-sm font-bold text-gray-400 tracking-wide mr-20">Last Name</div>
                                    </div>
                                    <div className="flex gap-4 ">
                                        <input required className="w-[11rem] text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-300 " type="text" name="firstname" value={data.firstname} onChange={handleChange}></input>
                                        <input required className="w-[10rem] text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-300 " type="text" name="lastname" value={data.lastname} onChange={handleChange}></input>                                    
                                    </div>
                                </div>
                            )}
                            <div className="mb-5">
                                <div className="text-sm font-bold text-gray-400 tracking-wide">Username</div>
                                <input required className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-300 " type="text" name="username" value={data.username} onChange={handleChange} ></input>
                            </div>
                            <div className="mb-5">
                                <div className="text-sm font-bold text-gray-400 tracking-wide">Password</div>
                                <input required className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-300 " type="password" name="password" value={data.password} onChange={handleChange}></input>
                            </div>
                            {isSignUp && (<div>
                                <div className="text-sm font-bold text-gray-400 tracking-wide">Confirm Password</div>
                                <input required className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-300 " type="password" name="confirmpass" onChange={handleChange}></input>
                            </div>)}
                            <span className={`text-orange-500 text-sm justify-end ${ confirmPass && "hidden" } `} > *Confirm password is not same </span>
                            <div className="mt-12">
                                <button className="bg-[#8E56E8] hover:bg-purple-600 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg- shadow-lg" type="submit" disabled={loading}>
                                {loading ? "Loading..." : isSignUp ? "SIGN UP" : "LOGIN"}
                                </button>
                                <div className="text-sm my-3 ml-3 text-[#8E56E8] cursor-pointer font-semibold" onClick={changeForm} >
                                    {isSignUp ? "Already have an account? " : "Don't have an account?"}
                                </div>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <span className="flex items-center justify-center space-x-2 pt-5">
                        <span className="h-px bg-gray-300 w-14"></span>
                        <span className="text-gray-400 text-sm f">OR</span>
                        <span className="h-px bg-gray-300 w-14"></span>
                    </span>
                    <div className="mt-10">
                        <ul className="flex justify-between -mx-2 mb-12">
                            <li className="px-2 w-full">
                                <div className="flex h-11 button items-center justify-center rounded-full bg-[#D64937] hover:bg-opacity-90">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z" fill="white"/>
                                    </svg>
                                </div>
                            </li>
                            <li className="px-2 w-full">
                                <div className=" flex h-11 button items-center justify-center rounded-full bg-gray-700 hover:bg-opacity-90">
                                    <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z" fill="white" />
                                    </svg>
                                </div>
                            </li>
                            <li className="px-2 w-full">
                                <div className="flex h-11 button items-center justify-center rounded-full bg-[#1C9CEA] hover:bg-opacity-90">
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.5516 2.75538L20.9 1.25245C21.2903 0.845401 21.3968 0.53229 21.4323 0.375734C20.3677 0.939335 19.3742 1.1272 18.7355 1.1272H18.4871L18.3452 1.00196C17.4935 0.344423 16.429 0 15.2935 0C12.8097 0 10.8581 1.81605 10.8581 3.91389C10.8581 4.03914 10.8581 4.22701 10.8935 4.35225L11 4.97847L10.2548 4.94716C5.7129 4.82192 1.9871 1.37769 1.38387 0.782779C0.390323 2.34834 0.958064 3.85127 1.56129 4.79061L2.76774 6.54403L0.851613 5.6047C0.887097 6.91977 1.45484 7.95303 2.55484 8.7045L3.5129 9.33072L2.55484 9.67515C3.15806 11.272 4.50645 11.9296 5.5 12.18L6.8129 12.4932L5.57097 13.2446C3.58387 14.4971 1.1 14.4031 0 14.3092C2.23548 15.6869 4.89677 16 6.74194 16C8.12581 16 9.15484 15.8748 9.40322 15.7808C19.3387 13.7143 19.8 5.8865 19.8 4.32094V4.10176L20.0129 3.97652C21.2194 2.97456 21.7161 2.44227 22 2.12916C21.8935 2.16047 21.7516 2.22309 21.6097 2.2544L19.5516 2.75538Z" fill="white"/>
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div> 
  )
}
