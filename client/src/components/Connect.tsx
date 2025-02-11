import { useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { FaUserLock } from "react-icons/fa";
const Dashboard = () => {
  const [VALUES, SetVALUES]=useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();
   const HandlesSubmit = (event: { preventDefault: () => void }) =>{
    event.preventDefault();
    axios
    .post("http://localhost:3000/Connect/paste", VALUES)
    .then((res)=>{
      console.log("Response", res.data)
      if(res.data.status === "Utilisateur Connecter"){
        alert("Utilisateur Connecter");
        navigate("/Commande");
      }
      else if(res.data.Erreur === "Mot De Passe Incorrect"){
       alert("Mot De Passe Incorrect");
      }else{
        alert("Mot De Passe Incorrect")
      };
    })
    .catch((error)=>{
        console.error("Erreur Inconue ",error)
        alert("Erreur Inconue")
      })
   }

  return (
<div className="bg-slate-400 w-full flex items-center justify-center h-screen font-mono ">
      <div className=" border-white border  p-3 items-center w-[55vw] max-sm:w-[90vw] ">
        <div className="font-poppins flex flex-col w-full gap-3 mb-4">
          <p className="font-mono font-bold text-2xl  ">Welcome in my App</p>
          <p className="text-center font-mono font-semibold">Form Inscription Client</p>
          <FaUserLock className="text-[15vw] text-center"/>
        </div>
        {/* Debut du formulaire */}
       <div>
          <form onSubmit={HandlesSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-2 md:justify-center w-full">
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="email">Email Client</label>
              <input id="email" onChange={(e)=> SetVALUES({...VALUES, email:e.target.value})} type="email" className="w-72 max-sm:w-64 rounded font-extrabold"/>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="password">Mot De Passe</label>
              <input id="password" onChange={(e)=> SetVALUES({...VALUES, password:e.target.value})} type="password" className="w-72 max-sm:w-64 rounded font-extrabold"/>
            </div>
            </div>
            <input type="submit" className="hover:bg-blue-700 p-3 rounded-md  cursor-pointer bg-slate-500 duration-300"/>
          </form>
       </div>
       {/* fin du formulaire */}
      </div>
</div>

  )
}

export default Dashboard