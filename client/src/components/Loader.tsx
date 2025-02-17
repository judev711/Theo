import { motion } from "framer-motion";

const ClockLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-40 h-40 flex justify-center items-center">
        {/* Sonnettes au-dessus */}
        <div className="absolute top-[-20px] flex space-x-4">
          <div className="w-6 h-6 bg-purple-700 rounded-full shadow-md"></div>
          <div className="w-6 h-6 bg-purple-700 rounded-full shadow-md"></div>
        </div>
        
        {/* Ombre animée */}
        <motion.div
          className="absolute bottom-[-10px] w-36 h-5 bg-black rounded-full opacity-30"
          initial={{ scaleX: 0.8, scaleY: 0.5, opacity: 0.2 }}
          animate={{ scaleX: 1, scaleY: 1, opacity: 0.3 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Cadran de l'horloge */}
        <div className="w-40 h-40 bg-white border-4 border-purple-700 rounded-full flex justify-center items-center shadow-xl relative overflow-hidden">
          {/* Chiffres et marques des heures */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-purple-700 font-bold text-lg"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-75px)`,
                transformOrigin: "center",
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}

          {/* Aiguilles animées avec rotation x2 */}
          <motion.div
            className="w-1 h-10 bg-purple-600 absolute origin-bottom"
            animate={{ rotate: [0, 720] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            style={{ height: "35%" }}
          />
          <motion.div
            className="w-2 h-14 bg-purple-800 absolute origin-bottom"
            animate={{ rotate: [0, 720] }}
            transition={{ duration: 1800, ease: "linear", repeat: Infinity }}
            style={{ height: "30%" }}
          />
          <motion.div
            className="w-1 h-16 bg-red-600 absolute origin-bottom"
            animate={{ rotate: [0, 720] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            style={{ height: "40%" }}
          />

          {/* Centre de l'horloge */}
          <div className="w-4 h-4 bg-purple-700 rounded-full absolute" />
        </div>
      </div>
    </div>
  );
};

export default ClockLoader;
