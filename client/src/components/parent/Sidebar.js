import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddIcon from "@mui/icons-material/Add";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  return (
    <div className="flex-[0.2]">
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
        <div>
          <NavLink to="/parent/home" className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
            <HomeIcon />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
          <NavLink to="/parent/profile" className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
            <AssignmentIndIcon />
            <h1 className="font-normal">Profile</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/parent/child/results" className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
            <AddIcon />
            <h1 className="font-normal">Child Results</h1>
          </NavLink>
          <NavLink to="/parent/child/attendance" className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
            <AddIcon />
            <h1 className="font-normal">Child Attendance</h1>
          </NavLink>
          <NavLink to="/parent/messages" className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}>
            <AddIcon />
            <h1 className="font-normal">Messages</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;









