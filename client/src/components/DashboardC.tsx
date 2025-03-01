// import React from 'react'
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import { useUser } from "@clerk/clerk-react";
import { ImHourGlass } from "react-icons/im";
import { UserButton } from "@clerk/clerk-react";
import DarkMode from "./DarkMode";
import Infos from "./Infos";
import { TfiStatsUp } from "react-icons/tfi";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa";
import { FiUserX } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  Cell,
  // Cell,
  // Pie,
  // PieChart,
} from "recharts";

interface Stats {
  nombrePresences: number;
  nombreCongesEnAttente: number;
  nombreAbsences: number;
  tauxAssiduite: number;
  tauxAbsence: number;
  evolutionConges: { date: string; demandes: number }[];
  presencesParJour?: { jour: string; matin: number; apresMidi: number }[];
}

const DashboardC = () => {
  const { user } = useUser();

  const [Tab, setTab] = useState(1);
  const [open, setopen] = useState(false);
  const toggle = () => {
    setopen(!open);
  };

  //   const [Open, SetOpen]= useState(true)
  const HandlesTab = (Tab: SetStateAction<number>) => {
    setTab(Tab);
  };
  //
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //------------------------------profil--------------------------------------------------
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleclick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event?.target as HTMLElement;
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(target) &&
      buttonRef.current &&
      !sidebarRef.current.contains(target)
    ) {
      setIsSidebarOpen(false);
    }
  };
  const today = new Date();
  const formatdate = today.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //debut de la recuperation

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/details/statistiques",
          {
            withCredentials: true,
          }
        );
        console.log("Données reçues :", response.data);
        setStats(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques.", error);
        setError("Erreur lors du chargement des statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col">
      <img
        src="./src/assets/large.jpg"
        alt="logo"
        className="w-[3.1rem] h-[3.1rem] rounded-lg"
      />
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!stats) return null;
  const data = [
    { name: "Présences", value: stats.nombrePresences, color: "#81E1BC" },
    { name: "Absences", value: stats.nombreAbsences, color: "#FF0000" },
    { name: "Congés", value: stats.nombreCongesEnAttente, color: "#F79646" },
  ];

  //fin de la recuperation

  return (
    <>
      <nav
        onClick={handleclick}
        className={`fixed top-0 z-50 w-full bg-[#7e22ce] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
          <div className="flex items-center justify-between">
            {/* navbar logo */}
            <div className="flex items-center justify-start rtl:justify-end ">
              {/* burger */}
              <div className="">
                <img
                  src="./src/assets/large.jpg"
                  alt="logo"
                  className="w-[3.1rem] h-[3.1rem] rounded-lg"
                />
              </div>
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-white  font-bold  dark:text-gray-400  "
              >
                <RxHamburgerMenu className={`w-5 h-5 `} />
                {/* burger */}
              </button>
              {/* logo */}
            </div>
            {/* end of navbar logo */}
            {/* navbar of profil */}
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                {/* user profile */}
                <div className="flex items-center gap-5 max-md:gap-2">
                  <Link to="/presence">
                    <div className="group">
                      <div className="flex items-center gap-2 group-hover:bg-white border  p-2 rounded-lg cursor-pointer">
                        <PiSignOut className="flex-shrink-0 max-sm:w-5 max-sm:h-5  md: group-hover:text-black da  text-white hover:dark:text-black  " />
                        <p className="text-white text-sm group-hover:text-black text-nowrap">
                          Aurevoir
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Infos />
                  <DarkMode />
                  <div
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={toggle}
                  >
                    <UserButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* start sidebar */}

      <aside
        ref={sidebarRef}
        className={`fixed  top-0 left-0 z-40  h-screen  pt-20  ${
          !isSidebarOpen ? "w-16" : "w-56"
        }    bg-violet-100 border-r border-gray-200 transition-all duration-700  dark:bg-gray-800 dark:border-gray-700`}
      >
        <div
          className={`h-full  px-[0.80rem] pb-4 overflow-y-auto  dark:bg-gray-800   `}
        >
          <ul className={`space-y-3 font-medium     `}>
            {/* icon Dashboard */}
            <li className="">
              <Link to="/admin">
                <a
                  href="#"
                  className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group "
                >
                  <BiHome
                    className={`flex-shrink-0 w-5 h-5 ${
                      Tab === 1 ? "text-blue-600 font-bold" : "text-gray-500"
                    }     group-hover:text-gray-900 dark:group-hover:text-white   `}
                  />
                  <span
                    onClick={() => HandlesTab(1)}
                    className={`${
                      Tab === 1 ? "text-blue-600 font-bold" : "text-gray-900"
                    }  ms-[1.31rem] `}
                  >
                    {" "}
                    Dashboard
                  </span>
                </a>
              </Link>
            </li>
            <li>
              {/* profil users */}
              <Link to="/userdetail">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiUser
                    className={`flex-shrink-0 w-5 h-5 ${
                      Tab === 2 ? "text-blue-600 font-bold" : "text-gray-500"
                    }  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  />

                  <span
                    onClick={() => HandlesTab(2)}
                    className={`${
                      Tab === 2 ? "text-blue-600 font-bold" : "text-gray-900"
                    } dark:text-white  ms-[1.29rem] whitespace-nowrap  `}
                  >
                    Profile
                  </span>
                </a>
              </Link>
              {/* profil users */}
            </li>
            <li>
              {/* Leaves Applications */}
              <Link to="/Leaves">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdOutlineDateRange
                    className={`flex-shrink-0 w-5 h-5 ${
                      Tab === 3 ? "text-blue-600 font-bold" : "text-gray-500"
                    }  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  />
                  <span
                    onClick={() => HandlesTab(3)}
                    className={`${
                      Tab === 3 ? "text-blue-600 font-bold" : "text-gray-900"
                    } dark:text-white  flex-1 ms-[1.29rem] whitespace-nowrap  `}
                  >
                    Leave Applications
                  </span>
                </a>
              </Link>
              {/* Leaves Applications */}
            </li>
            <li>
              {/* Notifications */}
              <Link to="/Notifications">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <IoNotificationsOutline
                    className={`flex-shrink-0 w-5 h-5 ${
                      Tab === 4 ? "text-blue-600 font-bold" : "text-gray-500"
                    } dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  />
                  <span
                    onClick={() => HandlesTab(4)}
                    className={`${
                      Tab === 4 ? "text-blue-600 font-bold" : "text-gray-900"
                    } dark:text-white  flex-1 ms-[1.29rem] whitespace-nowrap`}
                  >
                    Notifications
                  </span>
                </a>
                {/* Notifications */}
              </Link>
            </li>
            <li>
              {/* reportproblems */}
              <Link to="/Reportproblem">
                <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MdReportGmailerrorred
                    className={`flex-shrink-0 w-5 h-5 ${
                      Tab === 5 ? "text-blue-600 font-bold" : "text-gray-500"
                    }  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  />
                  <span
                    onClick={() => HandlesTab(5)}
                    className={`${
                      Tab === 5 ? "text-blue-600 font-bold" : "text-gray-900"
                    } dark:text-white flex-1 ms-[1.29rem] whitespace-nowrap`}
                  >
                    Report a Problem
                  </span>
                </div>
              </Link>
              {/*reportproblems  */}
            </li>
          </ul>
        </div>
      </aside>

      {/* End sidebar */}
      {/* content Dashboard*/}
      <div className={`p-4 ml-14 mt-5 dark:bg-gray-600 `}>
        <div
          className={`p-4 border-2 bg-blue-100  transition-transform  border-gray-200 dark:bg-slate-500 rounded-lg dark:border-gray-700 mt-10`}
        >
          <div className=" mb-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            {/* les trois premiers grid (1re colone) */}
            <div className="flex justify-between items-center p-3 mb">
              <div className="flex items-center">
                <div className="p-1 bg-blue-500 rounded-lg w-1 h-[30px] "></div>
                <p className="mx-2 text-lg dark:text-white font-semibold text-gray-900">
                  Good Day , {user?.firstName} Welcome in Your Dashboard
                </p>
              </div>
              <div className="bg-green-500 rounded-lg p-3 flex items-center  max-sm:hidden">
                <MdOutlineDateRange className="text-white font-semibold" />
                <p className="mx-2 text-white font-semibold">{formatdate}</p>
              </div>
            </div>
            <hr className="border-t-2  border-black mx-3" />
            {/* les trois grids */}
            <div className="grid grid-cols-1 gap-4 mb-4 dark:bg-slate-400 rounded bg-white mt-10 p-3 ">
              <h1 className="font-semibold">Globals Analytics</h1>
              <div className="flex items-center justify-center rounded    dark:bg-black  text-white  duration-300 cursor-pointer ">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex   rounded h-58   dark:bg-black  text-white  duration-300 cursor-pointer ">
                {Array.isArray(stats.evolutionConges) && (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stats.evolutionConges}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend type="" />
                      {/* Ajoute ceci si tu veux afficher une légende */}
                      <CartesianGrid />
                      <Line
                        type="monotone"
                        dataKey="demandes"
                        stroke="#4f46e5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  // diagramme circulaire
                )}
              </div>
            </div>
          </div>
          {/* fin des rois premiers grids */}

          <div className="mt-4 bg-white rounded-md p-3 border-2 border-gray-200 dark:border-gray-500 dark:bg-slate-400">
            <div>
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 ">
              <div className="bg-green-400 dark:text-white  p-5 rounded flex flex-col gap-3    dark:bg-gray-600">
                <div className="flex items-center gap-2 font-semibold">
                  <FaUserCheck className="" />
                  <p>Presences Validées</p>
                </div>
                <div>
                  <p className="font-bold ">{stats.nombrePresences}</p>
                </div>
              </div>
              <div className="bg-red-500 dark:text-white  p-5 rounded flex flex-col gap-3    dark:bg-black">
                <div className="flex items-center gap-2 font-semibold">
                  <FiUserX className="" />
                  <p>Absences</p>
                </div>
                <div>
                  <p className="font-bold ">{stats.nombreAbsences}</p>
                </div>
              </div>
              <div className="bg-blue-400 dark:text-white  p-5 rounded flex flex-col gap-3   dark:bg-black">
                <div className="flex items-center gap-2 font-semibold">
                  <TfiStatsUp className="" />
                  <p>Taux D'assiduités</p>
                </div>
                <p className="font-bold ">{`${stats.tauxAssiduite}%`}</p>
              </div>
              <div className="bg-slate-400 dark:text-white  p-5 rounded flex flex-col gap-3   dark:bg-black">
                <div className="flex items-center gap-2 font-semibold">
                  <TfiStatsUp className="" />
                  <p>Taux D'Absences</p>
                </div>
                <p className="font-bold ">{`${stats.tauxAbsence}%`}</p>
              </div>
              <div className="bg-amber-400 dark:text-white  p-5 rounded flex flex-col gap-3   dark:bg-black">
                <div className="flex  items-center gap-2 font-semibold">
                  <ImHourGlass className="" />
                  <p>Nombre De Conge En Attente</p>
                </div>
                <p className="font-bold ">{`${stats.nombreCongesEnAttente}%`}</p>
              </div>
              <div className="bg-violet-500 dark:text-white  p-5 rounded flex flex-col gap-3   dark:bg-black">
                <div className="flex items-center gap-2 font-semibold">
                  <TfiStatsUp className="" />
                  <p>Nombre De Conge Deja Approuvé </p>
                </div>
                <p className="font-bold ">0</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">
                <u>Évolution Des Congés En Attente</u>
              </h3>
              <ul className="list-disc pl-5 space-y-1 font-semibold">
                {stats.evolutionConges.length > 0 ? (
                  stats.evolutionConges.map((item, index) => (
                    <li key={index} className="text-sm gap-3">
                      {item.date} : {item.demandes} demande(s)
                    </li>
                  ))
                ) : (
                  <li className="text-sm">Aucune demande de congé récente.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end content dasboard */}
    </>
  );
};

export default DashboardC;
