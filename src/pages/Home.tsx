
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center p-8"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-red-900 sm:text-6xl md:text-7xl">
          Welcome to the World of Wheels
        </h1>
        <p className="mt-6 text-xl leading-8 text-red-800">
          Effortlessly book, track, and manage your bus journeys all in one place.
        </p>
        <div className="mt-12">
          <Link to="/login">
            <Button size="xl" className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
