import axios from "axios";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { FaRunning } from "react-icons/fa"; // Icône d'un homme qui court
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Register = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    role: "",
    phonenumber: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  // Fonction de soumission du formulaire
  const handlesSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    // Validation des champs avant l'envoi
    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.birthDate ||
      !signupData.gender ||
      !signupData.role ||
      !signupData.phonenumber ||
      !signupData.email ||
      !signupData.password
    ) {
      alert("Tous les champs sont requis.");
      setLoading(false);
      return;
    }

    // Validation du format de l'email (simple)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(signupData.email)) {
      alert("L'email est invalide.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/Register/api/signup", signupData);
      console.log("Inscription réussie. Vous pouvez maintenant vous connecter !");
      if(response.data.message == 'Utilisateur créé avec succès.'){
        navigate('/login')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          "Erreur lors de l'inscription : " +
            (error.response?.data?.message || "Une erreur est survenue.")
        );
      } else {
        alert("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };
  // loader
  
  const [isLoading, setIsLoading] = useState(true); // État pour suivre le chargement de la page

  useEffect(() => {
    // Simule un chargement de la page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // ⏳ Temps simulé pour le chargement

    return () => clearTimeout(timer); // Nettoie le timer
  }, []);

  // Affiche le Loader tant que la page ou useAuth charge
  if (isLoading ) {
    return <Loader />;
  };

  return (
    <div className="justify-center items-center flex bg-slate-100 max-sm:px-3 md:px-6 md:py-8 max-sm:py-3 mx-auto h-screen ">
      <div className="flex w-full ">
        {/* section inscription */}
        <div className="bg-white w-full  ">
          <div className="max-sm:p-3 md:p-6 xl:mt-6 ">
            <h1 className=" max-sm:text-xl text-3xl font-bold">WELCOME</h1>
            <h1 className="text-center text-xl font-bold mb-5 mt-3 ">
              Registration Form
            </h1>
            <div>
              {loading && (
                <motion.div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  animate={{
                    x: [0, 30, 0], // Déplacement horizontal pour simuler la course
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity, // Répète l'animation en boucle
                    ease: "easeInOut",
                  }}
                >
                  <div style={{ width: "50px", height: "50px", backgroundColor: "red" }}>
                    <span style={{ color: "white", fontSize: "32px" }}>
                      <FaRunning />
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
            <hr className="border-t-1 border-black flex-1 mb-8 " />
            <div>
              {/* formulaire d'inscription */}
              <form onSubmit={handlesSignup}>
                <div className="w-full font-poppins max-sm:text-sm">
                  {/* Premier groupe */}
                  <div className="mb-4 grid grid-cols-2 gap-2 w-full max-sm:mb-8 ">
                    <div className="flex flex-col ">
                      <label className="font-semibold">FirstName</label>
                      <input
                        onChange={(e) =>
                          setSignupData({ ...signupData, firstName: e.target.value })
                        }
                        type="text"
                        name="firstName"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        placeholder="Siyandji"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">LastName</label>
                      <input
                        onChange={(e) =>
                          setSignupData({ ...signupData, lastName: e.target.value })
                        }
                        type="text"
                        name="lastName"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        placeholder="Theodore"
                      />
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-2 w-full max-sm:mb-8 ">
                    <div className="flex flex-col ">
                      <label className="font-semibold">BirthDay</label>
                      <input
                        onChange={(e) =>
                          setSignupData({ ...signupData, birthDate: e.target.value })
                        }
                        type="date"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        name="birthDate"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Sexe</label>
                      <select
                        onChange={(e) =>
                          setSignupData({ ...signupData, gender: e.target.value })
                        }
                        name="gender"
                        id="gender"
                        className="rounded-md p-2 border-2 outline-none bg-gray-100"
                        required
                      >
                        <option value="">Sélectionnez</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Feminin</option>
                        <option value="Intersexe">Intersexe</option>
                      </select>
                    </div>
                  </div>
                  {/* Deuxième groupe */}
                  <div className="mb-4 grid grid-cols-2 gap-2 w-full max-sm:mb-8 ">
                    <div className="flex flex-col ">
                      <label className="font-semibold">Role</label>
                      <select
                        onChange={(e) =>
                          setSignupData({ ...signupData, role: e.target.value })
                        }
                        name="role"
                        id="role"
                        className="rounded-md p-2 border-2 outline-none bg-gray-100"
                        required
                      >
                        <option value="Employee">Employee</option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="Maintainer">Maintainer</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Phone Number</label>
                      <input
                        onChange={(e) =>
                          setSignupData({ ...signupData, phonenumber: e.target.value })
                        }
                        type="text"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        placeholder="ex: 671 234 569"
                      />
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-2 w-full ">
                    <div className="flex flex-col ">
                      <label className="font-semibold">Email</label>
                      <input
                        onChange={(e) =>
                          setSignupData({ ...signupData, email: e.target.value })
                        }
                        type="email"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        placeholder="Theo@gmail.com"
                        name="email"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Password</label>
                      <input
                      name="password"
                        onChange={(e) =>
                          setSignupData({ ...signupData, password: e.target.value })
                        }
                        type="password"
                        required
                        className="rounded-md p-2 border-2 outline-none bg-gray-100 "
                        placeholder="****"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-2 justify-center mt-8 ">
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-white bg-violet-700 p-2 rounded-lg font-semibold px-6 hover:bg-gray-900"
                    >
                      {loading ? "Chargement..." : "S'inscrire"}
                    </button>
                    <Link to="/Login">
                    <div
                      className="text-white bg-violet-700 p-2 cursor-pointer rounded-lg font-semibold px-6 hover:bg-gray-900">
                        Se Connecter
                    </div>
                    </Link>
                  </div>
                  <p className="font-mono font-bold mt-5 text-center">@2024 Theodore*711 </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* section d'information */}
        <div className=" w-full max-lg:hidden flex items-center p-4">
          <div className="">
            <img
              src="../src/assets/image_inscription.jpeg"
              className="rounded-md mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
