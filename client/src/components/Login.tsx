import { SignIn, useAuth} from "@clerk/clerk-react" 
import Loader from "./Loader";
import { useEffect, useState } from "react";

const Login = () => {
  const { isLoaded } = useAuth(); // Vérifie si l'authentification est prête
  const [isLoading, setIsLoading] = useState(true); // État pour suivre le chargement de la page


  

  useEffect(() => {
    // Simule un chargement de la page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0.2); // ⏳ Temps simulé pour le chargement

    return () => clearTimeout(timer); // Nettoie le timer
  }, []);

  // Affiche le Loader tant que la page ou useAuth charge
  if (isLoading || !isLoaded) {
    return <Loader />;
  };
  return (
        <div className="bg-white w-full    ">
          
            <div className="grid grid-cols-2 gap-2 w-screen h-screen  fixed items-center max-md:grid-cols-1">
            <div className="flex  items-center justify-center ">
              
                <SignIn
                afterSignInUrl="/presence"
                  signUpUrl="/Register"
                  appearance={{
                    elements: {
                      rootBox: "flex flex-col items-center w-full ", // Style global de la carte
                      headerTitle: "text-xl font-bold text-gray-800", // Titre "Sign In"
                      headerSubtitle: "text-sm text-gray-500", // Sous-titre
                      socialButtonsBlockButton: "bg-white ", // Bouton Google/Microsoft
                      formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-md", // Bouton "Continue"
                      footerActionLink: "text-indigo-500 hover:text-indigo-600", // Lien "Sign up"
                    },
                  }}
                />
                
                </div>
                  <div className=" w-full max-md:hidden -mt-[4rem] flex items-center p-4 border-black border-1">
                        <div className="flex justify-center items-center  ">
                          <img src="../src/assets/image_login.jpeg" alt="image_login" className="rounded-md bg-contain duration-300 mt-10"/>
                        </div>
                  </div>
            </div>
            
        </div>
  );
};

export default Login;

