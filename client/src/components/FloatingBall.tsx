import { motion } from "framer-motion";

const FloatingBall = () => {
  return (
    <motion.div
      className="fixed bottom-10 right-10 w-12 h-12 bg-violet-500 rounded-full shadow-lg"
      animate={{
        y: [0, -50, 0], // Monte puis descend
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default FloatingBall;
