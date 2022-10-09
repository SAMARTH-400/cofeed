import React from "react";
import Sidebar from "../Components/Sidebar";
import Upload from "../Components/Upload";
import Feed from "../Components/Feed";
import Suggestions from "../Components/Suggestions";
const Home = () => {
  return (
    <div className="bg-[#e7edfa] flex h-screen">
      <Sidebar />
      <div className="ml-[17%] w-full mr-[17%] bg-[#e7edfa] h-fit p-4 flex flex-col items-center ">
        <Upload />
        <Feed />
      </div>
      <div className="w-[17%] h-screen bg-gray-100 shadow-lg fixed right-0 " >
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
