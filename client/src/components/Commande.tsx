
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

const Commande = () => {
  const [VALUES, SetVALUES]=useState({
    email:"",
    nom_commande:"",
    date_commande:"",
  })
    
  const navigate = useNavigate();
  const HandleSubmit = (event: { preventDefault: () => void })=>
    {
    event.preventDefault();
    axios.post("http://localhost:3000/Commande/paste",VALUES)
    .then((res)=>{
      console.log("Infos_Commade",res.data);
      if( res.data.status == "Commande insérée avec succès."){
        alert("Commande Inserer Avec Succes")
        navigate("/Achat")
      }else{
        console.log("une erreur est survenu lors de la validation du formulaire")
      };
    })
    .catch((error)=>{
      console.error("Erreur De Service",error)
    })
  };
  return (
    <div className="bg-slate-400 w-full flex items-center justify-center h-screen font-mono ">
      <div className=" border-white border  p-3 items-center w-[55vw] max-sm:w-[90vw] ">
        <div className="font-poppins flex flex-col w-full gap-3 mb-4">
          <p className="font-mono font-bold text-2xl  ">Welcome in my App</p>
          <p className="text-center font-mono font-semibold">Please place an order !</p>
        </div>
        <div className="bg-green-500 flex gap-2 p-3 rounded-full mb-3">
          <p>Fake, your identity key is: </p>
          <p className="text-red-700 font-bold">2020202</p>
        </div>
        <form onSubmit={HandleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" >Email</label>
            <input onChange={(e)=> SetVALUES({...VALUES, email:e.target.value})} id="email" type="email" className="rounded" required/>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="nom_commande" >Name Command</label>
            <input onChange={(e)=> SetVALUES({...VALUES, nom_commande:e.target.value})} id="nom_commande" type="text" className="rounded" required/>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="date_commande">Date Command</label>
            <input onChange={(e)=> SetVALUES({...VALUES, date_commande:e.target.value})} id="date_commande" type="date" className="rounded" required/>
          </div>
           <button type="submit" className="flex justify-center bg-white p-2 font-semibold rounded-md hover:bg-green-700 duration-300">Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default Commande