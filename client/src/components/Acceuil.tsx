// import React from "react";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa'; // Import from react-icons/fa
import { FiUser } from "react-icons/fi";;
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./Loader";

// import { Link } from "react-router-dom";
 
const Acceuil = () => {
  const [openBox, SetopenBox] = useState(false);
  const togglebox = ()=>{
    SetopenBox(!openBox)
  }
  const [openIndex, setOpenIndex] = useState <number | null>(null);

  const faqs = [
    { question: "Qu'est-ce que React ?", answer: "React est une bibliothèque JavaScript pour construire des interfaces utilisateur." },
    { question: "Qu'est-ce que Tailwind CSS ?", answer: "Tailwind CSS est un framework de design utilitaire pour construire rapidement des interfaces modernes." },
    { question: "Comment fonctionne useState ?", answer: "useState est un hook qui permet de gérer l'état local dans un composant fonctionnel React." },
  ];

  const toggleFAQ = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <div className=" ">
      <nav className="bg-violet-800 text-white p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto items-center md:flex md:justify-between  ">
        {/* Logo */}
        <div className="flex justify-between">
          <div className="text-xl font-extrabold p-3 bg-violet-300 rounded cursor-pointer">e@BuyClock</div>

          {/* Hamburger Menu for Mobile */}
          <button
          className="md:hidden  transition-all duration-600 "
          onClick={toggleMenu}
          
          >
          {isOpen ? (
            <FaTimes  className="h-6 w-6 " />
          ) : (
            <FaBars className="h-6 w-6 " />
          )}
        </button>
        </div>
        

        {/* Navigation Links */}
        <div className="">
          <ul
          className={`md:flex gap-6 text-lg md:gap-20 max-md:justify-center max-md:items-center   ${
            isOpen ? 'flex flex-col' : 'hidden'
          }`}
         >
          <Link to="/admin">
          <li>
            <a href="#home" className="hover:text-gray-400 block py-2 md:py-0">
              Welcome
            </a>
          </li>
          </Link>
          <li>
            <a href="#about" className="hover:text-gray-400 block py-2 md:py-0">
              About Us
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-gray-400 block py-2 md:py-0">
              Our Services
            </a>
          </li>
          <li className="flex items-center flex-col gap-2 transition-all duration-500">
            <Link to='/Login'>
            <button onClick={togglebox} className="">
              <FiUser className="hover:text-gray-400  text-2xl block cursor-pointer " />
            </button>
            </Link>
            <ul className={`${openBox? 'hidden' : 'hidden'} bg-violet-900 rounded text-md   md:absolute  divide-y w-72 py-3 text- text-center font-poppins md:right-0 md:mt-[3.5rem] md:bg-violet-500`}>
              <li className="cursor-pointer hover:text-gray-300 ">
                <Link to="/Login"><p>Login</p></Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300  ">
                <Link to="/Register"><p>Register</p></Link>
              </li>

            </ul>
          </li>
        </ul>
        </div>
        {/* end */}
      </div>
    </nav>
    <div className="bg-[url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0OTg2fDB8MXxjb2xsZWN0aW9ufDF8NDU3ODM0fHx8fHwyfHwxNzM2Njk3OTM3fA&ixlib=rb-4.0.3&q=80&w=400')] bg-cover h-[700px] flex items-center justify-center  brightness-50 max-sm:h-[400px] ">
    
        
      
    <div className="flex justify-center items-center p-3">
      <p className="text-white xl:text-[3rem] max-sm:text-[2rem] text-center font-extrabold text-wrap">Suivez Vos Heures De Travail En Temps Réel Avec e@BuyClock - Votre Partenaire De Confiance</p>
    </div>
    </div>
    <div className="flex flex-col gap-3 mt-5 p-6 bg-white ">
      <h1 className="text-center text-3xl  font-extrabold text-violet-600">Bienvenue Chez e@BuyClock</h1>
      <p className=" text-start text-[1rem]">e@BuyClock  est une application web, spécialisée dans la gestion de suivi de presence des employés. Nous vous accompagnons pour atteindre vos objectifs et réaliser votre potentiel.</p>
    </div>
    <div className="bg-slate-300 text-center ">
      
      <div className="p-10">
       
        <h1 className="text-3xl   font-extrabold text-violet-600 ">Prestation De service</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 justify-center p-4">
        <div className="flex flex-col mb-10">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VzdGlvbnxlbnwwfHwwfHx8MA%3D%3D" alt="" className=""/>
          <div className="flex flex-col gap-2">
          <h1 className="mt-5 text-xl font-bold text-violet-700">Coaching individuels</h1>
          <p className="text-1rem">Coaching personnalisé pour exploiter votre potentiel</p>
          <button className="bg-violet-700 text-white p-2 rounded flex justify-center mb-3 font-bold ">Bientot Disponible</button>
          <div><p className="text-white xl:mx-60 max-sm:mx-20 md:mx-6 hover:bg-violet-400 rounded hover cursor-pointer   text-center items-center bg-violet-600  ">Plus d'informations</p></div>
        </div>
        </div>
        {/* deuxieme grid */}
        <div className="flex flex-col mb-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdlc3Rpb24lMjAlMjBkJ2hvcmFpcmV8ZW58MHx8MHx8fDA%3D" alt="" className=""/>
          <div className="flex flex-col gap-2">
          <h1 className="mt-5 text-xl font-bold text-violet-700">Formation en développement personnel</h1>
          <p className="text-1rem">Formations pour renforcer vos compétences</p>
          <button className="bg-violet-700 text-white p-2 rounded flex justify-center mb-3 font-bold ">Bientot Disponible</button>
          <div><p className="text-white xl:mx-60 max-sm:mx-20 md:mx-6 hover:bg-violet-400 rounded hover cursor-pointer   text-center items-center bg-violet-600  ">Plus d'informations</p></div>
        </div>
        </div>
        {/* troisieme grid */}
        <div className="flex flex-col mb-10">
          <img src="https://media.istockphoto.com/id/486561416/photo/portrait-of-successful-applauding-young-people-sitting-in-line.jpg?s=1024x1024&w=is&k=20&c=xpfLrFcesLwVhz1f_4Zc8QIrzjyzR6bOaJQ495Lx2_I=" alt="" className=""/>
          <div className="flex flex-col gap-2">
          <h1 className="mt-5 text-xl font-bold text-violet-700">Ateliers De Motivation</h1>
          <p className="text-1rem">Ateliers de motivation pour booster votre confiance</p>
          <button className="bg-violet-700 text-white p-2 rounded flex justify-center font-bold mb-3 ">Bientot Disponible</button>
          <div><p className="text-white xl:mx-60 max-sm:mx-20 md:mx-6 hover:bg-violet-400 rounded hover cursor-pointer   text-center items-center bg-violet-600  ">Plus d'informations</p></div>
          
          </div>
          
        </div>
      </div>
      <div className="bg-white p-10">
        <h1 className="text-3xl   font-extrabold text-violet-600 ">Foire aux questions</h1>
        {/* foire aux question */}
        <div>
          <div className="max-w-xl mx-auto mt-10 space-y- transition-all  ">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className=" shadow-sm  transition-all "
        >
          <div
            className="flex justify-between  items-center cursor-pointer bg-violet-700 p-4"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-lg font-medium text-white">{faq.question}</h2>
            <div
              className={`transform transition-transform duration-300  ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown className="text-white"/>
            </div>
          </div>
          <div className={`bg-white w-full border-2 border-gray-800 overflow-hidden duration-500 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0' }`}>
            {openIndex === index && (
            <p className={`text-gray-600 mt-10 mb-10`}>{faq.answer}</p>
          )}
          </div>
          
        </div>
      ))}
    </div>

        </div>
        {/* foire aux question */}
      </div>
      <div className=" bg-violet-700 text-white p-3 flex flex-col ">
        <div>
          <h1 className="text-2xl font-bold mt-10 mb-10  ">
“IsDev m'a aidé à dépasser mes limites et à atteindre mes objectifs. Leur approche personnalisée et leur expertise m'ont vraiment impressionné.”
</h1>
<p className="">[Stopse Arsene]</p>
        </div>
        
      </div>
      <div className="mb-10 bg-white">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 container justify-center mx-auto mb-10 ">
          <div className="flex flex-col  mt-16 ">
            <div className="flex  flex-col  container justify-center p-3">
            <h1 className="text-3xl text-violet-600 font-bold text-start">Contacter-Nous</h1>
            <p className="text-start  text-gray-500">Contactez-nous dès aujourd'hui pour commencer votre parcours de suivi d'heure en temps réel dans un monde purement digitalisé.</p>
            </div>
            <form method="" action="" >
              <div className="font-poppins text-gray-600  text-xs  p-3">
                <div className="mb-2 flex flex-col text-start">
                 <label className="font-extrabold">Nom *</label>
                 <input type="text" className="p-[5px] px-1 text-sm " required/>
              </div>
              <div className="mb-2 flex flex-col text-start">
                 <label className="font-extrabold">Addresse e-mail *</label>
                 <input type="text" className="p-[5px] px-1 text-sm " required/>
              </div>
              <div className="mb-2 flex flex-col text-start ">
                 <label className="font-extrabold">Message *</label>
                 <textarea className="mb-3" required/>
                 <button type="submit" className=" optext-start p-3 rounded bg-violet-500 xl:mx-60 max-sm:mx-20 md:mx-6 hover:bg-violet-400 text-white text-sm">Envoyer le formulaire</button>
              </div>
              </div>
            </form>
          </div>
          <div className=" mt-16 flex justify-center items-center bg-red-600 font-bold flex-col">
            <p>Erreur TheoDev@711 </p>
            MapBox Google Pour Demain Encours...
          </div>
          

        </div>
        <div className="bg-violet-600 text-white text-center flex justify-center flex-col p-3">
          <h1 className="text-3xl text-white font-extrabold font-poppins mb-5 ">Qui sommes nous ?</h1>
          <p className="max-md:text-sm mb-10"><span className="font-extrabold text-black">e@BuyClock</span> est une application web destiner à réaliser le plein potentiel d'une entreprise. Notre équipe d'experts qualifiés vous accompagne avec des solutions adaptées à vos besoins. Découvrez nos services de coaching, formations et ateliers pour transformer votre vie.</p>
          <div className=" hover:brightness-75 duration-500 cursor-pointer max-sm:mx-40 xl:mx-[45vw] bg-violet-500 text-white p-3 "><p>Découvrir</p></div>
        </div>
        

      </div>
      

    </div>
    </div>
  );
};

export default Acceuil;
