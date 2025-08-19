"use client";
import React from "react";
import { motion } from "motion/react";

export const LoaderThree = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Main loader circle */}
        <motion.div
          className="w-16 h-16 border-4 border-cyan-400/20 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Inner rotating elements */}
        <motion.div
          className="absolute inset-2 border-2 border-purple-400/30 rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Center pulsing dot */}
        <motion.div
          className="absolute inset-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};