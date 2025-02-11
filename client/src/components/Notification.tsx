// import React from 'react'
import {  SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import { BiHome } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDarkMode, MdOutlineDateRange } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { MdDangerous } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { UserButton } from "@clerk/clerk-react";

const Notifications = () => {
  const [Tab, setTab]=useState(4);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [open, setopen]=useState(false)
const toggle = ()=>{
   setopen(!open)
}



//   const [Open, SetOpen]= useState(true)
  const HandlesTab = (Tab: SetStateAction<number>)=>{
 setTab(Tab)
  }
  const today = new Date()
  const FormatDate = today.toLocaleDateString("en-Us",{
   year:"numeric",
   month:"long",
   day:"numeric"
  })

  return ( <>
  
  <nav   className={`fixed top-0 z-50 w-full bg-[#7e22ce] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
  <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
    <div className="flex items-center justify-between">
      {/* navbar logo */}
      <div  className="flex items-center justify-start rtl:justify-end ">
        
        {/* burger */}
        <button  onClick={toggleSidebar}   type="button" className="inline-flex items-center p-2 text-sm text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700 " >
               <RxHamburgerMenu className={`w-5 h-5 `} />
            {/* burger */}
         </button>
         
         
        <a href="" className="flex ms-2 md:me-24  gap-2">
          <span className="self-center text-xl text-white font-extrabold sm:text-2xl whitespace-nowrap text dark:text-white">Theo</span>
        </a>
        {/* logo */}
      </div>
      {/* end of navbar logo */}
      {/* navbar of profil */}
 <div className="flex items-center">
        <div className="flex items-center ms-3">
          {/* user profile */}
          <div  className="flex items-center gap-5 max-md:gap-2">
            <Link to="/Login">
            <div className="group">
              <div className="flex items-center gap-2 group-hover:bg-white border  p-2 rounded-lg cursor-pointer">
                <PiSignOut className="flex-shrink-0 max-sm:w-5 max-sm:h-5 md: group-hover:text-black  text-white dark:text-gray-400  dark:group-hover:text-white" />
                <p className="text-white text-sm group-hover:text-black text-nowrap">Sign Out</p>
              </div>
            </div>  
            </Link>
            <MdNotifications className="flex-shrink-0 max-sm:w-5 max-sm:h-5 w-7 h-7 text-white cursor-pointer dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <MdDarkMode className="text-2xl text-white"/>
            <div
             
             
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggle}
            >
              <UserButton/>
              
            </div>
          </div>
          {/* user profil */}
                  <div
                  
                    className={`z-50 absolute right-0 mt-52 mx-2  py-2 w-54 bg-white rounded-md shadow-lg dark:bg-gray-700 ${
                      open ? 'block' : 'hidden'
                    }`}
                  >
                    <ul className="divide-y divide-gray-100 dark:divide-gray-600">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <p>Theo@711</p>
                          <p>theodore@gmail.com</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:text-green-600 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                        Profile
                        </a>
                      </li>
                    
                      <li>
                      <Link to="/Login">
                        <a
                          href="#"
                          className="block px-4 py-2 hover:text-red-600 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </Link>
                      </li>
                    </ul>
                  </div>
          {/* **************** */}
        </div>
      </div>
  
    </div>
  </div>
</nav>
{/* start sidebar */}
<aside  className={`fixed  top-0 left-0 z-40  h-screen  pt-20  ${!isSidebarOpen ?'w-16':'w-56'}    bg-violet-100 border-r border-gray-200 transition-all duration-700  dark:bg-gray-800 dark:border-gray-700`} >
   <div  className={`h-full  px-[0.80rem] pb-4 overflow-y-auto  dark:bg-gray-800   `}>
      <ul className={`space-y-3 font-medium     ` }>
        {/* icon Dashboard */}
         <li className="">
          <Link to='/admin'>
            <a href="#" className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group ">
               <BiHome className={`flex-shrink-0 w-5 h-5 ${Tab ===1 ? 'text-blue-600 font-bold':'text-gray-500'}      dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white   `}/>
               <span  onClick={()=>HandlesTab(1)} className={`${Tab ===1 ? 'text-blue-600 font-bold':'text-gray-900'} ms-[1.29rem]   `} > Dashboard</span>
            </a>
            </Link>
         </li>
         <li>
         {/* profil users */}
            <Link to='/userdetail' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <FiUser className={`flex-shrink-0 w-5 h-5 ${Tab ===2 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} />
                  
               <span onClick={()=>HandlesTab(2)} className={`${Tab===2 ? 'text-blue-600 font-bold':'text-gray-900'} ms-[1.29rem] whitespace-nowrap  `} >Profile</span>
               
            </a>
            </Link>
         {/* profil users */}
         </li>
         <li>
         {/* Leaves Applications */}
          <Link to='/Leaves' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <MdOutlineDateRange className={`flex-shrink-0 w-5 h-5 ${Tab ===3 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} />
               <span  onClick={()=>HandlesTab(3)} className={`${Tab===3 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1 ms-[1.29rem] whitespace-nowrap  `}>Leave Applications</span>
            </a>
            </Link>
         {/* Leaves Applications */}
         </li>
         <li>
          {/* Notifications */}
          <Link to='/Notifications' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <IoNotificationsOutline  className={`flex-shrink-0 w-5 h-5 ${Tab ===4 ? 'text-blue-600 font-bold':'text-gray-500'} dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(4)} className={`${Tab===4 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1 ms-[1.29rem] whitespace-nowrap  `}>Notifications</span>
            </a>
            {/* Notifications */}
            </Link>
         </li>
         <li>
          {/* reportproblems */}
          <Link to='/Reportproblem' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <MdReportGmailerrorred className={`flex-shrink-0 w-5 h-5 ${Tab ===5 && 'text-blue-600 font-bold'}  dark:text-gray-400 hover:text-blue-600 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(5)} className={`${Tab===5 ? 'text-blue-600 font-bold': 'text-gray-900'} flex-1 ms-[1.29rem] whitespace-nowrap  `}>Report a Problem</span>
            </a>
            </Link>
            {/*reportproblems  */}
         </li>
      </ul>
   </div>
</aside>
{/* End sidebar */}
<div className="p-4 ml-14 mt-5  ">
   <div  className={`p-4 border-2 bg-white ${isSidebarOpen ? 'translate-x-0':'14'} transition-transform  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10`}>
        {/* Alerts */}
         <div className="flex items-center justify-center h-20 rounded p-3 bg-slate-200 dark:bg-gray-800 mb-8 font-poppins">
            <div className="flex justify-between w-full items-center">
               <div className="flex items-center gap-2">
                  <div className="h-[30px] w-2 bg-violet-700 rounded-lg"></div>
                  <p className="text-xl text-black dark:text-gray-500">
                     Alerts
                  </p>
               </div>
               <div className="bg-violet-700 flex items-center gap-1 text-white rounded-lg p-2 text-sm">
                  <MdOutlineDateRange/>
                  <p>{FormatDate}</p>
               </div>
            </div>
         </div>
      <div className="grid grid-cols-1 gap-4 mb-4 font-poppins">
         <div className="flex p-6 rounded bg-[#F0FDF4] h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-green-400 text-white p-2 rounded-full"><MdOutlineSecurity/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Urgent : Action Required
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Please update your account information immediately.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex p-6 rounded bg-[#F0FDF4] h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-violet-500 text-white p-2 rounded-full"><MdReportGmailerrorred/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Server Maintenance
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Scheduled server maintenance from 11 PM to 3 AM tomorrow.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex p-6 rounded bg-red-100 h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-red-600 text-white p-2 rounded-full"><MdDangerous/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Critical Security Alert
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Beware of phishing emails requesting personal information.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex p-6 rounded bg-red-100 h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-orange-400 text-white p-2 rounded-full"><TbAlertTriangle/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Weather Advisory
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Heavy rain expected in the afternoon. Stay indoors if possible.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex p-6 rounded bg-[#F0FDF4] h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-violet-500 text-white p-2 rounded-full"><MdReportGmailerrorred/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Holiday Schedule
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Company holiday scheduled for next Monday. Office will be closed.
                  </p>
               </div>
            </div>
         </div>
         <div className="flex p-6 rounded bg-[#F0FDF4] h-20 dark:bg-gray-800 border-[1px] border-gray-300">
            <div className="flex flex-row items-center gap-2">
               <div className="bg-green-400 text-white p-2 rounded-full"><MdOutlineSecurity/></div>
               <div className="flex flex-col  gap-1">
                  <p className="text-sm text-black dark:text-gray-500 font-semibold">
                     Meeting Reminder
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-500">
                     Don't forget the team meeting at 10 AM today.
                  </p>
               </div>
            </div>
         </div>
         
      </div>
   </div>
</div>

  </>
  )
}

export default Notifications