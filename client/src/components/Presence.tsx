import { useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Loader from "./Loader";
import { FaSatelliteDish } from "react-icons/fa6";

import GetLocation from "./GetLocation";
import CoPresence from "./CoPresence";
// import Infos from "./Infos";
import DarkMode from "./DarkMode";
import FloatingBall from "./FloatingBall";
import { motion } from "framer-motion";
// import { SignIn } from "@clerk/clerk-react";
const Presence = () => {
  const { user } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [open, setopen] = useState(false);
  const toggle = () => {
    setopen(!open);
  };
  const userId = user?.id;
  console.log("utilisateur", userId);
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
  }

  return (
    <>
      <div
        className="dark:bg-slate-700 flex flex-col h-screen w-full bg-green-600 bg-cover bg-center"
        style={{ backgroundImage: "url(./src/assets/large.jpg)" }}
      >
        <FloatingBall />
        <nav
          className={`fixed top-0 z-50 w-full bg-[#7e22ce] border-b shadow-2xl border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        >
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between ">
              {/* navbar logo */}
              <div className="flex items-center justify-start rtl:justify-end ">
                {/* burger */}
                <button
                  onClick={toggleSidebar}
                  type="button"
                  className="inline-flex text-xl items-center p-2  text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700 "
                >
                  {/* burger */}
                </button>
                <div className="">
                  <img
                    src="./src/assets/large.jpg"
                    alt="logo"
                    className="w-[3.1rem] h-[3.1rem] rounded-lg"
                  />
                </div>
                {/* logo */}
              </div>
              {/* end of navbar logo */}
              {/* navbar of profil */}
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  {/* user profile */}
                  <div className="flex items-center gap-5 max-md:gap-2">
                    <Link to="/">
                      <div className="group">
                        <div className="flex items-center gap-2 group-hover:bg-white border  p-2 rounded-lg cursor-pointer">
                          <FcHome className="flex-shrink-0 max-sm:w-5 max-sm:h-5 md: group-hover:text-black  text-white dark:text-gray-400  dark:group-hover:text-white" />
                          <p className="text-white text-sm group-hover:text-black text-nowrap">
                            Acceuil
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* <Infos /> */}
                    <DarkMode />
                    <div
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={toggle}
                    >
                      <UserButton />
                    </div>
                  </div>
                  {/* user profil */}
                  {/* **************** */}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-col   h-full w-full justify-center p-3  bg-white    items-center dark:bg-slate-700  ">
          <div className="flex flex-col items-center text-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: 90 }} // Rotation jusqu'à 180°
              transition={{
                repeat: Infinity, // Répéter à l'infini
                duration: 2, // Durée d'une rotation complète
                ease: "linear", // Animation linéaire (vitesse constante)
              }}
            >
              <FaSatelliteDish className="text-2xl text-violet-700 cursor-pointer" />
            </motion.div>

            <GetLocation />
          </div>
          <div className="w-full justify-center items-center flex flex-col">
            <h1 className=" font-semibold mb-4 dark:text-white">
              hello {user?.firstName}, please check your presence !
            </h1>
            <CoPresence />
            {/* <p className="text-green-600 font-bold mt-5">Please verify your presence within the company premises !</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Presence;
