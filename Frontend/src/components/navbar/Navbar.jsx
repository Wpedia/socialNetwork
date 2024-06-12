import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUsers, FaStream, FaTrophy } from 'react-icons/fa';
import { FaMessage } from "react-icons/fa6";
import { SiTestin } from "react-icons/si";

const Navbar = () => {
  return (
    <nav className="group bg-gray-800 text-white w-32 overflow-hidden transition-all duration-300 ease-in-out transform-gpu hover:w-48">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="py-4">
          <div className="text-xl font-bold">VitalConnect <p className='text-end text-xs'>beta</p></div>
        </div>
        <div className="flex flex-col flex-grow space-y-4 mt-10">
          <SidebarLink to="/profile" label="Профиль" icon={<FaUser />} />
          <SidebarLink to="/messenger" label="Месенджер" icon={<FaMessage />} />
          <SidebarLink to="/users" label="Пользователи" icon={<FaUsers />} />
          {/* <SidebarLink to="/stream" label="Стримы" icon={<FaStream />}  isTesting={true}/> */}
          <SidebarLink to="/leaders" label="Лидеры" icon={<FaTrophy />} isTesting={true}/>
        </div>
      </div>
    </nav>
  );
};

// Sidebar link component
function SidebarLink({ to, label, icon, isTesting }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 w-full text-left transition-transform duration-300 ease-in-out transform group-hover:translate-x-0 ${
          isActive ? 'bg-gray-700' : ''
        }`
      }
    >
      <span className="mr-2">{icon}</span>
      <span className="hidden group-hover:flex">
        {label}
        {isTesting && <SiTestin className='text-lg'/>}
      </span>
    </NavLink>
  );
}

export default Navbar;
