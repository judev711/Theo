// import React from 'react'
import {  Key, SetStateAction, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiHome } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDarkMode, MdOutlineDateRange } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { UserButton } from "@clerk/clerk-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react"; //


interface Conge {
  id_user: Key | null | undefined;
  id: number;
  type_conge: string;
  date_debut: string;
  date_fin: string;
  date_emis: string;
  status: string;
}
const Leaves = () => {
   const num = 1;
  const [Tab, setTab]=useState(3);
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
  const [LeaveOpen, SetLeaveOpen]= useState(false)
  const toggleModal = ()=>{
   SetLeaveOpen(!LeaveOpen)
  }
  const { user } = useUser();
  const [CongeData, SetcongeData] = useState({
   clerkId: user?.id,
   type_conge:"",
   date_debut:"",
   date_fin:"",
   raison:""
  })
  const navigate = useNavigate();
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/postC/conge", CongeData);
      alert("Demande de conge envoyee avec succes, veuillez etre l'ecoute d'une d'une confirmation ulterieur");
      if(response.data.message == "Demande de congé enregistrée avec succès !"){
         navigate("/admin")
      };
      console.log("Demande De Conges:", response.data)
    } catch (error) {
      console.error("Erreur lors de la demande de congé :", error);
      postMessage("❌ Échec de l'enregistrement du congé.");
    }
  };
  //recuperation des conges
const [conges, setConges] = useState<Conge[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchConges = async () => {
    if (!user?.id) return; // Vérifier que l'utilisateur est connecté

    try {
      const response = await axios.get("http://localhost:5000/Api/conges/Demande");
      setConges(response.data);
      console.log('Réponse:', response.data);
    } catch (err) {
      console.error("❌ Erreur récupération congés :", err);
      setError("Erreur lors de la récupération des demandes de congés.");
    } finally {
      setLoading(false);
    }
  };

  fetchConges();
}, [user?.id]);

if (loading) return <p>Chargement des congés...</p>;
if (error) return <p className="text-red-500">{error}</p>;
if (conges.length === 0) return <p>Aucune demande de congé trouvée.</p>;
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
                  
               <span onClick={()=>HandlesTab(2)} className={`${Tab===2 ? 'text-blue-600 font-bold':'text-gray-900'}  whitespace-nowrap ms-[1.29rem] `} >Profile</span>
               
            </a>
            </Link>
         {/* profil users */}
         </li>
         <li>
         {/* Leaves Applications */}
          <Link to='/Leaves' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <MdOutlineDateRange className={`flex-shrink-0 w-5 h-5 ${Tab ===3 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} />
               <span  onClick={()=>HandlesTab(3)} className={`${Tab===3 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1  whitespace-nowrap ms-[1.29rem] `}>Leave Applications</span>
            </a>
            </Link>
         {/* Leaves Applications */}
         </li>
         <li>
          {/* Notifications */}
          <Link to='/Notifications' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <IoNotificationsOutline  className={`flex-shrink-0 w-5 h-5 ${Tab ===4 ? 'text-blue-600 font-bold':'text-gray-500'} dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(4)} className={`${Tab===4 ? 'text-blue-600 font-bold':'text-gray-900'} flex-1  whitespace-nowrap  ms-[1.29rem] `}>Notifications</span>
            </a>
            {/* Notifications */}
            </Link>
         </li>
         <li>
          {/* reportproblems */}
          <Link to='/Reportproblem' >
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <MdReportGmailerrorred className={`flex-shrink-0 w-5 h-5 ${Tab ===5 ? 'text-blue-600 font-bold':'text-gray-500'}  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}/>
               <span  onClick={()=>HandlesTab(5)} className={`${Tab===5 ? 'text-blue-600 font-bold': 'text-gray-900'} flex-1  whitespace-nowrap ms-[1.29rem] `}>Report a Problem</span>
            </a>
            </Link>
            {/*reportproblems  */}
         </li>
      </ul>
   </div>
</aside>
{/* End sidebar */}
<div className="p-4 ml-14 mt-5  ">
   <div  className={`p-4 border-2 bg-[#F3F4F6] ${isSidebarOpen ? 'translate-x-0':'14'} transition-transform  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10`}>
      
        {/*  Leaves */}
         <div className="flex items-center p-3 h-20 rounded bg-gray-50 dark:bg-gray-800 mb-4 font-poppins">
            <div  className="flex items-center justify-between  bg-gray-50 dark:bg-gray-800 w-full">
               <div  className="flex flex-row gap-2">
                  <div className="h-[30px] bg-violet-700 w-2 rounded-lg"></div>
                  <p className="text-xl text-black dark:text-gray-500">Leaves</p>
               </div>
               <div onClick={toggleModal} className="flex items-center gap-2 bg-violet-700 p-2 px-4 rounded-lg cursor-pointer">
                  <MdModeEditOutline className="text-white text-2xl "/>
                  <p className="text-[15px] text-white dark:text-gray-500">Leave Request</p>
               </div>
            </div>
            {/* Debut de la modal*********************************************************** */}
            <form onSubmit={handleSubmit}>
                      <div>
            {/* Main modal */}
            {LeaveOpen && (
            <div
               className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-screen h-screen bg-black bg-opacity-75 font-poppins"
            >
               <div className="relative p-4 w-[95vw]  bg-white rounded-lg shadow dark:bg-gray-700 ">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="flex items-center gap-2 ">
                     <div className="w-2 bg-violet-700 h-[30px] rounded-full"></div>
                     <p className="text-[18px]  max-sm:text-[14px] text-black dark:text-gray-500 ">Leave Request</p>
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
                     {/* tete des deux div */}
                     <div className="grid grid-cols-2  gap-2 max-sm:grid-cols-1 justify-center items-center">
                        <div className="flex flex-col gap-1 ">
                           <div className="flex flex-col gap-1 mb-3 max-sm:mb-1">
                              <p className="text-sm font-bold leading-relaxed text-black dark:text-gray-400">
                                 Leave Type
                              </p>
                           <select name="New" id="first" onChange={(e)=> SetcongeData({...CongeData, type_conge:e.target.value})} required className="font-poppins bg-gray-100    border-[1px] border-black rounded max-sm:text-sm ">
                                 <option value="">Choose Leave Type</option>
                                 <option  value="Annual Leave">Annual Leave</option>
                                 <option  value="Monthly Leave">Monthly Leave</option>
                                 <option  value="Sick Leave">Sick Leave</option>
                                 <option  value="Other">Other</option>
                              </select>
                           </div>
                           <div className="flex flex-col font-poppins gap-1 mb-3 max-sm:mb-1 ">
                              {/* les deux inputs de  */}
                              <div className="flex flex-col font-poppins gap-1 mb-3 max-sm:mb-1">
                                 <p className="text-sm font-bold leading-relaxed text-black dark:text-gray-400">
                                 From
                              </p>
                              <input onChange={(e)=> SetcongeData({... CongeData, date_debut: e.target.value})} required type="date" className="bg-violet-200 rounded"/>
                              </div>
                              <div className="flex flex-col font-poppins gap-1 mb-3 max-sm:mb-1 ">
                              <p className="text-sm font-bold leading-relaxed text-black dark:text-gray-400">
                                 To
                              </p>
                              <input onChange={(e)=> SetcongeData({... CongeData, date_fin: e.target.value})} required type="date" className="bg-violet-200 rounded"/>
                           </div>
                           </div>
                           
                           <div className="flex flex-col font-poppins gap-1 mb-3 max-sm:mb-1 ">
                              <p className="text-sm font-bold leading-relaxed text-black dark:text-gray-400">
                                 Reason
                              </p>
                              <textarea onChange={(e)=> SetcongeData({... CongeData, raison: e.target.value})} required className="rounded"></textarea>
                           </div>
                        </div>
                        {/* 2em  grid****************************************************** */}
                        <div className="p-3 bg-green-100 text-sm rounded-lg">
                           <p className="font-semibold text-center">Your Request Includes</p>
                           <div className="flex justify-between w-full mb-3 mt-6 max-sm:mb-1 max-sm:mt-1">
                              <p className="font-semibold">11/15/2023</p>
                              <div className="flex items-center max-sm:gap-1 gap-3 text-sm">
                                 <p className="text-violet-600 font-bold">Edit</p>
                                 <TbEdit className="text-violet-600 text-[18px]"/>
                              </div>
                              
                           </div>
                           <div className="flex justify-between w-full mb-3 mt-6 max-sm:mb-1 max-sm:mt-1">
                              <p className="font-semibold">11/15/2023</p>
                              <div className="flex items-center max-sm:gap-1 gap-3  text-sm">
                                 <p className="text-violet-600 font-bold">Edit</p>
                                 <TbEdit className="text-violet-600 text-[18px]"/>
                              </div>
                              
                           </div>
                           <hr className="border-black/10"></hr>
                           <div className="flex gap-2 mt-5 font-semibold max-sm:mt-2 max-sm:gap-1">
                              
                              <p>5</p>
                              <p>Days of leaves</p>
                           </div>
                           
                        </div>
                        {/* fin des deux grids************************************************ */}
                     </div>
                  </div>

                  {/* Modal footer */}
                  <div className="flex gap-3 items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 max-sm:-mt-6">
                   <button
                     type="submit"
                     className="py-2.5 px-5 ml-3  font-medium text-white text-[14px] focus:outline-none bg-violet-700 rounded-lg border    focus:ring-4   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                     Request Now
                  </button>

                  <button
                     onClick={toggleModal}
                     className="text-white bg-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-[14px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     Cancel
                  </button>
                 
                  </div>
               </div>
            </div>
            )}
            </div>
            </form>
      
            {/* Fin De LA modal */}
         </div>
           {/* Leaves History */}
      <div className="flex flex-col  mb-1  rounded bg-gray-50 dark:bg-gray-800">
         <div className="flex   justify-between p-3  rounded  dark:bg-gray-800 w-full mb-4">
            <div className="flex  gap-2">
               <div className=" flex items-center h-[30px] w-2 rounded-lg bg-violet-700 p-1"></div>
               <p className="font-poppins text-xl text-black dark:text-gray-500">Leaves History</p>
            </div>
            <div className="flex flex-row gap-2 max-sm:hidden  ">
               <div className="bg-violet-700 p-1 rounded-lg h-[32px]">
                  <GrAppsRounded className="font-poppins text-white text-2xl"/>
               </div>
               <div className="bg-black p-1 rounded-lg h-[32px]">
                  <IoMenu className="font-poppins text-white text-2xl"/>
               </div>
               <div className="bg-black p-3 rounded-lg flex items-center h-[32px]  text-white   font-poppins gap-1">
                  <FiFilter/>
                  <p>Filter</p>
               </div>
               <div className="bg-black p-3  rounded-lg flex items-center h-[32px]  text-white font-poppins gap-1">
                  <FaSort />
                  <p>Sort</p>
               </div>
            </div>
            
         </div>
         
         {/* ici */}
          <div className="grid grid-cols-2 gap-4 p-3 -mt-4 mb-6 max-sm:grid-cols-1 md:grid-cols-1 max-md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      { num > 0 &&
       conges.map((task) => (
        <div key={task.id_user} className="flex justify-between rounded-md bg-slate-300 font-poppins">
          <div className="flex flex-col p-3">
            <div className="flex items-center gap-2 mb-5">
              <TbClockHour4 className="font-poppins" />
              <p className="font-semibold">{new Date(task.date_emis).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-500">From Date</p>
              <p className="font-bold">{new Date(task.date_debut).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col p-3">
            <div className="mb-4">
              <div className="rounded-full p-2 bg-green-100 flex items-center justify-center">
                <p className={`text-xs font-extrabold ${
                  task.status === "Approuvé" ? "text-green-400" : "text-yellow-400"
                }`}>
                  {task.status}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-500">To Date</p>
              <p className="font-bold">{new Date(task.date_fin).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
 


      </div>
   </div>
   <div className="flex items-center mt-4 justify-center gap-3 font-poppins mb-4 rounded  dark:bg-gray-800">
        <div className="rounded-lg p-3 bg-slate-300 cursor-pointer">
           <p>Previous</p>
        </div>
        <div className="rounded-lg p-3 bg-violet-700 cursor-pointer text-white">
           <p>1</p>
        </div>
        <div className="rounded-lg p-3 bg-slate-300 cursor-pointer">
          <p>Next</p>
        </div>
      </div>
</div>

  </>
  )
}

export default Leaves