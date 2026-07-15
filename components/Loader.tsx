"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Planet animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="relative w-24 h-24 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-90" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-400/30 to-transparent" />
        {/* Orbit ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute -inset-4 border border-white/20 rounded-full"
          style={{ borderStyle: "dashed" }}
        />
      </motion.div>

      <h1 className="text-3xl font-black tracking-widest text-yellow-400 uppercase mb-2">
        TET HOOD
      </h1>
      <p className="text-white/50 text-sm mb-6">Open World Mini-Planet Adventure</p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
        />
      </div>
      <p className="text-white/30 text-xs mt-3">Loading planet…</p>
    </div>
  );
}
