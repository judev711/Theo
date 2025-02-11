import { useAuth, UserButton } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { MdDarkMode, MdNotifications } from "react-icons/md"
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom"
import {  useUser } from "@clerk/clerk-react";
import Loader from "./Loader"
import FaceId from './FaceId'
import GetLocation from "./GetLocation";
// import { SignIn } from "@clerk/clerk-react";



const Presence = () => {
  const { user } = useUser()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  const [open, setopen]=useState(false)
const toggle = ()=>{
   setopen(!open)
}
 const userId = user?.id;
 console.log('utilisateur', userId)
 const { isLoaded } = useAuth(); // Vérifie si l'authentification est prête
  const [isLoading, setIsLoading] = useState(true); // État pour suivre le chargement de la page

  useEffect(() => {
    // Simule un chargement de la page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // ⏳ Temps simulé pour le chargement

    return () => clearTimeout(timer); // Nettoie le timer
  }, []);

  // Affiche le Loader tant que la page ou useAuth charge
  if (isLoading || !isLoaded) {
    return <Loader />;
  };

  return (
    <div className="">
        <nav   className={`fixed top-0 z-50 w-full bg-[#7e22ce] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
     <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between ">
      {/* navbar logo */}
      <div  className="flex items-center justify-start rtl:justify-end ">
        {/* burger */}
        <button  onClick={toggleSidebar}   type="button" className="inline-flex text-xl items-center p-2  text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700 " >
               <p>eBuyClock</p>
            {/* burger */}
         </button>
          <span className="inline-flex text-xl items-center p-2  text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700">
            Theo
          </span>
        {/* logo */}
      </div>
      {/* end of navbar logo */}
      {/* navbar of profil */}
 <div className="flex items-center">
        <div className="flex items-center ms-3">
          {/* user profile */}
          <div  className="flex items-center gap-5 max-md:gap-2">
            <Link to="/">
            <div className="group">
              <div className="flex items-center gap-2 group-hover:bg-white border  p-2 rounded-lg cursor-pointer">
                <FcHome className="flex-shrink-0 max-sm:w-5 max-sm:h-5 md: group-hover:text-black  text-white dark:text-gray-400  dark:group-hover:text-white" />
                <p className="text-white text-sm group-hover:text-black text-nowrap">Acceuil</p>
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
                      open ? 'hidden' : 'hidden'
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
  <div className=" font-poppins   ">
    <div className="flex flex-col container mx-auto justify-center p-3  bg-white mt-28  border-2 mb-28  items-center border-black ">
      
      <div className="flex flex-col items-center text-center gap-2 mb-4"> 
        <MdNotifications  className="text-2xl text-violet-700 cursor-pointer"/>
       <GetLocation/>
      </div>
      <div className="w-full">
        <h1 className="text-start font-semibold">hello {user?.firstName}, please check your presence !</h1> 
        <FaceId/>
        <p className="text-green-600 font-bold mt-5">Please verify your presence within the company premises !</p>

      </div>
       
     

    </div>
 
  </div>
</div>
  )
}

export default Presence
