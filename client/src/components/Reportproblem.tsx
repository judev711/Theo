// import React from 'react'
import {  SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import { BiHome } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import { MdDangerous } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { UserButton } from "@clerk/clerk-react";
import Infos from "./Infos";
import DarkMode from "./DarkMode";
const Reportproblem = () => {
  const [Tab, setTab]=useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [open, setopen]=useState(false)
const toggle = ()=>{
   setopen(!open)
}
const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };


//   const [Open, SetOpen]= useState(true)
  const HandlesTab = (Tab: SetStateAction<number>)=>{
 setTab(Tab)
  };
 

  return ( <>
  
  <nav  className={`fixed top-0 z-50 w-full bg-[#7e22ce] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
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
                <PiSignOut className="flex-shrink-0 max-sm:w-5 max-sm:h-5  md: group-hover:text-black da  text-white hover:dark:text-black  " />
                <p className="text-white text-sm group-hover:text-black text-nowrap">Sign Out</p>
              </div>
            </div>  
            </Link>
            <Infos />
            <DarkMode/>
            <div
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggle}
            >
              <UserButton/>
              
            </div>
          </div>
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
               <BiHome className={`flex-shrink-0 w-5 h-5 ${Tab ===1 ? 'text-blue-600 font-bold':'text-gray-500'} dark:text-white      dark:text-whitegroup-hover:text-gray-900 dark:group-hover:text-white   `}/>
               <span  onClick={()=>HandlesTab(1)} className={`${Tab ===1 ? 'text-blue-600 font-bold':'text-gray-900'} ms-[1.29rem] dark:text-white   `} > Dashboard</span>
            </a>
            </Link>
         </li>
         <li>
         {/* profil users */}
            <Link to='/userdetail' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <FiUser className={`flex-shrink-0 w-5 h-5 ${Tab ===2 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-white group-hover:text-gray-900 dark:group-hover:text-white`} />
                  
               <span onClick={()=>HandlesTab(2)} className={`${Tab===2 ? 'text-blue-600 font-bold':'text-gray-900'} ms-[1.29rem] dark:text-white whitespace-nowrap  `} >Profile</span>
               
            </a>
            </Link>
         {/* profil users */}
         </li>
         <li>
         {/* Leaves Applications */}
          <Link to='/Leaves' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <MdOutlineDateRange className={`flex-shrink-0 w-5 h-5 ${Tab ===3 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-white group-hover:text-gray-900 dark:group-hover:text-white`} />
               <span  onClick={()=>HandlesTab(3)} className={`${Tab===3 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1 ms-[1.29rem] dark:text-white whitespace-nowrap  `}>Leave Applications</span>
            </a>
            </Link>
         {/* Leaves Applications */}
         </li>
         <li>
          {/* Notifications */}
          <Link to='/Notifications' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <IoNotificationsOutline  className={`flex-shrink-0 w-5 h-5 ${Tab ===4 ? 'text-blue-600 font-bold':'text-gray-500'} dark:text-white group-hover:text-gray-900 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(4)} className={`${Tab===4 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1 ms-[1.29rem] dark:text-white whitespace-nowrap  `}>Notifications</span>
            </a>
            {/* Notifications */}
            </Link>
         </li>
         <li>
          {/* reportproblems */}
          <Link to='/Reportproblem' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <MdReportGmailerrorred className={`flex-shrink-0 w-5 h-5 ${Tab ===5 ? 'text-blue-600 font-bold':'text-gray-500'}   group-hover:text-gray-900 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(5)} className={`${Tab===5 ? 'text-blue-600 font-bold': 'text-gray-900'} flex-1 ms-[1.29rem]  whitespace-nowrap  `}>Report a Problem</span>
            </a>
            </Link>
            {/*reportproblems  */}
         </li>
      </ul>
   </div>
</aside>
{/* End sidebar */}
<div className="p-4 ml-14 mt-5 dark:bg-gray-600  ">
   <div  className={`p-4 border-2 bg-white ${isSidebarOpen ? 'translate-x-0':'14'} transition-transform  border-gray-200 dark:bg-slate-500 rounded-lg dark:border-gray-700 mt-10`}>
      <div className="flex items-center justify-center h-20 rounded p-3 bg-slate-200 dark:bg-gray-800 mb-8 font-poppins">
            <div className="flex justify-between w-full items-center">
               <div className="flex items-center gap-2">
                  <div className="h-[30px] w-2 bg-violet-700 rounded-lg"></div>
                  <p className="text-xl text-black dark:text-white">
                     Issues
                  </p>
               </div>
               <div onClick={toggleModal} className="bg-violet-700 flex items-center gap-1 text-white rounded-lg p-2 text-sm cursor-pointer">
                  <MdReportGmailerrorred/>
                  <p className="dark:text-white">Report A Problem</p>
               </div>
            </div>
            {/* Debut de la modal*********************************************************** */}
             <div>
            {/* Main modal */}
            {isOpen && (
            <div
               className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-screen h-screen bg-black bg-opacity-75 font-poppins"
            >
               <div className="relative p-4 w-[95vw]  bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="flex items-center gap-2 ">
                     <div className="w-2 bg-violet-700 h-[30px] rounded-full"></div>
                     <p className="text-[18px] text-black dark:text-gray-500 ">Report A Problem</p>
                  </div>
                  <button
                     onClick={toggleModal}
                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                     <svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                     >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                        />
                     </svg>
                     <span className="sr-only">Close modal</span>
                  </button>
                  </div>

                  {/* Modal body */}
                  <div className="p-4 md:p-5 space-y-4">
                     <div className="flex flex-col gap-2 ">
                     <p className="text-sm font-bold leading-relaxed text-black dark:text-gray-400">
                        Describe The Problem :
                     </p>
                     <textarea className="rounded h-[20vw] bg-slate-200 border-none focus:outline-none  "></textarea>
                     </div>
                  </div>

                  {/* Modal footer */}
                  <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                     onClick={toggleModal}
                     className="text-white bg-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-[14px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={toggleModal}
                     className="py-2.5 px-5 ml-3  font-medium text-white text-[14px] focus:outline-none bg-violet-700 rounded-lg border    focus:ring-4   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                     Request Now
                  </button>
                  </div>
               </div>
            </div>
            )}
    </div>
            {/* Fin De LA modal */}
    
        
         </div>
      <div className="grid grid-cols-1 gap-4 mb-4 font-poppins ">
         <div className="flex  bg-red-100 h-20 dark:bg-gray-800 rounded">
            <div className="flex items-center justify-between w-full gap-2 p-6">
               <div className="flex gap-2 items-center">
                  <div className="bg-red-600 text-white p-2 rounded-full"><MdDangerous/></div>
                  <p className="text-xs text-black dark:text-white">The website is loading slowly.</p>
                  {/* nombre de caractere maximale 41 */}
               </div>
               <div className="bg-red-600 p-2 rounded">
                  <p className="text-xs text-white dark:text-white">Unresolved</p>
               </div>
            </div>
            <p className="text-2xl text-gray-400 dark:text-white">
            </p>
         </div>
         <div className="flex  bg-red-100 h-20 dark:bg-gray-800 rounded">
            <div className="flex items-center justify-between w-full gap-2 p-6">
               <div className="flex gap-2 items-center">
                  <div className="bg-red-600 text-white p-2 rounded-full"><MdDangerous/></div>
                  <p className="text-xs text-black dark:text-white">Unable to access the internal tool.</p>
                  {/* nombre de caractere maximale 41 */}
               </div>
               <div className="bg-red-600 p-2 rounded">
                  <p className="text-xs text-white dark:text-white">Unresolved</p>
               </div>
            </div>
            <p className="text-2xl text-gray-400 dark:text-white">
            </p>
         </div>
         <div className="flex  bg-green-100 h-20 dark:bg-gray-800 rounded">
            <div className="flex items-center justify-between w-full gap-2 p-6">
               <div className="flex gap-2 items-center">
                  <div className="bg-green-500 text-white p-2 rounded-full"><GoCheck/></div>
                  <p className="text-xs text-black dark:text-white">Water problem in office.</p>
                  {/* nombre de caractere maximale 41 */}
               </div>
               <div className="bg-green-500 p-2 rounded">
                  <p className="text-xs text-white dark:text-white">Resolved</p>
               </div>
            </div>
            <p className="text-2xl text-gray-400 dark:text-white">
            </p>
         </div>
         <div className="flex  bg-red-100 h-20 dark:bg-gray-800 rounded">
            <div className="flex items-center justify-between w-full gap-2 p-6">
               <div className="flex gap-2 items-center">
                  <div className="bg-red-600 text-white p-2 rounded-full"><MdDangerous/></div>
                  <p className="text-xs text-black dark:text-white">Office time is not manageable.</p>
                  {/* nombre de caractere maximale 41 */}
               </div>
               <div className="bg-red-600 p-2 rounded">
                  <p className="text-xs text-white dark:text-white">Unresolved</p>
               </div>
            </div>
            <p className="text-2xl text-gray-400 dark:text-white">
            </p>
         </div>
      </div>
      {/* --------------- */}
   </div>
</div>

  </>
  )
}

export default Reportproblem