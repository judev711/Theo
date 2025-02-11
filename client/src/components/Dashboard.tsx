import { useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react"
const Dashboard = () => {
  const [VALUES, SetVALUES]=useState({
    nom:"",
    prenom:"",
    ville:"",
    email:"",
    password:"",
  });
  const navigate = useNavigate()
   const HandlesSubmit = (event: { preventDefault: () => void }) =>{
    event.preventDefault();
    axios
    .post("http://localhost:3000/Client/paste", VALUES)
    .then((res)=>{
      console.log("Response", res.data)
      if(res.data.status == "Client inscrit avec succès"){
        alert("Client inscrit avec succès");
        navigate("/Connect");
      }else{
        console.log("Une Erreur Provient De Votre Formulaire")
      }
    })
    .catch((error)=>{
        console.error("Erreur Inconue ",error)
      })
   }

  return (
<div className="bg-slate-400 w-full flex items-center justify-center h-screen font-mono ">
      <div className=" border-white border  p-3 items-center w-[55vw] max-sm:w-[90vw] ">
        <div className="font-poppins flex flex-col w-full gap-3 mb-4">
          <p className="font-mono font-bold text-2xl  ">Welcome in my App</p>
          <p className="text-center font-mono font-semibold">Form Inscription Client</p>
        </div>
        {/* Debut du formulaire */}
       <div>
          <form onSubmit={HandlesSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-2 md:justify-center w-full">
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="nom">Nom Client</label>
              <input id="nom" onChange={(e)=> SetVALUES({...VALUES, nom:e.target.value})}  type="text" className="w-72 max-sm:w-64 rounded font-extrabold"/>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="prenom">Prenom Client</label>
              <input id="prenom" onChange={(e)=>SetVALUES({...VALUES, prenom :e.target.value})} type="text" className="w-72 max-sm:w-64 rounded font-extrabold"/>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="ville">Ville Client</label>
              <input id="ville" onChange={(e)=> SetVALUES({...VALUES, ville:e.target.value})} type="text" className="w-72 max-sm:w-64 rounded font-extrabold"/>
            </div>
            
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